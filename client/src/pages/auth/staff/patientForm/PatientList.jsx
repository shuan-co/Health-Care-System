import { config, signInAuth } from "../../../../firebase/Firebase";
import { doc, setDoc, getDoc, getDocs, collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import RequiredAsterisk from "./components/asterisk";
import emailjs, { send } from 'emailjs-com';
import FamilyHistory from "./components/FamilyHistory";
import PersonalMedicalHistory from "./components/PersonalMedicalHistory";
import Vaccination from "./components/Vaccination";

function PatientList() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        emailFormatted: '',
        password: '',
        clinicName: '',
        phoneNumber: '',
        streetAddress: '',
        sex: '',
        bloodtype: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        allergies: '',
        relativeName: '',
        relationshipWithRelative: '',
        relativeCondition: '',
        relativeMedications: '',

        vaccineType: '',
        vaccineBrand: '',
        vaccineDate: '',
        vaccineRemarks: '',

        historyType: '',
        historyDate: '',
        historyRemarks: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [relativeName, setRelativeName] = useState("")
    const [relationshipWithRelative, setRelationshipWithRelative] = useState("")
    const [relativeCondition, setRelativeCondition] = useState("")
    const [relativeMedications, setRelativeMedications] = useState("")

    const [vaccineType, setVaccineType] = useState("")
    const [vaccineBrand, setVaccineBrand] = useState("")
    const [vaccineDate, setVaccineDate] = useState("")
    const [vaccineRemarks, setVaccineRemarks] = useState("")

    const [historyType, setHistoryType] = useState("")
    const [historyDate, setHistoryDate] = useState("")
    const [historyRemarks, setHistoryRemarks] = useState("")

    async function initializeClinic(e) {
        e.preventDefault();

        const firstName = e.target['first-name'].value;
        const lastName = e.target['last-name'].value;
        const email = e.target['email'].value;
        const password = e.target['password'].value;
        const phoneNumber = e.target['number'].value;
        const streetAddress = e.target['street-address'].value;
        const sex = e.target['sex'].value;
        const bloodtype = e.target['bloodtype'].value;
        const emergencyContactName = e.target['emergencyContactName'].value;
        const emergencyContactNumber = e.target['emergencyContactNumber'].value;
        const allergies = e.target['allergies'].value;
        const emailFormatted = email;

        // error in FamilyHistory.jsx
        // family history

        // error in Vaccination.jsx
        // vaccination
        /*
        const vaccineType = e.target['vaccineType'].value;
        const vaccineBrand = e.target['vaccineBrand'].value;
        const vaccineDate = e.target['vaccineDate'].value;
        const vaccineRemarks = e.target['vaccineRemarks'].value;

        // error in FamilyHistory.jsx
        // personal medical history
        const historyType = e.target['historyType'].value;
        const historyDate = e.target['historyDate'].value;
        const historyRemarks = e.target['historyRemarks'].value;*/

        setFormData({
            ...formData,
            firstName,
            lastName,
            email,
            emailFormatted,
            password,
            phoneNumber,
            streetAddress,
            sex,
            bloodtype,
            emergencyContactName,
            emergencyContactNumber,
            allergies,

            relativeName,
            relationshipWithRelative,
            relativeCondition,
            relativeMedications,

            vaccineType,
            vaccineBrand,
            vaccineDate,
            vaccineRemarks,

            historyType,
            historyDate,
            historyRemarks

        });
    };


    // functions for getting family history
    function getRelativeFullName(fullname) {
        setRelativeName(fullname)
    }

    function getRelationshipWithRelative(relationship) {
        setRelationshipWithRelative(relationship)
    }

    function getRelativeCondition(condition) {
        setRelativeCondition(condition)
    }

    function getRelativeMedications(medications) {
        setRelativeMedications(medications)
    }


    // functions for getting vaccination
    function getVaccineType(vaccineType) {
        setVaccineType(vaccineType)
    }

    function getVaccineBrand(vaccineBrand) {
        setVaccineBrand(vaccineBrand)
    }

    function getVaccineDate(vaccineDate) {
        setVaccineDate(vaccineDate)
    }

    function getVaccineRemarks(vaccineRemarks) {
        setVaccineRemarks(vaccineRemarks)
    }

    // functions for getting Personal Medical History
    function getHistoryType(historyType) {
        setHistoryType(historyType)
    }

    function getHistoryDate(historyDate) {
        setHistoryDate(historyDate)
    }

    function getHistoryRemarks(historyRemarks) {
        setHistoryRemarks(historyRemarks)
    }


    useEffect(() => {
        if (formData.email) {
            try {
                // EMAIL CREDENTIALS
                function sendEmail() {
                    emailjs
                        .send(
                            'service_t8pkk4o',
                            'template_x65vfmj',
                            formData,
                            'guzJ5EN-eKEHV_0jW'
                        )
                        .then(
                            (result) => {
                                alert('Email sent successfully!');
                            },
                            (error) => {
                                console.error('Email error:', error.text);
                                alert('Failed to send email.');
                            }
                        );
                }

                getDoc(doc(config.firestore, "clinicStaffs", config.auth.currentUser.uid))
                    .then((docSnapshot) => {
                        if (docSnapshot.exists()) {
                            // The document exists
                            const data = docSnapshot.data();
                            console.log("Document data:", data);

                            // Now you can access individual fields within the document
                            const clinicName = data.clinicName;
                            createUserWithEmailAndPassword(signInAuth.auth, formData.emailFormatted, formData.password)
                                .then((userCredential) => {
                                    setDoc(doc(config.firestore, "clinicPatient", userCredential.user.uid), {
                                        firstName: formData.firstName,
                                        lastName: formData.lastName,
                                        email: formData.email,

                                    });
                                    setDoc(doc(config.firestore, "clinicPatient", userCredential.user.uid, "clinics", clinicName), {
                                        clinicName: clinicName
                                    });

                                    // TODO: ADD INPATIENT INFORMATION
                                    addDoc(collection(config.firestore, clinicName, "patients", "patientlist", userCredential.user.uid, "baselineInformation"), {
                                        firstname: formData.firstName,
                                        lastname: formData.lastName,
                                        email: formData.email,
                                        phoneNumber: formData.phoneNumber,
                                        streetAddress: formData.streetAddress,
                                        sex: formData.sex,
                                        bloodtype: formData.bloodtype,
                                        emergencyContactName: formData.emergencyContactName,
                                        emergencyContactNumber: formData.emergencyContactNumber,
                                        allergies: formData.allergies,

                                        relativeName: formData.relativeName,
                                        relationshipWithRelative: formData.relationshipWithRelative,
                                        relativeCondition: formData.relativeCondition,
                                        relativeMedications: formData.relativeCondition,

                                        vaccineType: formData.vaccineType,
                                        vaccineBrand: formData.vaccineBrand,
                                        vaccineDate: formData.vaccineDate,
                                        vaccineRemarks: formData.vaccineRemarks,

                                        historyType: formData.historyType,
                                        historyDate: formData.historyDate,
                                        historyRemarks: formData.historyRemarks

                                    });

                                    setDoc(doc(config.firestore, clinicName, "patients", "patientlist", userCredential.user.uid), {
                                        identifier: "identifier"
                                    });
                                    // 



                                    sendEmail();
                                    // SignOut 2nd authentication
                                    signOut(signInAuth.auth).then(() => {
                                        // Sign-out successful.
                                    }).catch((error) => {
                                        // An error happened.
                                    });
                                    // ...
                                })
                                .catch((error) => {
                                    console.error("Error creating user:", error.message);
                                });

                        } else {
                            console.log("Document does not exist");
                        }
                    })
                    .catch((error) => {
                        console.error("Error getting document:", error);
                    });

            } catch (error) {
                console.error("Error initializing clinic:", error);
            }
        }
    }, [formData]);
    const [clinicName, setClinicName] = useState('');
    const [loading, setLoading] = useState(true); // Initial loading state

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
    
    useEffect(() => {
        async function fetchPatients() {
            if (clinicName) {
                var tempRecords = [];
                const patientsCollectionRef = collection(config.firestore, clinicName, "patients", "patientlist");
                getDocs(patientsCollectionRef)
                .then((querySnapshot) => {
                    querySnapshot.forEach(async (doc) => {

                    const baselineInformationCollectionRef = collection(config.firestore, clinicName, "patients", "patientlist", doc.id, "baselineInformation");

                    // Query the "baselineInformation" subcollection for each document
                    const baselineInformationSnapshot = await getDocs(baselineInformationCollectionRef);

                    baselineInformationSnapshot.forEach((baselineDoc) => {
                        tempRecords.push(baselineDoc.data());
                    });
                    });
                })
                .catch((error) => {
                    console.error("Error getting documents from patientlist collection:", error);
                });
                setPatientList(tempRecords);
            }
        }

        fetchPatients();
    }, [clinicName]);

    return (
        <>
            <div class="h-screen w-full flex overflow-hidden">
                <nav class="flex flex-col bg-gray-200 dark:bg-gray-900 w-64 px-12 pt-4 pb-6">

                    <div class="flex flex-row border-b items-center justify-between pb-2">
                        <span class="text-lg font-semibold capitalize dark:text-gray-300">
                            my admin
                        </span>

                        <span class="relative ">
                            <a
                                class="hover:text-green-500 dark-hover:text-green-300
					text-gray-600 dark:text-gray-300"
                                href="inbox/">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path
                                        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                </svg>
                            </a>
                            <div
                                class="absolute w-2 h-2 rounded-full bg-green-500
					dark-hover:bg-green-300 right-0 mb-5 bottom-0"></div>
                        </span>

                    </div>

                    <div class="mt-8">
                        <img
                            class="h-12 w-12 rounded-full object-cover"
                            src="https://appzzang.me/data/editor/1608/f9c387cb6bd7a0b004f975cd92cbe2d9_1471626325_6802.png"
                            alt="enoshima profile" />
                        <h2
                            class="mt-4 text-xl dark:text-gray-300 font-extrabold capitalize">
                            Hello Enoshima
                        </h2>
                        <span class="text-sm dark:text-gray-300">
                            <span class="font-semibold text-green-600 dark:text-green-300">
                                Admin
                            </span>
                            id789038
                        </span>
                    </div>

                    <button
                        class="mt-8 flex items-center justify-between py-3 px-2 text-white
                       dark:text-gray-200 bg-green-400 dark:bg-green-500 rounded-lg shadow"
                        onClick={() => setShowForm(prevShowForm => !prevShowForm)}
                    >
                        <span>Add user</span>
                        <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                        </svg>
                    </button>


                    <ul class="mt-2 text-gray-600">
                        <li class="mt-8">
                            <a href="#home" class="flex ">
                                <svg
                                    class="fill-current h-5 w-5 dark:text-gray-300"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
							4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
							4h4v-4h-4M4 8h4V4H4v4z"></path>
                                </svg>
                                <span
                                    class="ml-2 capitalize font-medium text-black
						dark:text-gray-300">
                                    dashboard
                                </span>
                            </a>
                        </li>

                        <li class="mt-8">
                            <a href="#home" class="flex">
                                <svg
                                    class="fill-current h-5 w-5 dark:text-gray-300"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2
							2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0
							00-2-2h-1V1m-1 11h-5v5h5v-5z"></path>
                                </svg>
                                <span
                                    class="ml-2 capitalize font-medium text-black
						dark:text-gray-300">
                                    calendar
                                </span>
                            </a>
                        </li>

                        <li
                            class="mt-8 shadow py-2 bg-white dark:bg-gray-200 rounded-lg
				-ml-4">
                            <a href="#home" class="flex pl-4">
                                <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
							014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
							8-4z"></path>
                                </svg>
                                <span class="ml-2 capitalize font-medium">users</span>
                            </a>
                        </li>

                        <li class="mt-8">
                            <a href="#home" class="flex">
                                <svg
                                    class="fill-current h-5 w-5 dark:text-gray-300"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M12 13H7v5h5v2H5V10h2v1h5v2M8
							4v2H4V4h4m2-2H2v6h8V2m10 9v2h-4v-2h4m2-2h-8v6h8V9m-2
							9v2h-4v-2h4m2-2h-8v6h8v-6z"></path>
                                </svg>
                                <span
                                    class="ml-2 capitalize font-medium text-black
						dark:text-gray-300">
                                    tasks
                                </span>
                            </a>
                        </li>

                    </ul>

                    <div class="mt-auto flex items-center text-red-700 dark:text-red-400">
                        <a href="#home" class="flex items-center">
                            <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012
						2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2
						0 012-2h9z"></path>
                            </svg>
                            <span class="ml-2 capitalize font-medium">log out</span>
                        </a>

                    </div>
                </nav>

                <div className="staff-list flex-grow p-4">
                {loading ? (
                    // Display "Loading" while data is being fetched
                    <p>Loading...</p>
                ) : (
                    // Display patient data once it's available
                    patientList.map((patient, index) => (
                    <div key={index} className="staff-item mb-4 p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-2">{patient.firstname} {patient.lastname}</h2>
                        <p className="text-gray-700">Email: {patient.email}</p>
                    </div>
                    ))
                )}
                </div>

            </div>
            {showForm && (
                <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-2xl max-h-full mx-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-white-900 dark:text-white">
                                    Add User
                                </h3>
                                <button
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => setShowForm(false)}
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <form onSubmit={initializeClinic}>
                                    <div className="border-b border-gray-900/10 pb-12">

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white-900">
                                                    First name <RequiredAsterisk />
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white-900">
                                                    Last name <RequiredAsterisk />
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="last-name"
                                                        id="last-name"
                                                        autoComplete="last-name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-6">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900">
                                                    Email <RequiredAsterisk />
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        autoComplete="email"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-full">
                                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white-900">
                                                    Password <RequiredAsterisk />
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        autoComplete="current-password"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-full">
                                                <button
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-auto"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <form className="mx-96 mt-10" onSubmit={initializeClinic}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name <RequiredAsterisk />
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name <RequiredAsterisk />
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address <RequiredAsterisk />
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password <RequiredAsterisk />
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone number <RequiredAsterisk />
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="number"
                                        name="number"
                                        type="number"
                                        autoComplete="phone number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Street address <RequiredAsterisk />
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <fieldset>
                                    <legend className="text-sm font-semibold leading-6 text-gray-900">Sex <RequiredAsterisk /></legend>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="male"
                                            name="sex"
                                            value="Male"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"

                                            required
                                        />
                                        <label htmlFor="male" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                                            Male
                                        </label>


                                        <input
                                            id="female"
                                            name="sex"
                                            type="radio"
                                            value="Female"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"

                                            required
                                        />
                                        <label htmlFor="female" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                                            Female
                                        </label>
                                    </div>
                                </fieldset>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="bloodtype" className="block text-sm font-medium leading-6 text-gray-900">
                                    Blood Type <RequiredAsterisk />
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="bloodtype"
                                        name="bloodtype"
                                        autoComplete="bloodtype"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 p-3"

                                    >
                                        <option>A+</option>
                                        <option>B+</option>
                                        <option>AB+</option>
                                        <option>O+</option>
                                        <option>A-</option>
                                        <option>B-</option>
                                        <option>AB-</option>
                                        <option>O-</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="emergencyContactName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Emergency Contact Name <RequiredAsterisk />
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="emergencyContactName"
                                        id="emergencyContactName"
                                        autoComplete="emergencyContactName"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="emergencyContactName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Emergency Contact Phone Number <RequiredAsterisk />
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="emergencyContactNumber"
                                        id="emergencyContactNumber"
                                        autoComplete="emergencyContactNumber"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="allergies" className="block text-sm font-medium leading-6 text-gray-900">
                                    Allergies
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="allergies"
                                        id="allergies"
                                        autoComplete="allergies"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Family History */}
                    <FamilyHistory
                        getRelativeFullName={getRelativeFullName}
                        getRelationshipWithRelative={getRelationshipWithRelative}
                        getRelativeCondition={getRelativeCondition}
                        getRelativeMedications={getRelativeMedications}
                    />


                    {/* Vaccination */}
                    <Vaccination
                        getVaccineType={getVaccineType}
                        getVaccineBrand={getVaccineBrand}
                        getVaccineDate={getVaccineDate}
                        getVaccineRemarks={getVaccineRemarks}
                    />

                    {/* Personal Medical History */}
                    <PersonalMedicalHistory
                        getHistoryType={getHistoryType}
                        getHistoryDate={getHistoryDate}
                        getHistoryRemarks={getHistoryRemarks}
                    />
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <button
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-auto"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <button
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-auto"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <button
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-auto"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default PatientList;