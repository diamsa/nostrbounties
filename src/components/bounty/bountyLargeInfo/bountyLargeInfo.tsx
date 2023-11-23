import {
  getNpub,
  addReward,
  formatReward,
  deleteEvent,
  isDarkTheme,
  shareBounty,
  sendReply,
} from "../../../utils";
import { Link, useNavigate } from "react-router-dom";
import { nip19 } from "nostr-tools";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import avatarImage from "../../../assets/nostr-icon-user.avif";
import shareIconDm from "../../../assets/share-icon-dm.svg";
import shareIconLg from "../../../assets/share-icon-lg.svg";
import CouldNotShare from "../../errors/couldNotShare";
import editIconDm from "../../../assets/edit-icon-dm.svg";
import editIconLg from "../../../assets/edit-icon-lg.svg";
import deleteIcon from "../../../assets/delete-icon.svg";

import ApplicantBox from "../bountyApplicantsBox/bountyApplicantsBox";
import LNInvoice from "../../payment/LNInvoice";
import BountyUpdateStatusCard from "../bountyStatus/bountyStatus";

type event = {
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
  bountyHunterMetaData: {
    name: string;
    profilePic: string;
    pubkey: string;
    lnAddress: string | null;
  };
  applications: {
    pubkey: string;
    name: string;
    profilePic: string;
    content: string;
    id: string;
    createdAt: number;
    links: { github: string; personalWebsite: string };
  }[];
};

