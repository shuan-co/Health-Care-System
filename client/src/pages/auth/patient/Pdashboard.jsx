import { useNavigate } from 'react-router-dom';
import NavPatient from './components/NavPatient';
import { useEffect, useState } from 'react';
import { db, user, config } from '../../../firebase/Firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import "./pdashboard.css"
import { onAuthStateChanged } from 'firebase/auth';
import Sidebar from '../components/Sidebar';
import PersonalInformation from './PersonalInformation';
import RecordDiagnoses from './RecordDiagnoses';

function Pdashboard() {
    const [fullName, setFullName] = useState("")
    const [selected, setSelected] = useState("dashboard")
    const [clinics, setClinics] = useState([])

    const navigate = useNavigate();

    const handleViewMedicalRecordsClick = () => {
        navigate("/test");
    };

    const handleViewPatientForm = () => {
        navigate("/patientform");
    };

    function changeSelected(selected) {
        setSelected(selected)
    }

    useEffect(() => {
        try {
            async function getPatientDoc() {
                const unsubscribe = onAuthStateChanged(config.auth, async (user) => {
                    if (user) {
                        const docRef = doc(db, "clinicPatient", user.uid);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            setFullName(docSnap.data().firstName + " " + docSnap.data().lastName);
                        } else {
                            console.log("No such document!");
                        }
                    }
                });
            }
            getPatientDoc();

        } catch (error) {
            console.log(error)
        }

    })

    return (
        <div className="h-screen w-full flex overflow-hidden bg-white">
            <Sidebar selected={selected} name={fullName} changeSelected={changeSelected} />
            {selected == "dashboard" ? (
                <div style={{ float: "left", width: "100vh", height: "100vh", marginLeft: "5vw", marginTop: "13vh" }}>
                    <div style={{ width: "70vw", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div onClick={() => setSelected('personal-information')} className='Pdashboard-Card-BoxShadow' style={{ border: "2px solid #00008B", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <div style={{ border: "2px solid #00008B", background: "linear-gradient(to bottom, #F6FFF0, #87CEEB)", width: "60%", height: "50%", borderRadius: "10px" }}>

                            </div>
                            <br />
                            <span className="ml-3 text-blue-900 text-2xl text-center font-semibold">My Personal & Medical <br /> Information</span>
                        </div>

                        <div onClick={() => setSelected('record-diagnoses')} className='Pdashboard-Card-BoxShadow' style={{ border: "2px solid #00008B", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginLeft: "8vh" }}>
                            <div style={{ border: "2px solid #00008B", background: "linear-gradient(to bottom, #F6FFF0, #87CEEB)", width: "60%", height: "50%", borderRadius: "10px" }}>

                            </div>
                            <br />
                            <span className="ml-3 text-blue-900 text-2xl text-center font-semibold">My Record Diagnosis & <br></br>Findings Data</span>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}

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

            {selected == 'personal-information' ? (
                <PersonalInformation changeSelected={changeSelected}/>
            ) : (
                <></>
            )}

            {selected == 'record-diagnoses' ? (
                <RecordDiagnoses />
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
