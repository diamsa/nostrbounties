import { Link } from "react-router-dom";
import { nip19 } from "nostr-tools";
import { getNpub, isDarkTheme, convertTimestamp } from "../../../utils";

import avatarImage from "../../../assets/nostr-icon-user.avif";
import copyIconDm from "../../../assets/copy-icon-dm.svg";
import copyIconLg from "../../../assets/copy-icon-lg.svg";

function CommentBox({
  pubkey,
  name,
  profilePic,
  createdAt,
  changedNpubValue,
}: any) {
  let npub = nip19.npubEncode(pubkey);
  let npubShortened = getNpub(pubkey);
  let datePosted = convertTimestamp(createdAt);

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
                  <div className="flex mt-1">
                    <p className="font-sans text-xs font-normal ml-1 dark:text-gray-1">
                      {npubShortened}
                    </p>
                    <p className="font-sans text-xs font-normal ml-1 dark:text-gray-1">
                      {" "}
                      applied to this bounty {datePosted}.
                    </p>
                  </div>
                ) : (
                  <div className="flex mt-1">
                    <p className="font-sans text-xs font-normal ml-1 dark:text-gray-1">
                      {name}
                    </p>
                    <p className="font-sans text-xs font-normal ml-1 dark:text-gray-1">
                      {" "}
                      applied to this bounty {datePosted}.
                    </p>
                  </div>
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
