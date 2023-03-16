import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RelayPool } from "nostr-relaypool";
import { defaultRelaysToPublish } from "../const";

import SideBarMenu from "../components/menus/sidebarMenu/sidebarMenu";
import ExtensionError from "../components/errors/extensionError";
import EmptyFields from "../components/errors/emptyFields";
import MobileMenu from "../components/menus/mobileMenu/mobileMenu";

function CreateBounty() {
  let navigate = useNavigate();

  let [title, setTitle] = useState<string>();
  let [content, setContent] = useState<string>();
  let [reward, setReward] = useState<string>();
  let [extensionError, setExtensionError] = useState(false);
  let [emptyFields, setEmptyFields] = useState(false);
  let [isDesign, setIsDesign] = useState(false);
  let [isDevelopment, setIsDevelopment] = useState(false);
  let [isDebugging, setIsDebugging] = useState(false);
  let [isWriting, setIsWriting] = useState(false);
  let [isCybersecurity, setIsCybersecurity] = useState(false);
  let [isMarketing, setIsMarketing] = useState(false);
  let [id, setId] = useState(null);

  async function postEvent() {
    let eventMessage = {
      id: null,
      pubkey: "8425d0460136752a32f77e311456ae97a89604ed8cab59bade6f422415751eeb",
      content: content,
      created_at: Math.floor(Date.now() / 1000),
      kind: 30023,
      tags: [
        ["t", "bounty"],
        ["title", `${title}`],
        ["reward", `${reward}`],
        ["published_at", `${Math.floor(Date.now() / 1000)}`],
        ["d", `${Math.floor(Date.now() / 1000)}`]
      ],
      sig: null,
    };

    if (isDesign) {
      eventMessage.tags.push(["t", "design"]);
    }

    if (isDevelopment) {
      eventMessage.tags.push(["t", "development"]);
    }

    if (isDebugging) {
      eventMessage.tags.push(["t", "debugging"]);
    }

    if (isWriting) {
      eventMessage.tags.push(["t", "writing"]);
    }
    if (isCybersecurity) {
      eventMessage.tags.push(["t", "cybersecurity"]);
    }
    if (isMarketing) {
      eventMessage.tags.push(["t", "marketing"]);
    }

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

      let relays = defaultRelaysToPublish;
      let relayPool = new RelayPool(relays);
      console.log(EventMessageSigned);
      relayPool.publish(EventMessageSigned, relays);

      navigate("/");
    }
  }

  return (
    <div className="flex justify-between sm:block">
      <div className="basis-3/12 sm:hidden">
        <SideBarMenu />
      </div>
      <div className="basis-3/12 lg:hidden md:hidden">
        <MobileMenu />
      </div>
      <div className="p-3 h-screen overflow-y-scroll basis-9/12 space-y-9 lg:px-10 sm:h-screen px-3 dark:bg-background-dark-mode">
        <div className="mt-4">
          <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1">
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
          <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1">
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
          <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1">
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
        <div className="mt-4">
          <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1">
            Which tags fit the best with your bounty? (optional)
          </label>

          <div className="flex items-center mb-4">
            <input
              id="default-checkbox-1"
              type="checkbox"
              onClick={() => setIsDesign(!isDesign)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox-1"
              className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-2"
            >
              Design and creative
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox-2"
              type="checkbox"
              onClick={() => setIsDevelopment(!isDevelopment)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox-2"
              className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-2"
            >
              Development
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox-3"
              type="checkbox"
              onClick={() => setIsDebugging(!isDebugging)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox-3"
              className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-2"
            >
              Debugging
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox-4"
              type="checkbox"
              onClick={() => setIsWriting(!isWriting)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox-4"
              className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-2"
            >
              Writing and translation
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox-5"
              type="checkbox"
              onClick={() => setIsCybersecurity(!isCybersecurity)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox-5"
              className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-2"
            >
              Cybersecurity
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox-6"
              type="checkbox"
              onClick={() => setIsMarketing(!isMarketing)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox-6"
              className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-2"
            >
              Marketing
            </label>
          </div>
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
