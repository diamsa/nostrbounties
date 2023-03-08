import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getPubKey } from "../../utils";
import deleteIcon from "../../assets/icon-delete.png";

function SideBarMenu() {
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
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
    setRelays([...relays, relayName]);
    let siu = JSON.stringify([...relays, relayName]);
    localStorage.setItem("relays", siu);
  }

  const handleNewRelay = (event: { target: { value: string } }) => {
    setRelay(event.target.value);
  };
  return (
    <div className="bg-sidebar-gray lg:h-screen md:h-screen p-8 text-center sm:p-4 h-1/2 dark:bg-sidebar-bg">
      <h1
        className="text-white font-semibold text-lg dark:text-gray-1"
        onClick={() => navigate("/")}
      >
        Nostr bounties
      </h1>
      <div className="space-y-3">
        <div>
          <div className="p-3 mt-2 rounded-md py-5">
            {relays.map((item: string) => {
              return (
                <div className="mt-2 flex text-white text-sm">
                  <p className=" dark:text-gray-1">{item}</p>
                  <img
                    className="w-6 h-4 rounded-full my-1 mx-0.5 cursor-pointer"
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
                className="peer min-h-[auto] mt-2 bg-gray-50 p-2 border-y border-x border-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-input-bg-dm text-gray-1 border-0"
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
        <div className="text-start p-3 flex flex-wrap justify-between">
          <button
            onClick={() => navigate("/create")}
            className="inline-flex items-center px-3 py-1 m-1 text-sm font-semibold text-center text-gray-2 bg-blue-1 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-gray-1"
          >
            Create Bounty
          </button>
          <div>
            <p
              onClick={goToProfile}
              className="content-start text-sm text-dark-text font-normal border border-gray-200 rounded-md px-3 m-1 py-1  dark:text-gray-1"
            >
              My bounties
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarMenu;
