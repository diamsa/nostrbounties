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

    function createComponent(i) {
            console.log(bountyIds.length)
            let finalData = JSON.parse(bountyInfor[i]);
            let metadatafinal = JSON.parse(bountyHunterMetaData[i])
            let fullInfoPath = `/b/${bountyIds[i]}`
            return(
            
                <div class="my-2 mx-10 px-10 py-3 justify-between items-center flex shadow-md rounded-md max-w-7xl md: flex-wrap">
                <div class="p-2">
                  <div>
                    <p class="font-sans text-base font-semibold">{finalData.title}</p>
                  </div>
                  <div>
                    <p class="font-sans text-sm font-light">by {metadatafinal.name}</p>
                  </div>
                </div>
                <div class="p-2 w-250">
                  <p class="font-sans text-base font-light">
                    {finalData.reward} sats
                  </p>
                  </div>
                <div class="p-2 w-91">
                  <p class="text-green-900 font-sans text-base font-light">
                    open
                  </p>
                  </div>
                <div class="p-2">
                  <button class="font-sans text-base font-light underline">More info</button>
                </div>
                <div class="p-2">
                  <button class="font-sans text-base font-light bg-blue-700 py-1 px-3 rounded-md text-white">Add to reward</button>
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