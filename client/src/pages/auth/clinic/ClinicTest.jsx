import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { config } from "../../../firebase/Firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function ClinicTest({ clinicName }) {
    const [clinicData, setClinicData] = useState(null);
    const [personList, setPersonList] = useState([]);
    const [displayType, setDisplayType] = useState('patient'); // 'patient' or 'staff'

    useEffect(() => {
        const fetchData = async () => {
            // Get Clinic Information
            const clinicRef = collection(config.firestore, "Testing", "Clinics", clinicName);
            const clinicSnap = await getDocs(clinicRef);

            if (!clinicSnap.empty) {
                setClinicData(clinicSnap.docs.map(doc => doc.data()));
            } else {
                console.log("No such document!");
            }

            // Get list of persons in the clinic
            const personsCollectionRef = collection(config.firestore, "Testing", "Clinics", clinicName);
            const personsSnapshot = await getDocs(personsCollectionRef);
            
            const persons = personsSnapshot.docs
                .filter((doc) => doc.data().type === displayType)
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

            setPersonList(persons);
        };

        fetchData();
    }, [clinicName, displayType]);

    return (
        <>
            {clinicData ? (
                <>
                    <p className="text-2xl font-bold mb-4">Clinic Name: {clinicData.name}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => setDisplayType('patient')}>Show Patients</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setDisplayType('staff')}>Show Staff</button>
                    <p className="text-xl font-bold mt-4 mb-2">List of {displayType.charAt(0).toUpperCase() + displayType.slice(1)}:</p>
                    <ul>
                        {personList.map((person) => (
                            <li key={person.id} className="mb-1">{person.name}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading clinic data...</p>
            )}
        </>
    );
}

export default ClinicTest;
