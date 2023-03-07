import { sendReply, getNpub } from "../../../utils";
import { Link } from "react-router-dom";

type content = {
  title: string;
  description: string;
  reward: string;
};

type contact = {
  discord: string;
  telegram: string;
  email: string;
  other: string;
};

type addedToReward = {
  posterPubKey: string;
  amount: string;
};

type props = {
  content: content;
  pubkey: string | undefined;
  date: string | undefined;
  status: string | null;
  contact: contact;
  id: string;
  addedReward: addedToReward[];
};

function BountyLargeInfor({
  content,
  pubkey,
  date,
  status,
  contact,
  id,
  addedReward,
}: props) {
  return (
    <div className="my-4 mx-10 px-10 py-5 justify-between items-center flex border border-gray-200 rounded-lg shadow-md max-w-7xl md: flex-wrap sm:flex-wrap px-5 py-3 mx-4">
      <div>
        <div className="flex justify-between">
          <div className="basis-7/12">
            <p className="font-sans text-2xl font-semibold">{content.title}</p>
            <p className="font-sans text-sm font-light mb-2">posted: {date}</p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="font-sans text-base font-light py-1 px-2 mr-1 rounded-lg bg-status-paid-text text-status-paid font-medium">
                {content.reward} sats
              </p>
            </div>
            <div>
              {status === null ? (
                <p className="bg-status-open text-status-open-text py-1 px-2 rounded-lg">
                  Status: Open
                </p>
              ) : status === "in progress" ? (
                <p className="bg-status-in-progress text-status-in-progress-text py-1 px-2 rounded-lg">
                  Status: In progress
                </p>
              ) : (
                <p className="bg-status-paid text-status-paid-text py-1 px-2 rounded-lg">
                  Status: Paid
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="font-sans text-sm text-dark-text font-ligh whitespace-pre-line">
            {content.description}
          </p>
        </div>

        <div className="flex justify-between my-3">
          <p className="font-sans text-base font-light mr-3 mt-1">
            Discord:
            {contact.discord === null || ""
              ? "no added discord"
              : contact.discord}
          </p>
          <p className="font-sans text-base font-light mr-3 mt-1">
            Telegram:
            {contact.telegram === null || ""
              ? "no added Telegram"
              : contact.telegram}
          </p>
          <p className="font-sans text-base font-light mr-3 mt-1">
            Email:{" "}
            {contact.email === null || "" ? "no added email" : contact.email}
          </p>
          <p className="font-sans text-base font-light mr-3 mt-1">
            Other:
            {contact.other === null || "" ? "no added whatsapp" : contact.other}
          </p>
        </div>
      </div>

      <Link
        to={`/profile/${pubkey}`}
        className="font-sans text-sm font-light underline"
      >
        Poster information
      </Link>

      <button
        onClick={() => sendReply(status, id, pubkey)}
        className="font-sans text-base font-light underline mr-3 mt-1"
      >
        Reply new state
      </button>
      <div className="block">
        {addedReward.map((item: any) => {
          return (
            <Link
              to={`/profile/${item.posterPubkey}`}
              className="font-sans text-base font-light mr-3 mt-1 underline"
            >
              {getNpub(item.posterPubkey)} added{" "}
              <span className="font-sans text-base font-medium">
                {item.amount}
              </span>{" "}
              sats
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BountyLargeInfor;
