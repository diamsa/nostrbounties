import { Link } from "react-router-dom";
import { nip19 } from "nostr-tools";
import { useState, useEffect } from "react";
import {
  getMetaData,
  getNpub,
  deleteEvent,
  convertTimestamp,
  isDarkTheme,
} from "../../../utils";

import avatarImage from "../../../assets/nostr-icon-user.avif";
import deleteIcon from "../../../assets/delete-icon.svg";
import githubIconDm from "../../../assets/github-icon-dm.svg";
import githubIconLg from "../../../assets/github-icon-lg.svg";
import websiteIconDm from "../../../assets/website-icon-dm.svg";
import websiteIconLg from "../../../assets/website-icon-lg.svg";

function CommentBox({
  pubkey,
  content,
  id,
  links,
  createdAt,
  posterPubkey,
}: any) {
  let [name, setName] = useState("");
  let [profilePic, setProfilePic] = useState("");
  let npub = nip19.npubEncode(pubkey);
  let isLogged = sessionStorage.getItem("pubkey");
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
      <div className="block">
        <div className="border-gray-1 border-l-2 w-4 h-8 dark:border-input-bg-dm lg:ml-16 md:ml-14 sm:ml-14"></div>

        <div className="items-center rounded-lg shadow-md max-w-5xl lg:py-5 lg:ml-12 md: flex-wrap sm:flex-wrap px-5 py-3 mx-4 dark:bg-sidebar-bg">
          <div>
            <div>
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
                        {npubShortened} applied to this bounty {datePosted}:
                      </Link>
                    ) : (
                      <Link
                        to={`/profile/${npub}`}
                        className="font-sans text-xs font-normal ml-1 dark:text-gray-1"
                      >
                        {name} applied to this bounty {datePosted}:
                      </Link>
                    )}
                    <div>
                      <p className="font-sans text-base font-normal mb-2 ml-1 dark:text-gray-1">
                        {content}
                      </p>
                      <div className="flex">
                        {links.github !== "" ? (
                          <div>
                            <Link to={`${links.github}`} target="_blank">
                              <img
                                className="w-4 h-4 rounded-full shadow-lg mr-2 cursor-pointer"
                                src={
                                  isDarkTheme() ? githubIconDm : githubIconLg
                                }
                                alt="github icon"
                              />
                            </Link>
                          </div>
                        ) : null}
                        {links.personalWebsite !== "" ? (
                          <div>
                            <Link
                              to={`${links.personalWebsite}`}
                              target="_blank"
                            >
                              <img
                                className="w-4 h-4 rounded-full shadow-lg mr-2 cursor-pointer"
                                src={
                                  isDarkTheme() ? websiteIconDm : websiteIconLg
                                }
                                alt="website icon"
                              />
                            </Link>
                          </div>
                        ) : null}
                      </div>

                      {isLogged === posterPubkey ? (
                        <Link
                          to={`https://snort.social/messages/${npub}`}
                          target="_blank"
                          className="font-sans text-xs bg-blue-1 px-2 py-1 font-normal mr-1 text-white"
                        >
                          send a message
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div>
                  {isLogged === pubkey ? (
                    <img
                      className="w-4 h-4 rounded-full shadow-lg mr-2 cursor-pointer"
                      onClick={() => deleteEvent(id)}
                      src={deleteIcon}
                      alt="delete"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
