import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { config } from "../../../firebase/Firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

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
        <>
            {userAccess ? (
                <div>
                    {data ? (
                        <>
                            <p style={{ fontSize: "20px" }}>Patient Name: {data.name}</p>
                            <p style={{ fontSize: "20px" }}>Contact Number: +63 {data.contact}</p>
                            <p style={{ fontSize: "20px" }}>Birthday: {formatDate(data.birtDate)}</p>
                        </>
                    ) : (
                        <p>Loading patient data...</p>
                    )}

                    {clinicMedicalRecords.map((clinicRecords, clinicIndex) => (
                        <div key={clinicIndex}>
                            <br />
                            <br />
                            <p>Clinic: {clinics[clinicIndex]}</p>
                            {clinicRecords.map((record, recordIndex) => (
                                <div key={recordIndex}>
                                    <br />
                                    <p>Medical Record #{recordIndex + 1}</p>
                                    <p>Diagnosis: {record.results}</p>
                                    <p>Date: {formatDate(record.date)}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">

                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
                    <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
                </div>
            )}
        </>
    );
}

export default Test;
