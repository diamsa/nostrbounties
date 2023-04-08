import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import { RelayPool } from "nostr-relaypool";
import { convertTimestamp, getMetaData, decodeNpubMention } from "../utils";
import { defaultRelaysToPublish, defaultRelays } from "../const";

import BountyLargeInfoOpen from "../components/bounty/bountyLargeInfo/bountyLargeInfoOpen";
import BountyLargeInfor from "../components/bounty/bountyLargeInfo/bountyLargeInfo";
import SideBarMenu from "../components/menus/sidebarMenu/sidebarMenu";
import MobileMenu from "../components/menus/mobileMenu/mobileMenu";
import { nip19 } from "nostr-tools";

type event = {
  Dtag: string;
  content: string;
  id: string;
  name: string;
  pledged: any[];
  profilePic: string;
  pubkey: string;
  publishedAt: string;
  reward: number;
  status: string;
  title: string;
  bountyHunterMetaData: {
    name: string;
    profilePic: string;
    pubkey: string;
    lnAddress: string | null;
  };
  applications: {
    pubkey: string;
    content: string;
    id: string;
    createdAt: number;
    links: { github: string; personalWebsite: string };
  }[];
};

function BountyInfo() {
  const params: any = useParams<{ id: string }>();
  let naddrData = nip19.decode(params.id);
  let [eventData, setEventData] = useState<event>();
  let [dataLoaded, setDataLoaded] = useState(false);
  let [updateValues, setUpdateValues] = useState(false);

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

    let relayPool = new RelayPool(defaultRelays);

    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });

    //subscribe for content
    relayPool.subscribe(
      subFilterContent,
      defaultRelaysToPublish,
      (event, isAfterEose, relayURL) => {
        if (event.kind === 30023) {
          //@ts-ignore
          let ev: event = {};
          let parseDate = parseInt(event.tags[3][1]);
          let date = convertTimestamp(parseDate);
          let tags_arr: string[] = [];

          getMetaData(event.pubkey)
            .then((response) => {
              if (response.status !== 200) ev.name = "";
              ev.profilePic = "";
              return response.json();
            })
            .then((data) => {
              let isNotEmptyString = data.content !== "";
              if (isNotEmptyString) {
                let parseContent = JSON.parse(data.content);
                ev.name = parseContent.name;
                ev.profilePic = parseContent.picture;
              } else {
                ev.name = "";
                ev.profilePic = "";
              }
            });

          event.tags.map((item) => {
            if (item[0] === "rootId") {
              tags_arr.push(item[1]);
            }
            if (item[0] === "d") {
              ev.Dtag = item[1];
            }
          });

          let subFilterAddedReward = [
            {
              "#a": [
                // @ts-ignore
                `30023:${naddrData.data.pubkey}:${naddrData.data.identifier}`,
              ],
              "#t": ["bounty-added-reward"],
              kinds: [1],
            },
          ];
          //subscribe for bounty-added-reward
          relayPool.subscribe(
            subFilterAddedReward,
            defaultRelays,
            (event, isAfterEose, relayURL) => {
              console.log(event);
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
                compatAmount = rewardTag ? rewardTag[1] : "0";
              } else {
                compatNote = "";
                compatAmount = event.content;
              }
              getMetaData(event.pubkey)
                .then((response) => {
                  if (response.status === 404) {
                    ev.pledged = [
                      {
                        name: "",
                        profilePic: "",
                        amount: compatAmount,
                        note: compatNote,
                        pubkey: event.pubkey,
                      },
                      ...ev.pledged,
                    ];
                  }
                  return response.json();
                })
                .then((data) => {
                  let parseContent = JSON.parse(data.content);
                  ev.pledged = [
                    {
                      name: parseContent.name,
                      profilePic: parseContent.picture,
                      amount: compatAmount,
                      note: compatNote,
                      pubkey: event.pubkey,
                    },
                    ...ev.pledged,
                  ];
                });
            }
          );

          let subFilterStatus = [
            {
              // @ts-ignore
              "#d": [naddrData.data.identifier],
              "#t": ["bounty-status"],
              kinds: [1],
              limit: 1,
            },
          ];
          // suscrbibe for bounty status
          relayPool.subscribe(
            subFilterStatus,
            defaultRelays,
            (event, isAfterEose, relayURL) => {
              let isInprogress = event.tags[1][1] === "in progress";
              let isPaid = event.tags[1][1] === "paid";

              if (isInprogress || isPaid) {
                let bountyHunterNpub = decodeNpubMention(event.content);
                let bountyHunterPubkey = nip19.decode(bountyHunterNpub![0]);
                // @ts-ignore
                getMetaData(bountyHunterPubkey.data)
                  .then((response) => {
                    if (response.status !== 200)
                      ev.bountyHunterMetaData = {
                        name: "",
                        profilePic: "",
                        //@ts-ignore
                        pubkey: bountyHunterPubkey.data,
                        lnAddress: null,
                      };
                    return response.json();
                  })
                  .then((data) => {
                    let isNotEmptyString = data.content !== "";

                    if (isNotEmptyString) {
                      let parseContent = JSON.parse(data.content);
                      let LNAddreses = "lud06" || "lud16";

                      let hasLUD06orLUD16 =
                        parseContent.hasOwnProperty(LNAddreses);

                      if (hasLUD06orLUD16) {
                        let hasLUD06 = parseContent.lud06 !== "";
                        let hasLUD16 = parseContent.lud16 !== "";

                        if (hasLUD06) {
                          ev.bountyHunterMetaData = {
                            name: parseContent.name,
                            profilePic: parseContent.picture,
                            // @ts-ignore
                            pubkey: bountyHunterPubkey.data,
                            lnAddress: parseContent.lud06,
                          };
                        } else if (hasLUD16) {
                          ev.bountyHunterMetaData = {
                            name: parseContent.name,
                            profilePic: parseContent.picture,
                            // @ts-ignore
                            pubkey: bountyHunterPubkey.data,
                            lnAddress: parseContent.lud16,
                          };
                        } else {
                          ev.bountyHunterMetaData = {
                            name: parseContent.name,
                            profilePic: parseContent.picture,
                            // @ts-ignore
                            pubkey: bountyHunterPubkey.data,
                            lnAddress: null,
                          };
                        }
                      } else {
                        ev.bountyHunterMetaData = {
                          name: parseContent.name,
                          profilePic: parseContent.picture,
                          // @ts-ignore
                          pubkey: bountyHunterPubkey.data,
                          lnAddress: null,
                        };
                      }
                    } else {
                      ev.bountyHunterMetaData = {
                        name: "",
                        profilePic: "",
                        // @ts-ignore
                        pubkey: bountyHunterPubkey.data,
                        lnAddress: null,
                      };
                    }
                  });
                ev.status = event.tags[1][1];
              }
              ev.status = event.tags[1][1];
            }
          );

          let subFilterApplications = [
            {
              // @ts-ignore
              "#d": [naddrData.data.identifier],
              kinds: [1],
              "#t": ["bounty-application"],
            },
          ];
          // subscribe for bounty applications
          relayPool.subscribe(
            subFilterApplications,
            defaultRelays,
            (event, isAfterEose, relayURL) => {
              ev.applications = [
                {
                  pubkey: event.pubkey,
                  content: event.content,
                  id: event.id,
                  createdAt: event.created_at,
                  links: {
                    github: event.tags[2][1],
                    personalWebsite: event.tags[3][1],
                  },
                },
                ...ev.applications,
              ];
            }
          );

          if (!ev.hasOwnProperty("status")) {
            ev.status = "";
          }

          ev.pledged = [];
          ev.applications = [];
          ev.title = event.tags[1][1];
          ev.content = event.content;
          ev.reward = parseInt(event.tags[2][1]);
          ev.publishedAt = date;
          ev.pubkey = event.pubkey;
          ev.id = event.id;
          console.log(ev)
          setEventData(ev);
        }
      }
    );

    setTimeout(() => {
      relayPool.close().then(() => {
        console.log("connection closed");
      });
    }, 15000);

    setTimeout(() => {
      setDataLoaded(true);
    }, 2000);
  }, [updateValues]);

  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12 sm:hidden">
        <SideBarMenu />
      </div>
      <div className="basis-12/12 lg:hidden md:hidden">
        <MobileMenu />
      </div>

      <div className="p-3 h-screen overflow-y-scroll basis-9/12 lg:px-10 sm:h-screen sm:mb-24 px-1 dark:bg-background-dark-mode">
        {dataLoaded ? (
          <div>
            {eventData?.status === "" ? (
              <BountyLargeInfoOpen
                ev={eventData}
                updateValues={setUpdateValues}
                dataLoaded={setDataLoaded}
              />
            ) : (
              <BountyLargeInfor
                ev={eventData}
                updateValues={setUpdateValues}
                dataLoaded={setDataLoaded}
              />
            )}
          </div>
        ) : (
          <div className="animate-pulse text-center p-6 font-medium text-dark-text dark:text-gray-2">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}

export default BountyInfo;
