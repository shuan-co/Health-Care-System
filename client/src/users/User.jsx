import { onAuthStateChanged } from "firebase/auth";

export function setupAuthStateObserver() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in.
            window.user = user;  // global variable to hold the user info
        } else {
            // User is signed out.
            window.user = null;
        }
    });
}

export default setupAuthStateObserver;