import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { db, config } from '../../../firebase/Firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import pfp from '../components/pfp.jpg';
import { useNavigate } from "react-router-dom";

export default function PersonalInfo() {
    const [clinics, setClinics] = useState([]);
    const [information, setInformation] = useState({});
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

return (
    <div className='w-screen p-10'>
        <div className='flex lato justify-center items-center h-full'>
            <div className='bg-slate-100 rounded-xl space-y-2 h-3/4 w-2/3 Pdashboard-Card-BoxShadow'>
            <h1 className='font-bold text-2xl mb-3 '>My Personal Information</h1>
                <div>
                    <h1 className='inline font-bold'>Full Name: </h1>
                    <p className='inline'>{information.firstname} {information.lastname}</p>
                </div>
                <div>
                    <h1 className='inline font-bold'>Email Address: </h1>
                    <p className='inline'>{information.email}</p>
                </div>
                <div> 
                    <h1 className='inline font-bold'>Phone Number: </h1>
                    <p className='inline'>{information.phoneNumber}</p>
                </div>
                <div>
                    <h1 className='inline font-bold'>Street Address: </h1>
                    <p className='inline'>{information.streetAddress}</p>
                </div>
                <div>
                    <h1 className='inline font-bold'>Gender: </h1>
                    <p className='inline'>{information.sex}</p>
                </div>
            </div>
        </div>
    </div>
);
} 

