import SideBarMenu from "../components/menus/sidebarMenu/sidebarMenu";
import { getRelayData } from "../utils";
import { useEffect, useState } from "react";
import { defaultRelays, defaultRelaysToPublish } from "../const";
import MobileMenu from "../components/menus/mobileMenu/mobileMenu";
import active from "../assets/status-active.svg";

function Relays() {
  let [relaysDefaultInfo, setRelaysDefaultInfo] = useState<string[]>([]);
  let [relaysDefaultPublish, setRelaysDefaultPublish] = useState<string[]>([]);

  function relayId(id: string) {
    if (id === "strfry default") {
      return "wss://nos.lol";
    }
    if (id === "ynxRIb8tKvoGsR3DkYtrH21vkxCmHTRmehq8zyQ5y7s") {
      return "wss://arnostr.permadao.io";
    }
    if (id === "damus.io ") {
      return "wss://relay.damus.io";
    }
    if (id === "nostr-pub1.southflorida.ninja") {
      return "wss://nostr-pub1.southflorida.ninja";
    }
  }

  useEffect(() => {
    defaultRelays.map((item) => {
      getRelayData(item).then((item) => {
        setRelaysDefaultInfo((arr) => [item, ...arr]);
      });
    });

    defaultRelaysToPublish.map((item) => {
      getRelayData(item).then((item) => {
        setRelaysDefaultPublish((arr) => [item, ...arr]);
      });
    });
  }, []);
  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12 sm:hidden">
        <SideBarMenu />
      </div>
      <div className="basis-3/12 lg:hidden md:hidden">
        <MobileMenu />
      </div>

      <div className="p-3 h-screen overflow-y-scroll basis-9/12 lg:px-10 sm:h-screen px-2 dark:bg-background-dark-mode">
        <div className="mx-5 flex justify-between">
          <p className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1">
            Default Relays
          </p>
        </div>
        <div className="grid-rows-2 grid-cols-2 grid sm:block">
          {relaysDefaultInfo.map((item: any) => {
            return (
              <div
                key={item.id}
                className="my-2 justify-between items-center shadow-md border border-gray-200 rounded-md hover:bg-sidebar-gray lg:mx-5 px-15  sm:flex-wrap px-5 py-3 mx-4 dark:bg-sidebar-bg dark:hover:bg-input-bg-dm"
              >
                <div className="flex justify-center mx-auto">
                  <img
                    className="w-7 h-5 cursor-pointer my-auto"
                    src={active}
                    alt="delete icon"
                  ></img>
                  <p className="text-base text-center whitespace-pre-wrap text-dark-text font-medium sm:text-sm dark:text-gray-1">
                    {item.hasOwnProperty("id") ? item.id : relayId(item.name)}
                  </p>
                </div>

                <p className="text-sm text-center text-dark-text sm:text-xs dark:text-gray-1">
                  nips supported: {item.supported_nips.join(" ")}
                </p>
              </div>
            );
          })}
          {relaysDefaultPublish.map((item: any) => {
            return (
              <div
                key={item.id}
                className="my-2 justify-between items-center shadow-md border border-gray-200 rounded-md hover:bg-sidebar-gray lg:mx-5 px-15  sm:flex-wrap px-5 py-3 mx-4 dark:bg-sidebar-bg dark:hover:bg-input-bg-dm"
              >
                <div className="flex justify-center mx-auto">
                  <img
                    className="w-7 h-5 cursor-pointer my-auto"
                    src={active}
                    alt="delete icon"
                  ></img>
                  <p className="text-base text-center whitespace-pre-wrap text-dark-text font-medium sm:text-sm dark:text-gray-1">
                    {item.hasOwnProperty("id") ? item.id : relayId(item.name)}
                  </p>
                </div>

                <p className="text-sm text-center text-dark-text sm:text-xs dark:text-gray-1">
                  nips supported: {item.supported_nips.join(" ")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Relays;
