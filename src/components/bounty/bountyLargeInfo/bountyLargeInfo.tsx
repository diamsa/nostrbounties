import {
  sendReply,
  getNpub,
  addReward,
  formatReward,
  sendComment,
  deleteBounty,
} from "../../../utils";
import { Link, useNavigate } from "react-router-dom";
import { nip19 } from "nostr-tools";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import avatarImage from "../../../assets/nostr-icon-user.avif";
import { useState, useEffect } from "react";

import CommentBox from "../bountyCommentBox/bountyCommentBox";

type event = {
  ev: {
    Dtag: string;
    content: string;
    id: string;
    name: string;
    pledged: any[];
    profilePic: string;
    pubkey: string;
    publishedAt: string;
    reward: number;
    status: string;
    title: string;
    comments: any[];
  };
};

function BountyLargeInfor({ ev }: event) {
  function getFinalReward() {
    let totalReward = ev.reward;
    ev.pledged.map((item) => {
      let value = parseInt(item.amount);
      totalReward += value;
    });

    return totalReward;
  }

  let naddr = nip19.naddrEncode({
    identifier: ev.Dtag,
    pubkey: ev.pubkey,
    kind: 30023,
  });
  let [rewardToAdd, setRewardToAdd] = useState<string>("");
  let [message, setMessage] = useState<string>("");
  let [loaded, setLoaded] = useState(false);
  let totalReward = getFinalReward();
  let isLogged = sessionStorage.getItem("pubkey");
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  return (
    <div>
      <div className="mt-4 items-center border border-gray-200 rounded-lg shadow-md max-w-7xl lg:py-5 md: flex-wrap sm:flex-wrap px-5 py-3 mx-4 dark:bg-sidebar-bg">
        <div>
          <div>
            <div className="flex flex-wrap">
              <div>
                <p className="font-sans text-base py-1 px-2 mr-1 mt-2 rounded-lg bg-status-paid-text text-status-paid font-medium sm:text-sm dark:text-status-paid">
                  {formatReward(totalReward)} sats
                </p>
              </div>
              <div className="flex">
                {ev.status === "" ? (
                  <p className="bg-status-open text-status-open-text py-1 px-2 mt-2 rounded-lg sm:text-sm">
                    Status: Open
                  </p>
                ) : ev.status === "in progress" ? (
                  <p className="bg-status-in-progress text-status-in-progress-text py-1 px-2 mt-2 rounded-lg sm:text-sm">
                    Status: In progress
                  </p>
                ) : (
                  <p className="bg-status-paid text-status-paid-text py-1 px-2 mt-2 rounded-lg sm:text-sm">
                    Status: Paid
                  </p>
                )}
                {isLogged === ev.pubkey ? (
                  <button
                    onClick={() => sendReply(ev.status, ev.pubkey, ev.Dtag)}
                    className="font-sans text-sm font-normal underline ml-2 mt-1  dark:text-gray-1"
                  >
                    {ev.status === "paid"
                      ? "Change status to: In progress"
                      : null}
                    {ev.status === "in progress"
                      ? "Change status to: Paid"
                      : null}
                    {ev.status === "" ? "Change status to: In progress" : null}
                  </button>
                ) : null}
              </div>
            </div>
            <div className="basis-7/12 mt-3">
              <p className="font-sans text-2xl font-semibold dark:text-gray-2">
                {ev.title}
              </p>
              <div className="flex">
                <p className="font-sans text-sm font-normal dark:text-gray-1">
                  posted: {ev.publishedAt} by
                </p>
                <div className="flex">
                  <Link
                    to={`/profile/aa`}
                    className="font-sans text-sm font-light ml-1 underline dark:text-gray-1"
                  >
                    {ev.name === "" || undefined ? "hey chnaged me" : ev.name}
                  </Link>
                  <img
                    className="w-6 h-6 rounded-full shadow-lg ml-2"
                    src={
                      ev.profilePic === "" || undefined
                        ? avatarImage
                        : ev.profilePic
                    }
                    alt="avatar image"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="my-5">
            <ReactMarkdown className="markdown prose-a:underline">
              {ev.content}
            </ReactMarkdown>
          </div>
        </div>
        {ev.status === "paid" ? null : (
          <div className="flex">
            <input
              type="number"
              onChange={(e) => setRewardToAdd(e.target.value)}
              className="peer min-h-[auto] basis-6/12 bg-gray-50 border-y border-x border-dark-text text-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-input-bg-dm dark:text-gray-1 border-0"
              placeholder="add sats to the initial reward"
              value={rewardToAdd}
              required
            />
            <button
              onClick={() => {
                addReward(rewardToAdd, ev.pubkey, ev.Dtag);
                setRewardToAdd("");
              }}
              className="px-5 rounded-lg text-sm ml-1 text-gray-2 dark:text-gray-2 bg-blue-1"
            >
              add sats
            </button>
          </div>
        )}

        <div className="block space-x-2">
          {ev.pledged.map((item: any) => {
            let npubAddedReward = nip19.npubEncode(item.pubkey);
            return (
              <div className="flex space-x-1">
                <div>
                  <img
                    className="w-6 h-6 rounded-full shadow-lg mt-2 sm:ml-0"
                    src={item.profilePic === "" ? avatarImage : item.profilePic}
                    alt="avatar image"
                  />
                </div>
                <Link
                  to={`/profile/${npubAddedReward}`}
                  className="font-sans text-sm font-light mr-3 mt-1 dark:text-gray-2"
                >
                  {item.name === "" ? "not found" : item.name} added{" "}
                  <span className="font-sans text-base underline font-medium  dark:text-gray-2">
                    {formatReward(item.amount)} sats
                  </span>{" "}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-5">
          {isLogged === ev.pubkey ? (
            <div className="flex space-x-2">
              <Link
                to={`/edit/${naddr}`}
                className="cursor-pointer px-3 py-1.5 rounded-lg text-dark-text bg-status-paid-text font-sans text-sm font-normal dark:text-dark-text"
              >
                edit bounty
              </Link>
              <button
                onClick={() => {
                  let event = deleteBounty(ev.id);
                  event.then((data) => {
                    navigate(`/`);
                  });
                }}
                className="cursor-pointer px-3 py-1.5 rounded-lg font-sans bg-alert-1 text-sm font-normal dark:text-gray-1 "
              >
                delete bounty
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        {loaded ? (
          <div>
            {ev.comments.map((item) => {
              return (
                <div>
                  <CommentBox
                    npub={item.npub}
                    content={item.comment}
                    name={item.name}
                    profilePic={item.profilePic}
                  />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="block p-4">
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          className="peer min-h-[auto] basis-6/12 bg-gray-50 border-y border-x border-dark-text text-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-input-bg-dm dark:text-gray-1 border-0"
          placeholder="your comment"
          value={message}
          required
        />
        <button
          onClick={() => {
            sendComment(message, ev.pubkey, ev.Dtag);
            setMessage("");
          }}
          className="px-5 rounded-lg text-sm ml-1 text-gray-2 dark:text-gray-2 bg-blue-1"
        >
          send a comment
        </button>
      </div>
    </div>
  );
}

export default BountyLargeInfor;
