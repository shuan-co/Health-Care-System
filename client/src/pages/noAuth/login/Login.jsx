// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { config } from "../../../firebase/Firebase";

function Login() {
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
                 console.log('Account Type: ', accountType);
                 console.log(userCredentials);
                 console.log(userCredentials)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div id="loginPage" className="flex justify-center items-center h-screen border border-black">
            <form action="" className="bg-green-950 h-max w-max rounded-2xl place-items-center">
                <input type="text" 
                       id="email" 
                       placeholder="Email" 
                       className="rounded-full block w-96 mt-9 mb-5 h-9 mx-7 ps-4 bg-green-50"/>
                <input type="password" 
                       id="password" 
                       placeholder="Password" 
                       className="rounded-full block w-96 h-9 mx-7 mb-5 ps-4 bg-green-50"/>
                <a className="block text-neutral-100 text-center mb-5" href="">Forgot Password?</a>
                <button onClick={authenticate}
                        className="rounded-full bg-green-300 w-96 mx-7 mb-9 h-10 font-bold">Log in</button>
            </form>
        </div>
    );
}
export default Login;