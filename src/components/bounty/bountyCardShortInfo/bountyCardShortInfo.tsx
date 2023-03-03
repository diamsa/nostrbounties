import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { addReward, getNpub} from "../../../utils";



function shortBountyInfo({content, ids, dates, pubkeys}) {

    const navigate = useNavigate()
    const [displayAddReward, setDisplayAddReward] = useState(true);
    const [rewardToAdd, setRewardToAdd] = useState();
    let i = -1;
    
    /* button reward style
class="font-sans text-base font-light bg-blue-700 py-1 px-3 rounded-md text-white mr-1 mt-1"*/

function displayAddRewardBtn(){
  return(
    <button onClick={()=> setDisplayAddReward(false)} class="font-sans text-base font-light underline mr-1 mt-1">add to reward</button>
  )
}

function displayAddRewardInput(id){
  return(<div>
    <input type="number" onChange={handleRewardToAdd} class="bg-gray-50 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Amount in sats" required />
    <button onClick={()=> {setDisplayAddReward(true); addReward(rewardToAdd, id)}} class='class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'>add reward</button>
    <p onClick={()=> setDisplayAddReward(true)}>close</p>
  </div>
    
  )
}

const handleRewardToAdd = (event)=>{
  const rewardUnformatted = parseInt(event.target.value);
  const rewardFormatted = rewardUnformatted.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  setRewardToAdd(rewardFormatted)
}


    function createComponent(i) {
     let fullInfoPath = `/b/${ids[i]}`       
            return(
            
                <div class="my-2 mx-10 px-12 py-5 justify-between items-center flex shadow-md border border-gray-200 rounded-md max-w-7xl md: flex-wrap sm: px-5 py-3 mx-4">
                
                  
                    <p class="font-sans text-base font-semibold">{content[i].title}</p>
                    <p class="font-sans text-sm font-light ">by {getNpub(pubkeys[i])} - {dates[i]}</p>
                    
                    
                  <p class="font-sans text-base font-light mr-1 mt-1">
                    {content[i].reward} sats
                  </p>
                  <button onClick={()=>navigate(fullInfoPath) } class="font-sans text-base font-light underline mr-3 mt-1">More info</button>
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