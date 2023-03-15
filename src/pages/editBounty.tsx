import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RelayPool } from "nostr-relaypool";

import SideBarMenu from "../components/menus/sidebarMenu/sidebarMenu";
import BountyEditor from "../components/bounty/bountyEditor/bountyEditor";
import MobileMenu from "../components/menus/mobileMenu/mobileMenu";

function EditBounty() {
  if (localStorage.getItem("relays") === null) {
    localStorage.setItem(
      "relays",
      '["wss://eden.nostr.land", "wss://nos.lol", "wss://relay.snort.social", "wss://brb.io"]'
    );
  }

  let relays = JSON.parse(localStorage.getItem("relays")!);
  let params = useParams();
  let subFilter = [
    {
      ids: [`${params.id}`],
      kinds: [30023],
    },
  ];

  let [oldEvent, setOldEvent] = useState<any>({});

  useEffect(() => {
    let relayPool = new RelayPool(relays);

    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });

    relayPool.subscribe(subFilter, relays, (event, isAfterEose, relayURL) => {
      setOldEvent(event);
    });

    setTimeout(() => {
      relayPool.close().then(() => {
        console.log("connection closed");
      });
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
      <div className="p-3 h-screen overflow-y-scroll basis-9/12 space-y-9 lg:px-10 sm:h-screen px-3 dark:bg-background-dark-mode">
        <BountyEditor oldEvent={oldEvent} />
      </div>
    </div>
  );
}

export default EditBounty;
