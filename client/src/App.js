import React from "react";


import { Route, Routes } from "react-router-dom";


// Firebase
import { config } from "./firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";

// 

// Pages
import Landing from "./pages/noAuth/landing/Landing";
import Information from "./pages/noAuth/information/Information"
import QA from "./pages/noAuth/qa/QA";
import Login from "./pages/noAuth/login/Login";

// Hooks
import { useEffect } from "react";

const App = () => {
    // Authentication

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(config.auth, (user) => {
            if (user) {
                // User is signed in.
                window.user = user;
                console.log("Hello");
            } else {
                // User is signed out.
                console.log("bye");
                window.user = null;
            }
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array because it should run once

    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/aboutus" element={<Information />} />
                <Route exact path="/questions" element={<QA />} />

                {/* TODO: ADD AUTHENTICATION! */}
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;