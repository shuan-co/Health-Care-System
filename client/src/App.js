import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { config, } from "./firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";

// Components
import Navbar from "./pages/noAuth/components/Navbar";
import Landing from "./pages/noAuth/landing/Landing";
import Information from "./pages/noAuth/information/Information";
import QA from "./pages/noAuth/qa/QA";
import Login from "./pages/noAuth/login/Login";
import Cdashboard from "./pages/auth/clinic/Cdashboard";
import ClinicTest from './pages/auth/clinic/ClinicTest';
import Pdashboard from "./pages/auth/patient/Pdashboard";
import Ldashboard from "./pages/auth/locators/Ldashboard";
import { AuthProvider } from './AuthContext';
import Footer from "./pages/noAuth/components/Footer";
import Pforms from "./pages/auth/patient/Pforms";
import Test from "./pages/auth/patient/Test";

const ProtectedRoute = ({ children, accessLevel }) => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [userAccess, setUserAccess] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(config.auth, (user) => {
            if (user) {
                // Split email on the @
                var emailParts = user.email.split('@');
                // Split again for every "."
                var domainParts = emailParts[1].split('.');
                // Grab account type since it's the second part ALWAYS
                var accountType = domainParts[domainParts.length - 2];
                setUserAccess(accountType);
                if (accountType === accessLevel) {
                    setAuthorized(true);
                } else {
                    switch (accountType) {
                        case "clinic":
                            setAuthorized(false);
                            break;
                        case "patient":
                            setAuthorized(false);
                            // Handle patient case
                            break;
                        case "locator":
                            setAuthorized(false);
                            // Handle locator case
                            break;
                        default:
                            setAuthorized(false);
                    }
                }
            } else {
                setAuthorized(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [accessLevel]);

    if (loading) {
        // Display a loading indicator while checking authentication
        return <div>Loading...</div>;
    }

    if (!authorized) {
        // User is not authorized, redirect to the login page
        if (userAccess === null) {
            return <Navigate to="/login" replace />;
        }
        else if (userAccess === "clinic") {
            return <> <Navigate to="/clinic" replace /> <Cdashboard /></>
        } else if (userAccess === "patient") {
            return <> <Navigate to="/patient" replace /> <Pdashboard /></>
        } else if (userAccess === "locator") {
            return <> <Navigate to="/locator" replace /> <Ldashboard /></>
        }
    }

    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <div className="h-max w-screen bg-green-50">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/aboutus" element={<Information />} />
                    <Route path="/questions" element={<QA />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                        exact path="/clinic"
                        element={
                            <ProtectedRoute accessLevel="clinic">
                                <Cdashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact path="/clinictest"
                        element={
                            <ProtectedRoute accessLevel="clinic">
                                <ClinicTest />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact path="/patient"
                        element={
                            <ProtectedRoute accessLevel="patient">
                                <Pdashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact path="/locator"
                        element={
                            <ProtectedRoute accessLevel="locator">
                                <Ldashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact path="/test"
                        element={
                            <ProtectedRoute accessLevel="patient">
                                <Test />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        exact path="/patientform" 
                        element={
                            <ProtectedRoute accessLevel="patient">
                                <Pforms />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <Footer />
            </div>
        </AuthProvider>
    );
};

export default App;