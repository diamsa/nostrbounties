import { useParams } from "react-router-dom";


import Header from "../components/header/header";
import Footer from "../components/footer/footer";

function bountyInfo() {

    const params = useParams();

    return ( 
    
    <div>
        <div>
         <Header />
        </div>
        <div>
        <h1>Bounty Full info page</h1>
        {params.id} 
        </div>
        <div>
         <Footer />
        </div>
        
    </div> );
}

export default bountyInfo;