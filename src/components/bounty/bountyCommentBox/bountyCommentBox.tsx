import avatarImage from "../../../assets/nostr-icon-user.avif";
import { Link } from "react-router-dom";

function CommentBox({ npub, content, name, profilePic }: any) {

  return (
    <div>
      <div className="block">
        <div className=" border-input-bg-dm border-l-2 w-4 h-8 lg:ml-16 md:ml-14 sm:ml-14"></div>

        <div className="items-center border border-gray-200 rounded-lg shadow-md max-w-5xl lg:py-5 lg:ml-12 md: flex-wrap sm:flex-wrap px-5 py-3 mx-4 dark:bg-sidebar-bg">
          <div>
            <div>
              <div className="flex">
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
                  {name === "" ? (
                    <Link
                      to={`/profile/${npub}`}
                      className="font-sans text-sm font-normal ml-1 dark:text-gray-1"
                    >
                      {npub} commented:
                    </Link>
                  ) : (
                    <Link
                      to={`/profile/${npub}`}
                      className="font-sans text-sm font-normal ml-1 dark:text-gray-1"
                    >
                      {name} commented:
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="my-3">
              <p className="font-sans text-sm font-normal ml-1 dark:text-gray-1">
                {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
