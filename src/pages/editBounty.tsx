import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RelayPool } from "nostr-relaypool";
import { convertTimestamp } from "../utils";

import SideBarMenu from "../components/sidebarMenu/sidebarMenu";

function EditBounty() {
  let relays = JSON.parse(localStorage.getItem("relays")!);
  let params = useParams();
  let subFilter = [
    {
      ids: [`${params.id}`],
    },
  ];

  let [content, setContent] = useState()

  useEffect(() => {

    let relayPool = new RelayPool(relays);

    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });

    relayPool.subscribe(subFilter, relays, (event, isAfterEose, relayURL) => {
    });

    setTimeout(() => {
      relayPool.close().then(() => {
        console.log("connection closed");
      });
    }, 40000);
  }, []);

  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12">
        <SideBarMenu />
      </div>
      <div className="p-3 h-screen overflow-y-scroll basis-9/12 lg:px-10 sm:h-screen px-0.5 dark:bg-background-dark-mode">
        <textarea name="edit" cols={60} rows={9} value={content}></textarea>
      </div>
    </div>
  );
}

export default EditBounty;
