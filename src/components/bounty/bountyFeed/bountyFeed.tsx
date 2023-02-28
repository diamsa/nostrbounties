import BountyCard from "../bountyCardShortInfo/bountyCardShortInfo";
import {useState, useEffect} from "react"
import { getEventData } from "../../../utils";
import convertDate from "timestamp-conv";

function bountyFeed() {

let [content, setContent] = useState({})
let [metaData, setMetadata] = useState({})
let [ids, setIds] = useState([]);
let [date, setDate] = useState([]);
    
useEffect(()=>{
  

       getEventData("content", "1").then((content)=>{
        let contentDataExample = [`{\"title\":\"Bounty manager\",\"description\":\"easy\",\"reward\":\"39000\",\"discord\":\"@diamsa\",\"telegram\":\"diego\",\"email\":\"diamsa03@gmail.com\",\"whatsapp\":\"54655445\"}`,`{\"title\":\"filesharing app\",\"description\":\"easy\",\"reward\":\"1200\",\"discord\":\"@diamsa\",\"telegram\":\"diego\",\"email\":\"diamsa03@gmail.com\",\"whatsapp\":\"54655445\"}`,`{\"title\":\"hello\",\"description\":\"easy\",\"reward\":\"200\",\"discord\":\"@diamsa\",\"telegram\":\"diego\",\"email\":\"diamsa03@gmail.com\",\"whatsapp\":\"54655445\"}`, `{\"title\":\"hello\",\"description\":\"easy\",\"reward\":\"200\",\"discord\":\"@diamsa\",\"telegram\":\"diego\",\"email\":\"diamsa03@gmail.com\",\"whatsapp\":\"54655445\"}`, `{\"title\":\"hello\",\"description\":\"easy\",\"reward\":\"200\",\"discord\":\"@diamsa\",\"telegram\":\"diego\",\"email\":\"diamsa03@gmail.com\",\"whatsapp\":\"54655445\"}`, `{\"title\":\"hello\",\"description\":\"easy\",\"reward\":\"200\",\"discord\":\"@diamsa\",\"telegram\":\"diego\",\"email\":\"diamsa03@gmail.com\",\"whatsapp\":\"54655445\"}` ]
        setContent(contentDataExample)
        console.log(content)
    });

       getEventData("content", "0").then((content)=>{
        let metaDataExample = [`{\"name\":\"Juan pepe\",\"about\":\"#nostr\"}`,`{\"name\":\"diamsa\",\"about\":\"#nostr\"}`,`{\"name\":\"Shaw\",\"about\":\"#nostr\"}`, `{\"name\":\"Shaw\",\"about\":\"#nostr\"}`, `{\"name\":\"Shaw\",\"about\":\"#nostr\"}`, `{\"name\":\"Shaw\",\"about\":\"#nostr\"}`]
        setMetadata(metaDataExample)
        console.log(content);
    });


       getEventData("id", "1").then((content)=>{
        let idsDataExample = ["123","456","789","123","456","789"];
        setIds(idsDataExample)
        console.log(content);
    });
    




         
//setTimeout(()=>console.log(events), 5000) <BountyCard content={content}/>
},[])


return(
    <div >
        <BountyCard content={content} metaData={metaData} ids={ids} />
    </div>
)
}

export default bountyFeed