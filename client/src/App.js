import React from "react";


import { Route, Routes } from "react-router-dom";


// Pages
import Landing from "./pages/noAuth/landing/Landing";
import Information from "./pages/noAuth/information/Information"
import QA from "./pages/noAuth/qa/QA";
import Login from "./pages/noAuth/login/Login";


const App = () => {
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