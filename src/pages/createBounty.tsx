import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RelayPool } from "nostr-relaypool";
import { formatReward } from "../utils";

import SideBarMenu from "../components/sidebarMenu/sidebarMenu";
import ExtensionError from "../components/errors/extensionError";
import EmptyFields from "../components/errors/emptyFields";


function CreateBounty() {
  let defaultRelays = JSON.parse(localStorage.getItem("relays")!);
  let navigate = useNavigate();

  let [title, setTitle] = useState<string>();
  let [content, setContent] = useState<string>();
  let [reward, setReward] = useState<string>();
  let [extensionError, setExtensionError] = useState(false);
  let [emptyFields, setEmptyFields] = useState(false);

  async function postEvent() {
    let eventMessage = {
      id: null,
      pubkey: null,
      created_at: Math.floor(Date.now() / 1000),
      kind: 30023,
      tags: [
        ["t", "bounty"],
        ["title", `${title}`],
        ["reward", `${reward}`],
        ["published_at", Math.floor(Date.now() / 1000)],
      ],
      content: content,
      sig: null,
    };
    // @ts-ignore
    if (!window.nostr) {
      console.log("you need to install an extension");
      setExtensionError(true);
    }

    if (!content || !title || !reward) {
      setEmptyFields(true);
    } else {
      // @ts-ignore
      let EventMessageSigned = await window.nostr.signEvent(eventMessage);
      let relayPool = new RelayPool(defaultRelays);
      console.log(EventMessageSigned);
      relayPool.publish(EventMessageSigned, defaultRelays);

      navigate("/");
    }
  }

  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12">
        <SideBarMenu />
      </div>
      <div className="p-3 h-screen overflow-y-scroll basis-9/12 space-y-9 lg:px-10 sm:h-screen px-3 dark:bg-background-dark-mode">
        <div className="mt-4">
          <label className="block text-xl font-medium text-gray-900 dark:text-gray-1">
            Bounty title
          </label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="peer min-h-[auto] bg-gray-50 border-y border-x border-dark-text text-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sidebar-bg dark:text-gray-1 border-0"
            placeholder="i.e. Bounty manager"
            value={title}
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-xl font-medium my-1 text-gray-900 dark:text-gray-1">
            Bounty reward in Sats
          </label>
          <input
            type="number"
            onChange={(e) => setReward(e.target.value)}
            className="bg-gray-50 border-y border-x border-dark-text text-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sidebar-bg dark:text-gray-1 border-0"
            placeholder="1200 sats"
            value={reward}
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-xl font-medium text-gray-900 dark:text-gray-1">
            Bounty description in markdown
          </label>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            className="peer min-h-[auto] bg-gray-50 border-y border-x border-dark-text text-dark-text text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sidebar-bg dark:text-gray-1 border-0"
            placeholder="give your bounty a title and a description. Add your contact details. In markdown"
            value={content}
            rows={9}
            required
          ></textarea>
        </div>

        <div className="my-4">
          <button
            onClick={postEvent}
            className="w-full  px-4 py-2 text-sm font-medium text-center text-gray-2 bg-blue-1 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-gray-1"
          >
            post bounty
          </button>
          <div className="w-full mt-4">
            {extensionError ? <ExtensionError /> : null}
            {emptyFields ? <EmptyFields /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBounty;
