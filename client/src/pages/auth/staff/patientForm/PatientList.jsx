import { config, signInAuth, db } from "../../../../firebase/Firebase";
import { doc, setDoc, getDoc, getDocs, collection, addDoc, startAfter, limit, query, startAt, where } from "firebase/firestore";
import { useState, useEffect, Fragment, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import { Dialog, Transition } from '@headlessui/react'
import pfp from './pfp.jpg'
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function PatientList() {
    const [fullName, setFullName] = useState("")
    const [selected, setSelected] = useState("")
    const [clinicName, setClinicName] = useState('');
    const [loading, setLoading] = useState(true); // Initial loading state
    const [last, setLast] = useState("");
    const navigate = useNavigate()

    getDoc(doc(config.firestore, "clinicStaffs", config.auth.currentUser.uid))
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
                const clinicName = docSnapshot.data().clinicName;
                setClinicName(clinicName);
            } else {
                console.error("No document found for the current user");
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
        });

    const [patientList, setPatientList] = useState([]);

    const [lastVisible, setLastVisible] = useState(null);
    const [firstVisible, setFirstVisible] = useState(null);

    function changeSelected(selected){
        setSelected(selected)

        if(selected == "dashboard"){
            navigate('../clinic-staff')
        }
    }

    useEffect(() => {
        async function fetchPatients() {
            if (clinicName) {
                try {
                    const tempRecords = [];
                    const patientsCollectionRef = collection(config.firestore, clinicName, "patients", "patientlist");
                    const patientsQueried = query(patientsCollectionRef, limit(5));
                    const querySnapshot = await getDocs(patientsQueried);

                    console.log(querySnapshot.docs);

                    for (const doc of querySnapshot.docs) {
                        const baselineInformationCollectionRef = collection(config.firestore, clinicName, "patients", "patientlist", doc.id, "baselineInformation");
                        const baselineInformationSnapshot = await getDocs(baselineInformationCollectionRef);

                        baselineInformationSnapshot.forEach((baselineDoc) => {
                            const docData = baselineDoc.data();
                            docData.uid = doc.id; // Add the uid field
                            tempRecords.push(docData);
                        });
                    }
                    setFirstVisible(querySnapshot.docs[0]);
                    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
                    setPatientList(tempRecords);
                    setLoading(false);
                } catch (error) {
                    console.error("Error getting documents from patientlist collection:", error);
                }
            }
        }

        fetchPatients();
    }, [clinicName]);

    useEffect(() => {
        try {
            async function getPatientDoc() {
                const unsubscribe = onAuthStateChanged(config.auth, async (user) => {
                    if (user) {
                        if (clinicName && user && user.uid) {
                            const docRefClinic = doc(db, clinicName, "staff", "staffList", user.uid);
                            const docSnapClinic = await getDoc(docRefClinic);
                            if (docSnapClinic.exists()) {
                                setFullName(docSnapClinic.data().firstname + " " + docSnapClinic.data().lastname);
                            } else {
                                console.log("No such document!");
                            }
                          } else {
                            console.error("clinicName or user.uid is empty or undefined");
                          }
        
                       
                    }
                });
              }
              getPatientDoc();

        } catch (error) {
            console.log(error)
        }

    })

    // PAGINATION

    async function nextPatients() {
        if (clinicName) {
            try {
                const tempRecords = [];
                const patientsCollectionRef = collection(config.firestore, clinicName, "patients", "patientlist");
                const patientsQueried = query(patientsCollectionRef, limit(5), startAfter(lastVisible));
                const querySnapshot = await getDocs(patientsQueried);

                console.log(querySnapshot.docs);

                for (const doc of querySnapshot.docs) {
                    const baselineInformationCollectionRef = collection(config.firestore, clinicName, "patients", "patientlist", doc.id, "baselineInformation");
                    const baselineInformationSnapshot = await getDocs(baselineInformationCollectionRef);

                    baselineInformationSnapshot.forEach((baselineDoc) => {
                        const docData = baselineDoc.data();
                        docData.uid = doc.id; // Add the uid field
                        tempRecords.push(docData);
                    });
                }
                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
                setPatientList(tempRecords);
                setLoading(false);
            } catch (error) {
                console.error("Error getting documents from patientlist collection:", error);
            }
        }
    }

    async function previousPatients() {
        if (clinicName) {
            try {
                const tempRecords = [];
                const patientsCollectionRef = collection(config.firestore, clinicName, "patients", "patientlist");
                const patientsQueried = query(patientsCollectionRef, limit(5), startAt(firstVisible));
                const querySnapshot = await getDocs(patientsQueried);

                console.log(querySnapshot.docs);

                for (const doc of querySnapshot.docs) {
                    const baselineInformationCollectionRef = collection(config.firestore, clinicName, "patients", "patientlist", doc.id, "baselineInformation");
                    const baselineInformationSnapshot = await getDocs(baselineInformationCollectionRef);

                    baselineInformationSnapshot.forEach((baselineDoc) => {
                        const docData = baselineDoc.data();
                        docData.uid = doc.id; // Add the uid field
                        tempRecords.push(docData);
                    });
                }
                setFirstVisible(querySnapshot.docs[0]);
                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
                setPatientList(tempRecords);
                setLoading(false);
            } catch (error) {
                console.error("Error getting documents from patientlist collection:", error);
            }
        }
    }
    const [patientInfo, setCurrentInformation] = useState([])
    const showInformation = async (key) => {
        console.log(`Clicked on element with key: ${key}`);
        const info = doc(config.firestore, clinicName, "patients", "patientlist", key, "baselineInformation", "baselineInformation");
        const infoSnapshot = await getDoc(info)
        setCurrentInformation(infoSnapshot.data());
        setOpen(true);
        console.log(patientInfo);
    }
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-400 sm:mx-0 sm:h-10 sm:w-10">
                                                {/* Icon or Avatar */}
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Patient Information
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        {/* Patient Information */}
                                                        First Name: {patientInfo.firstname}
                                                        <br />
                                                        Last Name: {patientInfo.lastname}
                                                        <br />
                                                        Allergies: {patientInfo.allergies}
                                                        <br />
                                                        Blood Type: {patientInfo.bloodtype}
                                                        <br />
                                                        Email: {patientInfo.email}
                                                        <br />
                                                        Emergency Contact Name: {patientInfo.emergencyContactName}
                                                        <br />
                                                        Emergency Contact Number: {patientInfo.emergencyContactNumber}
                                                        <br />
                                                        Phone Number: {patientInfo.phoneNumber}
                                                        <br />
                                                        Relationship with Relative: {patientInfo.relationshipWithRelative}
                                                        <br />
                                                        Relative Condition: {patientInfo.relativeCondition}
                                                        <br />
                                                        Relative Medications: {patientInfo.relativeMedications}
                                                        <br />
                                                        Relative Name: {patientInfo.relativeName}
                                                        <br />
                                                        Sex: {patientInfo.sex}
                                                        <br />
                                                        Street Address: {patientInfo.streetAddress}
                                                        <br />
                                                        Vaccine Brand: {patientInfo.vaccineBrand}
                                                        <br />
                                                        Vaccine Date: {patientInfo.vaccineDate}
                                                        <br />
                                                        Vaccine Remarks: {patientInfo.vaccineRemarks}
                                                        <br />
                                                        Vaccine Type: {patientInfo.vaccineType}
                                                        <br />
                                                        History Date: {patientInfo.historyDate}
                                                        <br />
                                                        History Remarks: {patientInfo.historyRemarks}
                                                        <br />
                                                        History Type: {patientInfo.historyType}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-lime-800 duration-300"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Return
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="h-screen w-full flex overflow-hidden">
                <Sidebar selected={selected} name={fullName} changeSelected={changeSelected}/>

                <div className="staff-list flex-grow p-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (

                        < div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
                            <div class="flex items-center justify-between pb-6">
                                <div>
                                    <h2 class="font-semibold text-gray-700">User Accounts</h2>
                                    <span class="text-xs text-gray-500">View accounts of registered users</span>
                                </div>
                                <div class="flex items-center justify-between space-x-4">
                                    <button class="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="h-4 w-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                                        </svg>

                                        SEARCH
                                    </button>

                                    <button class="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="h-4 w-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                                        </svg>

                                        SORT
                                    </button>
                                </div>
                            </div>
                            <div class="overflow-y-hidden rounded-lg border">
                                <div class="overflow-x-auto">
                                    <table class="w-full">
                                        <thead>
                                            <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                                <th class="px-5 py-3">Sex</th>
                                                <th class="px-5 py-3">Full Name</th>
                                                <th class="px-5 py-3">Blood Type</th>
                                                <th class="px-5 py-3">Contact Number</th>
                                                <th class="px-5 py-3">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-gray-500">
                                            {patientList.map((patient, index) => (
                                                <tr key={patient.uid} onClick={() => showInformation(patient.uid)} style={{ cursor: "pointer" }}>
                                                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                        <span
                                                            className={`rounded-full px-3 py-1 text-s font-semibold ${patient.sex === 'Male' ? 'bg-blue-200 text-blue-900' : 'bg-red-200 text-red-900'
                                                                }`}
                                                        >
                                                            {patient.sex === 'Male' ? 'Male' : 'Female'}
                                                        </span>
                                                    </td>
                                                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                        <div class="flex items-center">
                                                            <div class="h-10 w-10 flex-shrink-0">
                                                                <img class="h-full w-full rounded-full" src={pfp} alt="" />
                                                            </div>
                                                            <div class="ml-3">
                                                                <p class="whitespace-no-wrap">{patient.firstname} {patient.lastname}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                        <p class="whitespace-no-wrap">{patient.bloodtype}</p>
                                                    </td>
                                                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                        <p class="whitespace-no-wrap">{patient.phoneNumber}</p>
                                                    </td>

                                                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                        <p class="whitespace-no-wrap">{patient.email}</p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                                    <span class="text-xs text-gray-600 sm:text-sm"> Showing 1 to 5 entries </span>
                                    <div class="mt-2 inline-flex sm:mt-0">
                                        <button class="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100" onClick={previousPatients}>1</button>
                                        <button class="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100" onClick={nextPatients}>Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                </div>

            </div>
        </>
    )
}

export default PatientList;