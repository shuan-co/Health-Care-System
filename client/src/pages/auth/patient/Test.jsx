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
                            <p style={{ fontSize: "20px" }}>Birthday: {formatDate(data.birthday)}</p>
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
                <p>Loading...</p>
            )}
        </>
    );
}

export default Test;
