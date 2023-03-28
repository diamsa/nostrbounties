import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPubKey } from "../../utils";
import { isEditable } from "@testing-library/user-event/dist/utils";

function Header() {
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const defaultRelays = JSON.parse(localStorage.getItem("relays")!);
  const [relays, setRelays] = useState(defaultRelays);
  const [relay, setRelay] = useState<string>();

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
    <div className="w-full pr-12 pl-12 pt-12 bg-white sm:px-8">
      <div className="flex flex-wrap items-end justify-between mb-12 header content-end">
        <div>
          <p
            onClick={() => navigate("/")}
            className="text-4xl font-semibold text-gray-800 px-4 py-2"
          >
            Nostr Bounties
          </p>
        </div>
        <div className="flex">
          <div>
            <p onClick={goToProfile} className="mr-3 underline px-4 py-2">
              My profile
            </p>
          </div>
          <div>
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              {dropDown ? (
                <svg
                  className="w-4 h-4 ml-2"
                  onClick={() => setDropDown(false)}
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="1"
                    y1="11"
                    x2="11"
                    y2="1"
                    stroke="white"
                    stroke-width="2"
                  />
                  <line
                    x1="1"
                    y1="1"
                    x2="11"
                    y2="11"
                    stroke="white"
                    stroke-width="2"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 ml-2"
                  onClick={() => setDropDown(true)}
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="4 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              )}
              Relays{" "}
            </button>
            {dropDown ? (
              <div className="bg-white absolute p-3 mt-2 shadow-md border border-gray-200 rounded-md">
                {relays.map((item: string) => {
                  return (
                    <div className="mt-2 flex">
                      <p>{item}</p>
                      <p
                        onClick={() => deleteRelay(item)}
                        className="text-xs font-light p-1 bg-red-500 text-white mx-2 rounded-lg"
                      >
                        delete
                      </p>
                    </div>
                  );
                })}
                <div className="flex">
                  <input
                    onChange={handleNewRelay}
                    type="text"
                    className="peer min-h-[auto] mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    placeholder="wss://nostr.damus.io"
                  />
                  <button
                    className="text-xs font-light mt-2 ml-2 px-2 bg-green-500 text-white rounded-lg"
                    onClick={() => addRelay(relay)}
                  >
                    add
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <div className="text-end">
            <button
              onClick={() => navigate("/create")}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Create Bounty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
