//components
import Header from "./components/header/header";
import BountyCard from "./components/bounty/bountyCardShortInfo/bountyCardShortInfo";

//functions
import { useState, useEffect } from "react";
import { convertTimestamp } from "./utils";
import { RelayPool } from "nostr-relaypool";
import defaultRelays from "./consts";
import { bountyContent } from "./interfaces";

function App() {
  const [content, setContent] = useState<bountyContent[]>([]);
  const [test, setTest] = useState([]);
  const [ids, setIds] = useState<string[]>([]);
  const [pubkeys, setPubkeys] = useState<string[]>([]);
  const [creationDate, setCreationDate] = useState<string[]>([]);
  const [bountyNotFound, setBountyNotFound] = useState(false);
  const [iterator, setIterator] = useState(0);
  const [loading, setLoading] = useState("loading");

  function loadMoreContent() {
    setIterator(iterator + 1);
    setLoading("loading");
  }

  useEffect(() => {
    let relays = defaultRelays;
    let arr_content: bountyContent[] = [];
    let arr_names: string[] = [];
    let arr_pubkeys: string[] = [];
    let arr_ids: string[] = [];
    let arr_postDated: string[] = [];
    let subFilter = [
      {
        "#t": ["bounty"],
        kinds: [789],
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
      let date = convertTimestamp(event.created_at);
      let parsedContent = JSON.parse(event.content);

      arr_content.push(parsedContent);
      arr_pubkeys.push(event.pubkey);
      arr_ids.push(event.id);
      arr_postDated.push(date);

      setContent(arr_content);
      setIds(arr_ids);
      setCreationDate(arr_postDated);
      setPubkeys(arr_pubkeys);
      setTest(event.content);
    });

    setTimeout(() => {
      if (arr_content.length === 0) setBountyNotFound(true);
      relayPool.close().then(() => {
        console.log("connection closed");
      });
      setLoading("not loading");
    }, 10000);
  }, []);

  return (
    <div className="max-w-7xl lg:px-40 sm:px-10">
      <div>
        <Header />
      </div>
      <div>
        <BountyCard content={content} ids={ids} dates={creationDate} pubkeys={pubkeys} />
        {bountyNotFound ? <p>We didn't find any bounty, try with differente relays</p> : null}
        <button onClick={loadMoreContent}>{loading === "loading" ? "wait until it load" : "load more content"}</button>
      </div>
    </div>
  );
}

export default App;
