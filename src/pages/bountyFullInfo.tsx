import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { RelayPool } from "nostr-relaypool";
import { convertTimestamp, getMetaData } from "../utils";

import BountyLargeInfor from "../components/bounty/bountyLargeInfo/bountyLargeInfo";
import SideBarMenu from "../components/sidebarMenu/sidebarMenu";

function BountyInfo() {
  let defaultRelays = JSON.parse(localStorage.getItem("relays")!);
  const params: any = useParams();
  const [content, setContent] = useState<any>({});
  const [pubKey, setPubkey] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const [addedReward, setAddedReward] = useState<any>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let relays = defaultRelays;
    let subFilterContent: { ids: string }[] = [
      {
        // @ts-ignore
        ids: [params.id],
        kind: [30023],
      },
    ];

    let subFilterAddedReward = [
      {
        "#e": [params.id],
        "#t": ["bounty-added-reward"],
        kind: 1,
      },
    ];
    let arr_status: string[] = [];

    let relayPool = new RelayPool(relays);

    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });

    //subscribe for content
    relayPool.subscribe(
      // @ts-ignore
      subFilterContent,
      relays,
      (event, isAfterEose, relayURL) => {
        let parseDate = parseInt(event.tags[3][1]);
        let date = convertTimestamp(parseDate);

        getMetaData(event.pubkey)
          .then((response) => response.json())
          .then((data) => {
            let parseContent = JSON.parse(data.content);
            setName(parseContent.display_name);
            setProfilePic(parseContent.picture);
          });

        setContent({
          title: event.tags[1][1],
          content: event.content,
          reward: event.tags[2][1],
          publishedAt: date,
        });

        setPubkey(event.pubkey);

        // suscrbibe for bounty status
        relayPool.subscribe(
          [
            {
              authors: [event.pubkey],
              "#e": [params.id],
              "#t": ["bounty-reply"],
            },
          ],
          relays,
          (event, isAfterEose, relayURL) => {
            arr_status.push(event.content);
            setStatus(arr_status[0]);
          }
        );
      }
    );

    //subscribe for bounty-added-reward
    relayPool.subscribe(
      subFilterAddedReward,
      relays,
      (event, isAfterEose, relayURL) => {
        let data = {
          posterPubkey: event.pubkey,
          amount: event.content,
        };
        setAddedReward((arr: string[]) => [...arr, data]);
      }
    );

    setTimeout(() => {
      relayPool.close().then(() => {
        console.log("connection closed");
      });
    }, 20000);
  }, []);

  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12">
        <SideBarMenu />
      </div>
      <div className="p-3 h-screen overflow-y-scroll basis-9/12 lg:px-10 sm:h-screen px-1 dark:bg-background-dark-mode">
        <BountyLargeInfor
          content={content}
          pubkey={pubKey}
          status={status}
          id={params.id}
          addedReward={addedReward}
          name={name}
          profilePic={profilePic}
        />
      </div>
    </div>
  );
}

export default BountyInfo;
