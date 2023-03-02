
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../components/header/header";
import AvatarImage from "../assets/avatarImg.png"
import { getPersonalRelays } from '../utils';
import BountyCard from '../components/bounty/bountyCardShortInfo/bountyCardShortInfo';
import defaultRelays from '../consts';
import { RelayPool } from 'nostr-relaypool';
import { convertTimestamp } from '../utils';

function Profile() {

  const params = useParams();
  let [name, setName] = useState()
  let [profilePic, setProfilePic] = useState()
  let [LnAddress, setLnAddress] = useState()
  let [content, setContent] = useState([])
  let [ids, setIds] = useState([])
  let [pubkey, setPubkeys] = useState([])
  let [creationDate, setCreationDate] = useState([])
  
  useEffect(()=>{
    
    let relays = defaultRelays;
    let arr_content = [];
    let arr_pubkeys = [];
    let arr_ids = [];
    let arr_postDated = [];
    let subFilter = [{
      authors:[`${params.id}`],
      kinds:[0]
    }]
    let subFilterContent = [{
      authors:[`${params.id}`],
      '#t':['bounty']
    }]
    
    let relayPool = new RelayPool(relays);
    
    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });
    
    relayPool.subscribe(subFilter, relays, (event, isAfterEose, relayURL) => {
      let parsedContent = JSON.parse(event.content)
      setName(parsedContent.display_name);
      setProfilePic(parsedContent.picture);
      setLnAddress(parsedContent.lud16)
    })

    relayPool.subscribe(subFilterContent, relays, (event, isAfterEose, relayURL) => {
      let date = convertTimestamp(event.created_at)
      let parsedContent = JSON.parse(event.content)
      arr_content.push(parsedContent);
      arr_pubkeys.push(event.pubkey)
      arr_ids.push(event.id);
      arr_postDated.push(date)
    
      setContent(arr_content)
      setIds(arr_ids);
      setCreationDate(arr_postDated)
      setPubkeys(arr_pubkeys)

    })


    
    
     setTimeout(() => {
      relayPool.close().then(()=>{
        console.log('connection closed')
      })
      
    }, 10000);
    
    },[])

  return (
    <div class="max-w-7xl lg:px-40 sm:px-10">
      <div>
        <Header />
      </div>
      
      <div>
      
<div class="w-full bg-white border border-gray-200 rounded-lg shadow-md">
    <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg pt-4" src={profilePic === '' ? AvatarImage : profilePic} alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900">{name}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">⚡ {LnAddress === undefined ? 'No LN address found' : LnAddress}</span>
        <div class="flex mt-4 space-x-3 md:mt-6">
            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700">Add friend</a>
            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ">Message</a>
        </div>
    </div>
</div>

<BountyCard content={content} dates={creationDate} ids={ids} pubkeys={pubkey} />

      </div>

      <div>

      </div>
      
    </div>
  );
}

export default Profile;
