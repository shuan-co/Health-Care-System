// Firebase
import { setPersistence, signInWithEmailAndPassword, inMemoryPersistence, onAuthStateChanged } from "firebase/auth";
import { config, user } from "../../../firebase/Firebase";

//  Routing
import { useNavigate } from 'react-router-dom';

// Context
import { useContext } from 'react';
import { AuthContext } from '../../../AuthContext';

function Login() {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);
    const authenticate = (event) => {

        event.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        signInWithEmailAndPassword(config.auth, email, password)
            .then((userCredentials) => {
                // Split email on the @
                var emailParts = email.split('@');
                // Split again for every "."
                var domainParts = emailParts[1].split('.');
                // Grab account type since it's the second part ALWAYS
                var accountType = domainParts[domainParts.length - 2];
                user.accountType = accountType;
                user.uid = userCredentials.user.uid
                user.credentials = userCredentials
                // Set isLoggedIn to true after successful login
                setIsLoggedIn(true);

                if (user.accountType === "clinic") {
                    navigate('/clinic');
                } else if (user.accountType === "patient") {
                    navigate('/patient');
                } else if (user.accountType === "locator") {
                    navigate('/locator');
                } else if (user.accountType === "admin") {
                    navigate('/admin');
                } else if (user.accountType === "cad") {
                    navigate('/clinic-admin');
                } else if (user.accountType === "staff") {
                    navigate('/clinic-staff');
                } else {
                    navigate('/patient')
                }
            })
            .catch((error) => {
                alert("Incorrect Password!");
                console.log(error);
            })
    }

    return (
        <div id="loginPage" className="flex justify-center items-center h-screen w-screen">
            <div className="w-screen h-3/4">
                <div className="mb-5">
                    <h1 className="enriqueta text-center text-2xl">Health Center System</h1>
                </div>

                <form id="shadow" action="" className="bg-slate-50 
                                    h-max 
                                    lg:w-2/6
                                    sm:w-5/12
                                    w-full
                                    rounded-lg
                                    place-items-center
                                    p-10
                                    mx-auto">
                    <h1 className="exo font-bold text-xl mb-4">Sign in to your account</h1>
                    <label htmlFor="email" className="lato text-sm mt-10">Your email</label>
                    <input type="text"
                        id="email"
                        placeholder="Email"
                        className="rounded-lg
                            border
                            block 
                            w-full
                            mb-5 
                            h-9 
                            mx-auto 
                            ps-4 
                                    " />
                    <label htmlFor="password" className="lato text-sm mt-10">Password</label>
                    <input type="password"
                        id="password"
                        placeholder="Password"
                        className="rounded-lg
                            border 
                            block 
                            w-full
                            h-9 
                            mx-auto 
                            mb-5 
                            ps-4 
                            " />
                    <a className="block
                            w-full
                            mx-auto
                            text-blue-600
                            text-center 
                            mb-5
                            hover:underline" href="">Forgot Password?</a>
                    <button onClick={authenticate}
                        className="rounded-full 
                            bg-blue-700
                            text-slate-50
                            w-full 
                            h-10 
                            font-bold
                            lato
                            hover:bg-blue-600">Sign in</button>
                </form>
            </div>
            
        </div>
    );
}
export default Login;