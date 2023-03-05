import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/header/header";
import ProfileCard from "../components/profileCard/profileCard";
import BountyCard from "../components/bounty/bountyCardShortInfo/bountyCardShortInfo";
import defaultRelays from "../consts";
import { RelayPool } from "nostr-relaypool";
import { convertTimestamp, getMetaData } from "../utils";
import { bountyContent } from "../interfaces";

function Profile() {
  const params = useParams();
  let [metaData, setMetada] = useState({});
  let [content, setContent] = useState<any>([]);
  let [ids, setIds] = useState<string[]>([]);
  let [names, setNames] = useState<string[]>([]);
  let [profilePic, setProfilePic] = useState<string[]>([]);
  let [pubkey, setPubkeys] = useState<string[]>([]);
  let [creationDate, setCreationDate] = useState<string[]>([]);
  let [test, setTest] = useState();

  useEffect(() => {
    let relays = defaultRelays;
    let arr_content: bountyContent[] = [];
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
        getMetaData(event.pubkey)
          .then((response) => response.json())
          .then((data) => {
            let metaData = JSON.parse(data.content);
            arr_names.push(metaData.display_name);
            arr_profilePic.push(metaData.picture);

            setNames(arr_names);
            setProfilePic(arr_profilePic);
          });

        setContent(arr_content);
        setIds(arr_ids);
        setCreationDate(arr_postDated);
        setPubkeys(arr_pubkeys);
        // @ts-ignore
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
    <div className="max-w-7xl lg:px-40">
      <div>
        <Header />
      </div>

      <div>
        <ProfileCard metaData={metaData} />
        {ids.length === 0 ? (
          <div className="mx-4">
            <div
              className="flex p-4 mb-4 max-w-7xl lg:px-40 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Info</span>
              <div>Bounties for this user weren't found</div>
            </div>
          </div>
        ) : null}
        <BountyCard
          content={content}
          dates={creationDate}
          ids={ids}
          pubkeys={pubkey}
          names={names}
          profilePic={profilePic}
        />
      </div>

      <div></div>
    </div>
  );
}

export default Profile;
