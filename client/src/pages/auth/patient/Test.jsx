import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { config } from "../../../firebase/Firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import NavPatient from "./components/NavPatient";
import "./components/navpatient.css"

function MedicalRecordCard({ medicalRecord, clinicName, recordIndex }) {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString();
    };

    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 ml-5" id="shadow">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Medical Record #{recordIndex + 1}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Diagnosis: {medicalRecord.results}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Date: {formatDate(medicalRecord.date)}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Clinic: {clinicName}</p>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </button>
        </div>
    );
}


function Test() {
    const [data, setData] = useState(null);
    const [clinicMedicalIds, setClinicMedicalIds] = useState([]);
    const [clinicMedicalRecords, setClinicMedicalRecords] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [userAccess, setUserAccess] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const unsubscribe = onAuthStateChanged(config.auth, async (user) => {
                if (user) {
                    setUserAccess(user);

                    // Get Patient Information
                    const docRef = doc(config.firestore, "Testing", "Patients", user.uid, "information");
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setData(docSnap.data());
                    } else {
                        console.log("No such document!");
                    }

                    // Fetch all Clinics 
                    const clinicsCollection = collection(doc(config.firestore, "Testing", "Patients"), user.uid);
                    const clinicSubCollection = await getDocs(clinicsCollection);
                    const clinicList = clinicSubCollection.docs.map((doc) => doc.id);
                    setClinics(clinicList);

                    // Fetch Medical Record IDs per Clinic
                    var tempArr = [];
                    for (const clinic of clinicList) {
                        if (clinic === "information") {
                            continue;
                        }
                        const clinicMedicalCollection = collection(doc(config.firestore, "Testing", "Patients", user.uid, clinic), "diagnosis");
                        const clinicMedicalSubCollection = await getDocs(clinicMedicalCollection);
                        const clinicMedicalList = clinicMedicalSubCollection.docs.map((doc) => doc.id);
                        tempArr.push(clinicMedicalList);
                    }
                    setClinicMedicalIds(tempArr);
                    // Fetch Medical Record of Clinic
                    var tempArr3 = [];
                    var counter = 0;
                    for (const medicalIds of tempArr) {
                        var tempArr2 = [];
                        for (const medicalId of medicalIds) {
                            const medicalData = await getDoc(doc(config.firestore, "Testing",
                                "Patients", user.uid, clinicList[counter], "diagnosis", medicalId));
                            tempArr2.push(medicalData.data());
                        }
                        tempArr3.push(tempArr2);
                        counter++;
                    }
                    setClinicMedicalRecords(tempArr3);
                }
            });

            // Return a function to unsubscribe when the component unmounts
            return () => {
                unsubscribe();
            };
        };

        fetchData();
    }, []);

    // Function to format timestamp to a readable date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString();
    };

    return (
        <div>
            {userAccess ? (
                <div>
                    {data ? (
                        <>
                            <NavPatient />
                            <div style={{ marginLeft: "30vh" }}>
                                <p style={{ fontSize: "20px" }}>Patient Name: {data.name}</p>
                                <p style={{ fontSize: "20px" }}>Contact Number: +63 {data.contact}</p>
                                <p style={{ fontSize: "20px" }}>Birthday: {formatDate(data.birthday)}</p>
                                <div style={{ display: "flex" }}>
                                    {clinicMedicalRecords.map((clinicRecords, clinicIndex) => (
                                        <div key={clinicIndex}>
                                            <br />
                                            <br />
                                            {clinicRecords.map((record, recordIndex) => (
                                                <MedicalRecordCard
                                                    key={recordIndex}
                                                    medicalRecord={record}
                                                    clinicName={clinics[clinicIndex]}
                                                    recordIndex={recordIndex}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Loading patient data...</p>
                    )}
                </div>
            ) : (
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">

                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
                    <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
                </div>
            )}
        </div>
    );
}

export default Test;
