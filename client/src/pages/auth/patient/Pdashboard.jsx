import { useNavigate } from 'react-router-dom';
import NavPatient from './components/NavPatient';
import { useEffect, useState } from 'react';

import "./pdashboard.css"
import Sidebar from '../components/Sidebar';

function Pdashboard() {
    const [adminName, setAdminName] = useState("")
    const [clinicName, setClinicName] = useState("")
    const [selected, setSelected] = useState("dashboard")

    const navigate = useNavigate();

    const handleViewMedicalRecordsClick = () => {
        navigate("/test");
    };

    const handleViewPatientForm = () => {
        navigate("/patientform");
    };

    function changeSelected(selected){
        setSelected(selected)
    }

    useEffect(() => {
        try {
            

        } catch (error) {
            console.log(error)
        }
    })

    return (
        <div className="h-screen w-full flex overflow-hidden bg-white">
            <Sidebar selected={selected} name={adminName} changeSelected={changeSelected}/>
            {selected == "dashboard" ? (
                <div style={{ float: "left", width: "100vh", height: "100vh", marginLeft: "5vw", marginTop: "13vh" }}>
                    <div style={{ width: "70vw", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div onClick={handleViewMedicalRecordsClick} className='Pdashboard-Card-BoxShadow' style={{ border: "2px solid #00008B", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <div style={{ border: "2px solid #00008B", background: "linear-gradient(to bottom, #F6FFF0, #87CEEB)", width: "60%", height: "50%", borderRadius: "10px" }}>

                            </div>
                            <br />
                            <span class="ml-3 text-blue-900 text-2xl text-center font-semibold">My Personal & Medical <br /> Information</span>
                        </div>

                        <div onClick={handleViewPatientForm} className='Pdashboard-Card-BoxShadow' style={{ border: "2px solid #00008B", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginLeft: "8vh" }}>
                            <div style={{ border: "2px solid #00008B", background: "linear-gradient(to bottom, #F6FFF0, #87CEEB)", width: "60%", height: "50%", borderRadius: "10px" }}>

                            </div>
                            <br />
                            <span class="ml-3 text-blue-900 text-2xl text-center font-semibold">My Record Diagnosis & <br></br>Findings Data</span>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            ) }

            {selected == "profile" ? (
                <div className="p-20 border-2 w-10/12">
                    <h1 className="text-4xl exo">Profile</h1>
                </div>
            ) : (
                <></>
            )}

            {selected == "inbox" ? (
                <div className="p-20 border-2 w-10/12">
                    <h1 className="text-4xl exo">Inbox</h1>
                </div>
            ) : (
                <></>
            )}

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
    )
}

export default Pdashboard;
