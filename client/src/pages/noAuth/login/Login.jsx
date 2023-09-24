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
                console.log(userCredentials)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <p>Login</p>
            <form action="">
                <input type="text" id="email" placeholder="Email" />
                <input type="password" id="password" placeholder="Password" />
                <button onClick={authenticate}>Login</button>
            </form>
        </>
    );
}
export default Login;