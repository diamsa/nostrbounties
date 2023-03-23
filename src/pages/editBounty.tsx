import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RelayPool } from "nostr-relaypool";
import { defaultRelaysToPublish } from "../const";
import { nip19 } from "nostr-tools";

import SideBarMenu from "../components/menus/sidebarMenu/sidebarMenu";
import BountyEditor from "../components/bounty/bountyEditor/bountyEditor";
import MobileMenu from "../components/menus/mobileMenu/mobileMenu";

function EditBounty() {
  let relays = defaultRelaysToPublish;
  let params = useParams();
  let naddrData = nip19.decode(params.id!);
  let subFilter = [
    {
      // @ts-ignore
      "#d": [`${naddrData.data.identifier}`],
      kinds: [30023],
    },
  ];

  let [oldEvent, setOldEvent] = useState<any>({});
  let [loaded, setLoaded] = useState(false);

  
  useEffect(() => {
    let relayPool = new RelayPool(relays);

    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });

    relayPool.subscribe(subFilter, relays, (event, isAfterEose, relayURL) => {
      let tags_arr: string[] = [];
      event.tags.map((item) => {
        if (item[0] === "rootId") {
          tags_arr.push(item[1]);
        }
      });
      if (tags_arr.length === 0) {
        event.tags.push(["rootId", event.id]);
      }
      setOldEvent({
        id: event.id,
        pubkey: event.pubkey,
        created_at: event.created_at,
        kind: event.kind,
        tags: event.tags,
        content: event.content,
        sig: event.sig,
      });

      setLoaded(true);
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
      <div className="p-3 h-screen overflow-y-scroll basis-9/12 space-y-9 lg:px-10 sm:h-screen px-3 sm:mb-24 dark:bg-background-dark-mode">
        {loaded ? <BountyEditor oldEvent={oldEvent} /> : null}
      </div>
    </div>
  );
}

export default EditBounty;
