import { sendReply } from "../../../utils";
import { Link } from "react-router-dom";

function BountyLargeInfor({content, pubkey, date, status, contact, id}) {



    return ( <div class="my-4 mx-10 px-10 py-3 justify-between items-center flex border border-gray-200 rounded-lg shadow-md max-w-7xl md: flex-wrap">
    <div class="p-2">
      <div class="flex-wrap">
        <div>
          <p class="font-sans text-2xl font-semibold">{content.title}</p>
          <Link to={`/profile/${pubkey}`}  class="font-sans text-sm font-light mb-2 underline">By: {pubkey}</Link>
          <p class="font-sans text-sm font-light mb-2">posted: {date}</p>
        </div>
        
        <p class="font-sans text-base font-ligh whitespace-pre-line">{content.description}</p>
        <div class="w-250">
      <p class="font-sans text-base font-light mr-1 mt-1">
        {content.reward} sats
      </p>
      <button onClick={()=> sendReply(status, id, pubkey)} class="font-sans text-base font-light underline mr-3 mt-1">Reply new state</button>
      <button class="font-sans text-base font-light underline mr-1 mt-1">Contact details</button>
      </div>
      </div>
      <div>
        {status === null ? <p>Open</p> : <p>{status}</p>}
      </div>
    </div>
  </div> 
  
  );
}

export default BountyLargeInfor;