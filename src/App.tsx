//components
import Header from "./components/header/header";
import BountyCard from "./components/bounty/bountyCardShortInfo/bountyCardShortInfo";
import SideBarMenu from "./components/sidebarMenu/sidebarMenu";
import BountiesNotFound from "./components/errors/bountiesNotFound";

//functions
import { useState, useEffect } from "react";
import { convertTimestamp, getMetaData } from "./utils";
import { RelayPool } from "nostr-relaypool";

function App() {
  const [titles, setTitles] = useState<string[]>([]);
  const [rewards, setRewards] = useState<string[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  

  const [pubkeys, setPubkeys] = useState<string[]>([]);
  const [creationDate, setCreationDate] = useState<string[]>([]);
  const [bountyNotFound, setBountyNotFound] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
 

 
  if (localStorage.getItem("relays") === null) {
    localStorage.setItem(
      "relays",
      '["wss://eden.nostr.land", "wss://nos.lol", "wss://relay.snort.social"]'
    );
  }

  let defaultRelays = JSON.parse(localStorage.getItem("relays")!);

  useEffect(() => {
    let relays = defaultRelays;

    let subFilter = [
      {
        //"#t": ["bounty"],
        kinds: [30023],
        limit: 100,
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


      setIds((arr) => [...arr, event.id]);
      setCreationDate((arr) => [...arr, bountyDatePosted]);
      setTitles((arr) => [...arr, bountyTitle]);
      setRewards((arr) => [...arr, bountyReward]);
      setPubkeys((arr) => [...arr, event.pubkey]);
    });
  }, []);

  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12">
        <SideBarMenu />
      </div>
      <div className=" lg:h-screen  overflow-y-scroll  basis-9/12 px-10 sm:h-screen sm:px-1 dark:bg-background-dark-mode">
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
                
                />
              </div>
            );
          })
        ) : (
          <div className="animate-pulse text-center p-6 font-medium text-dark-text dark:text-gray-2">Loading...</div>
        )}

        {ids.length === 0 ? <BountiesNotFound /> : null}
        
      </div>
    </div>
  );
}

export default App;
