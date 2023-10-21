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
                console.log(user.accountType);
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
                }
            })
            .catch((error) => {
                alert("Incorrect Password!");
                console.log(error);
            })
    }

    return (
        <>
            <div id="loginPage" className="flex justify-center 
                                       items-center 
                                       h-screen
                                       w-screen 
                                       bg-green-50">

                <form id="shadow" action="" className="bg-green-950 
                                       h-max 
                                       lg:w-3/12
                                       sm:w-5/12
                                       w-full
                                       ms-4
                                       me-4
                                       rounded-2xl 
                                       place-items-center">
                    <input type="text"
                        id="email"
                        placeholder="Email"
                        className="rounded-full 
                               block 
                               w-4/5
                               mt-9 
                               mb-5 
                               h-9 
                               mx-auto 
                               ps-4 
                               bg-green-50" />
                    <input type="password"
                        id="password"
                        placeholder="Password"
                        className="rounded-full 
                               block 
                               w-4/5
                               h-9 
                               mx-auto 
                               mb-5 
                               ps-4 
                               bg-green-50" />
                    <a className="block
                              w-max
                              mx-auto
                              text-neutral-100 
                              text-center 
                              mb-5
                              hover:text-green-400" href="">Forgot Password?</a>
                    <button onClick={authenticate}
                        className="rounded-full 
                               bg-green-300 
                               w-4/5
                               mx-auto 
                               mb-9 
                               h-10 
                               font-bold
                               block
                               hover:bg-green-400">Log in</button>
                </form>
            </div>
        </>
    );
}
export default Login;