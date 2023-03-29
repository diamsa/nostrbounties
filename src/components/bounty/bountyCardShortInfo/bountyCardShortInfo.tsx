import { useNavigate, Link } from "react-router-dom";
import { getNpub, getMetaData } from "../../../utils";
import { nip19 } from "nostr-tools";
import { useEffect, useState } from "react";

import bitcoinIcon from "../../../assets/bitcoin-icon.png";
import defaultAvatar from "../../../assets/nostr-icon-user.avif";

type props = {
  ev: {
    Dtag: string;
    createdAt: string;
    pubkey: string;
    reward: string;
    status: string;
    tags: string[];
    title: string;
  };
};

function ShortBountyInfo({ ev }: props) {
  const navigate = useNavigate();
  let npub = getNpub(ev.pubkey);
  let naddr = nip19.naddrEncode({
    identifier: ev.Dtag,
    pubkey: ev.pubkey,
    kind: 30023,
  });

  let bountyInfoPath = `/b/${naddr}`;
  let bountyPosterPath = `/profile/${nip19.npubEncode(ev.pubkey)}`;
  let [name, setName] = useState("")
  let [profilePic, setProfilePic] = useState("")

  useEffect(()=>{
    getMetaData(ev.pubkey)
        .then((response) => {
          if (response.status === 404) setName("");
          setProfilePic("");
          return response.json();
        })
        .then((data) => {
          let parseContent = JSON.parse(data.content);
          setName(parseContent.name);
          setProfilePic(parseContent.picture);
        });
  },[])

  return (
    <div>
      <div className="my-2 justify-between items-center flex shadow-md border border-gray-200 rounded-md max-w-7xl hover:bg-sidebar-gray px-15  sm:flex-wrap px-5 py-3 mx-2 dark:bg-sidebar-bg dark:border-0 dark:hover:bg-input-bg-dm">
        <div
          onClick={() => navigate(bountyInfoPath)}
          className="basis-6/12 cursor-pointer sm:basis-10/12"
        >
          <p className="font-sans text-base font-medium dark:text-gray-1">
            {ev.title}
          </p>
          <div className="flex flex-wrap">
            <img
              className="w-4 h-4 rounded-full my-1 mx-0.5"
              src={bitcoinIcon}
              alt="bitcoin"
            ></img>
            <p className="font-sans text-sm text-dark-text font-normal mr-1 mt-0.5 dark:text-gray-1">
              {ev.reward} sats
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between ">
          <div className="flex flex-wrap">
            <div className="flex mt-3 mr-2">
              <div>
                <img
                  className="w-5 h-5 rounded-full shadow-lg ml-2 sm:ml-0"
                  src={profilePic === "" ? defaultAvatar : profilePic}
                  alt="avatar image"
                />
              </div>
              <Link
                to={bountyPosterPath}
                className="font-sans text-xs font-normal ml-1 underline dark:text-gray-1"
              >
                {name === "" ? npub : name}
              </Link>
            </div>
          </div>
          <div className="mt-2">
            <span className="font-sans text-xs font-normal  dark:text-gray-1">
              {ev.createdAt}
            </span>
          </div>
          {ev.status === "open" || !ev.hasOwnProperty("status") ? (
            <p className="bg-status-open text-xs text-status-open-text py-1 px-2 mt-2 mb-2 mx-2 rounded-lg sm:text-xs">
              Open
            </p>
          ) : ev.status === "in progress" ? (
            <p className="bg-status-in-progress text-xs text-status-in-progress-text py-1 px-2 mt-2 mb-2 mx-2 rounded-lg sm:text-xs">
              In progress
            </p>
          ) : (
            <p className="bg-status-paid text-xs text-status-paid-text py-1 px-2 mt-2 mb-2 mx-2 rounded-lg sm:text-xs">
              Paid
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShortBountyInfo;
