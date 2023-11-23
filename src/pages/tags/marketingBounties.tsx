import SideBarMenu from "../../components/menus/sidebarMenu/sidebarMenu";
import BountiesNotFound from "../../components/errors/bountiesNotFound";
import MobileMenu from "../../components/menus/mobileMenu/mobileMenu";
import CategoryList from "../../components/categoriesList/categoryList";
import BountyCard from "../../components/bounty/bountyCardShortInfo/bountyCardShortInfo";

import { useState, useEffect } from "react";
import { convertTimestamp, formatReward } from "../../utils";
import { RelayPool } from "nostr-relaypool";
import { defaultRelaysToPublish, defaultRelays } from "../../const";

type event = {
  Dtag: string;
  createdAt: string;
  name: string;
  profilePic: string;
  pubkey: string;
  reward: string;
  tags: string[];
  title: string;
  timestamp: number;
};

function App() {
  let currentTimestamp = Math.floor(Date.now() / 1000);
  let [eventData, setEventData] = useState<event[]>([]);
  let [bountyNotFound, setBountyNotFound] = useState(false);
  let [dataLoaded, setDataLoaded] = useState(false);
  let [loadMore, setLoadMore] = useState(false);
  let [loadingMessage, setLoadingMessage] = useState(false);
  let [queryUntil, setQueryUntil] = useState(currentTimestamp);
  let [currentBountyCount, setCurrentBountyCount] = useState<number>();
  let [correctBountyCount, setCorrectBountyCount] = useState<number>(10);
  let [currentStatus, setCurrentStatus] = useState<any>({});

  function loadMoreBounties() {
    let lastElement = eventData.length - 1;
    setQueryUntil(eventData[lastElement].timestamp);
    setLoadMore(!loadMore);
    setLoadingMessage(true);
    setCorrectBountyCount(correctBountyCount + 20);
  }

  useEffect(() => {
    let relays = defaultRelaysToPublish;
    let statuses: any = {};
    let subFilter = [
      {
        kinds: [30023],
        "#t": ["marketing-bounty"],
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
      },
    ];

    let checkBountyExist = [];
    let eventLength = [];

    let relayPool = new RelayPool(relays, { useEventCache: true });

    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });

    relayPool.subscribe(
      subFilter,
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

        let userMetadataFilter = [{ kinds: [0], authors: [event.pubkey] }];
        relayPool.subscribe(
          userMetadataFilter,
          defaultRelays,
          (event, isAfterEose, relayURL) => {
            let metadata = JSON.parse(event.content);

            ev.name = metadata.username;
            ev.profilePic = metadata.picture;
          },
          undefined,
          undefined,
          { unsubscribeOnEose: true }
        );

        ev.title = bountyTitle;
        ev.reward = bountyReward;
        ev.createdAt = bountyDatePosted;
        ev.pubkey = event.pubkey;
        ev.timestamp = event.created_at;

        setEventData((arr) => [...arr, ev]);
        eventLength.push(ev);
        checkBountyExist.push(event.id);
      },
      undefined,
      undefined,
      { unsubscribeOnEose: true }
    );

    relayPool.subscribe(
      subFilterStatus,
      defaultRelays,
      (event, isAfterEose, relayUrl) => {
        let dTag = `${event.tags[0][1]}`;
        let hasdTag = statuses.hasOwnProperty(dTag);

        if (!hasdTag) {
          statuses[`${dTag}`] = [event.tags[1][1], event.created_at];
        } else {
          if (event.created_at > statuses[`${dTag}`][1])
            statuses[`${dTag}`] = [event.tags[1][1], event.created_at];
        }
        setCurrentStatus(statuses);
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
    }, 40000);

    let closeMyInterval = setInterval(() => {
      if (
        eventLength.length === checkBountyExist.length &&
        eventLength.length >= 1
      ) {
        setDataLoaded(true);
        setLoadingMessage(false);
        clearInterval(closeMyInterval);
      }
    }, 1800);
  }, [loadMore]);

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
      <div className="p-3 h-screen overflow-y-scroll no-scrollbar basis-9/12 lg:px-10 sm:h-screen px-0.5 sm:mb-24 dark:bg-background-dark-mode">
        <CategoryList currentPage="marketing" />
        <div>
          {dataLoaded ? (
            <div>
              {eventData.map((item, index) => {
                return (
                  <div>
                    <BountyCard ev={eventData[index]} status={currentStatus} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="animate-pulse text-center p-6 font-medium text-dark-text dark:text-gray-2">
              Loading...
            </div>
          )}
          <div className="text-center">
            {currentBountyCount! >= correctBountyCount ? (
              <button
                onClick={() => {
                  loadMoreBounties();
                }}
                className="text-center mt-3 text-dark-text dark:text-gray-2"
              >
                {loadingMessage ? "Loading" : "Load more bounties"}
              </button>
            ) : null}
            {currentBountyCount! < correctBountyCount ? (
              <p className="mt-3 text-dark-text dark:text-gray-2">
                We didn't find more bounties
              </p>
            ) : null}
          </div>
        </div>
        {bountyNotFound ? <BountiesNotFound /> : null}
      </div>
    </div>
  );
}

export default App;
