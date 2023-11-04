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
import Pdashboard from "./pages/auth/patient/Pdashboard";
import { AuthProvider } from './AuthContext';
import Footer from "./pages/noAuth/components/Footer";
import Test from "./pages/auth/patient/Test";

// NEW CHANGES
import AdminDashboard from "./pages/auth/admin/AdminDashboard";
import ClinicAdminDashboard from "./pages/auth/clinicAdmin/ClinicAdminDashboard";
import StaffList from "./pages/auth/clinicAdmin/staffForm/StaffList";
import StaffDashboard from "./pages/auth/staff/StaffDashboard";
import PatientList from "./pages/auth/staff/patientForm/PatientList";
import PersonalInformation from "./pages/auth/patient/PersonalInformation";
import RecordDiagnoses from "./pages/auth/patient/RecordDiagnoses";

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
                        case "admin":
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
        } else if (userAccess === "admin") {
            return <> <Navigate to="/admin" replace /> <AdminDashboard /></>
        } else if (userAccess === "cad") {
            return <> <Navigate to="/clinic-admin" replace /> <ClinicAdminDashboard /></>
        } else if (userAccess === "staff") {
            return <> <Navigate to="/clinic-staff" replace /> <StaffDashboard /></>
        } else if (userAccess === "gmail") {
            return <> <Navigate to="/patient" replace /> <Pdashboard /></>
        }
    }

    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <div className="h-max w-screen">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/aboutus" element={<Information />} />
                    <Route path="/questions" element={<QA />} />
                    <Route path="/login" element={<Login />} />

                    {/* SUPER ADMIN ROUTES */}
                    <Route
                        exact path="/admin"
                        element={
                            <ProtectedRoute accessLevel="admin">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* CLINIC ADMIN ROUTES */}
                    <Route
                        exact path="/clinic-admin"
                        element={
                            <ProtectedRoute accessLevel="cad">
                                <ClinicAdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact path="/clinic-admin/stafflist"
                        element={
                            <ProtectedRoute accessLevel="cad">
                                <StaffList />
                            </ProtectedRoute>
                        }
                    />

                    {/* STAFF ROUTES */}
                    <Route
                        exact path="/clinic-staff"
                        element={
                            <ProtectedRoute accessLevel="staff">
                                <StaffDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact path="/clinic-staff/patientlist"
                        element={
                            <ProtectedRoute accessLevel="staff">
                                <PatientList />
                            </ProtectedRoute>
                        }
                    />

                    {/* PATIENT ROUTES */}
                    <Route
                        exact path="/patient/personal-information"
                        element={
                            <ProtectedRoute accessLevel="gmail">
                                <PersonalInformation />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        exact path="/patient/record-diagnoses"
                        element={
                            <ProtectedRoute accessLevel="gmail">
                                <RecordDiagnoses />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        exact path="/patient"
                        element={
                            <ProtectedRoute accessLevel="gmail">
                                <Pdashboard />
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

                </Routes>
                <Footer />
            </div>
        </AuthProvider>
    );
};

export default App;