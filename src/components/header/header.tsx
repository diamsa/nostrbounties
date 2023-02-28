import { useNavigate } from "react-router-dom";


function Header() {
    
    const navigate = useNavigate();
          

    return ( <div class="w-full pr-12 pl-12 pt-12 bg-white sm:px-8">
    <div class="flex items-end justify-between mb-12 header content-end">
        <div>
            <p onClick={()=> navigate("/")} class="text-4xl font-bold text-gray-800">
                Nostr Bounties
            </p>
        </div>
        <div class="text-end">
                    <button onClick={()=> navigate("/create")} class="flex-shrink-0 px-3 py-1 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">
                        Create Bounty
                    </button>
            </div>
        </div>
    </div>
)}

export default Header;