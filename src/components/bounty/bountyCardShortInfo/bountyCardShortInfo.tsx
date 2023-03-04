import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { addReward, getNpub, formatReward} from "../../../utils";
import { bountyContent } from "../../../interfaces";

type props={
  content:bountyContent,
  ids: string[],
  dates:string[],
  pubkeys:string[]
}

function shortBountyInfo({content, ids, dates, pubkeys}:props) {

    const navigate = useNavigate()
    const [displayAddReward, setDisplayAddReward] = useState(true);
    const [rewardToAdd, setRewardToAdd] = useState<string>();
    let i = -1;
    
    /* button reward style
class="font-sans text-base font-light bg-blue-700 py-1 px-3 rounded-md text-white mr-1 mt-1"*/
  function displayAddRewardBtn(){
  return(
    <button onClick={()=> setDisplayAddReward(false)} class="font-sans text-base font-light underline mr-1 mt-1">add to reward</button>
  )}

  function displayAddRewardInput(id:string){
  return(<div>
    <input type="number" onChange={handleRewardToAdd} class="bg-gray-50 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Amount in sats" required />
    <button onClick={()=> {setDisplayAddReward(true); addReward(rewardToAdd, id)}} class='class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'>add reward</button>
    <p onClick={()=> setDisplayAddReward(true)}>close</p>
  </div>
    
  )
  }

  const handleRewardToAdd = (event: string)=>{
  setRewardToAdd(formatReward(event))
  }


  function createComponent(i: number) {
   let bountyInfoPath = `/b/${ids[i]}`;
   let bountyPosterPath = `/profile/${pubkeys[i]}`
   let npub = getNpub(pubkeys[i]);

    return(
            
    <div class="my-2 mx-10 px-12 py-5 justify-between items-center flex shadow-md border border-gray-200 rounded-md max-w-7xl md: flex-wrap sm: px-5 py-3 mx-4">
      <p class="font-sans text-base font-semibold">{content[i].title}</p>
      <p onClick={()=> navigate(bountyPosterPath)} class="font-sans text-sm font-light underline">by {npub}</p>
      <span class="font-sans text-sm font-light">{dates[i]}</span>
      <p class="font-sans text-base font-light mr-1 mt-1">{content[i].reward} sats</p>
      <button onClick={()=>navigate(bountyInfoPath) } class="font-sans text-base font-light underline mr-3 mt-1">More info</button>
      {displayAddReward ? displayAddRewardBtn() : displayAddRewardInput(ids[i])}
   </div>
        )
    }


    return ( <div>
        {ids.map(()=>{
            i++
            return(<div>
                {createComponent(i)}
            </div>)
        })}
    </div> );
}

export default shortBountyInfo;