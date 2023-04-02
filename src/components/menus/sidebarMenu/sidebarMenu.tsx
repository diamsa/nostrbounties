import { useNavigate } from "react-router-dom";
import { getPubKey, isDarkTheme } from "../../../utils";
import { nip19 } from "nostr-tools";
import { useState } from "react";

import IsNotLogged from "../../errors/isNotLogged";
import homeIcon from "../../../assets/home-icon-dm.svg";
import createIconDm from "../../../assets/create-icon-dm.svg";
import profileIcon from "../../../assets/profile-icon-dm.svg";
import homeIconLg from "../../../assets/home-icon-lg.svg";
import createIconLg from "../../../assets/create-icon-lg.svg";
import profileIconLg from "../../../assets/profile-icon-lg.svg";
import relayIconLg from "../../../assets/server-icon-lg.svg";
import relayIconDm from "../../../assets/server-icon-dm.svg";
import notificationIconDm from "../../../assets/notification-icon-dm.svg";
import notificationIconLg from "../../../assets/notification-icon-lg.svg";
import logo from "../../../assets/Asset14.png";

function SideBarMenu() {
  const navigate = useNavigate();
  const isLogged = sessionStorage.getItem("isLogged") === "true";
  const [displayLogError, setDisplayLogError] = useState(false);

  function goToProfile() {
    getPubKey()
      .then((data) => {
        let npub = nip19.npubEncode(data);
        navigate(`/profile/${npub}`);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="bg-sidebar-gray lg:h-screen md:h-screen p-8 text-center sm:p-4 h-1/2 dark:bg-sidebar-bg">
      {displayLogError ? (
        <IsNotLogged hideElement={setDisplayLogError} />
      ) : null}
      <div className="space-y-3">
        <div className="text-start block">
          <div
            onClick={() => navigate("/")}
            className="flex cursor-pointer px-3 py-2 hover:bg-gray-2 dark:rounded-lg dark:hover:bg-input-bg-dm"
          >
            <img
              className="w-8 h-6 my-1"
              src={isDarkTheme() ? homeIcon : homeIconLg}
              alt="delete icon"
            ></img>
            <p className="content-start text-sm text-dark-text font-bold m-1 py-1  dark:text-gray-2 ">
              Home
            </p>
          </div>
          <div
            onClick={() => navigate("/create")}
            className="flex cursor-pointer px-3 py-2 hover:bg-gray-2 dark:rounded-lg dark:hover:bg-input-bg-dm"
          >
            <img
              className="w-8 h-6 my-1"
              src={isDarkTheme() ? createIconDm : createIconLg}
              alt="delete icon"
            ></img>
            <p className="content-start text-sm text-dark-text font-bold m-1 py-1  dark:text-gray-2 ">
              Create
            </p>
          </div>
          <div
            onClick={goToProfile}
            className="flex cursor-pointer px-3 py-2 hover:bg-gray-2 dark:rounded-lg dark:hover:bg-input-bg-dm"
          >
            <img
              className="w-8 h-6 my-1"
              src={isDarkTheme() ? profileIcon : profileIconLg}
              alt="delete icon"
            ></img>
            <p className="content-start text-sm text-dark-text font-bold m-1 py-1  dark:text-gray-2 ">
              My bounties
            </p>
          </div>
          <div
            onClick={() => {
              isLogged ? navigate("/notifications") : setDisplayLogError(true);
            }}
            className="flex cursor-pointer px-3 py-2 hover:bg-gray-2 dark:rounded-lg dark:hover:bg-input-bg-dm"
          >
            <img
              className="w-8 h-6 my-1"
              src={isDarkTheme() ? notificationIconDm : notificationIconLg}
              alt="delete icon"
            ></img>
            <p className="content-start text-sm text-dark-text font-bold m-1 py-1   dark:text-gray-2 ">
              Notifications
            </p>
          </div>
          <div
            onClick={() => navigate("/relays")}
            className="flex cursor-pointer px-3 py-2 hover:bg-gray-2 dark:rounded-lg dark:hover:bg-input-bg-dm"
          >
            <img
              className="w-7 h-5 my-1"
              src={isDarkTheme() ? relayIconDm : relayIconLg}
              alt="delete icon"
            ></img>
            <p className="content-start text-sm text-dark-text font-bold m-1 py-1  dark:text-gray-2 ">
              Relays Information
            </p>
          </div>
        </div>
        <hr className="border-l-2 border-dark-text dark:text-gray-2 dark:border-gray-2" />
        <div>
          <div className="p-3 rounded-md py-5">
            <div className="mt-5">
              {isLogged ? (
                <button
                  onClick={() => {
                    sessionStorage.clear();
                    window.location.reload();
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-blue-1 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-white"
                >
                  Log out
                </button>
              ) : (
                <button
                  onClick={() => {
                    let pubkey = getPubKey();
                    pubkey.then((data) => {
                      sessionStorage.setItem("isLogged", "true");
                      sessionStorage.setItem("pubkey", `${data}`);
                      window.location.reload();
                    });
                  }}
                  className="w-full  px-4 py-2 text-sm font-medium text-center text-white bg-blue-1 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-white"
                >
                  Log in with extension
                </button>
              )}
            </div>
            <div>
              <a
                className="underline text-dark-text text-xs dark:text-gray-2 mt-6 block"
                href="https://github.com/diamsa/nostrbounties"
              >
                Made by Diego
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarMenu;
