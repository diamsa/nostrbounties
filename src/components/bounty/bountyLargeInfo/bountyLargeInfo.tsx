import { sendReply, getNpub, addReward } from "../../../utils";
import { Link } from "react-router-dom";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import avatarImage from "../../../assets/avatarImg.png";
import { useState } from "react";

type addedToReward = {
  posterPubKey: string;
  amount: string;
};

type content = {
  title: string;
  content: string;
  reward: string;
  publishedAt: string;
};

type props = {
  content: content;
  pubkey: string;
  status: string | null;
  id: string;
  addedReward: any;
  name: string;
  profilePic: string;
};

function BountyLargeInfor({
  content,
  pubkey,
  status,
  id,
  addedReward,
  name,
  profilePic,
}: props) {
  let npub = getNpub(pubkey);
  let [rewardToAdd, setRewardToAdd] = useState<string>("");
  return (
    <div className="my-4 mx-10 px-10 py-5 items-center border border-gray-200 rounded-lg shadow-md max-w-7xl md: flex-wrap sm:flex-wrap px-5 py-3 mx-4 dark:bg-sidebar-bg">
      <div>
        <div>
          <div className="flex flex-wrap">
            <div>
              <p className="font-sans text-base py-1 px-2 mr-1 mt-2 rounded-lg bg-status-paid-text text-status-paid font-medium sm:text-sm dark:text-status-paid">
                {content.reward} sats
              </p>
            </div>
            <div className="flex">
              {status === null ? (
                <p className="bg-status-open text-status-open-text py-1 px-2 mt-2 rounded-lg sm:text-sm">
                  Status: Open
                </p>
              ) : status === "in progress" ? (
                <p className="bg-status-in-progress text-status-in-progress-text py-1 px-2 mt-2 rounded-lg sm:text-sm">
                  Status: In progress
                </p>
              ) : (
                <p className="bg-status-paid text-status-paid-text py-1 px-2 mt-2 rounded-lg sm:text-sm">
                  Status: Paid
                </p>
              )}
              {status === "paid" ? null : (
                <button
                  onClick={() => sendReply(status, id, pubkey)}
                  className="font-sans text-sm font-normal underline ml-2 mt-1  dark:text-gray-1"
                >
                  Reply new state
                </button>
              )}
            </div>
          </div>
          <div className="basis-7/12 mt-3">
            <p className="font-sans text-2xl font-semibold dark:text-gray-2">
              {content.title}
            </p>
            <div className="flex">
              <p className="font-sans text-sm font-normal dark:text-gray-1">
                posted: {content.publishedAt} by
              </p>
              <div className="flex">
                <Link
                  to={`/profile/${pubkey}`}
                  className="font-sans text-sm font-light ml-1 underline dark:text-gray-1"
                >
                  {name === "" || undefined ? npub : name}
                </Link>
                <img
                  className="w-6 h-6 rounded-full shadow-lg ml-2"
                  src={
                    profilePic === "" || undefined ? avatarImage : profilePic
                  }
                  alt="avatar image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="my-5">
          <ReactMarkdown className="markdown prose-a:underline">
            {content.content}
          </ReactMarkdown>
        </div>
      </div>
      <div className="flex">
        <input
          type="number"
          onChange={(e) => setRewardToAdd(e.target.value)}
          className="peer min-h-[auto] basis-6/12 bg-gray-50 border-y border-x border-dark-text text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-input-bg-dm text-gray-1 border-0"
          placeholder="add sats to the initial reward"
          value={rewardToAdd}
          required
        />
        <button
          onClick={() => {
            addReward(rewardToAdd, id);
            setRewardToAdd("");
          }}
          className="px-5 rounded-lg text-sm ml-1 text-gray-2 dark:text-gray-2 bg-blue-1"
        >
          add sats
        </button>
      </div>

      <div className="flex flex-wrap">
        {addedReward.map((item: any) => {
          return (
            <Link
              to={`/profile/${item.posterPubkey}`}
              className="font-sans text-sm font-light mr-3 mt-1 dark:text-gray-2"
            >
              {getNpub(item.posterPubkey)} added{" "}
              <span className="font-sans text-base underline font-medium  dark:text-gray-2">
                {item.amount} sats
              </span>{" "}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BountyLargeInfor;
