import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { db, config } from '../../../firebase/Firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import pfp from '../components/pfp.jpg';
import { useNavigate } from "react-router-dom";

export default function Vaccination(props) {
    const [clinics, setClinics] = useState([]);
    const [information, setInformation] = useState({});
    const [vaccinationList, setVaccinationList] = useState([])
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
                        console.log(doc.data())
                        setInformation(doc.data());

                        // SET VACCINATION HISTORY INSTANCES
                        let filteredData = Object.entries(doc.data()).reduce((acc, [key, value]) => {
                            if (key.startsWith('vac')) {
                                acc[key] = value;
                            }
                            return acc;
                        }, {});

                        let groupedDict = {};

                        for (const [key, value] of Object.entries(filteredData)) {
                            // Extract the number at the end of the key using regular expression
                            const match = key.match(/\d+$/);

                            if (match) {
                                const number = match[0];
                                const keyWithoutNumber = key.replace(/\d+$/, ''); // Remove the numerical value at the end of the key

                                // Create a new dictionary for each number if it doesn't exist
                                if (!groupedDict[number]) {
                                    groupedDict[number] = {};
                                }

                                // Add key-value pair to the corresponding number's dictionary
                                groupedDict[number][keyWithoutNumber] = value;
                            }
                        }

                        setVaccinationList(Object.values(groupedDict));
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

        // Call the getPatientData function to retrieve patient data
        getPatientData();
        }
        console.log(vaccinationList)

    }, [clinics]); // Only run this effect when clinics change

return (
    <div className='w-3/4'>
        <div className="relative w-full max-w-2xl max-h-full mx-auto lato">
            <div className="flex items-start justify-between p-4 border-b rounded-t bg-sky-800">
                <h3 className="p-2 text-xl font-semibold text-white-900 dark:text-white exo mx-auto">
                    Vaccinations
                </h3>
                
            </div>

            {vaccinationList.map((item, index) => (            
                <div className='bg-slate-100 rounded-xl space-y-2 h-3/4 Pdashboard-Card-BoxShadow p-10 lato'>  
                    <h1 className='text-xl font-semibold text-sky-800 exo mx-auto mb-5 underline underline-offset-8'>Vaccination {index + 1}</h1>  
                    <div className='grid grid-cols-2'>
                        <h1 className='inline font-bold text-sky-800'>Vaccine Type: </h1>
                        <p className='inline'>{item.vaccineType}</p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <h1 className='inline font-bold text-sky-800'>Vaccine Brand: </h1>
                        <p className='inline'>{item.vaccineBrand}</p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <h1 className='inline font-bold text-sky-800'>Vaccination Date: </h1>
                        <p className='inline'>{item.vaccineDate}</p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <h1 className='inline font-bold text-sky-800'>Vaccination Remarks: </h1>
                        <p className='inline'>{item.vaccineRemarks}</p>
                    </div>

                    <div className='flex justify-end'>
                        <button onClick={() => props.backButtonHandler()} className='mt-8 border-2 border-red-600 rounded-lg  p-1 w-20 text-red-600 hover:bg-red-600 hover:text-white'>Exit</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
} 
