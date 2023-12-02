import React, { useEffect, useState } from 'react'
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, config } from '../../../firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass}/>

export default function ClinicVisits(props) {
    const [clinic, setClinic] = useState([])
    const [diagnoses, setDiagnoses] = useState([])
    const [showFullData, setShowFullData] = useState("")
    const [index, setIndex] = useState(0)
    const [patientsUID, setPatientsUID] = useState([])
    const navigate  = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const unsubscribe = onAuthStateChanged(config.auth, async (user) => {
                try {
                    // get the clinic name of the staff
                    const docRef = doc(db, "clinicStaffs", user.uid);
                    const docSnap = await getDoc(docRef);
    
                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data().clinicName);
                        setClinic(docSnap.data().clinicName);
                    } else {
                        console.log("No such document!");
                    }
    
                    // Check if clinic has a value before proceeding
                    if (clinic) {
                        const querySnapshot = await getDocs(collection(db, clinic, "patients", "patientlist"));
                        const patientUIDs = [];
                        querySnapshot.forEach((doc) => {
                            patientUIDs.push(doc.id);
                        });
                        setPatientsUID(patientUIDs);
                    }
    
                } catch (error) {
                    console.error(error);
                }
            });
        }
    
        fetchData();
    }, [clinic]); // Added clinic as a dependency for useEffect
    
    // Use another useEffect to listen to changes in patientsUID and trigger diagnoses retrieval
    useEffect(() => {
        console.log(patientsUID.length)
        if (patientsUID.length > 0) {
            const fetchDiagnoses = async () => {
                const diagnosesArray = [];
                console.log("im in")
                for (let i = 0; i < patientsUID.length; i++) {
                    const querySnapshot = await getDocs(collection(db, clinic, "patients", "patientlist", patientsUID[i], "diagnoses"));
                    querySnapshot.forEach((doc) => {
                        diagnosesArray.push(doc.data());
                        console.log(doc.data())
                        console.log(doc.data())
                    });
                }
                setDiagnoses(diagnosesArray);
            };
    
            fetchDiagnoses();
        }
    }, [patientsUID, clinic]);
    

    function showForm(index){
        setShowFullData(true)
        setIndex(index)
    }

  return (
    <div className='w-screen p-12'>
        <div className='space-y-2 mb-8'>
            <h1 className='lato text-2xl'>SEARCH RECORDS</h1>
            <input type='text' className='border border-black rounded-lg w-2/4 h-8 p-2'></input>
            <div className='ms-3 inline'>
                <button>{searchIcon}</button>
            </div>
            {/*
                <div className='inline ms-3 h-8'>
                    <select
                        id="sortBy"
                        name="sortBy"
                        autoComplete="sortBy"
                        className="inline text-black block w-24 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 p-3"
                    >
                        <option selected>Sort by</option>
                        <option>Entry</option>
                        <option>Date</option>
                    </select>
                </div>
                */
            }   
        </div>

        <div className='relative w-full lato'>
            <div className='grid grid-cols-6 bg-blue-800 rounded-t-lg text-white exo text-center p-3'>
                <h1>ENTRY</h1>
                <h1>NAME</h1>
                <h1>DATE</h1>
                <h1>CHIEF COMPLAINT</h1>
                <h1>CLINIC</h1>
                <h1>OUTPATIENT FORM</h1>
            </div>
            
            <div className='bg-slate-100 rounded-b-lg'>
                {diagnoses.map((diagnosis, index) => (
                    <div className='grid grid-cols-6 text-center p-4 border border-black' key={index}>
                        {/* Add key={index} to the outer div */}
                        <h3 className='font-bold'>{index + 1}</h3>
                        <h3 className='capitalize'>{diagnosis.Name}</h3>
                        <h3 className='border bg-purple-200 rounded-2xl'>{diagnosis.VisitDate}</h3>
                        <h3 className='capitalize'>{diagnosis.ChiefComplaint}</h3>
                        <h3 className='capitalize'>{diagnosis.Clinic}</h3>
                        <button onClick={() => showForm(index)} className='hover:bg-slate-200 rounded-lg border border-black enriqueta'>
                            View Form
                        </button>
                    </div>
                ))}
                <div className='w-full h-10'>

                </div>
                
            </div>
            

        </div>

        {showFullData && (
            <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full mx-auto lato">
                    <div className="flex items-start justify-between p-4 border-b rounded-t bg-blue-800">
                        <h3 className="p-2 text-xl font-semibold text-white-900 dark:text-white">
                            Diagnosis
                        </h3>
                        <button
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-slate-50 dark:hover:text-black"
                            onClick={() => setShowFullData(false)}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
            
                    <div className="relative bg-white shadow shadow-2xl drop-shadow-2xl border border-black exo">
                        <div>
                            <button className='ms-6 mt-5 underline underline-offset-4 hover:text-blue-600' onClick={() => navigate('./patientlist')}>Check Patient's Personal Information</button>
                        </div>
                        <div className='p-6 grid grid-cols-2'>
                            <h3 className='font-bold'>Clinic</h3>
                            <p className='capitalize'>{diagnoses[index].Clinic}</p>
                            <h3 className='font-bold'>Name</h3>
                            <p className='capitalize'>{diagnoses[index].Name}</p>
                            <h3 className='font-bold'>Chief Complaint</h3>
                            <p>{diagnoses[index].ChiefComplaint}</p>
                            <h3 className='font-bold'>Assessment</h3>
                            <p>{diagnoses[index].Assessment}</p>
                            <h3 className='font-bold'>Date</h3>
                            <p>{diagnoses[index].VisitDate}</p>
                            <h3 className='font-bold'>Follow Up Date</h3>
                            <p>{diagnoses[index].FollowUpDate}</p>
                            <h3 className='font-bold'>Disposition</h3>
                            <p>{diagnoses[index].Disposition}</p>
                            <h3 className='font-bold'>Treatment</h3>
                            <p>{diagnoses[index].Treatment}</p>
                            <h3 className='font-bold'>Blood Pressure</h3>
                            <p>{diagnoses[index].BP}</p>
                            <h3 className='font-bold'>Heart Rate</h3>
                            <p>{diagnoses[index].HeartRate}</p>
                            <h3 className='font-bold'>Respiratory Rate</h3>
                            <p>{diagnoses[index].RespiratoryRate}</p>
                            <h3 className='font-bold'>Height</h3>
                            <p>{diagnoses[index].Height}</p>
                            <h3 className='font-bold'>Weight</h3>
                            <p>{diagnoses[index].Weight}</p>
                            <h3 className='font-bold'>Last Menstration Date</h3>
                            <p>{diagnoses[index].LastMensDate}</p>
                            <h3 className='font-bold'>Temperature</h3>
                            <p>{diagnoses[index].Temperature}</p>
                            <h3 className='font-bold'>Notes:</h3>
                            <p>{diagnoses[index].ProviderNotes}</p>
                        </div>
                    </div>
                
                </div>
            </div>
        )}
    </div>
  )
}
