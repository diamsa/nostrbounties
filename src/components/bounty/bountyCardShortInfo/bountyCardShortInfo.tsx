import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bountyInfo from "../../../pages/bountyFullInfo";
import { getEventData } from "../../../utils";


function shortBountyInfo({content, metaData, ids}) {

    const navigate = useNavigate()
    const bountyInfor = content;
    const bountyHunterMetaData = metaData;
    const bountyIds = ids;
    let i = -1;
    
    /* button reward style
class="font-sans text-base font-light bg-blue-700 py-1 px-3 rounded-md text-white mr-1 mt-1"*/


    function createComponent(i) {
     let fullInfoPath = `/b/${bountyIds[i]}`       
            return(
            
                <div class="my-2 mx-10 px-10 py-3 justify-between items-center flex shadow-md rounded-md max-w-7xl md: flex-wrap">
                <div class="p-2">
                  <div class="flex-wrap">
                    <p class="font-sans text-base font-semibold">{bountyInfor[i].about}</p>
                    <p class="font-sans text-sm font-light">by {bountyInfor[i].name}</p>
                    <div class="w-250">
                  <p class="font-sans text-base font-light mr-1 mt-1">
                    {bountyInfor[i].name} sats
                  </p>
                  <button onClick={()=>navigate(fullInfoPath) } class="font-sans text-base font-light underline mr-3 mt-1">More info</button>
                  <button onClick={()=>navigate(fullInfoPath) } class="font-sans text-base font-light underline mr-1 mt-1">add to reward</button>
                  
                  </div>
                  </div>
                </div>
              </div>
        )
    }

console.log(bountyInfor, bountyHunterMetaData, bountyIds)
    return ( <div>
        {bountyIds.map(()=>{
            i++
            return(<div>
                {createComponent(i)}
            </div>)
        })}
    </div> );
}

export default shortBountyInfo;