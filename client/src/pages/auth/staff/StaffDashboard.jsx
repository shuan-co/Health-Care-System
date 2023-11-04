import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db, user } from '../../../firebase/Firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import { config } from '../../../firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

function StaffDashboard() {
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
                        const docRef = doc(db, "clinicStaffs", user.uid);
                        const docSnap = await getDoc(docRef);
                        const clinicName = docSnap.data().clinicName;
                        setClinics(clinicName);
                        console.log(clinicName);

                        const docRefClinic = doc(db, clinicName, "staff", "staffList", user.uid);
                        const docSnapClinic = await getDoc(docRefClinic);
                        if (docSnapClinic.exists()) {
                            setFullName(docSnapClinic.data().firstname + " " + docSnapClinic.data().lastname);
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
        <>
            <div className="h-screen w-full flex overflow-hidden bg-white">
                <Sidebar selected={selected} name={fullName} changeSelected={changeSelected} />
                {selected == "dashboard" ? (
                    <div style={{ float: "left", width: "100vh", height: "100vh", marginLeft: "5vw", marginTop: "10vh" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ width: "70vw", height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div onClick={() => navigate('./patientlist')} className='Pdashboard-Card-BoxShadow' style={{ border: "2px solid #00008B", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    <div style={{ border: "2px solid #00008B", background: "linear-gradient(to bottom, #F6FFF0, #87CEEB)", width: "60%", height: "50%", borderRadius: "10px" }}>
                                    </div>
                                    <br />
                                    <span className="ml-3 text-blue-900 text-2xl text-center font-semibold">Create New Patient</span>
                                </div>
                                <div onClick={() => navigate('./record-diagnoses')} className='Pdashboard-Card-BoxShadow' style={{ border: "2px solid #00008B", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginLeft: "8vh" }}>
                                    <div style={{ border: "2px solid #00008B", background: "linear-gradient(to bottom, #F6FFF0, #87CEEB)", width: "60%", height: "50%", borderRadius: "10px" }}>
                                    </div>
                                    <br />
                                    <span className="ml-3 text-blue-900 text-2xl text-center font-semibold">New Outpatient Form</span>
                                </div>
                            </div>
                            <div style={{ width: "152vw", height: "30vh", display: "flex", alignItems: "center", marginTop: "4vh", marginLeft: "8.5vw" }}>
                                <div onClick={() => navigate('./personal-information')} className='Pdashboard-Card-BoxShadow' style={{ border: "2px solid #00008B", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    <div style={{ border: "2px solid #00008B", background: "linear-gradient(to bottom, #F6FFF0, #87CEEB)", width: "60%", height: "50%", borderRadius: "10px" }}>
                                    </div>
                                    <br />
                                    <span className="ml-3 text-blue-900 text-2xl text-center font-semibold">Patient List [Edit, Delete and Search]</span>
                                </div>
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
            {/* <p>Staff Dashboard</p> */}
            {/* <button onClick={() => navigate('./patientlist')}>Create Patient</button> */}
        </>
    )
}

export default StaffDashboard;