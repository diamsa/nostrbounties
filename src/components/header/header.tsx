import { useNavigate } from "react-router-dom";
import { getPubKey } from "../../utils";


function Header() {
    
    const navigate = useNavigate();

    function goToProfile(){
        getPubKey().then((data)=> navigate(`/profile/${data}`))
        .catch((error)=> console.log(error))
    }
          

    return ( <div class="w-full pr-12 pl-12 pt-12 bg-white sm:px-8">
    <div class="flex items-end justify-between mb-12 header content-end">
        <div>
            <p onClick={()=> navigate("/")} class="text-4xl font-bold text-gray-800">
                Nostr Bounties
            </p>
        </div>
        <div class='flex'>
        <div>
            <p onClick={goToProfile} class='mr-3 underline'>My profile</p>
        </div>
        <div class="text-end">
                    <button onClick={()=> navigate("/create")} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Create Bounty
                    </button>
        </div> 
        </div>
        
        </div>
    </div>
)}

export default Header;