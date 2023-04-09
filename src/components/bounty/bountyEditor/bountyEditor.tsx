import { editBounty } from "../../../utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nip19 } from "nostr-tools";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type props = {
  oldEvent: {
    id: string;
    pubkey: string;
    created_at: number;
    kind: number;
    tags: string[][];
    content: string;
    sig: string;
  };
};

function BountyEditor({ oldEvent }: props) {
  let [newContent, setNewContent] = useState<string>(oldEvent.content);
  let [newTitle, setNewTitle] = useState<string>(oldEvent.tags[1][1]);
  let [displayPreview, setDisplayPreview] = useState(false);
  oldEvent.tags[1].splice(1, 1, newTitle);

  let navigate = useNavigate();
  let newEvent = {
    id: null,
    pubkey: oldEvent.pubkey,
    created_at: Math.floor(Date.now() / 1000),
    kind: 30023,
    tags: oldEvent.tags,
    content: newContent,
    sig: null,
  };

  return (
    <div>
      <div className="mt-4">
        <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1">
          Bounty title
        </label>
        <input
          type="text"
          onChange={(e) => setNewTitle(e.target.value)}
          className="peer min-h-[auto] bg-gray-50 border-y border-x border-dark-text text-dark-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sidebar-bg dark:text-gray-1 border-0"
          placeholder="i.e. Bounty manager"
          value={oldEvent.tags[1][1]}
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-xl font-medium mt-4 text-gray-900 dark:text-gray-1">
          New bounty description
        </label>
        <div className="mb-2 mt-4 flex overflow-x-scroll no-scrollbar ">
          <button
            onClick={() =>
              setNewContent(newContent + " [link title](your link goes here)")
            }
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Link
          </button>
          <button
            onClick={() => setNewContent(newContent + " \n\n# text")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            H1
          </button>
          <button
            onClick={() => setNewContent(newContent + " \n\n## text")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            H2
          </button>
          <button
            onClick={() => setNewContent(newContent + " \n* item")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Unordered List
          </button>
          <button
            onClick={() => setNewContent(newContent + " \n\n>text")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Blockquote
          </button>
          <button
            onClick={() => setNewContent(newContent + " \n\n---")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Horizontal rule
          </button>
          <button
            onClick={() => setNewContent(newContent + " **text**")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Bold
          </button>
          <button
            onClick={() => setNewContent(newContent + " *text*")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Italic
          </button>
          <button
            onClick={() => setNewContent(newContent + " \n\n```your code```")}
            className="py-1.5 px-4 mr-2 mb-2 text-xs font-medium whitespace-nowrap text-dark-text rounded-full border border-gray-200  dark:focus:ring-gray-700 dark:bg-sidebar-bg dark:text-gray-2 dark:border-blue-1"
          >
            Code snippet
          </button>
        </div>
        <textarea
          onChange={(e) => {
            setNewContent(e.target.value);
            setDisplayPreview(true);
          }}
          className="peer min-h-[auto] bg-gray-50 border-y border-x border-dark-text text-dark-text text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sidebar-bg dark:text-gray-1 border-0"
          rows={9}
          value={newContent}
          required
        ></textarea>
        <div className="mt-4">
          {displayPreview ? (
            <div className="my-5">
              <label className="block text-xl font-medium my-3 text-gray-900 dark:text-gray-1">
                Preview:
              </label>
              <ReactMarkdown className="markdown prose-a:underline bg-gray-50 border border-dark-text rounded-lg px-4 py-2 dark:bg-sidebar-bg dark:border-none">
                {newContent}
              </ReactMarkdown>
            </div>
          ) : null}
        </div>

        <button
          onClick={() => {
            let event = editBounty(newEvent);
            event.then((data) => {
              let naddrEvent = nip19.naddrEncode({
                identifier: data.tags[4][1],
                pubkey: data.pubkey,
                kind: 30023,
              });
              navigate(`/b/${naddrEvent}`);
            });
          }}
          className="w-full  px-4 py-2 mt-3 text-sm font-medium text-center text-gray-2 bg-blue-1 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-gray-1"
        >
          post bounty
        </button>
      </div>
    </div>
  );
}

export default BountyEditor;
