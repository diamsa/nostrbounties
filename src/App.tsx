import Header from './components/header/header';
import BountyFeed from "./components/bounty/bountyFeed/bountyFeed";
import { RelayPool } from 'nostr-relaypool';
import { useState, useEffect } from "react";
import defaultRelays from "./consts";
import { convertTimestamp } from './utils';




function App() {


const [content, setContent] = useState([]);
const [pubkey, setPubkey] = useState([]);
const [ids, setIds] = useState([]);
const [creationDate, setCreationDate] = useState([]);
const [bountyNotFound, setBountyNotFound] = useState(false)
const [iterator, setIterator] = useState(0)

function loadMoreContent(){
let arr = [];
arr.push([...content, 1]);
setContent(arr)
}

useEffect(()=>{

let relays = defaultRelays;
let arr_content = [];
let subMessage = [{
  '#t':['bounties'],
  limit:100
}]

let relayPool = new RelayPool(relays);

relayPool.onerror((err, relayUrl) => {
  console.log("RelayPool error", err, " from relay ", relayUrl);
});
relayPool.onnotice((relayUrl, notice) => {
  console.log("RelayPool notice", notice, " from relay ", relayUrl);
});

relayPool.subscribe([{
  //'#t':['bounty'],
  //authors:['8425d0460136752a32f77e311456ae97a89604ed8cab59bade6f422415751eeb'],
  kinds:[1],
}], relays, (event, isAfterEose, relayURL) => {
  // remember to parse the content
  arr_content.push(event.content);
  setContent(arr_content)
})


  setTimeout(() => {
  relayPool.close().then(()=>{
    console.log('connection closed')
  })
}, 10000);

},[])

useEffect(()=>{
//console.log(content)
},[content])


  return (
    <div class="max-w-7xl lg:px-40 sm:px-10">
      <div>
      <Header />
      </div>
      <div>
      {content.map((item)=>{
        return(<p class='pt-10'>{item}</p>)
      })}
  
      {bountyNotFound ? <p>We didn't find any bounty, try with differente relays</p> : null}
      <button onClick={loadMoreContent}>click me to get more data</button>
      </div>
    </div>
  );
}

export default App;
