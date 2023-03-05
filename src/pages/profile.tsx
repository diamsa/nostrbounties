import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/header/header";
import ProfileCard from "../components/profileCard/profileCard";
import { getPersonalRelays } from "../utils";
import BountyCard from "../components/bounty/bountyCardShortInfo/bountyCardShortInfo";
import defaultRelays from "../consts";
import { RelayPool } from "nostr-relaypool";
import { convertTimestamp } from "../utils";
import { bountyContent } from "../interfaces";

function Profile() {
  const params = useParams();
  let [metaData, setMetada] = useState({});
  let [content, setContent] = useState([]);
  let [ids, setIds] = useState<string[]>([]);
  let [pubkey, setPubkeys] = useState<string[]>([]);
  let [creationDate, setCreationDate] = useState<string[]>([]);
  let [test, setTest] = useState();

  useEffect(() => {
    let relays = defaultRelays;
    let arr_content:bountyContent[]= [];
    let arr_pubkeys:string[] = [];
    let arr_ids:string[] = [];
    let arr_postDated:string[] = [];
    let subFilterMetaData = [
      {
        authors: [`${params.id}`],
        kinds: [0],
      },
    ];
    let subFilterContent = [
      {
        authors: [`${params.id}`],
        "#t": ["bounty"],
      },
    ];

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
      }
    );

    setTimeout(() => {
      relayPool.close().then(() => {
        console.log("connection closed");
      });
    }, 10000);
  }, []);

  return (
    <div className="max-w-7xl lg:px-40 sm:px-10">
      <div>
        <Header />
      </div>

      <div>
        <ProfileCard metaData={metaData} />
        <BountyCard
          content={content}
          dates={creationDate}
          ids={ids}
          pubkeys={pubkey}
        />
      </div>

      <div></div>
    </div>
  );
}

export default Profile;
