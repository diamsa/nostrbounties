import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { RelayPool, Author } from "nostr-relaypool";
import { convertTimestamp, getMetaData } from "../utils";
import { defaultRelaysToPublish, defaultRelays } from "../const";

import BountyLargeInfor from "../components/bounty/bountyLargeInfo/bountyLargeInfo";
import SideBarMenu from "../components/menus/sidebarMenu/sidebarMenu";
import MobileMenu from "../components/menus/mobileMenu/mobileMenu";
import { nip19 } from "nostr-tools";

type addToReward = {
  posterPubkey: string;
  amount: string;
  note: string;
  name: string | undefined;
  picture: string | undefined;
};

function BountyInfo() {
  const params: any = useParams<{ id: string }>();
  let naddrData = nip19.decode(params.id);
  const [content, setContent] = useState<any>({});
  const [pubKey, setPubkey] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const [addedReward, setAddedReward] = useState<addToReward[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [totalReward, setTotalReward] = useState(0);
  const [rootId, setRootId] = useState<string>("");
  const [dTag, setDTag] = useState<string>("");

  useEffect(() => {
    let subFilterContent = [
      {
        // @ts-ignore
        "#d": [naddrData.data.identifier],
        kind: [30023],
        // @ts-ignore
        authors: [naddrData.data.pubkey],
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
          if (item[0] === "d") {
            setDTag(item[1]);
          }
        });

        setPubkey(event.pubkey);
        setEventId(event.id);
        setRootId(tags_arr.length === 0 ? "" : tags_arr[0]);

        //subscribe for bounty-added-reward
        relayPool.subscribe(
          [
            {
              "#a": [
                // @ts-ignore
                `30023:${naddrData.data.pubkey}:${naddrData.data.identifier}`,
              ],
              "#t": ["bounty-added-reward"],
            },
          ],
          defaultRelays,
          (event, isAfterEose, relayURL) => {
            let compatAmount: string;
            let compatNote: string;
            // Get the reward tag from the list of tags
            // @ts-ignore
            let rewardTag: Array | undefined = event.tags.find(
              (elem) => elem[0] === "reward"
            );

            // Conditionally handle older events with amount in the content field
            if (event.content === "" || isNaN(Number(event.content))) {
              compatNote = event.content;
              compatAmount = rewardTag ? rewardTag[1] : "";
            } else {
              compatNote = "";
              compatAmount = event.content;
            }
            const relayPoolAuthor = new RelayPool();
            const author = new Author(
              relayPoolAuthor,
              defaultRelays,
              event.pubkey
            );

            let data = {
              posterPubkey: event.pubkey,
              amount: compatAmount,
              note: compatNote,
              name: undefined,
              picture: undefined,
            };

            author.metaData((e) => {
              let authorJSON = JSON.parse(e.content);
              if (authorJSON.displayName) {
                data.name = authorJSON.displayName;
              }
              if (authorJSON.picture) {
                data.picture = authorJSON.picture;
              }
            }, 100);

            setTotalReward((total) => total + parseInt(compatAmount));

            setAddedReward((arr: addToReward[]) => [...arr, data]);
          }
        );

        // suscrbibe for bounty status
        relayPool.subscribe(
          [
            {
              authors: [event.pubkey],

              "#a": [
                // @ts-ignore
                `30023:${naddrData.data.pubkey}:${naddrData.data.identifier}`,
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
          id={eventId}
          addedReward={addedReward}
          name={name}
          profilePic={profilePic}
          totalReward={totalReward}
          rootId={rootId}
          dTag={dTag}
        />
      </div>
    </div>
  );
}

export default BountyInfo;
