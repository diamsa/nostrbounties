import { useParams } from "react-router-dom";


import Header from "../components/header/header";
import BountyLargeInfor from "../components/bounty/bountyLargeInfo/bountyLargeInfo";

function bountyInfo() {

    const params = useParams();

    return ( 
    
    <div class="max-w-7xl lg:px-40 sm:px-10">
        <div>
         <Header />
        </div>
        <div>
        <BountyLargeInfor />
        </div>
        <div>
        </div>
        
    </div> );
}

export default bountyInfo;