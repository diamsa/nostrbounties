//components
import Header from "./components/header/header";
import BountyCard from "./components/bounty/bountyCardShortInfo/bountyCardShortInfo";
import SideBarMenu from "./components/sidebarMenu/sidebarMenu";
import BountiesNotFound from "./components/errors/bountiesNotFound";

//functions
import { useState, useEffect } from "react";
import { convertTimestamp } from "./utils";
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
        "#t": ["bounty"],
        kinds: [780],
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

    setTimeout(() => {
      relayPool.close().then(() => {
        console.log("connection closed");
      });
      if (titles.length === 0) setBountyNotFound(true);
    }, 40000);
  }, []);

  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12">
        <SideBarMenu />
      </div>
      <div className="p-3 h-screen overflow-y-scroll basis-9/12 lg:px-10 sm:h-screen px-0.5 dark:bg-background-dark-mode">
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
          <div className="animate-pulse text-center p-6 font-medium text-dark-text dark:text-gray-2">
            Loading...
          </div>
        )}

        {bountyNotFound ? <BountiesNotFound /> : null}
      </div>
    </div>
  );
}

export default App;
