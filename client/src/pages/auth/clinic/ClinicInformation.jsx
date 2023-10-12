import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { config } from "../../../firebase/Firebase";
import { getDoc, doc } from "firebase/firestore";

function ClinicInformation() {
    const [loading, setLoading] = useState(true);
    const [userAccess, setUserAccess] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const unsubscribe = onAuthStateChanged(config.auth, async (user) => {
                if (user) {
                    setUserAccess(user);

                    // Get Clinic Information
                    const docRef = doc(config.firestore, "Testing", "Clinics", user.uid, "information");
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setData(docSnap.data());
                        setLoading(false);
                    } else {
                        console.log("No such document!");
                    }
                }
            });

            // Return a function to unsubscribe when the component unmounts
            return () => {
                unsubscribe();
            };
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
            <p className="text-lg">Number of Patients: <span className="font-semibold">{data.numPatients}</span></p>
            {/* Add more fields as needed */}
        </div>
    );
}

export default ClinicInformation;
