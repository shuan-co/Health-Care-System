import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { config } from "../../../firebase/Firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function ClinicTest() {
    const [clinicName, setClinicName] = useState('');
    const [clinicData, setClinicData] = useState(null);
    const [personList, setPersonList] = useState([]);
    const [displayType, setDisplayType] = useState('patient');

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

    useEffect(() => {
        const fetchData = async () => {
            const clinicRef = collection(config.firestore, "Testing", "Clinics", clinicName);
            const clinicSnap = await getDocs(clinicRef);

            if (!clinicSnap.empty) {
                setClinicData(clinicSnap.docs.map(doc => doc.data()));
            } else {
                console.log("No such document!");
            }
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

        if (clinicName) {
            fetchData();
        }
    }, [clinicName, displayType]);

    return (
        <div className="p-4">
            {clinicData ? (
                <>
                    <p className="text-2xl font-bold mb-4">Clinic Name: {clinicData.name}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => setDisplayType('patient')}>Show Patients</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setDisplayType('staff')}>Show Staff</button>
                    <p className="text-xl font-bold mt-4 mb-2">List of {displayType.charAt(0).toUpperCase() + displayType.slice(1)}:</p>
                    <ul className="list-disc pl-5">
                        {personList.map((person) => (
                            <li key={person.id} className="mb-1">{person.name}</li>
                        ))}
                    </ul>
                </>
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

export default ClinicTest;
