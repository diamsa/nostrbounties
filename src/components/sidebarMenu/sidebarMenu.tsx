import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getPubKey, isDarkTheme } from "../../utils";

import homeIcon from "../../assets/home-icon-dm.svg";
import addIcon from "../../assets/add-icon-dm.svg";
import profileIcon from "../../assets/profile-icon-dm.svg";
import homeIconLg from "../../assets/home-icon-lg.svg";
import createIconLg from "../../assets/create-icon-lg.svg";
import profileIconLg from "../../assets/profile-icon-lg.svg";
import deleteIcon from "../../assets/delete-icon.svg";


function SideBarMenu() {
  const navigate = useNavigate();
  const defaultRelays = JSON.parse(localStorage.getItem("relays")!);
  const [relays, setRelays] = useState(defaultRelays);
  const [relay, setRelay] = useState<string>("");

  function goToProfile() {
    getPubKey()
      .then((data) => navigate(`/profile/${data}`))
      .catch((error) => console.log(error));
  }

  function deleteRelay(relayName: string) {
    if (relays.length === 1) {
      console.log("you cant delete this relay");
    } else {
      let newRelays = relays.filter((item: string) => {
        return item !== relayName;
      });

      setRelays(newRelays);
      let aja = JSON.stringify(newRelays);
      localStorage.setItem("relays", aja);
    }
  }

  function addRelay(relayName: string | undefined) {
    if (relayName === "" || !relayName?.includes("wss://")) {
      console.log("No valid relay");
    } else {
      setRelays([...relays, relayName]);
      let siu = JSON.stringify([...relays, relayName]);
      localStorage.setItem("relays", siu);
    }
  }

  const handleNewRelay = (event: { target: { value: string } }) => {
    setRelay(event.target.value);
  };

  return (
    <div className="bg-sidebar-gray lg:h-screen md:h-screen p-8 text-center sm:p-4 h-1/2 dark:bg-sidebar-bg">
      <div className="space-y-3">
        <div className="text-start block">
          <div onClick={()=> navigate("/")} className="flex cursor-pointer px-3 py-2 hover:bg-gray-2 dark:rounded-lg dark:hover:bg-input-bg-dm">
            <img
              className="w-8 h-6 my-1"
              src={isDarkTheme() ? homeIcon : homeIconLg}
              alt="delete icon"
            ></img>
            <p className="content-start text-sm text-dark-text font-bold m-1 py-1  dark:text-gray-2 ">
              Home
            </p>
          </div>
          <div onClick={()=> navigate("/create")} className="flex cursor-pointer px-3 py-2 hover:bg-gray-2 dark:rounded-lg dark:hover:bg-input-bg-dm">
            <img
              className="w-8 h-6 my-1"
              src={isDarkTheme() ? addIcon : createIconLg}
              alt="delete icon"
            ></img>
            <p className="content-start text-sm text-dark-text font-bold m-1 py-1  dark:text-gray-2 ">
              Create
            </p>
          </div>
          <div onClick={goToProfile} className="flex cursor-pointer px-3 py-2 hover:bg-gray-2 dark:rounded-lg dark:hover:bg-input-bg-dm">
            <img
              className="w-8 h-6 my-1"
              src={isDarkTheme() ? profileIcon : profileIconLg}
              alt="delete icon"
            ></img>
            <p className="content-start text-sm text-dark-text font-bold m-1 py-1  dark:text-gray-2 ">
              My bounties
            </p>
          </div>
        </div>
        <hr className="border-l-2 border-dark-text dark:text-gray-2 dark:border-gray-2"/>
        <div>
          <div className="p-3 rounded-md py-5">
          <p className="text-sm text-dark-text font-bold m-1 py-1  dark:text-gray-2 ">
              Relays
            </p>
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
      </div>
    </div>
  );
}

export default SideBarMenu;
