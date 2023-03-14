import { editBounty } from "../../../utils";
import { useState } from "react";

type props = {
  oldEvent: {
    id: string;
    pubkey: string;
    created_at: number;
    kind: number;
    tags: string[];
    content: string;
    sig: string;
  };
};

function BountyEditor({ oldEvent }: props) {
  let [newContent, setNewContent] = useState<string>("");
  let [oldContent, setOldContent] = useState<string>(oldEvent.content);
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
    <div className="mt-4">
      <label className="block text-xl font-medium text-gray-900 dark:text-gray-1">
        Bounty description in markdown
      </label>
      <textarea
        defaultValue={oldContent}
        onChange={(e) => setNewContent(e.target.value)}
        className="peer min-h-[auto] bg-gray-50 border-y border-x border-dark-text text-dark-text text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sidebar-bg dark:text-gray-1 border-0"
        rows={9}
        required
      ></textarea>
      <button
        onClick={() => {
          editBounty(newEvent);
          setOldContent("");
        }}
        className="w-full  px-4 py-2 text-sm font-medium text-center text-gray-2 bg-blue-1 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-gray-1"
      >
        post bounty
      </button>
    </div>
  );
}

export default BountyEditor;
