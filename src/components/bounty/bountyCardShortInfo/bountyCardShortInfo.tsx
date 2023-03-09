import { useNavigate, Link } from "react-router-dom";

import { getNpub } from "../../../utils";

import bitcoinIcon from "../../../assets/bitcoin-icon.png";

type props = {
  title: string;
  reward: string;
  id: string;
  dates: string;
  pubkeys: string;
};

function ShortBountyInfo({ title, reward, id, dates, pubkeys }: props) {
  const navigate = useNavigate();

  let bountyInfoPath = `/b/${id}`;
  let bountyPosterPath = `/profile/${pubkeys}`;
  let npub = getNpub(pubkeys);
  return (
    <div>
      <div className="my-2  justify-between items-center flex shadow-md border border-gray-200 rounded-md max-w-7xl lg:mx-5 px-15  sm:flex-wrap px-5 py-3 mx-4 dark:bg-sidebar-bg">
        <div className="basis-6/12 sm:basis-10/12">
          <p className="font-sans text-base font-medium dark:text-gray-1">
            {title}
          </p>
          <div className="flex flex-wrap">
            <img
              className="w-4 h-4 rounded-full my-1 mx-0.5"
              src={bitcoinIcon}
              alt="bitcoin image"
            ></img>
            <p className="font-sans text-sm text-dark-text font-normal mr-1 mt-0.5 dark:text-gray-1">
              {reward} sats
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between basis-5/12">
          <div className="flex flex-wrap">
            <p
              onClick={() => navigate(bountyPosterPath)}
              className="font-sans text-sm font-light underline p-1 cursor-pointer dark:text-gray-1"
            >
              by: {npub}
            </p>
          </div>
          <div>
            <span className="font-sans text-sm font-light dark:text-gray-1">
              {dates}
            </span>
          </div>
          <div>
            <button
              onClick={() => navigate(bountyInfoPath)}
              className="font-sans text-sm font-semibold inline-flex items-center px-2 py-1 text-center text-gray-2 bg-blue-1 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-gray-1"
            >
              More info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortBountyInfo;
