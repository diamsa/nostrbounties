import {
  getMetaData,
  convertTimestamp,
  getNpub,
  isDarkTheme,
  formatReward,
} from "../../utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nip19 } from "nostr-tools";

import defaultAvatar from "../../assets/nostr-icon-user.avif";
import externalLinkDm from "../../assets/external-link-icon-dm.svg";
import externalLinkLg from "../../assets/external-link-icon-lg.svg";

type allBountiesNotifications = {
  ev:
    | [number, string, string, string, string[]]
    | [number, string, string, string[]];
};

function NotificationPledgedSats({ ev }: allBountiesNotifications) {
  let [name, setName] = useState("");
  let [profilePic, setProfilePic] = useState("");
  let createdAt = convertTimestamp(ev[0]);
  let npub = getNpub(ev[1]);
  let navigate = useNavigate();
  let bountyLinkPath: string;

  if (ev[2] === "reward") {
    let nadrrElements = ev[4]![0].split(":");
    bountyLinkPath = nip19.naddrEncode({
      identifier: nadrrElements[2],
      pubkey: nadrrElements[1],
      kind: 30023,
    });
  }
  if (ev[2] === "application") {
    let nadrrElements = ev[3][0].split(":");
    bountyLinkPath = nip19.naddrEncode({
      identifier: nadrrElements[2],
      pubkey: nadrrElements[1],
      kind: 30023,
    });
  }

  useEffect(() => {
    getMetaData(ev[1])
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
  }, []);

  return (
    <div>
      {ev[2] === "reward" ? (
        <div className="my-2 justify-between items-center flex shadow-md border border-gray-200 rounded-md max-w-7xl hover:bg-sidebar-gray px-15  sm:flex-wrap px-5 py-3 mx-2 dark:bg-sidebar-bg dark:border-0 dark:hover:bg-input-bg-dm">
          <div>
            <div className="flex">
              <img
                className="w-6 h-6 rounded-full shadow-lg mr-2 sm:ml-0"
                src={profilePic === "" ? defaultAvatar : profilePic}
                alt="avatar image"
              />
              <div className="block">
                <p className="text-xs text-dark-text dark:text-gray-1">
                  {/* 
                  // @ts-ignore */}
                  {name === "" ? npub : name} pledged {formatReward(ev[3])} sats{" "}
                  {createdAt} to:
                </p>

                <p className="text-dark-text font-medium dark:text-gray-2">
                  {ev[4]![1]}
                </p>
              </div>
            </div>
          </div>
          <div className="flex">
            <p className="bg-status-paid-text text-xs text-status-paid py-1 px-2 my-2 mx-2 rounded-lg sm:text-xs">
              Pledged
            </p>
            <img
              title="external link"
              className="w-7 h-5 my-1 cursor-pointer mt-2 sm:mt-3"
              onClick={() => navigate(`/b/${bountyLinkPath}`)}
              src={isDarkTheme() ? externalLinkDm : externalLinkLg}
              alt="external link icon"
            ></img>
          </div>
        </div>
      ) : null}
      {ev[2] === "application" ? (
        <div className="my-2 justify-between items-center flex shadow-md border border-gray-200 rounded-md max-w-7xl hover:bg-sidebar-gray px-15  sm:flex-wrap px-5 py-3 mx-2 dark:bg-sidebar-bg dark:border-0 dark:hover:bg-input-bg-dm">
          <div>
            <div className="flex">
              <img
                className="w-6 h-6 rounded-full shadow-lg mr-2 sm:ml-0"
                src={profilePic === "" ? defaultAvatar : profilePic}
                alt="avatar image"
              />
              <div className="block">
                <p className="text-xs text-dark-text dark:text-gray-1">
                  {name} applied {createdAt} to:
                </p>
                <p className="text-dark-text font-medium dark:text-gray-2">
                  {ev[3][1]}
                </p>
              </div>
            </div>
          </div>
          <div className="flex">
            <p className="text-xs bg-teal-300 text-emerald-800 py-1 px-2 my-2 mx-2 rounded-lg sm:text-xs">
              Applied
            </p>
            <img
              title="external link bounty"
              className="w-7 h-5 my-1 cursor-pointer mt-2 sm:mt-3"
              src={isDarkTheme() ? externalLinkDm : externalLinkLg}
              onClick={() => navigate(`/b/${bountyLinkPath}`)}
              alt="external link icon"
            ></img>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default NotificationPledgedSats;
