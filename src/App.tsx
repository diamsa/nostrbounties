//components
import Header from "./components/header/header";
import BountyCard from "./components/bounty/bountyCardShortInfo/bountyCardShortInfo";
import SideBarMenu from "./components/sidebarMenu/sidebarMenu";
import BountiesNotFound from "./components/errors/bountiesNotFound";

//functions
import { useState, useEffect } from "react";
import { convertTimestamp, getMetaData } from "./utils";
import { RelayPool } from "nostr-relaypool";
import { bountyContent } from "./interfaces";

function App() {
  const [titles, setTitles] = useState<string[]>([]);
  const [rewards, setRewards] = useState<string[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [profilePic, setProfilePic] = useState<string[]>([]);
  const [pubkeys, setPubkeys] = useState<string[]>([]);
  const [creationDate, setCreationDate] = useState<string[]>([]);
  const [bountyNotFound, setBountyNotFound] = useState(false);
  const [iterator, setIterator] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState("loading");

  function loadMoreContent() {
    setIterator(iterator + 1);
    setLoading("loading");
  }

  if (localStorage.getItem("relays") === null) {
    localStorage.setItem(
      "relays",
      '["wss://eden.nostr.land", "wss://nos.lol", "wss://relay.snort.social"]'
    );
  }

  let defaultRelays = JSON.parse(localStorage.getItem("relays")!);

  useEffect(() => {
    let relays = defaultRelays;
    let arr_titles: string[] = [];
    let arr_rewards: string[] = [];
    let arr_names: string[] = [];
    let arr_profilePic: string[] = [];
    let arr_pubkeys: string[] = [];
    let arr_ids: string[] = [];
    let arr_postDated: string[] = [];
    let subFilter = [
      {
        //"#t": ["bounty"],
        kinds: [30023],

      },
    ];

    let relayPool = new RelayPool(relays);

    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });

    relayPool.subscribe(subFilter, relays, (event, isAfterEose, relayURL) => {
      // remember to parse the content
      setDataLoaded(true);

      let parseDate = parseInt(event.tags[3][1]);
      let date = convertTimestamp(parseDate);

      let bountyTitle = event.tags[1][1];
      let bountyReward = event.tags[2][1];
      let bountyDatePosted = date;

      arr_pubkeys.push(event.pubkey);
      arr_titles.push(bountyTitle);
      arr_rewards.push(bountyReward);
      arr_ids.push(event.id);
      arr_postDated.push(bountyDatePosted);

      getMetaData(event.pubkey)
        .then((response) => response.json())
        .then((data) => {
          let metaData = JSON.parse(data.content);
          arr_names.push(metaData.display_name);
          arr_profilePic.push(metaData.picture);
          console.log(arr_names);
          setNames(arr_names);
          setProfilePic(arr_profilePic);
        });

      setIds(arr_ids);
      setCreationDate(arr_postDated);
      setTitles(arr_titles);
      setRewards(arr_rewards);
      setPubkeys(arr_pubkeys);
      // @ts-ignore

      console.log(arr_ids);
    });
  }, []);

  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12">
        <SideBarMenu />
      </div>
      <div className=" lg:h-screen  overflow-y-scroll  basis-9/12 px-10 sm:h-screen sm:px-3 dark:bg-background-dark-mode">
        {dataLoaded ? (
          titles.map((item, index) => {
            return (
              <div>
                <BountyCard
                  title={titles[index]}
                  reward={rewards[index]}
                  id={ids[index]}
                  dates={creationDate[index]}
                  pubkeys={pubkeys[index]}
                  names={names[index]}
                  profilePic={profilePic[index]}
                />
              </div>
            );
          })
        ) : (
          <div className="animate-pulse text-gray-2">Loading</div>
        )}

        {bountyNotFound ? <BountiesNotFound /> : null}
        <button onClick={loadMoreContent}>
          {loading === "loading" ? "wait until it load" : "load more content"}
        </button>
      </div>
    </div>
  );
}

export default App;
