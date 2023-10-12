import React, { useState, useEffect } from 'react';
import ClinicTest from './ClinicTest';
import { config } from '../../../firebase/Firebase';
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore'
import { user } from '../../../firebase/Firebase';
import { Link } from 'react-router-dom';
import iconuser from './OIP.jpg';
import "./cdashboard.css"
import NavClinic from './components/NavClinic';
import { useNavigate } from 'react-router-dom';

function Cdashboard() {
    const [clinicName, setClinicName] = useState('');

    const navigate = useNavigate();

    const handleViewMedicalRecordsClick = () => {
        navigate("/clinictest");
    };

    const handleViewPatientForm = () => {
        navigate("/patientform");
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(config.auth, (user) => {
            if (user) {
                setClinicName(user.uid);
            } else {
                setClinicName('');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <NavClinic></NavClinic>
            <div style={{ float: "left", width: "100vh", height: "100vh", marginLeft: "5vw", marginTop: "13vh" }}>
                <div style={{ width: "70vw", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div onClick={handleViewMedicalRecordsClick} className='Cdashboard-Card-BoxShadow' style={{ border: "2px solid #31493C", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ border: "2px solid #31493C", background: "linear-gradient(to bottom, #F6FFF0, #06530D)", width: "60%", height: "50%", borderRadius: "10px" }}>

                        </div>
                        <br />
                        <span class="ml-3 text-green-900 text-2xl text-center font-semibold">Personal & Medical <br /> Information</span>
                    </div>

                    <div onClick={handleViewPatientForm} className='Cdashboard-Card-BoxShadow' style={{ border: "2px solid #31493C", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginLeft: "8vh" }}>
                        <div style={{ border: "2px solid #31493C", background: "linear-gradient(to bottom, #F6FFF0, #06530D)", width: "60%", height: "50%", borderRadius: "10px" }}>

                        </div>
                        <br />
                        <span class="ml-3 text-green-900 text-2xl text-center font-semibold">Record Diagnosis & <br></br>Findings Data</span>
                    </div>
                </div>


                {/* 
                    <p style={{ fontSize: "30px" }}>Patient Logged In</p>
                <button
                    style={{ fontSize: "30px", color: "blue" }}
                    onClick={handleViewMedicalRecordsClick}
                >
                    View Medical Records
                </button> <br />

                <button
                    style={{ fontSize: "30px", color: "blue" }}
                    onClick={handleViewPatientForm}
                >
                    View Patient Form
                </button>
                 */}
            </div>
        </>
    );    
}

export default Cdashboard;
