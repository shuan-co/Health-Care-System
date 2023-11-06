import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db, user } from '../../../firebase/Firebase';
import { doc, getDoc, setDoc, addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import { config, signInAuth } from '../../../firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { createUserWithEmailAndPassword, signOut, getAuth } from "firebase/auth";

import RequiredAsterisk from './patientForm/components/asterisk';
import emailjs, { send } from 'emailjs-com';
import FamilyHistory from './patientForm/components/FamilyHistory';
import PersonalMedicalHistory from './patientForm/components/PersonalMedicalHistory';
import Vaccination from './patientForm/components/Vaccination';

import patientIco from "./patient.png";
import outPatientIco from "./outpatient.png";
import calendarIco from "./calendar.png";

function StaffDashboard() {
    const [fullName, setFullName] = useState("")
    const [selected, setSelected] = useState("dashboard")
    const [showForm, setShowForm] = useState(false)
    const [clinics, setClinics] = useState([])

    const navigate = useNavigate();

    const handleViewMedicalRecordsClick = () => {
        navigate("/test");
    };

    const handleViewPatientForm = () => {
        navigate("/patientform");
    };

    function changeSelected(selected) {
        setSelected(selected)
    }

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
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    // ..
                                    console.log(errorCode + " | " + errorMessage)
                                    if (errorCode == "auth/email-already-in-use") {
                                        alert("Email is already in use")
                                    } else if (errorCode == "auth/weak-password") {
                                        alert("Password is too weak")
                                    }

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

    useEffect(() => {
        try {
            async function getPatientDoc() {
                const unsubscribe = onAuthStateChanged(config.auth, async (user) => {
                    if (user) {
                        const docRef = doc(db, "clinicStaffs", user.uid);
                        const docSnap = await getDoc(docRef);
                        const clinicName = docSnap.data().clinicName;
                        setClinics(clinicName);
                        console.log(clinicName);

                        const docRefClinic = doc(db, clinicName, "staff", "staffList", user.uid);
                        const docSnapClinic = await getDoc(docRefClinic);
                        if (docSnapClinic.exists()) {
                            setFullName(docSnapClinic.data().firstname + " " + docSnapClinic.data().lastname);
                        } else {
                            console.log("No such document!");
                        }
                    }
                });
            }
            getPatientDoc();

        } catch (error) {
            console.log(error)
        }
    })
    return (
        <>
            <div className="h-screen w-full flex overflow-hidden" style={{ backgroundColor: "#dcdef3" }}>
                <Sidebar selected={selected} name={fullName} changeSelected={changeSelected} />
                {selected == "dashboard" ? (
                    <div style={{ float: "left", width: "100vh", height: "100vh", marginLeft: "5vw", marginTop: "5vh" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span className="text-black text-3xl font-semibold" style={{ marginLeft: "10vw" }}>
                                WELCOME BACK, {fullName}!
                            </span>
                            <div style={{ width: "70vw", height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div
                                    onClick={() => setShowForm((prevShowForm) => !prevShowForm)}
                                    className="Pdashboard-Card-BoxShadow"
                                    style={{
                                        border: "2px solid #00008B",
                                        width: "33%",
                                        height: "85%",
                                        borderRadius: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        background: "linear-gradient(to bottom right, #2657B7, #A5E4FF)",
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    >
                                        <span className="text-white text-4xl font-semibold" style={{ letterSpacing: "5px" }}>
                                            PATIENTS
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            background: `url(${patientIco}) center center no-repeat`,
                                            backgroundSize: "cover",
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "10px",
                                            marginTop: "100px"
                                        }}
                                    ></div>
                                </div>

                                <div
                                    onClick={() => navigate('./record-diagnoses')}
                                    className="Pdashboard-Card-BoxShadow"
                                    style={{
                                        border: "2px solid #6f183e",
                                        background: "linear-gradient(to bottom right, #E41818, #FB57FE)",
                                        width: "33%",
                                        height: "85%",
                                        borderRadius: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        marginLeft: "8vh",
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            textAlign: "center", // Add this line to center text within the div
                                        }}
                                    >
                                        <span className="text-white text-4xl font-semibold" style={{ letterSpacing: "5px" }}>
                                            OUTPATIENT <br /> FORM
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            background: `url(${outPatientIco}) center center no-repeat`,
                                            backgroundSize: "cover",
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "10px"
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div style={{
                                width: "152vw", height: "30vh", display: "flex", alignItems: "center", marginTop: "4vh", marginLeft: "8.5vw"
                            }}>
                                <div
                                    onClick={() => navigate('./personal-information')}
                                    className='Pdashboard-Card-BoxShadow'
                                    style={{
                                        border: "2px solid #00008B",
                                        background: "linear-gradient(to right, #312DEB 5%, #DCB0FF 60%)",
                                        marginLeft: "25px",
                                        width: "33%",
                                        height: "100%",
                                        borderRadius: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            textAlign: "center", // Add this line to center text within the div
                                        }}
                                    >
                                        <span className="text-white text-4xl font-semibold" style={{ letterSpacing: "5px" }}>
                                            SCHEDULE <br /> APPOINTMENTS
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            background: `url(${calendarIco}) center center no-repeat`,
                                            backgroundSize: "cover",
                                            width: "100%", // Increase the width percentage to make the picture larger
                                            height: "100%", // Keep the height at 100% to maintain the aspect ratio
                                            borderRadius: "10px",
                                            marginRight: "360px",
                                        }}
                                    ></div>
                                </div>

                            </div>
                        </div>
                        {showForm && (
                            <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div className="relative w-full max-w-2xl max-h-full mx-auto">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-xl font-semibold text-white dark:text-white">
                                                Add User
                                            </h3>
                                            <button
                                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-white rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() => setShowForm(false)}
                                            >
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        <div className="p-6 space-y-6 text-white">
                                            <form className="mx-auto mt-10" onSubmit={initializeClinic}>
                                                <div className="space-y-12 text-white">
                                                    <div className="border-b border-gray-900/10 pb-12">
                                                        <h2 className="text-base font-semibold leading-7 text-white">Personal Information</h2>

                                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                            <div className="sm:col-span-3">
                                                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                                                                    First name <RequiredAsterisk />
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        type="text"
                                                                        name="first-name"
                                                                        id="first-name"
                                                                        autoComplete="given-name"
                                                                        className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-3">
                                                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                                                                    Last name <RequiredAsterisk />
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        type="text"
                                                                        name="last-name"
                                                                        id="last-name"
                                                                        autoComplete="family-name"
                                                                        className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-full">
                                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                                                    Email address <RequiredAsterisk />
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        id="email"
                                                                        name="email"
                                                                        type="email"
                                                                        autoComplete="email"
                                                                        className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-full">
                                                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                                                    Password <RequiredAsterisk />
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        type="password"
                                                                        name="password"
                                                                        id="password"
                                                                        autoComplete="current-password"
                                                                        className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-full">
                                                                <label htmlFor="number" className="block text-sm font-medium leading-6 text-white">
                                                                    Phone number <RequiredAsterisk />
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        id="number"
                                                                        name="number"
                                                                        type="number"
                                                                        autoComplete="phone number"
                                                                        className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-span-full">
                                                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-white">
                                                                    Street address <RequiredAsterisk />
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        type="text"
                                                                        name="street-address"
                                                                        id="street-address"
                                                                        autoComplete="street-address"
                                                                        className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-4">
                                                                <fieldset>
                                                                    <legend className="text-sm font-semibold leading-6 text-white">Sex <RequiredAsterisk /></legend>
                                                                    <div className="flex items-center gap-x-3">
                                                                        <input
                                                                            id="male"
                                                                            name="sex"
                                                                            value="Male"
                                                                            type="radio"
                                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"

                                                                            required
                                                                        />
                                                                        <label htmlFor="male" className="block text-sm font-medium leading-6 text-white mb-1">
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
                                                                        <label htmlFor="female" className="block text-sm font-medium leading-6 text-white mb-1">
                                                                            Female
                                                                        </label>
                                                                    </div>
                                                                </fieldset>
                                                            </div>

                                                            <div className="sm:col-span-6">
                                                                <label htmlFor="bloodtype" className="block text-sm font-medium leading-6 text-white">
                                                                    Blood Type <RequiredAsterisk />
                                                                </label>
                                                                <div className="mt-2">
                                                                    <select
                                                                        id="bloodtype"
                                                                        name="bloodtype"
                                                                        autoComplete="bloodtype"
                                                                        className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 p-3"

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
                                                                <label htmlFor="emergencyContactName" className="block text-sm font-medium leading-6 text-white">
                                                                    Emergency Contact Name <RequiredAsterisk />
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        type="text"
                                                                        name="emergencyContactName"
                                                                        id="emergencyContactName"
                                                                        autoComplete="emergencyContactName"
                                                                        className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-3">
                                                                <label htmlFor="emergencyContactName" className="block text-sm font-medium leading-6 text-white">
                                                                    Emergency Contact Phone Number <RequiredAsterisk />
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        type="number"
                                                                        name="emergencyContactNumber"
                                                                        id="emergencyContactNumber"
                                                                        autoComplete="emergencyContactNumber"
                                                                        className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-span-full">
                                                                <label htmlFor="allergies" className="block text-sm font-medium leading-6 text-white">
                                                                    Allergies
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        type="text"
                                                                        name="allergies"
                                                                        id="allergies"
                                                                        autoComplete="allergies"
                                                                        className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"

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
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <></>
                )}

                {selected == "profile" ? (
                    <div className="p-20 border-2 w-10/12">
                        <h1 className="text-4xl exo">Profile</h1>
                    </div>
                ) : (
                    <></>
                )}

                {selected == "inbox" ? (
                    <div className="p-20 border-2 w-10/12">
                        <h1 className="text-4xl exo">Inbox</h1>
                    </div>
                ) : (
                    <></>
                )}

                {/* 
                        <p style={{ fontSize: "30px" }}>Patient Logged In</p>
                    <button
                        style={{ fontSize: "30px", color: "blue" }}
                        onClick={handleViewMedicalRecordsClick}
                    >
                        View Medical Records
                    </button> <br />

                    <button
                        style={{ fontSize: "30px", color: "blue" }}
                        onClick={handleViewPatientForm}
                    >
                        View Patient Form
                    </button>
                    */}
            </div>
            {/* <p>Staff Dashboard</p> */}
            {/* <button onClick={() => navigate('./patientlist')}>Create Patient</button> */}
        </>
    )
}

export default StaffDashboard;