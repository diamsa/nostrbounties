import { Link } from "react-router-dom";
import { nip19 } from "nostr-tools";
import { useState, useEffect } from "react";
import {
  getMetaData,
  getNpub,
  isDarkTheme,
  convertTimestamp,
} from "../../../utils";

import avatarImage from "../../../assets/nostr-icon-user.avif";
import copyIconDm from "../../../assets/copy-icon-dm.svg";
import copyIconLg from "../../../assets/copy-icon-lg.svg";

function CommentBox({ pubkey, createdAt, changedNpubValue }: any) {
  let [name, setName] = useState("");
  let [profilePic, setProfilePic] = useState("");
  let npub = nip19.npubEncode(pubkey);
  let npubShortened = getNpub(pubkey);
  let datePosted = convertTimestamp(createdAt);

  useEffect(() => {
    getMetaData(pubkey)
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
      <div className="items-center block rounded-lg my-3 shadow-md max-w-5xl lg:py-5 md: flex-wrap sm:flex-wrap px-5 py-3 dark:bg-sidebar-bg">
        <div className="flex justify-between">
          <div className="flex justify-between">
            <div className="flex">
              {profilePic === "" ? (
                <div>
                  <img
                    className="w-6 h-6 rounded-full shadow-lg ml-2"
                    src={avatarImage}
                    alt="avatar image"
                  />
                </div>
              ) : (
                <div>
                  <img
                    className="w-6 h-6 rounded-full shadow-lg ml-2"
                    src={profilePic}
                    alt="avatar image"
                  />
                </div>
              )}
              <div className="block">
                {name === "" ? (
                  <Link
                    to={`/profile/${npub}`}
                    className="font-sans text-xs font-normal ml-1 dark:text-gray-1"
                  >
                    {npubShortened} applied to this bounty {datePosted}.
                  </Link>
                ) : (
                  <Link
                    to={`/profile/${npub}`}
                    className="font-sans text-xs font-normal ml-1 dark:text-gray-1"
                  >
                    {name} applied to this bounty {datePosted}.
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div>
            <img
              title="copy user Npub"
              className="w-7 h-5 my-1 cursor-pointer sm:mt-3"
              onClick={() => changedNpubValue(npub)}
              src={isDarkTheme() ? copyIconDm : copyIconLg}
              alt="delete icon"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
