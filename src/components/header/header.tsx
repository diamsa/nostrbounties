import { useNavigate } from "react-router-dom";
import { getPubKey } from "../../utils";


function Header() {
    
    const navigate = useNavigate();

    function goToProfile(){
        getPubKey().then((data)=> navigate(`/profile/${data}`))
        .catch((error)=> console.log(error))
    }
          

    return ( <div className="w-full pr-12 pl-12 pt-12 bg-white sm:px-8">
    <div className="flex flex-wrap items-end justify-between mb-12 header content-end">
        <div>
            <p onClick={()=> navigate("/")} className="text-4xl font-semibold text-gray-800">
                Nostr Bounties
            </p>
        </div>
        <div className='flex'>
        <div>
            <p onClick={goToProfile} className='mr-3 underline'>My profile</p>
        </div>
        <div className="text-end">
                    <button onClick={()=> navigate("/create")} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Create Bounty
                    </button>
        </div> 
        </div>
        
        </div>
    </div>
)}

export default Header;