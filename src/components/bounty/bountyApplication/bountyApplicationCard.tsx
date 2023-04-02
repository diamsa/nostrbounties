import { isDarkTheme, sendApplication } from "../../../utils";
import { useState } from "react";

import closeIconLg from "../../../assets/close-icon-lg.svg";
import closeIconDm from "../../../assets/close-icon-dm.svg";

function BountyApplicationCard({
  isOpen,
  closeModal,
  dTag,
  updateValues,
  dataLoaded,
}: any) {
  let [applicationText, setApplicationText] = useState<string>("");
  let [githubLink, setGithubLink] = useState("");
  let [personalWebsite, setPersonalWebsite] = useState("");
  let content = applicationText;
  let links = [githubLink, personalWebsite];

  return (
    <div>
      {isOpen ? (
        <div className="fixed bg-background-dark-mode bg-opacity-80 backdrop-blur-sm left-0 right-0 top-0 bottom-0">
          <div className="mx-60 my-20 px-10 py-5 overflow-y-scroll rounded-xl h-4/6 bg-gray-50 dark:bg-input-bg-dm sm:mx-4 sm:my-10 sm:px-5">
            <div className="mt-4">
              {" "}
              <div className="flex justify-between">
                <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1 sm:text-base">
                  Apply to this bounty
                </label>
                <img
                  className="w-8 h-6 my-1 cursor-pointer"
                  onClick={() => closeModal()}
                  src={isDarkTheme() ? closeIconLg : closeIconDm}
                  alt="delete icon"
                ></img>
              </div>
              <textarea
                onChange={(e) => setApplicationText(e.target.value)}
                className="peer min-h-[auto] bg-gray-50 border-y border-x border-dark-text text-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sidebar-bg dark:text-gray-1 border-0"
                placeholder="Explain why you are the best candidate for this bounty. Tell the bounty poster in what projects you have worked before."
                rows={9}
                required
              ></textarea>
            </div>
            <div className="mt-4">
              <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1 sm:text-base">
                Add a Github profile link (optional)
              </label>
              <input
                type="text"
                onChange={(e) => setGithubLink(e.target.value)}
                className="peer min-h-[auto] bg-gray-50 border-y border-x border-dark-text text-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sidebar-bg dark:text-gray-1 border-0"
                placeholder="https://github.com/pepe"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1 sm:text-base">
                Add a personal website link (optional)
              </label>
              <input
                type="text"
                onChange={(e) => setPersonalWebsite(e.target.value)}
                className="peer min-h-[auto] bg-gray-50 border-y border-x border-dark-text text-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sidebar-bg dark:text-gray-1 border-0"
                placeholder="https://yourdomain.com"
                required
              />
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
                  sendApplication(content, dTag, links).then(() => {
                    updateValues(true);
                    dataLoaded(false);
                  });
                }}
                className="w-full  px-4 py-2 text-sm font-medium text-center text-gray-2 bg-blue-1 rounded-lg hover:bg-blue-1 dark:text-white"
              >
                Send application
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BountyApplicationCard;
