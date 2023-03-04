import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {RelayPool} from "nostr-relaypool";
import defaultRelays from "../consts";
import { formatReward } from "../utils";


import Header from "../components/header/header";

type content = {
  title:string | null,
  description:string | null,
  reward: string | null,
  discord:string | null,
  telegram:string | null,
  email:string | null,
  whatsapp:string | null
}

type event = {
  target:{
    value:string
  }
}


function CreateBounty() {

    let [content, setContent] = useState<content>({
      title:null,
      description:null,
      reward:null,
      discord:null,
      telegram:null,
      email:null,
      whatsapp:null
    })
    let [extensionError, setExtensionError] = useState(false)
    let [emptyFields, setEmptyFields] = useState(false)
    let navigate = useNavigate()

    const handleTitle = (event:event)=>{
      setContent({...content, title:event.target.value})
    }
    const handleDescription = (event:event)=>{
      setContent({...content, description:event.target.value})
    }
    const handleReward = (event:event)=>{
      let reward = formatReward(event)
      setContent({...content, reward:reward})
    }
    const handleDiscord = (event:event)=>{
      setContent({...content, discord:event.target.value})
    }
    const handleTelegram = (event:event)=>{
      setContent({...content, telegram:event.target.value})
    }
    const handleEmail = (event:event)=>{
      setContent({...content, email:event.target.value})
    }
    const handleWhatsapp = (event: event)=>{
      setContent({...content, whatsapp:event.target.value})
      console.log(event)
    }

    async function postEvent() {
        
        let contentDataStringify = JSON.stringify(content)
        let eventMessage = {
            "id":null,
            "pubkey":null,
            "created_at":Math.floor(Date.now() / 1000),
            "kind":789,
            "tags":[["t", "bounty"]],
            "content": contentDataStringify,
            "sig":null
          };

          if(!window.nostr){
            console.log("you need to install an extension")
            setExtensionError(true)
          }

          if(!content.title || !content.description || !content.reward){
            setEmptyFields(true)
          } else{

            let EventMessageSigned = await window.nostr.signEvent(eventMessage);
            let relays = defaultRelays;
            let relayPool = new RelayPool(relays);

            relayPool.publish(EventMessageSigned, relays)

            navigate('/')
          }
        }


    
    return ( <div class="max-w-7xl lg:px-30 py-20 sm:px-10 py-5">
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
        <button onClick={postEvent} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">post bounty</button>
        <div class="px-5">
        {extensionError ? <p class="text-red-900 ">You need an extension to post</p> : null}
        {emptyFields ? <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
  <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
  <span class="sr-only">Info</span>
  <div>
     Title, description and reward fields are required
  </div>
  
</div> : null}
        
        </div>
        </div>
        
        
        

        

        <div>
        </div> 


        </div>
        
    </div> );
}

export default CreateBounty;