import Header from './components/header/header';
import BountyFeed from "./components/bounty/bountyFeed/bountyFeed";
import { useState, useEffect } from "react";
import { convertTimestamp } from './utils';
import ShortBountyInfo from './components/bounty/bountyCardShortInfo/bountyCardShortInfo';




function App() {

  return (
    <div class="max-w-7xl lg:px-40 sm:px-10">
      <div>
      <Header />
      </div>
      <div>
      <BountyFeed />
      </div>
    </div>
  );
}

export default App;
