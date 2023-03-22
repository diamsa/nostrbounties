import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { RelayPool } from "nostr-relaypool";
import { convertTimestamp, getMetaData } from "../utils";
import { defaultRelaysToPublish, defaultRelays } from "../const";

import BountyLargeInfor from "../components/bounty/bountyLargeInfo/bountyLargeInfo";
import SideBarMenu from "../components/menus/sidebarMenu/sidebarMenu";
import MobileMenu from "../components/menus/mobileMenu/mobileMenu";
import { nip19 } from "nostr-tools";

type addToReward = {
  posterPubkey: string;
  amount: string;
};

function BountyInfo() {
  const params: any = useParams<{ id: string }>();
  let naddrData = nip19.decode(params.id);
  const [content, setContent] = useState<any>({});
  const [pubKey, setPubkey] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const [addedReward, setAddedReward] = useState<addToReward[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [totalReward, setTotalReward] = useState(0);
  const [rootId, setRootId] = useState<string>("");
  const [dTag, setDTag] = useState<string>('')

  useEffect(() => {
    let subFilterContent: { ids: string }[] = [
      {
        // @ts-ignore
        ids: [naddrData.data.identifier],
        kind: [30023],
      },
    ];

    let arr_status: string[] = [];

    let relayPool = new RelayPool(defaultRelays);

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
      defaultRelaysToPublish,
      (event, isAfterEose, relayURL) => {
        let parseDate = parseInt(event.tags[3][1]);
        let date = convertTimestamp(parseDate);
        let tags_arr: string[] = [];

        getMetaData(event.pubkey)
          .then((response) => response.json())
          .then((data) => {
            let parseContent = JSON.parse(data.content);
            setName(parseContent.name);
            setProfilePic(parseContent.picture);
          });

        setContent({
          title: event.tags[1][1],
          content: event.content,
          reward: parseInt(event.tags[2][1]),
          publishedAt: date,
        });

        event.tags.map((item) => {
          if (item[0] === "rootId") {
            tags_arr.push(item[1]);
          }
          if(item[0] === "d"){
            setDTag(item[1])
          }
        });

        setPubkey(event.pubkey);
        
        setRootId(tags_arr.length === 0 ? "" : tags_arr[0]);
        console.log(event.tags);

        //subscribe for bounty-added-reward
        relayPool.subscribe(
          [
            {
              "#e": [
                tags_arr.length === 0
                  ? // @ts-ignore
                    naddrData.data.identifier
                  : tags_arr[0],
              ],
              "#t": ["bounty-added-reward"],
            },
          ],
          defaultRelays,
          (event, isAfterEose, relayURL) => {
            let data = {
              posterPubkey: event.pubkey,
              amount: event.content,
            };
            setTotalReward((item) => item + parseInt(event.content));

            setAddedReward((arr: addToReward[]) => [...arr, data]);
          }
        );

        // suscrbibe for bounty status
        relayPool.subscribe(
          [
            {
              authors: [event.pubkey],
              "#e": [
                tags_arr.length === 0
                  ? // @ts-ignore
                    naddrData.data.identifier
                  : tags_arr[0],
              ],
              "#t": ["bounty-reply"],
            },
          ],
          defaultRelays,
          (event, isAfterEose, relayURL) => {
            arr_status.push(event.content);
            setStatus(arr_status[0]);
          }
        );
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
      <div className="basis-3/12 sm:hidden">
        <SideBarMenu />
      </div>
      <div className="basis-3/12 lg:hidden md:hidden">
        <MobileMenu />
      </div>
      <div className="p-3 h-screen overflow-y-scroll basis-9/12 lg:px-10 sm:h-screen sm:mb-24 px-1 dark:bg-background-dark-mode">
        <BountyLargeInfor
          content={content}
          pubkey={pubKey}
          status={status}
          // @ts-ignore
          id={naddrData.data.identifier}
          addedReward={addedReward}
          name={name}
          profilePic={profilePic}
          totalReward={totalReward}
          rootId={rootId}
          dTag = {dTag}
        />
      </div>
    </div>
  );
}

export default BountyInfo;
