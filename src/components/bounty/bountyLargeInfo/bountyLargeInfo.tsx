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
  whatsapp: string;
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
    <div className="my-4 mx-10 px-10 py-3 justify-between items-center flex border border-gray-200 rounded-lg shadow-md max-w-7xl md: flex-wrap sm:flex-wrap px-5 py-3 mx-4">
      <p className="font-sans text-2xl font-semibold">{content.title}</p>
      <p className="font-sans text-base font-ligh whitespace-pre-line">
        {content.description}
      </p>
      <Link
        to={`/profile/${pubkey}`}
        className="font-sans text-sm font-light mb-2 underline"
      >
        Poster information
      </Link>
      <p className="font-sans text-sm font-light mb-2">posted: {date}</p>
      <p className="font-sans text-base font-light mr-1 mt-1">
        initial reward: {content.reward} sats
      </p>

      <button
        onClick={() => sendReply(status, id, pubkey)}
        className="font-sans text-base font-light underline mr-3 mt-1"
      >
        Reply new state
      </button>
      <div>
            <p className="font-sans text-base font-light mr-3 mt-1">
              Discord:
              {contact.discord === null || "" ? "no added discord" : contact.discord}
            </p>
            <p className="font-sans text-base font-light mr-3 mt-1">
              Telegram:
              {contact.telegram === null || ""
                ? "no added Telegram"
                : contact.telegram}
            </p>
            <p className="font-sans text-base font-light mr-3 mt-1">
              Email: {contact.email === null || "" ? "no added email" : contact.email}
            </p>
            <p className="font-sans text-base font-light mr-3 mt-1">
              WhatsApp:
              {contact.whatsapp === null || ""
                ? "no added whatsapp"
                : contact.whatsapp}
            </p>
          </div>

      {status === null ? (
        <p className="bg-green-500 py-1 px-2 rounded-lg">Status: Open</p>
      ) : status === "in progress" ? (
        <p className="bg-yellow-500 py-1 px-2 rounded-lg">
          Status: In progress
        </p>
      ) : (
        <p className="bg-blue-500 py-1 px-2 rounded-lg">Status: Paid</p>
      )}

      {addedReward.map((item:any) => {
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
  );
}

export default BountyLargeInfor;
