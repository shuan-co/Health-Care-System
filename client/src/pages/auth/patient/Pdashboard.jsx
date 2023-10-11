import { useNavigate } from 'react-router-dom';
import NavPatient from './components/NavPatient';

import "./pdashboard.css"

function Pdashboard() {
    const navigate = useNavigate();

    const handleViewMedicalRecordsClick = () => {
        navigate("/test");
    };

    const handleViewPatientForm = () => {
        navigate("/patientform");
    };

    return (
        <>
            <NavPatient></NavPatient>
            <div style={{ float: "left", width: "100vh", height: "100vh", marginLeft: "5vw", marginTop: "13vh" }}>
                <div style={{ width: "70vw", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div onClick={handleViewMedicalRecordsClick} className='Pdashboard-Card-BoxShadow' style={{ border: "2px solid #31493C", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ border: "2px solid #31493C", background: "linear-gradient(to bottom, #F6FFF0, #06530D)", width: "60%", height: "50%", borderRadius: "10px" }}>

                        </div>
                        <br />
                        <span class="ml-3 text-green-900 text-2xl text-center font-semibold">Personal & Medical <br /> Information</span>
                    </div>

                    <div onClick={handleViewPatientForm} className='Pdashboard-Card-BoxShadow' style={{ border: "2px solid #31493C", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginLeft: "8vh" }}>
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

export default Pdashboard;
