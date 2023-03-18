//components
import BountyCard from "../../components/bounty/bountyCardShortInfo/bountyCardShortInfo";
import SideBarMenu from "../../components/menus/sidebarMenu/sidebarMenu";
import BountiesNotFound from "../../components/errors/bountiesNotFound";
import MobileMenu from "../../components/menus/mobileMenu/mobileMenu";

//functions
import { useState, useEffect } from "react";
import { convertTimestamp, formatReward } from "../../utils";
import { RelayPool } from "nostr-relaypool";
import { useNavigate } from "react-router-dom";
import { defaultRelaysToPublish, defaultRelays } from "../../const";

function MarketingBounties() {
  let navigate = useNavigate()
  let [titles, setTitles] = useState<string[]>([]);
  let [rewards, setRewards] = useState<string[]>([]);
  let [ids, setIds] = useState<string[]>([]);
  let [bountyTags, setBountyTags] = useState<string[][]>([]);

  let [pubkeys, setPubkeys] = useState<string[]>([]);
  let [names, setNames] = useState<string[]>([]);
  let [pictures, setPictures] = useState<string[]>([]);
  let [creationDate, setCreationDate] = useState<string[]>([]);
  let [bountyNotFound, setBountyNotFound] = useState(false);
  let [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    let relays = defaultRelaysToPublish;
    let userMetaDataRelays = defaultRelays;

    let subFilter = [
      {
        kinds: [30023],
        "#t": ["marketing-bounty"],
      },
    ];

    let checkBountyExist = [];

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
      let bountyReward = formatReward(event.tags[2][1]);
      let bountyDatePosted = date;

      setBountyTags((arr) => [tags_arr, ...arr]);
      setIds((arr) => [event.id, ...arr]);
      setCreationDate((arr) => [bountyDatePosted, ...arr]);
      setTitles((arr) => [bountyTitle, ...arr]);
      setRewards((arr) => [bountyReward, ...arr]);
      setPubkeys((arr) => [event.pubkey, ...arr]);

      checkBountyExist.push(event.id);

      //subscribe metadata
      relayPool.subscribe(
        [
          {
            authors: [event.pubkey],
            kinds: [0],
          },
        ],
        userMetaDataRelays,
        (event, isAfterEose, relayURL) => {
          let data = JSON.parse(event.content);
          setNames((arr) => [data.name, ...arr]);
          setPictures((arr) => [data.picture, ...arr]);
        }
      );
    });

    setTimeout(() => {
      relayPool.close().then(() => {
        console.log("connection closed");
      });
      if (checkBountyExist.length === 0) setBountyNotFound(true);
    }, 40000);
  }, []);

  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12 sm:hidden">
        <SideBarMenu />
      </div>
      <div className="basis-3/12 lg:hidden md:hidden">
        <MobileMenu />
      </div>
      <div className="p-3 h-screen overflow-y-scroll no-scrollbar basis-9/12 lg:px-10 sm:h-screen px-0.5 dark:bg-background-dark-mode">
        <div className="overflow-x-scroll flex no-scrollbar ml-5 mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/design")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/writing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text whitespace-nowrap rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Writing and translation
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/development")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Development
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/marketing")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text bg-gray-1 rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-status-paid-text dark:text-dark-text dark:border-gray-600"
          >
            Marketing
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/debugging")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Debugging
          </button>
          <button
            type="button"
            onClick={() => navigate("/tag/cybersecurity")}
            className="py-1.5 px-4 mr-2 mb-2 text-sm font-medium text-dark-text rounded-full border border-gray-200 hover:bg-gray-100 dark:focus:ring-gray-700 dark:bg-current-tab dark:text-dark-text dark:border-gray-600"
          >
            Cybersecurity
          </button>
        </div>

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
                  name={names[index]}
                  picture={pictures[index]}
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

export default MarketingBounties;
