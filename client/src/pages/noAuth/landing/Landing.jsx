import Navbar from './Navbar.jsx'
import pic from "./sub.jpg"

function Landing() {
    return (
        <div>
            <Navbar/>
            <div class="flex justify-center items-center m-20">
                <img src={pic}/>
                <h1>Health Center System</h1>
            </div>
        </div>
    );
}

export default Landing;