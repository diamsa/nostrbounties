import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCard from "../components/profileCard/profileCard";
import BountyCard from "../components/bounty/bountyCardShortInfo/bountyCardShortInfo";
import { RelayPool } from "nostr-relaypool";
import { convertTimestamp, getMetaData } from "../utils";
import { bountyContent } from "../interfaces";
import SideBarMenu from "../components/sidebarMenu/sidebarMenu";
import BountiesNotFound from "../components/errors/bountiesNotFound";

function Profile() {
  let defaultRelays = JSON.parse(localStorage.getItem("relays")!);
  const params = useParams();
  let [metaData, setMetada] = useState({});
  let [titles, setTitles] = useState<string[]>([]);
  let [rewards, setRewards] = useState<string[]>([]);
  let [ids, setIds] = useState<string[]>([]);
  let [names, setNames] = useState<string[]>([]);
  let [profilePic, setProfilePic] = useState<string[]>([]);
  let [pubkey, setPubkeys] = useState<string[]>([]);
  const [bountyNotFound, setBountyNotFound] = useState(false);
  let [creationDate, setCreationDate] = useState<string[]>([]);
  let [test, setTest] = useState();
  let relays = defaultRelays;
  let arr_titles: string[] = [];
  let arr_rewards: string[] = [];
  let arr_pubkeys: string[] = [];
  let arr_ids: string[] = [];
  let arr_names: string[] = [];
  let arr_profilePic: string[] = [];
  let arr_postDated: string[] = [];
  let subFilterMetaData = [
    {
      authors: [`${params.id}`],
      kinds: [0],
    },
  ];
  let subFilterContent = [
    {
      authors: [`${params.id}`],
      kinds: [30023],
      //"#t": ["bounty"],
    },
  ];
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
      relays,
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
      }
    );

    relayPool.subscribe(
      subFilterContent,
      relays,
      (event, isAfterEose, relayURL) => {
        let parseDate = parseInt(event.tags[3][1]);
        let date = convertTimestamp(parseDate);

        let bountyTitle = event.tags[1][1];
        let bountyReward = event.tags[2][1];
        let bountyDatePosted = date;

        arr_titles.push(bountyTitle);
        arr_rewards.push(bountyReward);
        arr_pubkeys.push(event.pubkey);
        arr_ids.push(event.id);
        arr_postDated.push(bountyDatePosted);
        getMetaData(event.pubkey)
          .then((response) => response.json())
          .then((data) => {
            let metaData = JSON.parse(data.content);
            arr_names.push(metaData.display_name);
            arr_profilePic.push(metaData.picture);

            setNames(arr_names);
            setProfilePic(arr_profilePic);
          });

        setTitles(arr_titles);
        setRewards(arr_rewards);
        setIds(arr_ids);
        setCreationDate(arr_postDated);
        setPubkeys(arr_pubkeys);
        // @ts-ignore
        setTest(event.content);
      }
    );

    setTimeout(() => {
      if (arr_postDated.length === 0) setBountyNotFound(true);
      relayPool.close().then(() => {
        console.log("connection closed");
      });
    }, 10000);
  }, []);

  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12">
        <SideBarMenu />
      </div>

      <div className="p-3 h-screen overflow-y-scroll basis-9/12 lg:px-10 sm:h-screen px-2 dark:bg-background-dark-mode">
        <ProfileCard metaData={metaData} />
        {bountyNotFound ? <BountiesNotFound /> : null}
        {titles.map((item, index) => {
          return (
            <div>
              <BountyCard
                title={titles[index]}
                reward={rewards[index]}
                id={ids[index]}
                dates={creationDate[index]}
                pubkeys={pubkey[index]}
                names={names[index]}
                profilePic={profilePic[index]}
              />
            </div>
          );
        })}
      </div>

      <div></div>
    </div>
  );
}

export default Profile;
