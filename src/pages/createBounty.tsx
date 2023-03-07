import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RelayPool } from "nostr-relaypool";
import defaultRelays from "../consts";
import { formatReward } from "../utils";

import SideBarMenu from "../components/sidebarMenu/sidebarMenu";

type content = {
  title: string | null;
  description: string | null;
  reward: string | null;
  discord: string | null;
  telegram: string | null;
  email: string | null;
  other: string | null;
};

type event = {
  target: {
    value: string;
  };
};

function CreateBounty() {
  let [content, setContent] = useState<content>({
    title: null,
    description: null,
    reward: null,
    discord: null,
    telegram: null,
    email: null,
    other: null,
  });
  let [extensionError, setExtensionError] = useState(false);
  let [emptyFields, setEmptyFields] = useState(false);
  let navigate = useNavigate();

  const handleTitle = (event: event) => {
    setContent({ ...content, title: event.target.value });
  };
  const handleDescription = (event: event) => {
    setContent({ ...content, description: event.target.value });
  };
  const handleReward = (event: event) => {
    let reward = formatReward(event);
    setContent({ ...content, reward: reward });
  };
  const handleDiscord = (event: event) => {
    setContent({ ...content, discord: event.target.value });
  };
  const handleTelegram = (event: event) => {
    setContent({ ...content, telegram: event.target.value });
  };
  const handleEmail = (event: event) => {
    setContent({ ...content, email: event.target.value });
  };
  const handleOther = (event: event) => {
    setContent({ ...content, other: event.target.value });
    console.log(event);
  };

  async function postEvent() {
    let contentDataStringify = JSON.stringify(content);
    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 789,
      tags: [["t", "bounty"]],
      content: contentDataStringify,
      sig: null,
    };
    // @ts-ignore
    if (!window.nostr) {
      console.log("you need to install an extension");
      setExtensionError(true);
    }

    if (!content.title || !content.description || !content.reward) {
      setEmptyFields(true);
    } else {
      // @ts-ignore
      let EventMessageSigned = await window.nostr.signEvent(eventMessage);
      let relays = defaultRelays;
      let relayPool = new RelayPool(relays);

      relayPool.publish(EventMessageSigned, relays);

      navigate("/");
    }
  }

  return (
    <div className="flex justify-between">
      <div className="basis-3/12">
        <SideBarMenu />
      </div>
      <div className="h-screen overflow-y-scroll basis-9/12 px-10">
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900">
            Bounty title
          </label>
          <input
            type="text"
            onChange={handleTitle}
            className="peer min-h-[auto] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="i.e. Bounty manager"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900">
            Bounty description
          </label>
          <textarea
            onChange={handleDescription}
            className="peer min-h-[auto] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="i.e. A simple bounty manager for people..."
            required
          ></textarea>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900">
            Bounty reward in Sats
          </label>
          <input
            type="number"
            onChange={handleReward}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="1200 sats"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900">
            Discord User
          </label>
          <input
            type="text"
            onChange={handleDiscord}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="UserCandy#6765"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900">
            telegram user
          </label>
          <input
            type="text"
            onChange={handleTelegram}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="@userCandy"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            type="text"
            onChange={handleEmail}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="usercandy@gmail.com"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900">
            Other
          </label>
          <input
            type="text"
            onChange={handleOther}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="whatsApp, NIP-04..."
          />
        </div>
        <div className="my-4">
          <button
            onClick={postEvent}
            className="w-full  px-4 py-2 text-sm font-medium text-center text-gray-1 bg-blue-1 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            post bounty
          </button>
          <div className="w-full mt-4">
            {extensionError ? (
              <div
              className="flex p-4 mb-4 text-sm text-alert-1 rounded-lg bg-alert-2"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Info</span>
              <div>You need an extension to post</div>
            </div>
            ) : null}
            {emptyFields ? (
              <div
                className="flex p-4 mb-4 text-sm text-dark-text rounded-lg bg-alert-2"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 inline w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Info</span>
                <div>Title, description and reward fields are required</div>
              </div>
            ) : null}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CreateBounty;
