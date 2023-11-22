import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { db, config } from '../../../firebase/Firebase';
import { collection, query, getDocs, getDoc, doc } from 'firebase/firestore';
import pfp from '../components/pfp.jpg';
import { useNavigate } from "react-router-dom";

export default function PersonalInfo(props) {
    const [clinics, setClinics] = useState([]);
    const [information, setInformation] = useState({});
    const [email, setEmail] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        async function getClinics() {
        try {
            const user = config.auth.currentUser;
            if (user) {
            const q = query(collection(db, 'clinicPatient', user.uid, 'clinics'));

            const querySnapshot = await getDocs(q);
            const clinicsArray = [];
            querySnapshot.forEach((doc) => {
                clinicsArray.push(doc.id);
            });
            setClinics(clinicsArray);
            }
        } catch (error) {
            console.log(error);
        }
        }

        // Call the getClinics function to retrieve clinics data
        getClinics();
    }, []);

    useEffect(() => {
        // Ensure clinics[0] is not empty before using it
        if (clinics[0]) {
        async function getPatientData() {
            try {
            const user = config.auth.currentUser;
            if (user) {
                const q = query(
                collection(db, clinics[0], 'patients', 'patientlist', user.uid, 'baselineInformation')
                );

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                setInformation(doc.data());
                });
            }
            } catch (error) {
            console.log(error);
            }
        }

        // Call the getPatientData function to retrieve patient data
        getPatientData();
        }

    }, [clinics]); // Only run this effect when clinics change

    // get email of user
    useEffect(() => {
        async function getEmail () {
            try {
                const user = config.auth.currentUser;
                const docRef = doc(db, "clinicPatient", user.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setEmail(docSnap.data().email)
                } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
                }
            } catch (error) {
                console.log(error)
            }
        }

        getEmail()
    })

return (
    <div className='w-3/4'>
        <div className="relative w-full max-w-2xl max-h-full mx-auto lato">
            <div className="flex items-start justify-between p-4 border-b rounded-t bg-sky-800">
                <h3 className="p-2 text-xl font-semibold text-white-900 dark:text-white exo mx-auto">
                    Personal Information
                </h3>
                
            </div>
            <div className='bg-slate-100 rounded-xl space-y-4 h-3/4 Pdashboard-Card-BoxShadow p-14 lato'>    
                <div className='grid grid-cols-2'>
                    <h1 className='inline font-bold text-sky-800'>Full Name: </h1>
                    <p className='inline'>{information.firstname} {information.lastname}</p>
                </div>
                <div className='grid grid-cols-2'>
                    <h1 className='inline font-bold text-sky-800'>Email Address: </h1>
                    <p className='inline'>{email}</p>
                </div>
                <div className='grid grid-cols-2'> 
                    <h1 className='inline font-bold text-sky-800'>Phone Number: </h1>
                    <p className='inline'>{information.phoneNumber}</p>
                </div>
                <div className='grid grid-cols-2'>
                    <h1 className='inline font-bold text-sky-800'>Street Address: </h1>
                    <p className='inline'>{information.streetAddress}</p>
                </div>
                <div className='grid grid-cols-2'>
                    <h1 className='inline font-bold text-sky-800'>Gender: </h1>
                    <p className='inline'>{information.sex}</p>
                </div>
                <div className='grid grid-cols-2'>
                    <h1 className='inline font-bold text-sky-800'>Emergency Contact Name: </h1>
                    <p className='inline'>{information.emergencyContactName}</p>
                </div>
                <div className='grid grid-cols-2'>
                    <h1 className='inline font-bold text-sky-800'>Emergency Contact Phone Number: </h1>
                    <p className='inline'>{information.emergencyContactNumber}</p>
                </div>
                <div className='grid grid-cols-2'>
                    <h1 className='inline font-bold text-sky-800'>Allergies: </h1>
                    <p className='inline'>{information.allergies}</p>
                </div>

                <div className='flex justify-end'>
                    <button onClick={() => props.backButtonHandler()} className='mt-8 border-2 border-red-600 rounded-lg  p-1 w-20 text-red-600 hover:bg-red-600 hover:text-white'>Exit</button>
                </div>
            </div>
        </div>
    </div>
);
} 

