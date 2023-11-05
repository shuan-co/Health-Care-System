import { Link } from 'react-router-dom'
import pic from "./sub.jpg"

function landNavbar() {
    return (
        <header className="bg-lime-600 max-w-full py-3 ">
            <div className="container" className="flex items-center ">
                <img className="ml-3 h-16 rounded-lg" src={pic} />
                <h1 className="font-bold px-4 text-2xl">Health Center System</h1>
                <div className="justify-self-end">
                    <div className="px-4 font-bold text-lg">
                        <Link to="/Login">Login</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default landNavbar;