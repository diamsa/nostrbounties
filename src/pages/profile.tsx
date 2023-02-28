
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../components/header/header";
import { getPersonalRelays } from '../utils';

function Profile() {

  const params = useParams();
  let [iterator, setIterator] = useState(0);
  let [content, setContent] = useState('hello world')
  let [check, setCheck] = useState([])
  let [relays, setrelays] = useState({})
  function handleClick(){
    setIterator(iterator + 1)
    setContent('whats going on?')
    let relay = getPersonalRelays();
    relay.then((data)=>{
console.log(data)
    })
  }

  useEffect(()=>{

  },[])

  return (
    <div>
      <div>
        <Header />
      </div>
      
      <div>
        <h1>Number</h1>
      <p>{iterator}</p>
      <p>{content}</p>
      <button onClick={handleClick}>click me bro</button>
      <p>{check}</p>
      </div>

      <div>

      </div>
      
    </div>
  );
}

export default Profile;
