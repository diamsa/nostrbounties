import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {RelayPool} from "nostr-relaypool";


import Header from "../components/header/header";




function CreateBounty() {

    let [title, setTitle] = useState(null);
    let [description, setDescription] = useState(null);
    let [reward, setReward] = useState(null);
    let [discord, setDiscord] = useState(null);
    let [telegram, setTelegram] = useState(null);
    let [email, setEmail] = useState(null);
    let [whatsapp, setWhatsapp] = useState(null);
    let [extensionError, setExtensionError] = useState(false)
    let [emptyFields, setEmptyFields] = useState(false)
    let navigate = useNavigate()
    
    let eventData ={
        title:title,
        description:description,
        reward: reward,
        discord: discord,
        telegram: telegram,
        email: email,
        whatsapp:whatsapp
    }

    const handleTitle = (event)=>{
      setTitle(event.target.value)
    }
    const handleDescription = (event)=>{
      setDescription(event.target.value)
    }
    const handleReward = (event)=>{
      const rewardUnformatted = parseInt(event.target.value);
      const rewardFormatted = rewardUnformatted.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      setReward(rewardFormatted)
    }
    const handleDiscord = (event)=>{
      setDiscord(event.target.value)
    }
    const handleTelegram = (event)=>{
      setTelegram(event.target.value)
    }
    const handleEmail = (event)=>{
      setEmail(event.target.value)
    }
    const handleWhatsapp = (event)=>{
      setWhatsapp(event.target.value)
    }

    async function postEvent() {
        
        let contentDataStringify = JSON.stringify(eventData)
        let eventMessage = {
            "id":null,
            "pubkey":null,
            "created_at":Math.floor(Date.now() / 1000),
            "kind":789,
            "tags":[],
            "content": contentDataStringify,
            "sig":null
          };

          if(!window.nostr){
            console.log("you need to install an extension")
            setExtensionError(true)
          }

          if(!title || !description || !reward){
            setEmptyFields(true)
          } else{

            let EventMessageSigned = await window.nostr.signEvent(eventMessage);
          console.log(EventMessageSigned)
          }

          

         let relays = ['wss://relay.damus.io', 'wss://nostr.bitcoiner.social'];

         let relayPool = new RelayPool(relays);

let unsub = relayPool.subscribe(
  [
    {
      authors: [
        "32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245",
      ],
      kinds:[1],
      limit:10
    },
  ],
  relays,
  (event, isAfterEose, relayURL) => {
    console.log(event.kind, isAfterEose, relayURL);
  },
  undefined,
  (events, relayURL) => {
    console.log(events, relayURL);
  }
);

relayPool.onerror((err, relayUrl) => {
  console.log("RelayPool error", err, " from relay ", relayUrl);
});
relayPool.onnotice((relayUrl, notice) => {
  console.log("RelayPool notice", notice, " from relay ", relayUrl);
});



    }


    
    return ( <div class="max-w-7xl lg:px-30 sm:px-10">
        <div>
            <Header />
        </div>
        <div class="max-w-7xl lg:px-30 sm:px-12">
        
        <div>
            <label class="block text-sm font-medium text-gray-900">Bounty title</label>
            <input type="text" onChange={handleTitle} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="i.e. Bounty manager" required />
        </div>
        <div class="mt-4">
            <label class="block text-sm font-medium text-gray-900">Bounty description</label>
            <textarea onChange={handleDescription} class="peer block min-h-[auto] w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="i.e. A simple bounty manager for people..." required></textarea>
        </div>
        <div class="mt-4">
            <label class="block text-sm font-medium text-gray-900">Bounty reward in Sats</label>
            <input type="number" onChange={handleReward} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="1200 sats" required />
        </div>
        <div class="mt-4">
            <label class="block text-sm font-medium text-gray-900">Discord User</label>
            <input type="text" onChange={handleDiscord} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="UserCandy#6765" />
        </div>
        <div class="mt-4">
            <label class="block text-sm font-medium text-gray-900">telegram user</label>
            <input type="text" onChange={handleTelegram} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="@userCandy"/>
        </div>
        <div class="mt-4">
            <label class="block text-sm font-medium text-gray-900">Email</label>
            <input type="text" onChange={handleEmail} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="usercandy@gmail.com"/>
        </div>
        <div class="mt-4">
            <label class="block text-sm font-medium text-gray-900">WhatsApp</label>
            <input type="number" onChange={handleWhatsapp} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="+12068133616"/>
        </div>
        <div class="mt-4 flex">
        <button onClick={postEvent} class="flex-shrink-0 px-3 py-1 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">post bounty</button>
        <div class="px-5">
        {extensionError ? <p class="text-red-900 ">You need an extension to post</p> : null}
        {emptyFields ? <p class="text-red-900 ">title, description and reward fields required</p> : null}
        
        </div>
        </div>
        
        
        

        

        <div>
        </div> 


        </div>
        
    </div> );
}

export default CreateBounty;