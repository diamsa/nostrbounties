import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { addReward, getNpub, formatReward } from "../../../utils";
import { bountyContent } from "../../../interfaces";
import avatarImage from "../../../assets/avatarImg.png";

type props = {
  content: bountyContent[];
  ids: string[];
  dates: string[];
  pubkeys: string[];
  names: string[];
  profilePic: string[];
};

function ShortBountyInfo({
  content,
  ids,
  dates,
  pubkeys,
  names,
  profilePic,
}: props) {
  const navigate = useNavigate();
  const [displayAddReward, setDisplayAddReward] = useState(true);
  const [rewardToAdd, setRewardToAdd] = useState<string>();

  /* button reward style
class="font-sans text-base font-light bg-blue-700 py-1 px-3 rounded-md text-white mr-1 mt-1"*/
  function displayAddRewardBtn() {
    return (
      <button
        onClick={() => setDisplayAddReward(false)}
        className="font-sans text-base font-light underline mr-1 mt-1"
      >
        add to reward
      </button>
    );
  }

  function displayAddRewardInput(id: string) {
    return (
      <div>
        <input
          type="number"
          onChange={handleRewardToAdd}
          className="bg-gray-50 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Amount in sats"
          required
        />
        <button
          onClick={() => {
            setDisplayAddReward(true);
            addReward(rewardToAdd, id);
          }}
          className='class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
        >
          add reward
        </button>
        <p onClick={() => setDisplayAddReward(true)}>close</p>
      </div>
    );
  }

  const handleRewardToAdd = (event: any) => {
    setRewardToAdd(formatReward(event));
  };

  return (
    <div>
      {ids.map((item, index) => {
        let bountyInfoPath = `/b/${ids[index]}`;
        let bountyPosterPath = `/profile/${pubkeys[index]}`;
        let npub = getNpub(pubkeys[index]);

        return (
          <div className="my-2 mx-10 px-15 py-5 justify-between items-center flex shadow-md border border-gray-200 rounded-md max-w-7xl md: flex-wrap sm: px-5 py-3 mx-4">
            <div className="basis-6/12">
              <p className="font-sans text-base font-normal">
                {content[index].title}
              </p>
              <div>
                <p className="font-sans text-sm text-blue-700 font-semibold mr-1 mt-0.5">
                  {content[index].reward} sats
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between basis-5/12">
              <div className="flex flex-wrap">
                <p
                  onClick={() => navigate(bountyPosterPath)}
                  className="font-sans text-sm font-light underline p-1"
                >
                  by: {names[index] === "" ? npub : names[index]}
                </p>
                <img
                  className="w-8 h-8 rounded-full"
                  src={
                    profilePic[index] === "" ? avatarImage : profilePic[index]
                  }
                  alt="avatar image"
                ></img>
              </div>
              <div>
                <span className="font-sans text-sm font-light">
                  {dates[index]}
                </span>
              </div>
              <div>
                <button
                  onClick={() => navigate(bountyInfoPath)}
                  className="font-sans text-sm font-light inline-flex items-center px-2 py-1 text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  More info
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShortBountyInfo;
