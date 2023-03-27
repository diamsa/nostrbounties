import {
  sendReply,
  getNpub,
  addReward,
  formatReward,
  deleteBounty,
} from "../../../utils";
import { Link, useNavigate } from "react-router-dom";
import { nip19 } from "nostr-tools";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import avatarImage from "../../../assets/nostr-icon-user.avif";
import { useState } from "react";

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
  addedReward: {
    posterPubkey: string;
    amount: string;
    note: string;
  }[];
  name: string;
  profilePic: string;
  totalReward: number;
  rootId: string;
  dTag: string;
};

function BountyLargeInfor({
  content,
  pubkey,
  status,
  id,
  addedReward,
  name,
  profilePic,
  totalReward,
  rootId,
  dTag,
}: props) {
  let npubShort = getNpub(pubkey);
  let npub = nip19.npubEncode(pubkey);
  let naddr = nip19.naddrEncode({
    identifier: dTag,
    pubkey: pubkey,
    kind: 30023,
  });
  let [rewardToAdd, setRewardToAdd] = useState<string>("");
  let [rewardNoteToAdd, setRewardNoteToAdd] = useState<string>("");
  let isLogged = sessionStorage.getItem("pubkey");
  let idToUse = rootId === "" ? id : rootId;
  let navigate = useNavigate();

  return (
    <div className="my-4 items-center border border-gray-200 rounded-lg shadow-md max-w-7xl lg:py-5 md: flex-wrap sm:flex-wrap px-5 py-3 mx-4 dark:bg-sidebar-bg">
      <div>
        <div>
          <div className="flex flex-wrap">
            <div>
              <p className="font-sans text-base py-1 px-2 mr-1 mt-2 rounded-lg bg-status-paid-text text-status-paid font-medium sm:text-sm dark:text-status-paid">
                {formatReward(totalReward + content.reward)} sats
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
              {isLogged === pubkey ? (
                <button
                  onClick={() => sendReply(status, idToUse, pubkey, dTag)}
                  className="font-sans text-sm font-normal underline ml-2 mt-1 dark:text-gray-1"
                >
                  {status === "paid" ? "Change status to: In progress" : null}
                  {status === "in progress" ? "Change status to: Paid" : null}
                  {status === null ? "Change status to: In progress" : null}
                </button>
              ) : null}
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
                  to={`/profile/${npub}`}
                  className="font-sans text-sm font-light ml-1 underline dark:text-gray-1"
                >
                  {name === "" || undefined ? npubShort : name}
                </Link>
                <img
                  className="w-6 h-6 rounded-full shadow-lg ml-2"
                  src={
                    profilePic === "" || undefined ? avatarImage : profilePic
                  }
                  alt="avatar"
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
      {status === "paid" ? null : (
        <div className="flex flex-col gap-2 pt-8 pb-2">
          <input
            type="text"
            onChange={(e) => setRewardNoteToAdd(e.target.value)}
            className="peer min-h-[auto] basis-6/12 bg-gray-50 border-y border-x border-dark-text text-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-input-bg-dm dark:text-gray-1 border-0"
            placeholder="Add a note about why you're adding to this reward (optional)"
            value={rewardNoteToAdd}
          />
          <input
            type="number"
            onChange={(e) => setRewardToAdd(e.target.value)}
            className="peer min-h-[auto] basis-6/12 bg-gray-50 border-y border-x border-dark-text text-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-input-bg-dm dark:text-gray-1 border-0"
            placeholder="Add sats to the initial reward"
            value={rewardToAdd}
            required
          />
          <button
            onClick={() => {
              addReward(rewardToAdd, rewardNoteToAdd, idToUse, pubkey, dTag);
              setRewardToAdd("");
              setRewardNoteToAdd("");
            }}
            className="px-5 rounded-lg px-4 py-2 text-sm text-white dark:text-white font-bold bg-blue-1 hover:bg-blue-800"
          >
            Add sats
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 py-4">
        {addedReward.map((item: any) => {
          let npubAddedReward = nip19.npubEncode(item.posterPubkey);
          return (
            <div
              key={item.identifier}
              className="posterAdded bg-stone-800 p-2 rounded-lg flex flex-col gap-1"
            >
              <Link
                to={`/profile/${npubAddedReward}`}
                className="font-sans text-sm font-light dark:text-gray-2"
              >
                {getNpub(item.posterPubkey)} added{" "}
                <span className="font-sans text-base underline font-medium dark:text-gray-2">
                  {formatReward(item.amount)} sats
                </span>{" "}
              </Link>
              {item.note.length > 0 && (
                <div className="dark:text-gray-2 text-sm">{item.note}</div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        {isLogged === pubkey ? (
          <div className="flex space-x-2">
            <Link
              to={`/edit/${naddr}`}
              className="cursor-pointer px-3 py-1.5 rounded-lg text-white dark:text-white bg-blue-1 hover:bg-blue-800 font-sans text-sm font-normal "
            >
              Edit Bounty
            </Link>
            <button
              onClick={() => {
                let event = deleteBounty(id);
                event.then((data) => {
                  navigate(`/`);
                });
              }}
              className="cursor-pointer px-3 py-1.5 rounded-lg font-sans bg-alert-1 hover:bg-red-800 text-sm font-normal dark:text-white "
            >
              Delete Bounty
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BountyLargeInfor;
