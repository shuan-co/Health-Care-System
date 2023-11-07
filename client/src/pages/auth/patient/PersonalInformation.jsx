import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { db, config } from '../../../firebase/Firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export default function PersonalInformation() {
  const [clinics, setClinics] = useState([]);
  const [information, setInformation] = useState({});

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
        <div className='grid grid-cols-2 gap-5 lato'>
            <div className='bg-blue-300 p-4 rounded-xl space-y-2'>
                <h1 className='font-bold text-2xl mb-3'>My Personal Information</h1>
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
        
            <div className='bg-blue-300 p-4 rounded-xl space-y-2'>
                <h1 className='font-bold text-2xl mb-3'>Emergency Contact</h1>
                <div>
                    <h1 className='inline font-bold'>Emergency Contact Name: </h1>
                    <p className='inline'>{information.emergencyContactName}</p>
                </div>
                <div>
                    <h1 className='inline font-bold'>Emergency Contact Phone Number: </h1>
                    <p className='inline'>{information.emergencyContactNumber}</p>
                </div>
                <div>
                    <h1 className='inline font-bold'>Allergies: </h1>
                    <p className='inline'>{information.allergies}</p>
                </div>
            </div>

            <div className='bg-blue-300 p-4 rounded-xl space-y-2'>
                <h1 className='font-bold text-2xl mb-3'>Family History</h1>
                <div>
                    <h1 className='inline font-bold'>Relative Full Name: </h1>
                    <p className='inline'>{information.relativeName}</p>
                </div>
                <div>
                    <h1 className='inline font-bold'>Relationship with Relative: </h1>
                    <p className='inline'>{information.relationshipWithRelative}</p>
                </div>
                <div>
                    <h1 className='inline font-bold'>Condition of Relative: </h1>
                    <p className='inline'>{information.relativeCondition}</p>
                </div>
                <div>
                    <h1 className='inline font-bold'>Medications of Relative: </h1>
                    <p className='inline'>{information.relativeMedications}</p>
                </div>
            </div>

            <div className='bg-blue-300 p-4 rounded-xl space-y-2'>
                <h1 className='font-bold text-2xl mb-3'>Vaccination</h1>
                <div>
                    <h1 className='inline font-bold'>Vaccine Type: </h1>
                    <p className='inline'>{information.vaccineType}</p>
                </div>
                <div>
                    <h1 className='inline font-bold'>Vaccine Brand: </h1>
                    <p className='inline'>{information.vaccineBrand}</p>
                </div>
                <div>
                    <h1 className='inline font-bold'>Vaccination Date: </h1>
                    <p className='inline'>{information.vaccineDate}</p>
                </div>
                <div>
                    <h1 className='inline font-bold'>Vaccination Remarks: </h1>
                    <p className='inline'>{information.vaccineRemarks}</p>
                </div>
            </div>

            <div className='bg-blue-300 p-4 rounded-xl space-y-2'>
                <h1 className='font-bold text-2xl mb-3' >Personal Medical History</h1>
                <div>
                    <h1 className='inline font-bold'>Condition: </h1>
                    <p className='inline'>{information.historyType}</p>
                </div>
                <div>
                    <h1 className='inline font-bold'>Date: </h1>
                    <p className='inline'>{information.historyDate}</p>
                </div>
                <div>
                    <h1 className='inline font-bold'>Remarks: </h1>
                    <p className='inline'>{information.historyRemarks}</p>
                </div>
            </div>
        </div>
    </div>
  );
}
