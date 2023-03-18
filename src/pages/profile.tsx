import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { RelayPool } from "nostr-relaypool";
import { convertTimestamp } from "../utils";
import { defaultRelaysToPublish, defaultRelays } from "../const";
import { nip19 } from "nostr-tools";

import SideBarMenu from "../components/menus/sidebarMenu/sidebarMenu";
import BountiesNotFound from "../components/errors/bountiesNotFound";
import ProfileCard from "../components/profileCard/profileCard";
import BountyCard from "../components/bounty/bountyCardShortInfo/bountyCardShortInfo";
import MobileMenu from "../components/menus/mobileMenu/mobileMenu";

function Profile() {
  const params = useParams();
  let relays = defaultRelaysToPublish;
  let userMetaDataRelays = defaultRelays;
  let userPubkey = nip19.decode(params.id!).data;

  let [metaData, setMetada] = useState({});
  let [titles, setTitles] = useState<string[]>([]);
  let [rewards, setRewards] = useState<string[]>([]);
  let [name, setName] = useState<string>("");
  let [picture, setPicture] = useState<string>("");
  let [ids, setIds] = useState<string[]>([]);
  let [bountyNotFound, setBountyNotFound] = useState(false);
  let [dataLoaded, setDataLoaded] = useState(false);
  let [pubkey, setPubkeys] = useState<string[]>([]);
  let [creationDate, setCreationDate] = useState<string[]>([]);
  let [bountyTags, setBountyTags] = useState<string[][]>([]);

  let subFilterMetaData = [
    {
      authors: [`${userPubkey}`],
      kinds: [0],
    },
  ];
  let subFilterContent = [
    {
      authors: [`${userPubkey}`],
      kinds: [30023],
      "#t": ["bounty"],
    },
  ];

  let checkBountyExist = [];

  useEffect(() => {
    let relayPool = new RelayPool(relays);

    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });

    relayPool.subscribe(
      subFilterMetaData,
      userMetaDataRelays,
      (event, isAfterEose, relayURL) => {
        let parsedContent = JSON.parse(event.content);
        let data = {
          name: parsedContent.display_name,
          profilePic: parsedContent.picture,
          LnAddress: parsedContent.lud16,
          about: parsedContent.about,
          nip05: parsedContent.nip05,
        };
        setMetada(data);
        setName(parsedContent.display_name);
        setPicture(parsedContent.picture);
      }
    );

    relayPool.subscribe(
      subFilterContent,
      relays,
      (event, isAfterEose, relayURL) => {
        let parseDate = parseInt(event.tags[3][1]);
        let date = convertTimestamp(parseDate);
        setDataLoaded(true);

        let tags_arr: string[] = [];

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
        });

        let bountyTitle = event.tags[1][1];
        let bountyReward = event.tags[2][1];
        let bountyDatePosted = date;

        setBountyTags((arr) => [tags_arr, ...arr]);
        setIds((arr) => [event.id, ...arr]);
        setCreationDate((arr) => [bountyDatePosted, ...arr]);
        setTitles((arr) => [bountyTitle, ...arr]);
        setRewards((arr) => [bountyReward, ...arr]);
        setPubkeys((arr) => [event.pubkey, ...arr]);

        checkBountyExist.push(event.id);
      }
    );

    setTimeout(() => {
      relayPool.close().then(() => {
        console.log("connection closed");
      });
      if (checkBountyExist.length === 0) setBountyNotFound(true);
    }, 20000);
  }, []);

  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12 sm:hidden">
        <SideBarMenu />
      </div>
      <div className="basis-3/12 lg:hidden md:hidden">
        <MobileMenu />
      </div>

      <div className="p-3 h-screen overflow-y-scroll basis-9/12 lg:px-10 sm:h-screen px-2 dark:bg-background-dark-mode">
        <ProfileCard metaData={metaData} />
        {dataLoaded ? (
          titles.map((item, index) => {
            return (
              <div>
                <BountyCard
                  title={titles[index]}
                  reward={rewards[index]}
                  id={ids[index]}
                  dates={creationDate[index]}
                  pubkeys={pubkey[index]}
                  name={name}
                  picture={picture}
                  tags={bountyTags[index]}
                />
              </div>
            );
          })
        ) : (
          <div className="animate-pulse text-center p-6 font-medium text-dark-text dark:text-gray-2">
            Loading...
          </div>
        )}
        {bountyNotFound ? <BountiesNotFound /> : null}
      </div>
    </div>
  );
}

export default Profile;
