import { useNavigate, Link } from "react-router-dom";
import { getNpub } from "../../../utils";

import bitcoinIcon from "../../../assets/bitcoin-icon.png";
import avatarImage from "../../../assets/nostr-icon-user.avif";
import { nip19 } from "nostr-tools";

type props = {
  title: string;
  reward: string;
  dates: string;
  pubkeys: string;
  tags: string[];
  DTag: string;
};

function ShortBountyInfo({ title, reward, dates, pubkeys, tags, DTag }: props) {
  const navigate = useNavigate();
  let npub = getNpub(pubkeys);
  let naddr = nip19.naddrEncode({
    identifier: DTag,
    pubkey: pubkeys,
    kind: 30023,
  });
  let bountyInfoPath = `/b/${naddr}`;
  let bountyPosterPath = `/profile/${nip19.npubEncode(pubkeys)}`;

  return (
    <div>
      <div className="my-2 justify-between items-center flex shadow-md border border-gray-200 rounded-md max-w-7xl hover:bg-sidebar-gray px-15  sm:flex-wrap px-5 py-3 mx-2 dark:bg-sidebar-bg dark:hover:bg-input-bg-dm">
        <div
          onClick={() => navigate(bountyInfoPath)}
          className="basis-6/12 cursor-pointer sm:basis-10/12"
        >
          <div className="flex-wrap flex">
            {tags.map((item) => {
              if (item !== "bounty") {
                return (
                  <button
                    key={item}
                    className="font-sans text-xs text-dark-text font-light mx-0.5 rounded-lg dark:text-gray-1"
                  >
                    #{item}
                  </button>
                );
              }
            })}
          </div>
          <p className="font-sans text-base font-medium dark:text-gray-1">
            {title}
          </p>
          <div className="flex flex-wrap">
            <img
              className="w-4 h-4 rounded-full my-1 mx-0.5"
              src={bitcoinIcon}
              alt="bitcoin"
            ></img>
            <p className="font-sans text-sm text-dark-text font-normal mr-1 mt-0.5 dark:text-gray-1">
              {reward} sats
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between ">
          <div className="flex flex-wrap">
            <div className="flex mr-2 my-2">
              <Link
                to={bountyPosterPath}
                className="font-sans text-xs mt-1 font-light underline dark:text-gray-1"
              >
                Poster
              </Link>
            </div>
          </div>
          <div className="mt-2">
            <span className="font-sans text-xs font-light  dark:text-gray-1">
              {dates}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortBountyInfo;
