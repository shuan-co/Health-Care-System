import { Link } from 'react-router-dom'
import pic from "./sub.jpg"

function Navbar(){
    return(
        <header class="bg-lime-600 max-w-full py-3 ">
            <div className="container" class="flex items-center ">
                <img class="ml-3 h-16 rounded-lg" src={pic}/>
                <h1 class="font-bold px-4 text-2xl">Health Center System</h1>
                <div class="justify-self-end">
                    <div class="px-4 font-bold text-lg">
                        <Link to="/Login">Login</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;