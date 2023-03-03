import { sendReply, getNpub } from "../../../utils";
import { Link } from "react-router-dom";

function BountyLargeInfor({content, pubkey, date, status, contact, id, addedReward}) {

    return ( <div class="my-4 mx-10 px-10 py-3 justify-between items-center flex border border-gray-200 rounded-lg shadow-md max-w-7xl md: flex-wrap sm:flex-wrap px-5 py-3 mx-4">
    
          <p class="font-sans text-2xl font-semibold">{content.title}</p>
          <p class="font-sans text-base font-ligh whitespace-pre-line">{content.description}</p>
          <Link to={`/profile/${pubkey}`}  class="font-sans text-sm font-light mb-2 underline">Poster information</Link>
          <p class="font-sans text-sm font-light mb-2">posted: {date}</p>
          <p class="font-sans text-base font-light mr-1 mt-1">initial reward: {content.reward} sats</p>
      
        
        
        
      
      <button onClick={()=> sendReply(status, id, pubkey)} class="font-sans text-base font-light underline mr-3 mt-1">Reply new state</button>
      {contact.map((item)=>{
        return(<div>
        <p class="font-sans text-base font-light mr-3 mt-1">Discord: {item.discord === null || '' ? 'no added discord': item.discord}</p>
        <p class="font-sans text-base font-light mr-3 mt-1">Telegram: {item.telegram === null || '' ? 'no added Telegram': item.telegram}</p>
        <p class="font-sans text-base font-light mr-3 mt-1">Email: {item.email === null || '' ? 'no added email': item.email}</p>
        <p class="font-sans text-base font-light mr-3 mt-1">WhatsApp: {item.whatsapp === null || '' ? 'no added whatsapp': item.whatsapp}</p>
        </div>)
      })}
      
      
      
        {status === null ? <p class='bg-green-500 py-1 px-2 rounded-lg'>Status: Open</p> : status === 'in progress' ? <p class='bg-yellow-500 py-1 px-2 rounded-lg'>Status: In progress</p> : <p class='bg-blue-500 py-1 px-2 rounded-lg'>Status: Paid</p>}
        
      
      {addedReward.map((item)=>{
         return(
          <Link to={`/profile/${item.posterPubkey}`} class="font-sans text-base font-light mr-3 mt-1 underline">{getNpub(item.posterPubkey)} added <span class="font-sans text-base font-medium">{item.amount}</span> sats</Link>
         )
      })}
    
  </div> 
  
  );
}

export default BountyLargeInfor;