function BountyLargeInfor({ ev, updateValues, dataLoaded }: event | any) {
  let naddr = nip19.naddrEncode({
    identifier: ev.Dtag,
    pubkey: ev.pubkey,
    kind: 30023,
  });

  console.log(ev);

  let [rewardToAdd, setRewardToAdd] = useState<string>("");
  let [rewardNoteToAdd, setRewardNoteToAdd] = useState<string>("");
  let [notShared, setNotShared] = useState(false);
  let [updateStatusModal, setUpdateStatusModal] = useState(false);
  let [LNInvoiceModal, setLNInvoiceModal] = useState(false);

  let totalReward = getFinalReward();
  let isLogged = sessionStorage.getItem("pubkey");
  let posterNpub = nip19.npubEncode(ev.pubkey);
  let posterNpubShortened = getNpub(ev.pubkey);
  let bountyHunterNpub = nip19.npubEncode(ev.bountyHunterMetaData.pubkey);
  let bountyHunterNpubShortened = getNpub(ev.bountyHunterMetaData.pubkey);
  let navigate = useNavigate();

  function getFinalReward() {
    let totalReward = ev.reward;
    ev.pledged.map((item: any) => {
      let value = parseInt(item.amount);
      totalReward += value;
    });

    return totalReward;
  }

  async function shareBountyFn() {
    let wasShared = await shareBounty(`https://nostrbounties.com/b/${naddr}`);
    if (wasShared !== undefined) {
      setNotShared(!notShared);

      setTimeout(() => {
        setNotShared(false);
      }, 2000);
    }
  }

  function changeStatusToPaid() {
    sendReply(
      ev.status,
      bountyHunterNpub,
      ev.Dtag,
      ev.pubkey,
      ev.id,
      naddr
    ).then(() => {
      updateValues(false);
      dataLoaded(false);
    });
  }

  function deleteEventFn() {
    let event = deleteEvent(ev.id);
    event.then((data) => {
      navigate(`/`);
    });
  }

  return (
    <div>
      {notShared ? <CouldNotShare /> : null}
      {updateStatusModal ? (
        <BountyUpdateStatusCard
          isModalOpen={updateStatusModal}
          closeModal={setUpdateStatusModal}
          dTag={ev.Dtag}
          currentStatus={ev.status}
          applicants={ev.applications}
          posterPubkey={ev.pubkey}
          naddr={naddr}
          id={ev.id}
          updateValues={updateValues}
          dataLoaded={dataLoaded}
        />
      ) : null}
      {LNInvoiceModal ? (
        <LNInvoice
          amount={ev.reward}
          bountyHunterMetadata={ev.bountyHunterMetaData}
          posterPubkey={ev.pubkey}
          naddr={naddr}
          closeModal={setLNInvoiceModal}
          eventId={ev.id}
          updateValues={updateValues}
          dataLoaded={dataLoaded}
        />
      ) : null}

      <div className="mt-4 items-center border border-gray-200 rounded-lg shadow-md max-w-7xl lg:py-5 md: flex-wrap sm:flex-wrap px-5 py-3 mx-4 dark:bg-sidebar-bg dark:border-0">
        <div>
          <div>
            <div className="flex flex-wrap justify-between">
              <div>
                <div className="flex flex-wrap">
                  <p className="font-sans text-base py-1 px-2 mr-1 mt-2 rounded-lg bg-status-paid-text text-status-paid font-medium sm:text-sm dark:text-status-paid">
                    {formatReward(totalReward)} sats
                  </p>
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
                      <div>
                        {ev.status !== "in progress" || ev.status === "paid" ? (
                          <button
                            onClick={() => setUpdateStatusModal(true)}
                            className="font-sans text-sm font-normal underline ml-2 mt-2  dark:text-gray-1"
                          >
                            Change status to: In progress
                          </button>
                        ) : null}
                        {ev.status === "in progress" &&
                        ev.bountyHunterMetaData.lnAddress !== undefined &&
                        ev.bountyHunterMetaData.lnAddress !== null ? (
                          <button
                            onClick={() => setLNInvoiceModal(true)}
                            className="font-sans text-sm font-normal underline ml-2 mt-2  dark:text-gray-1"
                          >
                            Change status to: Paid
                          </button>
                        ) : null}
                        {(ev.status === "in progress" &&
                          ev.bountyHunterMetaData.lnAddress === null) ||
                        ev.bountyHunterMetaData.lnAddress === undefined ? (
                          <p
                            onClick={() => changeStatusToPaid()}
                            className="font-sans text-sm font-normal underline ml-2 mt-2 cursor-pointer  dark:text-gray-1"
                          >
                            We couldn't find bounty hunter's LN address.
                            <br></br>Click here to change status to <i>Paid</i>{" "}
                            manually
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <img
                  title="share bounty"
                  className="w-7 h-5 my-1 cursor-pointer sm:mt-3"
                  src={isDarkTheme() ? shareIconDm : shareIconLg}
                  onClick={() => shareBountyFn()}
                  alt="share icon"
                ></img>
                {isLogged === ev.pubkey ? (
                  <div className="flex">
                    <img
                      title="edit bounty"
                      className="w-7 h-5 my-1 cursor-pointer sm:mt-3"
                      src={isDarkTheme() ? editIconDm : editIconLg}
                      onClick={() => navigate(`/edit/${naddr}`)}
                      alt="edit icon"
                    ></img>
                    <img
                      title="delete bounty"
                      className="w-7 h-5 my-1 cursor-pointer sm:mt-3"
                      src={deleteIcon}
                      onClick={() => {
                        deleteEventFn();
                      }}
                      alt="delete icon"
                    ></img>
                  </div>
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
                    to={`/profile/${posterNpub}`}
                    className="font-sans text-sm font-light ml-1 underline dark:text-gray-1"
                  >
                    {ev.name === "" || ev.name === undefined
                      ? posterNpubShortened
                      : ev.name}
                  </Link>
                  <img
                    className="w-6 h-6 rounded-full shadow-lg ml-2"
                    src={
                      ev.profilePic === "" || ev.profilePic === undefined
                        ? avatarImage
                        : ev.profilePic
                    }
                    alt="avatar image"
                  />
                </div>
              </div>
              {ev.status === "in progress" || "paid" ? (
                <div className="flex">
                  <p className="font-sans text-sm font-normal dark:text-gray-1">
                    Bounty Hunter:
                  </p>

                  <Link
                    to={`/profile/${bountyHunterNpub}`}
                    className="font-sans text-sm font-light ml-1 underline dark:text-gray-1"
                  >
                    {ev.bountyHunterMetaData.name === "" ||
                    ev.bountyHunterMetaData.name === undefined
                      ? bountyHunterNpubShortened
                      : ev.bountyHunterMetaData.name}
                  </Link>
                  <img
                    className="w-6 h-6 rounded-full shadow-lg ml-2"
                    src={
                      ev.bountyHunterMetaData.profilePic === "" ||
                      ev.bountyHunterMetaData.profilePic === undefined
                        ? avatarImage
                        : ev.bountyHunterMetaData.profilePic
                    }
                    alt="avatar image"
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div className="my-5">
            <ReactMarkdown className="markdown prose-a:underline">
              {ev.content}
            </ReactMarkdown>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-4 mt-4">
          {ev.pledged.map((item: any) => {
            let npubAddedReward = nip19.npubEncode(item.pubkey);
            let userWithoutName = getNpub(item.pubkey);
            return (
              <div className="flex space-x-1">
                <div
                  key={item.identifier}
                  className="posterAdded flex space-x-2 bg-stone-100 dark:bg-input-bg-dm shadow-sm py-2 px-4 rounded-lg font-light dark:text-gray-2"
                >
                  <div>
                    <img
                      className="w-6 h-6 rounded-full shadow-lg mt-2 sm:ml-0"
                      src={
                        item.profilePic === "" ? avatarImage : item.profilePic
                      }
                      alt="avatar image"
                    />
                  </div>
                  <div className="mt-1">
                    <Link
                      to={`/profile/${npubAddedReward}`}
                      className="underline text-sm font-medium"
                    >
                      {item.name === "" ? userWithoutName : item.name}
                    </Link>{" "}
                    added{" "}
                    <span className="font-medium text-sm">
                      {formatReward(item.amount)} sats
                    </span>{" "}
                    {item.note.length > 0 && (
                      <span className="break-words">
                        with the note:{" "}
                        <span className="italic block break-all">
                          {item.note}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {ev.status === "paid" ? null : (
          <div className="flex flex-col gap-2 pt-2 pb-2">
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
                addReward(
                  rewardToAdd,
                  rewardNoteToAdd,
                  ev.id,
                  ev.pubkey,
                  ev.Dtag,
                  naddr
                );
                setRewardToAdd("");
              }}
              className="rounded-lg px-4 py-2 text-sm text-white dark:text-white font-bold bg-blue-1 hover:bg-blue-800"
            >
              add sats
            </button>
          </div>
        )}
      </div>
      <div>
        {ev.applications.map((applications: any) => {
          return (
            <div>
              <ApplicantBox
                pubkey={applications.pubkey}
                content={applications.content}
                id={applications.id}
                links={applications.links}
                createdAt={applications.createdAt}
                posterPubkey={ev.pubkey}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BountyLargeInfor;
