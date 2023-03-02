import { useNavigate, Link } from "react-router-dom";



function shortBountyInfo({content, ids, dates, pubkeys}) {

    const navigate = useNavigate()
    const bountyInfor = content;
    const bountyIds = ids;
    const bountyDates = dates;
    const bountyPubKeys = pubkeys
    let i = -1;
    
    /* button reward style
class="font-sans text-base font-light bg-blue-700 py-1 px-3 rounded-md text-white mr-1 mt-1"*/


    function createComponent(i) {
     let fullInfoPath = `/b/${bountyIds[i]}`       
            return(
            
                <div class="my-2 mx-10 px-12 py-5 justify-between items-center flex shadow-md border border-gray-200 rounded-md max-w-7xl md: flex-wrap">
                
                  <div class="flex-wrap flex-1">
                    <p class="font-sans text-base font-semibold">{bountyInfor[i].title}</p>
                    <p class="font-sans text-sm font-light ">by {bountyPubKeys[i]} - {bountyDates[i]}</p>
                    <div class="w-250">
                  <p class="font-sans text-base font-light mr-1 mt-1">
                    {bountyInfor[i].reward} sats
                  </p>
                  <button onClick={()=>navigate(fullInfoPath) } class="font-sans text-base font-light underline mr-3 mt-1">More info</button>
                  <button onClick={()=>navigate(fullInfoPath) } class="font-sans text-base font-light underline mr-1 mt-1">add to reward</button>
                  
                  </div>
                  </div>
               
              </div>
        )
    }


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