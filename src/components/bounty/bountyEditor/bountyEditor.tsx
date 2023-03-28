import { editBounty } from "../../../utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nip19 } from "nostr-tools";

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
        <label className="block text-xl font-medium text-gray-900 dark:text-gray-1">
          New bounty description
        </label>
        <textarea
          defaultValue={oldEvent.content}
          onChange={(e) => setNewContent(e.target.value)}
          className="peer min-h-[auto] bg-gray-50 border-y border-x border-dark-text text-dark-text text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sidebar-bg dark:text-gray-1 border-0"
          rows={9}
          required
        ></textarea>
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
