import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { RelayPool } from "nostr-relaypool";
import { convertTimestamp, formatReward } from "../utils";
import { defaultRelaysToPublish, defaultRelays } from "../const";
import { nip19 } from "nostr-tools";

import SideBarMenu from "../components/menus/sidebarMenu/sidebarMenu";
import BountiesNotFound from "../components/errors/bountiesNotFound";
import ProfileCard from "../components/profileCard/profileCard";
import ProfileActivity from "../components/profileCard/profileStats/profileActivity";
import BountiesPaid from "../components/profileCard/profileStats/profileBountiesPaid";
import BountiesProgress from "../components/profileCard/profileStats/profileBountiesProgress";
import BountyCard from "../components/bounty/bountyCardShortInfo/bountyCardShortInfo";
import MobileMenu from "../components/menus/mobileMenu/mobileMenu";
import SatsAdded from "../components/profileCard/profileStats/profileBountiesAddedReward";

type event = {
  Dtag: string;
  createdAt: string;
  name: string;
  profilePic: string;
  pubkey: string;
  reward: string;
  status: string;
  tags: string[];
  title: string;
  timestamp: number;
};

type statusesObject = {
  [key: string]: [string, number];
};

function Profile() {
  const params = useParams();
  let relays = defaultRelaysToPublish;
  let userMetaDataRelays = defaultRelays;
  let currentTimestamp = Math.floor(Date.now() / 1000);
  let userPubkey = nip19.decode(params.id!).data;
  let last30DaysTimestamp = Math.floor(Date.now() / 1000) - 24 * 60 * 60 * 1000;

  let [metaData, setMetada] = useState({});
  let [eventData, setEventData] = useState<event[]>([]);
  let [bountyNotFound, setBountyNotFound] = useState(false);
  let [dataLoaded, setDataLoaded] = useState(false);
  let [userNip05, setUserNip05] = useState(false);
  let [bountyStatuses, setBountyStatuses] = useState<statusesObject>({});
  let [Last30Days, setLast30Days] = useState(0);
  let [addedReward, setAddedReward] = useState<number>(0);
  let [loadMore, setLoadMore] = useState(false);
  let [loadingMessage, setLoadingMessage] = useState(false);
  let [queryUntil, setQueryUntil] = useState(currentTimestamp);
  let [currentBountyCount, setCurrentBountyCount] = useState<number>();
  let [correctBountyCount, setCorrectBountyCount] = useState<number>(10);

  function loadMoreBounties() {
    let lastElement = eventData.length - 1;
    // @ts-ignore
    setQueryUntil(eventData[lastElement].timestamp);
    setLoadMore(!loadMore);
    setLoadingMessage(true);
    setCorrectBountyCount(correctBountyCount + 10);
  }

  let subFilterMetaData = [
    {
      authors: [`${userPubkey}`],
      kinds: [0],
    },
  ];
  let subFilterOlderPost = [
    {
      authors: [`${userPubkey}`],
      kinds: [1],
      since: last30DaysTimestamp,
      limit: 30,
    },
  ];
  let subFilterAddedReward = [
    {
      authors: [`${userPubkey}`],
      "#t": ["bounty-added-reward"],
    },
  ];

  let subFilterContent = [
    {
      authors: [`${userPubkey}`],
      kinds: [30023],
      "#t": ["bounty"],
      until: queryUntil,
      limit: 20,
    },
  ];

  let subFilterStatus = [
    {
      // @ts-ignore
      "#t": ["bounty-status"],
      kinds: [1],
      until: queryUntil,
      authors: [`${userPubkey}`],
    },
  ];

  let checkBountyExist = [];
  let eventLength = [];
  let bountyHunterStatuses: statusesObject = {};

  useEffect(() => {
    let relayPool = new RelayPool(relays);

    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });

    //subscribe metadata
    relayPool.subscribe(
      subFilterMetaData,
      userMetaDataRelays,
      (event, isAfterEose, relayURL) => {
        let parsedContent = JSON.parse(event.content);

        let finalData = {
          name: parsedContent.display_name,
          display_name: parsedContent.display_name,
          profilePic: parsedContent.picture,
          LnAddress: parsedContent.lud16,
          about: parsedContent.about,
          nip05: parsedContent.nip05,
        };

        setMetada(finalData);

        if (parsedContent.nip05 !== "" || undefined) {
          let url = parsedContent.nip05.split("@");
          fetch(`https://${url[1]}/.well-known/nostr.json?name=${url[0]}`)
            .then((response) => response.json())
            .then((data) => {
              let userNamePubKey = data.names[`${url[0]}`];
              let isSamePubkey = event.pubkey === userNamePubKey;
              if (isSamePubkey) setUserNip05(true);
            });
        }
      },
      undefined,
      undefined,
      { unsubscribeOnEose: true }
    );

    //subscribe older posts
    relayPool.subscribe(
      subFilterOlderPost,
      userMetaDataRelays,
      (event, isAfterEose, relayURL) => {
        setLast30Days((item) => item + 1);
      },
      undefined,
      undefined,
      { unsubscribeOnEose: true }
    );

    //subscribe to know how many sats this user has pledged
    relayPool.subscribe(
      subFilterAddedReward,
      userMetaDataRelays,
      (event, isAfterEose, relayURL) => {
        let compatAmount: string;
        // Get the reward tag from the list of tags
        // @ts-ignore
        let rewardTag: Array | undefined = event.tags.find(
          (elem) => elem[0] === "reward"
        );

        // Conditionally handle older events with amount in the content field
        if (event.content === "" || isNaN(Number(event.content))) {
          compatAmount = rewardTag ? rewardTag[1] : "0";
        } else {
          compatAmount = event.content;
        }
        let amount = parseInt(compatAmount);
        setAddedReward((item) => item + amount);
      },
      undefined,
      undefined,
      { unsubscribeOnEose: true }
    );

    //subscribe for bounties
    relayPool.subscribe(
      subFilterContent,
      relays,
      (event, isAfterEose, relayURL) => {
        let parseDate = parseInt(event.tags[3][1]);
        let date = convertTimestamp(parseDate);
        let tags_arr: string[] = [];
        // @ts-ignore
        let ev: event = {};

        let bountyTitle = event.tags[1][1];
        let bountyReward = formatReward(event.tags[2][1]);
        let bountyDatePosted = date;

        event.tags.map((item) => {
          if (item[0] === "t") {
            switch (item[1]) {
              case "design-bounty":
                tags_arr.push("design");
                break;
              case "development-bounty":
                tags_arr.push("development");
                break;
              case "debugging-bounty":
                tags_arr.push("debugging");
                break;
              case "writing-bounty":
                tags_arr.push("writing");
                break;
              case "cybersecurity-bounty":
                tags_arr.push("cybersecurity");
                break;
              case "marketing-bounty":
                tags_arr.push("marketing");
                break;
            }
          }

          if (item[0] === "d") {
            ev.Dtag = item[1];
          }

          ev.tags = tags_arr;
        });

        ev.title = bountyTitle;
        ev.reward = bountyReward;
        ev.createdAt = bountyDatePosted;
        ev.pubkey = event.pubkey;
        ev.timestamp = event.created_at;

        setEventData((arr) => [...arr, ev]);
        checkBountyExist.push(event.id);
        eventLength.push(ev);
      },
      undefined,
      undefined,
      { unsubscribeOnEose: true }
    );

    //subscribe for bounty statuses
    relayPool.subscribe(
      subFilterStatus,
      defaultRelays,
      (event, isAfterEose, relayUrl) => {
        let dTag = `${event.tags[0][1]}`;
        let hasdTag = bountyHunterStatuses.hasOwnProperty(dTag);

        if (!hasdTag) {
          bountyHunterStatuses[`${dTag}`] = [
            event.tags[1][1],
            event.created_at,
          ];
        } else {
          if (event.created_at > bountyHunterStatuses[`${dTag}`][1])
            bountyHunterStatuses[`${dTag}`] = [
              event.tags[1][1],
              event.created_at,
            ];
        }
        setBountyStatuses(bountyHunterStatuses);
      },
      undefined,
      undefined,
      { unsubscribeOnEose: true }
    );

    setTimeout(() => {
      relayPool.close().then(() => {
        console.log("connection closed");
      });
      if (checkBountyExist.length === 0) {
        setBountyNotFound(true);
        clearInterval(closeMyInterval);
      }
    }, 20000);

    let closeMyInterval = setInterval(() => {
      if (
        eventLength.length === checkBountyExist.length &&
        eventLength.length >= 1
      ) {
        setDataLoaded(true);
        clearInterval(closeMyInterval);
      }
    }, 1000);
  }, [queryUntil]);

  useEffect(() => {
    setCurrentBountyCount(eventData.length);
  }, [eventData]);

  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12 sm:hidden">
        <SideBarMenu />
      </div>
      <div className="basis-3/12 lg:hidden md:hidden">
        <MobileMenu />
      </div>

      <div className="p-3 h-screen overflow-y-scroll basis-9/12 lg:px-10 sm:h-screen px-2 sm:mb-24 dark:bg-background-dark-mode">
        <ProfileCard
          metaData={metaData}
          userNip05={userNip05}
          npub={params.id}
        />

        <div className="flex flex-col md:flex-row items-center justify-between my-6 sm:block">
          <BountiesPaid bountiesPaid={bountyStatuses} />
          <BountiesProgress bountiesProgress={bountyStatuses} />
          <SatsAdded amount={formatReward(addedReward)} />
          <ProfileActivity activity={Last30Days} />
        </div>
        <div>
          {dataLoaded ? (
            <div>
              {eventData.map((item, index) => {
                return (
                  <div>
                    <BountyCard ev={eventData[index]} status={bountyStatuses} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="animate-pulse text-center p-6 font-medium text-dark-text dark:text-gray-2">
              Loading...
            </div>
          )}
        </div>
        <div>
          {currentBountyCount! >= correctBountyCount ? (
            <button
              onClick={() => {
                loadMoreBounties();
              }}
              className="text-center text-gray-2"
            >
              {loadingMessage ? "Loading" : "load more bounties"}
            </button>
          ) : null}
          {dataLoaded &&
          currentBountyCount! > 0 &&
          currentBountyCount! < correctBountyCount &&
          correctBountyCount > 10 ? (
            <p className="mt-3 text-dark-text dark:text-gray-2">
              We didn't find more bounties
            </p>
          ) : null}
        </div>
        {bountyNotFound ? <BountiesNotFound /> : null}
      </div>
    </div>
  );
}

export default Profile;
