import defaultRelays from "./consts";
import { RelayPool } from "nostr-relaypool";
import { nip19 } from "nostr-tools";
import {useState} from 'react'

export function convertTimestamp (unixTimestamp: number): string{
    var myDate = new Date( unixTimestamp * 1000);
    let createdAt = myDate.toDateString();
    return createdAt
}

export async function getPersonalRelays(){
let personalRelays = await window.nostr.getRelays();
return personalRelays
}

export async function getPubKey(){
    let pubKey = await window.nostr.getPublicKey();
    return pubKey
}

export function getMetaData(pubKey){

   let data = fetch(`https://rbr.bio/${pubKey}/metadata.json`, {
        method:'GET',
        mode:'cors',
        credentials: "same-origin",
    })
      .then((response) => response.json())

      return data
}

export async function sendReply(status: string, id: string, pubKey: string){
    if(status === null){

        let eventMessage = {
        "id":null,
        "pubkey":null,
        "created_at":Math.floor(Date.now() / 1000),
        "kind":789,
        "tags":[["e", `${id}`], ["t", `bounty-reply`]],
        "content": "in progress",
        "sig":null
      };

      if(!window.nostr){
        console.log("you need to install an extension")
      }

      let EventMessageSigned = await window.nostr.signEvent(eventMessage);
      if(EventMessageSigned.pubkey === pubKey){

        let relays = defaultRelays;
        let relayPool = new RelayPool(relays);

        relayPool.publish(EventMessageSigned, relays)
        } else{
            console.log('you are not allowed to reply status')
        }
      }
        

        if(status === 'in progress'){
          let eventMessage = {
            "id":null,
            "pubkey":null,
            "created_at":Math.floor(Date.now() / 1000),
            "kind":789,
            "tags":[["e", `${id}`], ['t', 'bounty-reply']],
            "content": "paid",
            "sig":null
          };
    
          if(!window.nostr){
            console.log("you need to install an extension")
          }
    
          let EventMessageSigned = await window.nostr.signEvent(eventMessage);
          if(EventMessageSigned.pubkey === pubKey){

            let relays = defaultRelays;
            let relayPool = new RelayPool(relays);
    
            relayPool.publish(EventMessageSigned, relays)
            } else{
                console.log('you are not allowed to reply status')
            }
        }

        if(status === 'paid'){
          console.log('bounty paid')
        }

}

export async function addReward(amount, id){

    let eventMessage = {
        "id":null,
        "pubkey":null,
        "created_at":Math.floor(Date.now() / 1000),
        "kind":789,
        "tags":[["t", 'bounty-added-reward'], ["e", `${id}`]],
        "content": amount,
        "sig":null
      };

      if(!window.nostr){
        console.log("you need to install an extension")
      }

      let EventMessageSigned = await window.nostr.signEvent(eventMessage);
      console.log(EventMessageSigned.content)
      let relays = defaultRelays;
      let relayPool = new RelayPool(relays);

      relayPool.publish(EventMessageSigned, relays)
      console.log('posted')
}

export function getNpub(pubkey){
let npub = nip19.npubEncode(pubkey);
let arr_shortnpub = [];
for(let i = 0; i < 20; i++){
  arr_shortnpub.push(npub[i])
}
let npubShortened = arr_shortnpub.join('');
return npubShortened + '...'
}