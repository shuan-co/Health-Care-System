import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { db, config } from '../../../firebase/Firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import pfp from '../components/pfp.jpg';
import { useNavigate } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import FamilyMedical from './FamilyMedical';
import PersonalMedical from './PersonalMedical';
import Vaccination from './Vaccination';

export default function PersonalInformation(props) {
    const [clinics, setClinics] = useState([]);
    const [information, setInformation] = useState({});
    const [selected, setSelected] = useState("dashboard")
    const [fullName, setFullName] = useState("")
    const navigate = useNavigate();

    function changeSelected(selected) {
        setSelected(selected)
    }

    const navigatePatient = () => {
        navigate('/patient')
      }

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

    function backButtonHandler () {
        setSelected("dashboard")
    }


return (
    <div className='w-screen p-10 m-5'>
        <div className='flex lato justify-center items-center h-full'>
            {selected == "dashboard" ? (
            <div className='bg-slate-100 rounded-xl space-y-2 h-min w-2/3 Pdashboard-Card-BoxShadow m-16'>
                <div className='relative w-full lato'>
                    <div className='flex bg-sky-700 rounded-t-xl rounded-bl-3xl text-white exo p-3'>
                        <img className="rounded-full h-32 w-32" src={pfp}></img>
                        <div className='mt-5'> 
                            <div className='ml-5'>
                                <h1 className='inline font-bold text-6xl text-start'>{information.firstname} {information.lastname}</h1>
                            </div>
                            <div>
                                <h1 className='mt-4 ml-3 inline font-bold text-2xl'>{information.sex} | 25 years old</h1>
                            </div>
                        </div>
                    </div>
                    <div classname='p-4'>
                        <div className='bg-slate-100 rounded-b-lg flex'>
                            <div className='text-center items-center justify-center p-4 w-full'>
                                <button onClick={() => {setSelected('PersonalInfo')}} className='hover:bg-slate-300 text-blue enriqueta p-2 text-sky-800 text-2xl w-3/4 border-b-2 border-slate-400'>Personal Information</button>
                            </div>
                        </div>
                        <div className='bg-slate-100 rounded-b-lg flex'>
                            <div className='text-center items-center justify-center p-4 w-full'>
                                <button onClick={() => {setSelected('PersonalMedical')}} className='hover:bg-slate-300 text-blue enriqueta p-2 text-sky-800 text-2xl w-3/4 border-b-2 border-slate-400'>Personal Medical History</button>
                            </div>
                        </div>
                        <div className='bg-slate-100 rounded-b-lg flex'>
                            <div className='text-center items-center justify-center p-4 w-full'>
                                <button onClick={() => {setSelected('Vaccination')}} className='hover:bg-slate-300 text-blue enriqueta p-2 text-sky-800 text-2xl w-3/4 border-b-2 border-slate-400'>Vaccination Records</button>
                            </div>
                        </div>
                        <div className='bg-slate-100 rounded-b-lg flex'>
                            <div className='text-center items-center justify-center p-4 w-full'>
                                <button onClick={() => {setSelected('FamilyMedical')}} className='hover:bg-slate-300 text-blue enriqueta p-2 text-sky-800 text-2xl w-3/4 border-b-2 border-slate-400'>Family Medical History</button>
                            </div>
                        </div>
                        <div className='bg-slate-100 rounded-b-lg flex'>
                            <div className='text-center items-center justify-center p-4 border-b-2 border-slate-200 w-full'>
                                <button onClick={() => {setSelected('ClinicVisit')}} className='hover:bg-slate-300 text-blue enriqueta p-2 text-sky-800 text-2xl w-3/4 border-b-2 border-slate-400 mb-8'>Clinic Visit List</button>
                            </div>
                        </div>

                        <div className='bg-slate-100 rounded-b-lg flex'>
                            <div className='items-start justify-start p-4 w-32'>
                                <button onClick={() => props.backButtonHandler()} className='hover:bg-slate-300 text-blue enriqueta p-2 text-sky-800 text-2xl w-3/4 border-b-2 border-slate-400 mb-8'>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
                <></>
            )}

            {selected == 'PersonalInfo' ? (
                <PersonalInfo backButtonHandler={backButtonHandler}/>
            ) : (<></>)}

            {selected == 'PersonalMedical' ? (
                <PersonalMedical backButtonHandler={backButtonHandler}/>
            ) : (<></>)}

            {selected == 'Vaccination' ? (
                <Vaccination backButtonHandler={backButtonHandler}/>
            ) : (<></>)}

            {selected == 'FamilyMedical' ? (
                <FamilyMedical backButtonHandler={backButtonHandler}/>
            ) : (<></>)}

            {selected == 'ClinicVisit' ? (
                props.changeSelected('record-diagnoses')
            ) : (<></>)}
        </div>
    </div>
    );
}
