import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RelayPool } from "nostr-relaypool";
import { defaultRelaysToPublish } from "../const";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import SideBarMenu from "../components/menus/sidebarMenu/sidebarMenu";
import ExtensionError from "../components/errors/extensionError";
import EmptyFields from "../components/errors/emptyFields";
import MobileMenu from "../components/menus/mobileMenu/mobileMenu";
import active from "../assets/status-active.svg";

function CreateBounty() {
  let navigate = useNavigate();

  let [title, setTitle] = useState<string>();
  let [content, setContent] = useState<string>();
  let [reward, setReward] = useState<string>();
  let [relay, setRelay] = useState<string>("");
  let [customRelays, setCustomRelays] = useState<string[]>([]);
  let [extensionError, setExtensionError] = useState(false);
  let [displayPreview, setDisplayPreview] = useState(false);
  let [emptyFields, setEmptyFields] = useState(false);
  let [isDesign, setIsDesign] = useState(false);
  let [isDevelopment, setIsDevelopment] = useState(false);
  let [isDebugging, setIsDebugging] = useState(false);
  let [isWriting, setIsWriting] = useState(false);
  let [isCybersecurity, setIsCybersecurity] = useState(false);
  let [isMarketing, setIsMarketing] = useState(false);

  async function postEvent() {
    let eventMessage = {
      id: null,
      pubkey: null,
      content: content,
      created_at: Math.floor(Date.now() / 1000),
      kind: 30023,
      tags: [
        ["t", "bounty"],
        ["title", `${title}`],
        ["reward", `${reward}`],
        ["published_at", `${Math.floor(Date.now() / 1000)}`],
        ["d", `${Math.floor(Date.now() / 1000)}`],
      ],
      sig: null,
    };

    if (isDesign) {
      eventMessage.tags.push(["t", "design-bounty"]);
    }

    if (isDevelopment) {
      eventMessage.tags.push(["t", "development-bounty"]);
    }

    if (isDebugging) {
      eventMessage.tags.push(["t", "debugging-bounty"]);
    }

    if (isWriting) {
      eventMessage.tags.push(["t", "writing-bounty"]);
    }
    if (isCybersecurity) {
      eventMessage.tags.push(["t", "cybersecurity-bounty"]);
    }
    if (isMarketing) {
      eventMessage.tags.push(["t", "marketing-bounty"]);
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
      console.log(relays);
      relayPool.publish(EventMessageSigned, relays);

      if (customRelays.length > 1) {
        relayPool.publish(EventMessageSigned, customRelays);
      }

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
      <div className="p-3 h-screen overflow-y-scroll basis-9/12 space-y-9 lg:px-10 sm:h-screen px-3 sm:mb-24 dark:bg-background-dark-mode">
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
            Which tags fit the best with your bounty? (optional)
          </label>
          <div className="flex flex-wrap space-x-5">
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox-1"
                type="checkbox"
                onClick={() => setIsDesign(!isDesign)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox-1"
                className="ml-1 text-sm font-normal text-gray-900 dark:text-gray-2"
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
                className="ml-1 text-sm font-normal text-gray-900 dark:text-gray-2"
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
                className="ml-1 text-sm font-normal text-gray-900 dark:text-gray-2"
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
                className="ml-1 text-sm font-normal text-gray-900 dark:text-gray-2"
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
                className="ml-1 text-sm font-normal text-gray-900 dark:text-gray-2"
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
                className="ml-1 text-sm font-normal text-gray-900 dark:text-gray-2"
              >
                Marketing
              </label>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1">
            Bounty description in markdown
          </label>
          <div className="flex overflow-x-scroll no-scrollbar ">
            <button
              onClick={() =>
                setContent(content + " [link title](your link goes here)")
              }
              className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
            >
              Link
            </button>
            <button
              onClick={() => setContent(content + " \n\n# text")}
              className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
            >
              H1
            </button>
            <button
              onClick={() => setContent(content + " \n\n## text")}
              className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
            >
              H2
            </button>
            <button
              onClick={() => setContent(content + " \n* item")}
              className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
            >
              Unordered List
            </button>
            <button
              onClick={() => setContent(content + " \n\n>text")}
              className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
            >
              Blockquote
            </button>
            <button
              onClick={() => setContent(content + " \n\n---")}
              className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
            >
              Horizontal rule
            </button>
            <button
              onClick={() => setContent(content + " **text**")}
              className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
            >
              Bold
            </button>
            <button
              onClick={() => setContent(content + " *text*")}
              className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
            >
              Italic
            </button>
            <button
              onClick={() => setContent(content + " \n\n```your code```")}
              className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
            >
              Code snippet
            </button>
          </div>

          <textarea
            onChange={(e) => {
              setContent(e.target.value);
              setDisplayPreview(true);
            }}
            className="peer min-h-[auto] bg-gray-50 border-y border-x border-dark-text text-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sidebar-bg dark:text-gray-1 border-0"
            placeholder="Explain your bounty. You can use the elements above to customize your markdown."
            value={content}
            rows={9}
            required
          ></textarea>
        </div>
        {displayPreview ? (
          <div className="my-4">
            <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1">
              Preview:
            </label>
            <ReactMarkdown className="markdown prose-a:underline bg-gray-50 border border-dark-text rounded-lg px-4 py-2 dark:bg-sidebar-bg dark:border-none">
              {content!}
            </ReactMarkdown>
          </div>
        ) : null}

        <div className="mt-7">
          <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1">
            Relays where your bounty is going to be published:
          </label>
          <div className="flex flex-wrap">
            {defaultRelaysToPublish.map((item) => {
              return (
                <div className="my-2 flex justify-between items-center shadow-md border  rounded-md hover:bg-sidebar-gray lg:mr-2 px-15  sm:flex-wrap px-5 py-3 mx-4 dark:bg-sidebar-bg dark:hover:bg-input-bg-dm dark:border border-blue-1">
                  <img
                    className="w-5 h-3 cursor-pointer my-auto"
                    src={active}
                    alt="active icon"
                  ></img>
                  <p className="text-xs text-center whitespace-pre-wrap text-dark-text font-medium sm:text-sm dark:text-gray-1">
                    {item}
                  </p>
                </div>
              );
            })}
            {customRelays.map((item) => {
              return (
                <div className="my-2 flex justify-between items-center shadow-md border  rounded-md hover:bg-sidebar-gray lg:mr-2 px-15  sm:flex-wrap px-5 py-3 mx-4 dark:bg-sidebar-bg dark:hover:bg-input-bg-dm dark:border border-blue-1">
                  <img
                    className="w-5 h-3 cursor-pointer my-auto"
                    src={active}
                    alt="active icon"
                  ></img>
                  <p className="text-xs text-center whitespace-pre-wrap text-dark-text font-medium sm:text-sm dark:text-gray-1">
                    {item}
                  </p>
                </div>
              );
            })}
            <div className="flex">
              <input
                type="text"
                value={relay}
                onChange={(e) => setRelay(e.target.value)}
                className="bg-gray-50 my-2 mx-2 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-sidebar-bg dark:border-blue-1 dark:placeholder-gray-400 dark:text-gray-2"
                placeholder="nip-33 relays"
                required
              />
              <button
                onClick={() => {
                  setCustomRelays((arr) => [relay, ...arr]);
                  console.log("added");
                  setRelay("");
                }}
                className=" text-xs my-3 px-3 font-medium text-center text-gray-2 bg-blue-1 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-gray-1"
              >
                Add Relay
              </button>
            </div>
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
