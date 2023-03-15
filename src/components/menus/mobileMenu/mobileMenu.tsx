import { isDarkTheme } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import homeIcon from "../../../assets/home-icon-dm.svg";
import addIcon from "../../../assets/add-icon-dm.svg";
import profileIcon from "../../../assets/profile-icon-dm.svg";
import homeIconLg from "../../../assets/home-icon-lg.svg";
import createIconLg from "../../../assets/create-icon-lg.svg";
import profileIconLg from "../../../assets/profile-icon-lg.svg";
import deleteIcon from "../../../assets/delete-icon.svg";
import closeIconLg from "../../../assets/close-icon-lg.svg";
import closeIconDm from "../../../assets/close-icon-dm.svg";
import relayIconLg from "../../../assets/server-icon-lg.svg"
import relayIconDm from "../../../assets/server-icon-dm.svg"

function MobileMenu() {
  let navigate = useNavigate();
  let [isActive, setIsActive] = useState(false);
  const defaultRelays = JSON.parse(localStorage.getItem("relays")!);
  const [relays, setRelays] = useState(defaultRelays);
  const [relay, setRelay] = useState<string>("");

  function deleteRelay(relayName: string) {
    if (relays.length === 1) {
      console.log("you cant delete this relay");
    } else {
      let newRelays = relays.filter((item: string) => {
        return item !== relayName;
      });

      setRelays(newRelays);
      let newRelaysLocalStg = JSON.stringify(newRelays);
      localStorage.setItem("relays", newRelaysLocalStg);
    }
  }

  function addRelay(relayName: string | undefined) {
    if (relayName === "" || !relayName?.includes("wss://")) {
      console.log("No valid relay");
    } else {
      setRelays([...relays, relayName]);
      let newRelay = JSON.stringify([...relays, relayName]);
      localStorage.setItem("relays", newRelay);
    }
  }

  const handleNewRelay = (event: { target: { value: string } }) => {
    setRelay(event.target.value);
  };
  return (
    <div>
      <nav className="bg-sidebar-gray px-2 sm:px-4 py-2.5 dark:bg-sidebar-bg sticky w-full z-20 bottom-0 inset-x-0 left-0 border-b border-gray-200 dark:border-gray-600">
        {isActive ? (
          <div>
            <div className="p-3 rounded-md py-5">
              <div className="flex justify-between">
                <p className="text-sm text-dark-text font-bold m-1 py-1  dark:text-gray-2 ">
                  Relays
                </p>
                <img
                  className="w-8 h-6 my-1 cursor-pointer"
                  onClick={() => setIsActive(false)}
                  src={isDarkTheme() ? closeIconLg : closeIconDm}
                  alt="delete icon"
                ></img>
              </div>

              {relays.map((item: string) => {
                return (
                  <div className="mt-2 flex text-white text-sm">
                    <p className=" dark:text-gray-1">{item}</p>
                    <img
                      className="w-6 h-4 rounded-full my-1 mx-1.5 cursor-pointer"
                      onClick={() => deleteRelay(item)}
                      src={deleteIcon}
                      alt="delete icon"
                    ></img>
                  </div>
                );
              })}
              <div className="flex">
                <input
                  onChange={handleNewRelay}
                  type="text"
                  className="peer min-h-[auto] mt-2 bg-gray-50 p-2 border-y border-x border-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-input-bg-dm text-gray-1 border-0"
                  placeholder="wss://nostr.damus.io"
                  value={relay}
                />
                <button
                  className="text-xs font-light mt-2 ml-2 px-2 bg-green-500 text-white rounded-lg  dark:text-gray-1"
                  onClick={() => {
                    addRelay(relay);
                    setRelay("");
                  }}
                >
                  add
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="container flex items-center justify-between mx-auto">
          <div
            onClick={() => navigate("/")}
            className="flex cursor-pointer px-3 py-2 hover:bg-gray-2 dark:rounded-lg dark:hover:bg-input-bg-dm"
          >
            <div>
              <img
                className="w-8 h-6 my-1 mx-auto"
                src={isDarkTheme() ? homeIcon : homeIconLg}
                alt="delete icon"
              ></img>
              <p className="content-start mx-auto text-sm text-dark-text font-bold m-1 py-1  dark:text-gray-2 ">
                Home
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate("/create")}
            className="flex cursor-pointer px-3 py-2 hover:bg-gray-2 dark:rounded-lg dark:hover:bg-input-bg-dm"
          >
            <div>
              <img
                className="w-8 h-6 my-1 mx-auto"
                src={isDarkTheme() ? addIcon : createIconLg}
                alt="delete icon"
              ></img>
              <p className="content-start text-sm mx-auto text-dark-text font-bold m-1 py-1  dark:text-gray-2 ">
                Create
              </p>
            </div>
          </div>

          <div className="flex cursor-pointer px-3 py-2 hover:bg-gray-2 dark:rounded-lg dark:hover:bg-input-bg-dm">
            <div>
              <img
                className="w-8 h-6 my-1 mx-auto"
                src={isDarkTheme() ? profileIcon : profileIconLg}
                alt="delete icon"
              ></img>
              <p className="content-start mx-auto text-sm text-dark-text font-bold m-1 py-1  dark:text-gray-2 ">
                My bounties
              </p>
            </div>
          </div>

          <div
            onClick={() => setIsActive(true)}
            className="flex cursor-pointer px-3 py-2 hover:bg-gray-2 dark:rounded-lg dark:hover:bg-input-bg-dm"
          >
            <div>
              <img
                className="w-8 h-6 my-1 mx-auto"
                src={isDarkTheme() ? relayIconLg : relayIconDm}
                alt="delete icon"
              ></img>
              <p className="content-start mx-auto text-sm text-dark-text font-bold m-1 py-1  dark:text-gray-2 ">
                Relays
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default MobileMenu;
