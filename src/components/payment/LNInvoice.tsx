import { useState, useEffect } from "react";
import {
  getLNService,
  getZapEvent,
  getLNInvoice,
  isDarkTheme,
  shortenedLNurl,
  sendReply,
} from "../../utils";
import QRCode from "react-qr-code";
import { nip19 } from "nostr-tools";

import closeIconLg from "../../assets/close-icon-lg.svg";
import closeIconDm from "../../assets/close-icon-dm.svg";
import copyIconLg from "../../assets/copy-icon-lg.svg";
import copyIconDm from "../../assets/copy-icon-dm.svg";
import avatarImage from "../../assets/nostr-icon-user.avif";

function LNInvoice({
  amount,
  bountyHunterMetadata,
  posterPubkey,
  naddr,
  closeModal,
  eventId,
  updateValues,
  dataLoaded,
}: any) {
  let miliSatsAmount = amount * 1000;
  let miliSatsAmountStr = miliSatsAmount.toString();
  let currentStatus = "in progress";
  let bountyHunterNpub = nip19.npubEncode(bountyHunterMetadata.pubkey);
  // @ts-ignore
  let dTag = nip19.decode(naddr).data.identifier;
  let id = eventId;

  let [comment, setComment] = useState<string>("");
  let [LNservice, setLNservice] = useState();
  let [displayLNInvoice, setDisplayLNInvoice] = useState(false);
  let [LNurl, setLNurl] = useState();
  let [wasLNurlCopied, setWasLNurlCopied] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(LNurl!);
    setWasLNurlCopied(true);
    setTimeout(() => {
      setWasLNurlCopied(false);
    }, 2500);
  }

  useEffect(() => {
    let bountyHunterLNAddress = bountyHunterMetadata.lnAddress;
    getLNService(bountyHunterLNAddress)?.then((data) => {
      setLNservice(data);
    });
  }, []);

  return (
    <div className="fixed bg-background-dark-mode bg-opacity-80 backdrop-blur-sm left-0 right-0 top-0 bottom-0">
      <div className="mx-60 my-20 px-10 py-5 overflow-y-scroll rounded-xl h-5/6 bg-gray-50 dark:bg-input-bg-dm sm:mx-4 sm:my-10 sm:px-5">
        {!displayLNInvoice ? (
          <div>
            <div className="flex justify-between">
              <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1 sm:text-base">
                Bounty Payment:
              </label>
              <img
                className="w-8 h-6 my-1 cursor-pointer"
                onClick={() => closeModal()}
                src={isDarkTheme() ? closeIconLg : closeIconDm}
                alt="close icon"
              ></img>
            </div>
            <div className="flex mt-4">
              <img
                className="w-6 h-6 rounded-full shadow-lg mr-2 sm:ml-0"
                src={
                  bountyHunterMetadata.profilePic === ""
                    ? avatarImage
                    : bountyHunterMetadata.profilePic
                }
                alt="avatar image"
              />
              <div className="block">
                <p className="text-xs text-dark-text dark:text-gray-1">
                  {bountyHunterMetadata.name} is going to get paid:
                </p>

                <p className="text-dark-text font-medium text-xl dark:text-gray-2">
                  {amount} sats
                </p>
              </div>
            </div>
            <div className="mt-4">
              <input
                type="text"
                onChange={(e) => setComment(e.target.value)}
                className="peer min-h-[auto] bg-gray-50 border-y border-x border-dark-text text-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sidebar-bg dark:text-gray-1 border-0"
                placeholder="Add a comment..."
                required
              />
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
                  getZapEvent(
                    comment,
                    bountyHunterMetadata.pubkey,
                    posterPubkey,
                    miliSatsAmountStr,
                    naddr
                  ).then((event) => {
                    let zapEvent = JSON.stringify(event);
                    getLNInvoice(
                      zapEvent,
                      comment,
                      LNservice,
                      miliSatsAmountStr
                    )
                      .then((response) => response?.json())
                      .then((data) => {
                        setLNurl(data.pr);
                        setDisplayLNInvoice(true);
                      });
                  });
                }}
                className="w-full  px-4 py-2 text-sm font-medium text-center text-gray-2 bg-blue-1 rounded-lg hover:bg-blue-1 dark:text-white"
              >
                Confirm bounty payment
              </button>
            </div>
          </div>
        ) : null}
        {displayLNInvoice ? (
          <div>
            <div className="flex justify-end">
              <img
                className="w-8 h-6 cursor-pointer"
                onClick={() => closeModal()}
                src={isDarkTheme() ? closeIconLg : closeIconDm}
                alt="close icon"
              ></img>
            </div>
            <div className="my-2">
              <p className="block text-xl font-medium text-center text-gray-900 dark:text-gray-1 sm:text-base">
                LN invoice:
              </p>
            </div>

            <div className="flex justify-center">
              <div className="bg-white p-2">
                <QRCode value={`${LNurl}`} />
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <p className="text-base text-center mx-1 text-dark-text dark:text-gray-1">
                {shortenedLNurl(LNurl!)}
              </p>

              {wasLNurlCopied ? (
                <p className="text-base text-center text-dark-text dark:text-gray-1">
                  copied!
                </p>
              ) : (
                <img
                  title="copy user LNurl"
                  className="w-7 h-5 my-1 cursor-pointer sm:mt-3"
                  onClick={() => copyToClipboard()}
                  src={isDarkTheme() ? copyIconDm : copyIconLg}
                  alt="copy icon"
                ></img>
              )}
            </div>
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
                Mark this bounty as paid
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LNInvoice;
