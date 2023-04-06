import { isDarkTheme, sendReply } from "../../../utils";
import { useState } from "react";

import closeIconLg from "../../../assets/close-icon-lg.svg";
import closeIconDm from "../../../assets/close-icon-dm.svg";
import ApplicationBox from "../bountyApplicantsBox/bountyApplicantsBoxStatus";

function BountyUpdateStatusCard({
  isModalOpen,
  closeModal,
  dTag,
  currentStatus,
  applicants,
  posterPubkey,
  naddr,
  id,
  updateValues,
  dataLoaded,
}: any) {
  let [bountyHunterNpub, setBountyHunterNpub] = useState<string>("");

  return (
    <div>
      {isModalOpen ? (
        <div className="fixed bg-background-dark-mode bg-opacity-80 backdrop-blur-sm left-0 right-0 top-0 bottom-0">
          <div className="mx-60 my-20 px-10 py-5 overflow-y-scroll rounded-xl h-4/6 bg-gray-50 dark:bg-input-bg-dm sm:mx-4 sm:my-10 sm:px-5">
            <div className="mt-4">
              {" "}
              <div className="flex justify-between">
                <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1 sm:text-base">
                  Who is going to be working in this bounty?
                </label>
                <img
                  className="w-8 h-6 my-1 cursor-pointer"
                  onClick={() => closeModal()}
                  src={isDarkTheme() ? closeIconLg : closeIconDm}
                  alt="close icon"
                ></img>
              </div>
              <input
                type="text"
                onChange={(e) => setBountyHunterNpub(e.target.value)}
                className="peer min-h-[auto] bg-gray-50 border-y border-x border-dark-text text-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sidebar-bg dark:text-gray-1 border-0"
                placeholder="Enter bounty hunter's npub"
                value={bountyHunterNpub}
                required
              />
            </div>
            <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1 sm:text-base">
              Copy npub from one of the applicants:
            </label>
            {applicants.map((applications: any) => {
              return (
                <div>
                  <div className="my-1">
                    <ApplicationBox
                      pubkey={applications.pubkey}
                      createdAt={applications.createdAt}
                      changedNpubValue={setBountyHunterNpub}
                    />
                  </div>
                </div>
              );
            })}

            {bountyHunterNpub.startsWith("npub1") &&
            bountyHunterNpub.length === 63 ? (
              <div className="mt-4">
                <button
                  onClick={() => {
                    sendReply(
                      currentStatus,
                      bountyHunterNpub,
                      dTag,
                      posterPubkey,
                      id,
                      naddr
                    ).then(() => {
                      updateValues(true);
                      dataLoaded(false);
                    });
                  }}
                  className="w-full  px-4 py-2 text-sm font-medium text-center text-gray-2 bg-blue-1 rounded-lg hover:bg-blue-1 dark:text-white"
                >
                  Change status to <i>In progress</i>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BountyUpdateStatusCard;
