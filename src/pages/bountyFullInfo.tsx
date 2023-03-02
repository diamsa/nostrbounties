import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import defaultRelays from "../consts";
import { RelayPool } from "nostr-relaypool";
import { convertTimestamp } from "../utils";


import Header from "../components/header/header";
import BountyLargeInfor from "../components/bounty/bountyLargeInfo/bountyLargeInfo";

function bountyInfo() {

    const params = useParams();
    const [content, setContent] = useState({})
    const [pubKey, setPubkey] = useState()
    const [date, setDate] = useState()
    const [status, setStatus] = useState()

    useEffect(()=>{
    
        let relays = defaultRelays;
        let subFilterContent = [{
          ids:[params.id],
        }]
        let subFilterStatus = [{
          '#e':[params.id]
        }]
        
        let relayPool = new RelayPool(relays);
    
        
        relayPool.onerror((err, relayUrl) => {
          console.log("RelayPool error", err, " from relay ", relayUrl);
        });
        relayPool.onnotice((relayUrl, notice) => {
          console.log("RelayPool notice", notice, " from relay ", relayUrl);
        });
        
        relayPool.subscribe(subFilterContent, relays, (event, isAfterEose, relayURL) => {
          // remember to parse the content
          let date = convertTimestamp(event.created_at)
          let parsedContent = JSON.parse(event.content)
        
          setContent({
            title:parsedContent.title, 
            description:parsedContent.description,
            reward:parsedContent.reward,
            discord:parsedContent.discord,
            telegram:parsedContent.telegram,
            email:parsedContent.email,
            whatsapp:parsedContent.whatsapp
        })
          setDate(date)
          setPubkey(event.pubkey)
    console.log(parsedContent)
        })
        
        
         setTimeout(() => {
          if(arr_content.length === 0) console.log('an error')
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
        <BountyLargeInfor content={content} pubkey={pubKey} date={date} />
        </div>
        <div>
        </div>
        
    </div> );
}

export default bountyInfo;