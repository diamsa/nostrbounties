import { Link } from "react-router-dom";

import AvatarImage from "../../assets/nostr-icon-user.avif";
import checkMark from "../../assets/check-mark.svg";

function profileCard({ metaData, userNip05, npub }: any) {
  return (
    <div className="bg-white border basis-6/12 border-gray-200 rounded-lg shadow-md m-2 dark:bg-sidebar-bg">
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-16 h-16 mt-7  rounded-full shadow-lg "
          src={
            metaData.profilePic === "" || undefined
              ? AvatarImage
              : metaData.profilePic
          }
          alt="avatar"
        />
        <h5 className="mb-1 text-xl font-medium text-dark-text dark:text-gray-1">
          {metaData.name === undefined ? metaData.display_name : metaData.name}
        </h5>
        <div className="flex">
          <span className="text-sm text-gray-500 dark:text-gray-1">
            {metaData.nip05 === undefined || null
              ? "nip05 not found"
              : metaData.nip05}
          </span>
          {userNip05 ? (
            <img
              className="w-5 h-5  rounded-full shadow-lg "
              src={checkMark}
              alt="avatar"
            />
          ) : null}
        </div>

        <span className="text-sm text-gray-500 dark:text-gray-1">
          ⚡{" "}
          {metaData.LnAddress === undefined
            ? "LN address not found"
            : metaData.LnAddress}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-1 text-center px-6">
          {metaData.about === undefined ? "about not found" : metaData.about}
        </span>
        <Link
          to={`https://snort.social/p/${npub}`}
          className="text-sm text-gray-500 dark:text-gray-1 text-center px-6"
        >
          snort social profile
        </Link>
      </div>
    </div>
  );
}

export default profileCard;
