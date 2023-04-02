import { useState, useEffect } from "react";
import { RelayPool } from "nostr-relaypool";
import { defaultRelaysToPublish, defaultRelays } from "../const";

import SideBarMenu from "../components/menus/sidebarMenu/sidebarMenu";
import NotificationCard from "../components/notifications/notificationBox";
import MobileMenu from "../components/menus/mobileMenu/mobileMenu";

type allBountyNotifications =
  | [number, string, string, string, string[]]
  | [number, string, string, string[]];

function Notifications() {
  let userPubkey = sessionStorage.getItem("pubkey");
  let subFilterContent = [
    {
      kinds: [30023],
      "#t": ["bounty"],
      authors: [userPubkey!],
    },
  ];

  let [sortedElements, setSortedElements] = useState<allBountyNotifications[]>(
    []
  );
  let [dataLoaded, setDataLoaded] = useState(false);
  let [allNotifications, setAllNotifications] = useState<
    allBountyNotifications[]
  >([]);

  useEffect(() => {
    let relayPool = new RelayPool(defaultRelays, { useEventCache: true });

    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });

    relayPool.subscribe(
      subFilterContent,
      defaultRelaysToPublish,
      (event, afterEose, relayURL) => {
        let bountyDtag = event.tags[4][1];
        let bountyTitle = event.tags[1][1];
        let bountyMetaData = [
          `30023:${event.pubkey}:${bountyDtag}`,
          bountyTitle,
        ];
        let subFilterAddedReward = [
          {
            "#t": ["bounty-added-reward"],
            "#a": [`30023:${event.pubkey}:${bountyDtag}`],
            kinds: [1],
          },
        ];

        relayPool.subscribe(
          subFilterAddedReward,
          defaultRelays,
          (event, isAfterEose, relayUrl) => {
            if (!parseInt(event.content)) {
              setAllNotifications((arr) => [
                ...arr,
                [
                  event.created_at,
                  event.pubkey,
                  "reward",
                  event.tags[1][1],
                  bountyMetaData,
                ],
              ]);
            } else {
              setAllNotifications((arr) => [
                ...arr,
                [
                  event.created_at,
                  event.pubkey,
                  "reward",
                  event.content,
                  bountyMetaData,
                ],
              ]);
            }
          },
          undefined,
          undefined,
          { unsubscribeOnEose: true }
        );

        let subFilterApplications = [
          {
            kinds: [1],
            "#d": [bountyDtag],
            "#t": ["bounty-application"],
          },
        ];

        relayPool.subscribe(
          subFilterApplications,
          defaultRelays,
          (event, isAfterEose, relayUrl) => {
            if (event.kind === 1) {
              setAllNotifications((arr) => [
                ...arr,
                [event.created_at, event.pubkey, "application", bountyMetaData],
              ]);
            }
          },
          undefined,
          undefined,
          { unsubscribeOnEose: true }
        ),
          undefined,
          undefined,
          { unsubscribeOnEose: true };
      }
    );

    setTimeout(() => {
      setDataLoaded(true);
    }, 2000);
  }, []);

  useEffect(() => {
    allNotifications.sort((a, b) => b[0] - a[0]);
    setSortedElements(allNotifications);
  }, [allNotifications]);

  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12 sm:hidden">
        <SideBarMenu />
      </div>
      <div className="basis-3/12 lg:hidden md:hidden">
        <MobileMenu />
      </div>
      <div className="p-3 h-screen overflow-y-scroll basis-9/12 lg:px-10 sm:h-screen sm:mb-24 px-2 dark:bg-background-dark-mode">
        {sortedElements.length >= 1 ? (
          <p className="block text-xl font-medium my-3 ml-2 text-gray-900 dark:text-gray-1">
            Your notifications:
          </p>
        ) : null}
        {dataLoaded
          ? sortedElements.map((item) => {
              return (
                <div>
                  <NotificationCard ev={item} />
                </div>
              );
            })
          : null}
        {sortedElements.length === 0 ? (
          <p className="block text-xl font-medium text-center my-3 ml-2 text-gray-900 dark:text-gray-1">
            You don't have notifications
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Notifications;
