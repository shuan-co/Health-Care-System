import { config, signInAuth } from "../../../../firebase/Firebase";
import { doc, setDoc, getDoc, getDocs, collection, updateDoc, startAfter, limit, query, startAt } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useEffect, Fragment, useRef } from "react";
import pfp from './pfp.jpg'
import searchIcon from "./search.png"

import RequiredAsterisk from './components/asterisk';
import emailjs from 'emailjs-com';
import FamilyHistory from './components/FamilyHistory';
import PersonalMedicalHistory from './components/PersonalMedicalHistory';
import Vaccination from './components/Vaccination';

import { Dialog, Transition } from '@headlessui/react'

import "./patientlist.css"


function PatientList() {

    // FORM
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
    const [firstName, setFirstName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [lastName, setLastName] = useState("")

    const [sex, setSex] = useState("Male")
    const [bloodType, setBloodType] = useState("A+")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emergencyContactName, setEmergencyContactName] = useState("")
    const [emergencyContactNumber, setEmergencyContactNumber] = useState("")
    const [allergies, setAllergies] = useState("")

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
    const [ShowForm, setShowForm] = useState(false)
    const [ShowForm2, setShowForm2] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)


    async function initializeClinic(e) {
        e.preventDefault();
        const emailFormatted = email;

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
            bloodType,
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
    function getRelativeFullName(fullname, index) {
        handleInputChangeFamily(index, "relativeName", fullname);
    }

    function getRelationshipWithRelative(relationship, index) {
        handleInputChangeFamily(index, "relationshipWithRelative", relationship);
    }

    function getRelativeCondition(condition, index) {
        handleInputChangeFamily(index, "relativeCondition", condition);
    }

    function getRelativeMedications(medications, index) {
        handleInputChangeFamily(index, "relativeMedications", medications);
    }


    // functions for getting vaccination
    function getVaccineType(vaccineType, index) {
        handleInputChangeVaccine(index, "vaccineType", vaccineType);
    }

    function getVaccineBrand(vaccineBrand, index) {
        handleInputChangeVaccine(index, "vaccineBrand", vaccineBrand);
    }

    function getVaccineDate(vaccineDate, index) {
        handleInputChangeVaccine(index, "vaccineDate", vaccineDate);
    }

    function getVaccineRemarks(vaccineRemarks, index) {
        handleInputChangeVaccine(index, "vaccineRemarks", vaccineRemarks);
    }

    // functions for getting Personal Medical History
    function getHistoryType(historyType, index) {
        handleInputChangePersonal(index, "historyType", historyType);
    }

    function getHistoryDate(historyDate, index) {
        handleInputChangePersonal(index, "historyDate", historyDate);
    }

    function getHistoryRemarks(historyRemarks, index) {
        handleInputChangePersonal(index, "historyRemarks", historyRemarks);
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
                                    setDoc(doc(collection(config.firestore, clinicName, "patients", "patientlist", userCredential.user.uid, "baselineInformation"), "baselineInformation"), {
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
                                    });

                                    // add Doc
                                    familyHistoryList.forEach((item, index) => {
                                        // Modify keys in the same dictionary
                                        for (const key in item) {
                                            item[`${key}${index}`] = item[key];
                                            delete item[key];
                                        }
                                    });
                                    familyHistoryList.forEach((item, index) => {
                                        updateDoc(doc(collection(config.firestore, clinicName, "patients", "patientlist", userCredential.user.uid, "baselineInformation"), "baselineInformation"), item);
                                    });
                                    vaccinationList.forEach((item, index) => {
                                        // Modify keys in the same dictionary
                                        for (const key in item) {
                                            item[`${key}${index}`] = item[key];
                                            delete item[key];
                                        }
                                    });
                                    vaccinationList.forEach((item, index) => {
                                        updateDoc(doc(collection(config.firestore, clinicName, "patients", "patientlist", userCredential.user.uid, "baselineInformation"), "baselineInformation"), item);
                                    });
                                    personalList.forEach((item, index) => {
                                        // Modify keys in the same dictionary
                                        for (const key in item) {
                                            item[`${key}${index}`] = item[key];
                                            delete item[key];
                                        }
                                    });
                                    personalList.forEach((item, index) => {
                                        updateDoc(doc(collection(config.firestore, clinicName, "patients", "patientlist", userCredential.user.uid, "baselineInformation"), "baselineInformation"), item);
                                    });

                                    setDoc(doc(config.firestore, clinicName, "patients", "patientlist", userCredential.user.uid), {
                                        identifier: "identifier"
                                    });

                                    sendEmail();
                                    // SignOut 2nd authentication
                                    signOut(signInAuth.auth).then(() => {
                                        // Sign-out successful.
                                    }).catch((error) => {
                                        // An error happened.
                                    });
                                    // ...
                                    setShowForm(false);
                                    clearFormValues();
                                    setCurrentPage(1);
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

    const [lastVisible, setLastVisible] = useState(null);
    const [firstVisible, setFirstVisible] = useState(null);
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
                            const data = baselineDoc.data();
                            data.uid = doc.id;
                            tempRecords.push(data);
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
                        tempRecords.push(baselineDoc.data());
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
                        tempRecords.push(baselineDoc.data());
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

    // Modal
    const [open, setOpen] = useState(false)
    const [agreed, setAgreed] = useState(false)
    const cancelButtonRef = useRef(null)

    // Presentation
    const [showEmptyDiv, setShowEmptyDiv] = useState(false);

    const toggleEmptyDiv = () => {
        setShowEmptyDiv(!showEmptyDiv);
    };

    // Multiple Instances [Family History]
    const [familyHistoryList, setFamilyHistoryList] = useState([{}]);

    const handleAddClickFamily = () => {
        setFamilyHistoryList([...familyHistoryList, {}]);
    };

    const handleRemoveClickFamily = () => {
        if (familyHistoryList.length > 1) {
            setFamilyHistoryList(prevList => [...prevList.slice(0, -1)]);
        }
    };

    const handleInputChangeFamily = (index, field, value) => {
        setFamilyHistoryList(prevList => {
            const updatedList = [...prevList];
            updatedList[index][field] = value;
            return updatedList;
        });
    };

    // Multiple Instances [Vaccination]
    const [vaccinationList, setVaccinationList] = useState([{}]);

    const handleAddClickVaccine = () => {
        setVaccinationList([...vaccinationList, {}]);
    };

    const handleRemoveClickVaccine = () => {
        console.log("HELLO WORLD");
        if (vaccinationList.length > 1) {
            setVaccinationList(prevList => [...prevList.slice(0, -1)]);
        }
    };

    const handleInputChangeVaccine = (index, field, value) => {
        setVaccinationList(prevList => {
            const updatedList = [...prevList];
            updatedList[index][field] = value;
            return updatedList;
        });
    };

    // Multiple Instances [Personal Medical History]
    const [personalList, setPersonalList] = useState([{}]);

    const handleAddClickPersonal = () => {
        setPersonalList([...personalList, {}]);
    };

    const handleRemoveClickPersonal = () => {
        if (personalList.length > 1) {
            setPersonalList(prevList => [...prevList.slice(0, -1)]);
        }
    };

    const handleInputChangePersonal = (index, field, value) => {
        setPersonalList(prevList => {
            const updatedList = [...prevList];
            updatedList[index][field] = value;
            return updatedList;
        });
    };

    // Update Patient Information
    const [currentUID, setCurrentUID] = useState(null);
    const updatePatientInformation = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        updateDoc(doc(config.firestore, "clinicPatient", currentUID), {
            firstName: firstName,
            lastName: lastName
        });

        setDoc(doc(collection(config.firestore, clinicName, "patients", "patientlist", currentUID, "baselineInformation"), "baselineInformation"), {
            firstname: firstName,
            lastname: lastName,
            phoneNumber: phoneNumber,
            streetAddress: streetAddress,
            sex: sex,
            bloodtype: bloodType,
            emergencyContactName: emergencyContactName,
            emergencyContactNumber: emergencyContactNumber,
            allergies: allergies,
        });

        familyHistoryList.forEach((item, index) => {
            // Modify keys in the same dictionary
            for (const key in item) {
                item[`${key}${index}`] = item[key];
                delete item[key];
            }
        });
        familyHistoryList.forEach((item, index) => {
            updateDoc(doc(collection(config.firestore, clinicName, "patients", "patientlist", currentUID, "baselineInformation"), "baselineInformation"), item);
        });
        vaccinationList.forEach((item, index) => {
            // Modify keys in the same dictionary
            for (const key in item) {
                item[`${key}${index}`] = item[key];
                delete item[key];
            }
        });
        vaccinationList.forEach((item, index) => {
            updateDoc(doc(collection(config.firestore, clinicName, "patients", "patientlist", currentUID, "baselineInformation"), "baselineInformation"), item);
        });
        personalList.forEach((item, index) => {
            // Modify keys in the same dictionary
            for (const key in item) {
                item[`${key}${index}`] = item[key];
                delete item[key];
            }
        });
        personalList.forEach((item, index) => {
            updateDoc(doc(collection(config.firestore, clinicName, "patients", "patientlist", currentUID, "baselineInformation"), "baselineInformation"), item);
        });

        clearFormValues();
        setShowForm2(false);
    }

    // Load key data
    const [patientInfo, setCurrentData] = useState(null);
    const handleClick = async (key) => {
        const baselineInformationCollectionRef = doc(config.firestore, clinicName, "patients", "patientlist", key, "baselineInformation", "baselineInformation");
        const baselineInformationSnapshot = await getDoc(baselineInformationCollectionRef);
        setCurrentData(baselineInformationSnapshot.data());
        setCurrentUID(key);

        // UPDATE FORM FIELDS
        setFirstName(baselineInformationSnapshot.data().firstname);
        // INSERT MIDDLE NAME
        setLastName(baselineInformationSnapshot.data().lastname);
        setSex(baselineInformationSnapshot.data().sex);
        setBloodType(baselineInformationSnapshot.data().bloodtype);
        setPhoneNumber(baselineInformationSnapshot.data().phoneNumber);
        setStreetAddress(baselineInformationSnapshot.data().streetAddress);
        setEmail(baselineInformationSnapshot.data().email);
        setEmergencyContactName(baselineInformationSnapshot.data().emergencyContactName);
        setEmergencyContactNumber(baselineInformationSnapshot.data().emergencyContactNumber);
        setAllergies(baselineInformationSnapshot.data().allergies);

        // SET FAMILY HISTORY INSTANCES
        var filteredData = Object.entries(baselineInformationSnapshot.data()).reduce((acc, [key, value]) => {
            if (key.startsWith('rel')) {
                acc[key] = value;
            }
            return acc;
        }, {});

        var groupedDict = {};

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
        setFamilyHistoryList(Object.values(groupedDict));

        // SET VACCINATION HISTORY INSTANCES
        filteredData = Object.entries(baselineInformationSnapshot.data()).reduce((acc, [key, value]) => {
            if (key.startsWith('vac')) {
                acc[key] = value;
            }
            return acc;
        }, {});

        groupedDict = {};

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

        // SET PERSONAL HISTORY INSTANCES
        filteredData = Object.entries(baselineInformationSnapshot.data()).reduce((acc, [key, value]) => {
            if (key.startsWith('his')) {
                acc[key] = value;
            }
            return acc;
        }, {});

        groupedDict = {};

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

        setPersonalList(Object.values(groupedDict));

        setShowForm2(true);
        console.log(`Clicked on element with key: ${key}`);
    };

    // Clear Key Data
    const clearFormValues = () => {
        // Clear baseline information
        setCurrentData(null); // Assuming setCurrentData is used to set baseline information

        // Clear form fields
        setFirstName('');
        setLastName('');
        setSex('');
        setBloodType('');
        setPhoneNumber('');
        setStreetAddress('');
        setEmail('');
        setEmergencyContactName('');
        setEmergencyContactNumber('');
        setAllergies('');

        // Clear family history instances
        setFamilyHistoryList([{}]);

        // Clear vaccination history instances
        setVaccinationList([{}]);

        // Clear personal history instances
        setPersonalList([{}]);

        // Hide the form
        setShowForm2(false);
    };
    return (
        <>
            {/* Modal */}
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

                    <div className="fixed inset-0 z-10 overflow-y-auto">

                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            {showEmptyDiv ? (
                                <div>
                                    <div className="bg-gray-50 rounded-xl" style={{ width: "50vw", height: "80vh" }}>
                                        <div style={{
                                            backgroundColor: "#485af4",
                                            width: "100%",
                                            height: "13%",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",  // Center vertically
                                            justifyContent: "center",  // Center horizontally
                                        }}>
                                            <p className="text-4xl font-normal text-white" style={{}}>PATIENT INFORMATION FORM</p>
                                        </div>
                                        <div style={{ width: "100%", height: "67%", backgroundColor: "white" }}>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    {/* Patient Information */}
                                                    Allergies: {patientInfo.allergies}
                                                    <br />
                                                    Blood Type: {patientInfo.bloodType}
                                                    <br />
                                                    Email: {patientInfo.email}
                                                    <br />
                                                    Emergency Contact Name: {patientInfo.emergencyContactName}
                                                    <br />
                                                    Emergency Contact Number: {patientInfo.emergencyContactNumber}
                                                    <br />
                                                    First Name: {patientInfo.firstname}
                                                    <br />
                                                    Last Name: {patientInfo.lastname}
                                                    <br />
                                                    Phone Number: {patientInfo.phoneNumber}
                                                    <br />
                                                    Sex: {patientInfo.sex}
                                                    <br />
                                                    Street Address: {patientInfo.streetAddress}

                                                </p>
                                            </div>
                                        </div>
                                        {/* <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-lime-800 duration-300"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    Return
                                </button> */}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-xl" style={{ width: "50vw", height: "80vh" }}>
                                    <div style={{
                                        backgroundColor: "#485af4",
                                        width: "100%",
                                        height: "25%",
                                        borderBottomLeftRadius: "10vh",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",  // Center vertically
                                        justifyContent: "center",  // Center horizontally
                                    }}>
                                        <img
                                            src={pfp}
                                            alt=""
                                            style={{
                                                width: "18%",
                                                borderRadius: "50%", // Makes the image circular
                                                border: "5px solid #A3ACFC", // Adds a 3px border with the specified color
                                            }}
                                        />
                                        <div className="flex flex-col" style={{ textAlign: "left", marginLeft: "1.2vw", marginRight: "3vw" }}>
                                            <p className="text-4xl font-normal text-white" style={{}}>Patient Name</p>
                                            <p className="text-xl font-thin text-white" style={{ marginTop: "1vh", marginBottom: "2vh" }}>Sex | Age yrs old</p>
                                        </div>

                                        <button className="border-2 border-white text-2xl text-white px-5 py-3 rounded-lg hover:bg-white hover:text-[#485af4] hover:border-[#485af4] transition-all"
                                            style={{ marginLeft: "2vw", marginBottom: "2vh" }}>
                                            Edit Records
                                        </button>
                                    </div>
                                    <div style={{ width: "100%", height: "67%", backgroundColor: "white" }}>
                                        <div className="w-full h-2/3 bg-white flex flex-col items-center justify-center">
                                            <div className="w-full h-2/3 bg-white flex flex-col items-center justify-center">
                                                <button
                                                    className="border-b-4 p-2 m-2 border-gray-300 button-choice-menu text-3xl font-normal"
                                                    style={{
                                                        width: "80%",
                                                        marginTop: "15vh"
                                                    }}
                                                    onClick={toggleEmptyDiv}
                                                >
                                                    <span className="text-3xl font-normal">Personal Information</span>
                                                </button>
                                                <button
                                                    className="border-b-4 p-2 m-2 border-gray-300 button-choice-menu"
                                                    style={{
                                                        width: "80%",
                                                        marginTop: "3vh",
                                                    }}
                                                >
                                                    <span className="text-3xl font-normal">Patient Medical History</span>
                                                </button>
                                                <button
                                                    className="border-b-4 p-2 m-2 border-gray-300 button-choice-menu"
                                                    style={{
                                                        width: "80%",
                                                        marginTop: "3vh",
                                                    }}
                                                >
                                                    <span className="text-3xl font-normal">Vaccination Records</span>
                                                </button>
                                                <button
                                                    className="border-b-4 p-2 m-2 border-gray-300 button-choice-menu"
                                                    style={{
                                                        width: "80%",
                                                        marginTop: "3vh",
                                                    }}
                                                >
                                                    <span className="text-3xl font-normal">Family Medical History</span>
                                                </button>
                                                <button
                                                    className="border-b-4 p-2 m-2 border-gray-300 button-choice-menu"
                                                    style={{
                                                        width: "80%",
                                                        marginTop: "3vh",
                                                    }}
                                                >
                                                    <span className="text-3xl font-normal">Clinic Visit List</span>
                                                </button>
                                            </div>


                                        </div>

                                    </div>

                                    <hr style={{ border: 'none', borderTop: '3px solid #d1d5db' }} />
                                    <div style={{ width: "100%", height: "8%", alignItems: "center", display: "flex" }}>
                                        <button
                                            style={{
                                                border: '2px solid #909090',
                                                borderRadius: '50%',
                                                width: '40px',
                                                height: '40px',
                                                backgroundColor: 'transparent',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: '#444242',
                                                fontSize: '24px',
                                                textAlign: 'center',
                                                marginLeft: "10px",
                                            }}
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            <div>←</div>
                                        </button>
                                        <p style={{ marginLeft: "0.3vw", color: "#444242" }}>Back to Patients Database</p>
                                    </div>
                                    {/* <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-lime-800 duration-300"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    Return
                                </button> */}
                                </div>
                            )}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>



            <div className="h-screen w-full flex overflow-hidden">
                <nav className="flex flex-col bg-gray-200 dark:bg-gray-900 w-64 px-12 pt-4 pb-6">

                    <div className="flex flex-row border-b items-center justify-between pb-2">
                        <span className="text-lg font-semibold capitalize dark:text-gray-300">
                            my admin
                        </span>

                        <span className="relative ">
                            <a
                                className="hover:text-green-500 dark-hover:text-green-300
					text-gray-600 dark:text-gray-300"
                                href="inbox/">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path
                                        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                </svg>
                            </a>
                            <div
                                className="absolute w-2 h-2 rounded-full bg-green-500
					dark-hover:bg-green-300 right-0 mb-5 bottom-0"></div>
                        </span>

                    </div>

                    <div className="mt-8">
                        <img
                            className="h-12 w-12 rounded-full object-cover"
                            src="https://appzzang.me/data/editor/1608/f9c387cb6bd7a0b004f975cd92cbe2d9_1471626325_6802.png"
                            alt="enoshima profile" />
                        <h2
                            className="mt-4 text-xl dark:text-gray-300 font-extrabold capitalize">
                            Hello Enoshima
                        </h2>
                        <span className="text-sm dark:text-gray-300">
                            <span className="font-semibold text-green-600 dark:text-green-300">
                                Admin
                            </span>
                            id789038
                        </span>
                    </div>

                    <button
                        className="mt-8 flex items-center justify-between py-3 px-2 text-white
                       dark:text-gray-200 bg-green-400 dark:bg-green-500 rounded-lg shadow"
                    >
                        <span>Add user</span>
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                        </svg>
                    </button>


                    <ul className="mt-2 text-gray-600">
                        <li className="mt-8">
                            <a href="#home" className="flex ">
                                <svg
                                    className="fill-current h-5 w-5 dark:text-gray-300"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
							4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
							4h4v-4h-4M4 8h4V4H4v4z"></path>
                                </svg>
                                <span
                                    className="ml-2 capitalize font-medium text-black
						dark:text-gray-300">
                                    dashboard
                                </span>
                            </a>
                        </li>

                        <li className="mt-8">
                            <a href="#home" className="flex">
                                <svg
                                    className="fill-current h-5 w-5 dark:text-gray-300"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2
							2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0
							00-2-2h-1V1m-1 11h-5v5h5v-5z"></path>
                                </svg>
                                <span
                                    className="ml-2 capitalize font-medium text-black
						dark:text-gray-300">
                                    calendar
                                </span>
                            </a>
                        </li>

                        <li
                            className="mt-8 shadow py-2 bg-white dark:bg-gray-200 rounded-lg
				-ml-4">
                            <a href="#home" className="flex pl-4">
                                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
							014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
							8-4z"></path>
                                </svg>
                                <span className="ml-2 capitalize font-medium">users</span>
                            </a>
                        </li>

                        <li className="mt-8">
                            <a href="#home" className="flex">
                                <svg
                                    className="fill-current h-5 w-5 dark:text-gray-300"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M12 13H7v5h5v2H5V10h2v1h5v2M8
							4v2H4V4h4m2-2H2v6h8V2m10 9v2h-4v-2h4m2-2h-8v6h8V9m-2
							9v2h-4v-2h4m2-2h-8v6h8v-6z"></path>
                                </svg>
                                <span
                                    className="ml-2 capitalize font-medium text-black
						dark:text-gray-300">
                                    tasks
                                </span>
                            </a>
                        </li>

                    </ul>

                    <div className="mt-auto flex items-center text-red-700 dark:text-red-400">
                        <a href="#home" className="flex items-center">
                            <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012
						2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2
						0 012-2h9z"></path>
                            </svg>
                            <span className="ml-2 capitalize font-medium">log out</span>
                        </a>

                    </div>
                </nav>

                <div className="staff-list flex-grow p-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (

                        < div class="mx-auto  px-4 py-8 sm:px-8" >
                            <div class="flex items-center justify-between pb-6">
                                <div style={{ display: "flex" }}>
                                    <input
                                        type="text"
                                        placeholder="SEARCH PATIENTS"
                                        className="flex-1 rounded-3xl border border-gray-300 px-5 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                        style={{ width: '40vw', textAlign: 'center', fontSize: '1em', border: '1px solid' }}
                                    />
                                    <img src={searchIcon} alt="" style={{ marginLeft: "0.5vw" }} />
                                </div>
                                <div class="flex items-center justify-between space-x-4">
                                    <button class="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-xl font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
                                        SORT BY
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                                        </svg>
                                    </button>

                                    <button onClick={() => setShowForm((prevShowForm) => !prevShowForm)} class="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-xl font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
                                        CREATE NEW PATIENT
                                    </button>
                                </div>
                            </div>
                            <div class="overflow-y-hidden rounded-lg border">
                                <div class="overflow-x-auto">
                                    <table class="w-full">
                                        <thead>
                                            <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                                <th class="px-5 py-3"> </th>
                                                <th class="px-5 py-3">Sex</th>
                                                <th class="px-5 py-3">Full Name</th>
                                                <th class="px-5 py-3">Contact No.</th>
                                                <th class="px-5 py-3">Email</th>
                                                <th class="px-5 py-3">Records</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-gray-500">
                                            {patientList.map((patient, index) => (
                                                <tr>
                                                    <td class="border-b border-r border-gray-200 bg-white px-5 py-5 text-sm">
                                                        <p class="whitespace-no-wrap">{index + 1}</p>
                                                    </td>
                                                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                        <span
                                                            className={`rounded-full px-3 py-1 text-s font-semibold ${patient.sex === 'Male' ? 'bg-blue-200 text-blue-900' : 'bg-pink-200 text-pink-900'
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
                                                        <p class="whitespace-no-wrap">{patient.phoneNumber}</p>
                                                    </td>
                                                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                        <p class="whitespace-no-wrap">{patient.email}</p>
                                                    </td>

                                                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                        <button key={patient.uid} onClick={() => handleClick(patient.uid)} class="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-md font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
                                                            VIEW
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                                    <span class="text-xs text-gray-600 sm:text-sm"> Showing 1 to 5 of 12 Entries </span>
                                    <div class="mt-2 inline-flex sm:mt-0">
                                        <button class="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100" onClick={previousPatients}>Prev</button>
                                        <button class="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100" onClick={nextPatients}>Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
            </div>
            {ShowForm && (
                <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-2xl max-h-full mx-auto lato">
                        <div className="flex items-start justify-between p-4 border-b rounded-t bg-blue-800">
                            <h3 className="p-2 text-xl font-semibold text-white-900 dark:text-white">
                                PATIENT INFORMATION FORM
                            </h3>
                            <button
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-slate-50 dark:hover:text-black"
                                onClick={() => { setShowForm(false); clearFormValues(); setCurrentPage(1); }}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="relative bg-white shadow shadow-2xl drop-shadow-2xl border border-black">
                            <div className="p-10 space-y-6 text-black">
                                <form className="mx-auto exo" onSubmit={initializeClinic}>
                                    <div className="space-y-12 text-black">
                                        {currentPage == 1 ? (
                                            <div className="border-b border-gray-900/10 pb-12">
                                                <h2 className="text-base font-semibold leading-7 text-black">Personal Information</h2>

                                                <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-9">
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-black">
                                                            First name <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="first-name"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={firstName}
                                                                onChange={(e) => setFirstName(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="middle-name" className="block text-sm font-medium leading-6 text-black">
                                                            Middle name
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="middle-name"
                                                                id="middle-name"
                                                                autoComplete="middle-name"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={middleName}
                                                                onChange={(e) => setMiddleName(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-black">
                                                            Last name <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="last-name"
                                                                id="last-name"
                                                                autoComplete="family-name"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={lastName}
                                                                onChange={(e) => setLastName(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-9'>
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="sex" className="block text-sm font-medium leading-6 text-black">
                                                            Sex <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <select
                                                                id="sex"
                                                                name="sex"
                                                                autoComplete="sex"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 p-3"
                                                                value={sex}
                                                                onChange={(e) => setSex(e.target.value)}
                                                            >
                                                                <option value="Male" selected>Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="bloodType" className="block text-sm font-medium leading-6 text-black">
                                                            Blood Type <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <select
                                                                id="bloodType"
                                                                name="bloodType"
                                                                autoComplete="bloodType"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 p-3"
                                                                value={bloodType}
                                                                onChange={(e) => setBloodType(e.target.value)}
                                                            >
                                                                <option selected>A+</option>
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
                                                        <label htmlFor="number" className="block text-sm font-medium leading-6 text-black">
                                                            Phone number <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="number"
                                                                name="number"
                                                                type="number"
                                                                autoComplete="phone number"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={phoneNumber}
                                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-9'>
                                                    <div className="col-span-full">
                                                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-black">
                                                            Street address <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="street-address"
                                                                id="street-address"
                                                                autoComplete="street-address"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={streetAddress}
                                                                onChange={(e) => setStreetAddress(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-8'>
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                                            Email address <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="email"
                                                                name="email"
                                                                type="email"
                                                                autoComplete="email"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
                                                            Password <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                id="password"
                                                                autoComplete="current-password"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-8'>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="emergencyContactName" className="block text-sm font-medium leading-6 text-black">
                                                            Emergency Contact Name <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="emergencyContactName"
                                                                id="emergencyContactName"
                                                                autoComplete="emergencyContactName"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={emergencyContactName}
                                                                onChange={(e) => setEmergencyContactName(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="emergencyContactName" className="block text-sm font-medium leading-6 text-black">
                                                            Emergency Contact Phone Number <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="number"
                                                                name="emergencyContactNumber"
                                                                id="emergencyContactNumber"
                                                                autoComplete="emergencyContactNumber"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={emergencyContactNumber}
                                                                onChange={(e) => setEmergencyContactNumber(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-8'>
                                                    <div className="col-span-full">
                                                        <label htmlFor="allergies" className="block text-sm font-medium leading-6 text-black">
                                                            Allergies
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="allergies"
                                                                id="allergies"
                                                                autoComplete="allergies"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={allergies}
                                                                onChange={(e) => setAllergies(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end mt-8">
                                                    <button
                                                        onClick={() => setCurrentPage(currentPage + 1)}
                                                        className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button'
                                                    >
                                                        Next
                                                    </button>
                                                </div>

                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        {currentPage == 2 ? (
                                            <div>
                                                <br />
                                                <div style={{ float: "right" }}>
                                                    <button className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button' onClick={handleRemoveClickFamily} disabled={personalList.length === 1}>
                                                        Remove
                                                    </button>
                                                    <button className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button' style={{ marginLeft: "1vw" }} onClick={handleAddClickFamily}>Add Form</button>
                                                </div>
                                                {familyHistoryList.map((familyHistory, index) => (
                                                    <FamilyHistory
                                                        key={index}
                                                        relativeFullName={familyHistory.relativeName}
                                                        relationshipWithRelative={familyHistory.relationshipWithRelative}
                                                        relativeCondition={familyHistory.relativeCondition}
                                                        relativeMedications={familyHistory.relativeMedications}
                                                        getRelativeFullName={(fullname) => getRelativeFullName(fullname, index)}
                                                        getRelationshipWithRelative={(relationship) => getRelationshipWithRelative(relationship, index)}
                                                        getRelativeCondition={(condition) => getRelativeCondition(condition, index)}
                                                        getRelativeMedications={(medications) => getRelativeMedications(medications, index)}
                                                        style={{ marginTop: "1vh" }}
                                                    />
                                                ))}
                                            </div>
                                        ) : (<></>)}



                                        {currentPage == 3 ? (
                                            <div>
                                                <br />
                                                <div style={{ float: "right" }}>
                                                    <button className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button' onClick={handleRemoveClickVaccine} disabled={personalList.length === 1}>
                                                        Remove
                                                    </button>
                                                    <button className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button' style={{ marginLeft: "1vw" }} onClick={handleAddClickVaccine}>Add Form</button>
                                                </div>
                                                {vaccinationList.map((vaccinationHistory, index) => (
                                                    <Vaccination
                                                        key={index}
                                                        vaccineType={vaccinationHistory.vaccineType}
                                                        vaccineBrand={vaccinationHistory.vaccineBrand}
                                                        vaccineDate={vaccinationHistory.vaccineDate}
                                                        vaccineRemarks={vaccinationHistory.vaccineRemarks}
                                                        getVaccineType={(vaccineType) => getVaccineType(vaccineType, index)}
                                                        getVaccineBrand={(vaccineBrand) => getVaccineBrand(vaccineBrand, index)}
                                                        getVaccineDate={(vaccineDate) => getVaccineDate(vaccineDate, index)}
                                                        getVaccineRemarks={(vaccineRemarks) => getVaccineRemarks(vaccineRemarks, index)}
                                                    />
                                                ))}
                                            </div>
                                        ) : (<></>)}

                                        {currentPage == 4 ? (
                                            <div>
                                                <br />
                                                <div style={{ float: "right" }}>
                                                    <button className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button' onClick={handleRemoveClickPersonal} disabled={personalList.length === 1}>
                                                        Remove
                                                    </button>
                                                    <button className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button' style={{ marginLeft: "1vw" }} onClick={handleAddClickPersonal}>Add Form</button>
                                                </div>
                                                {personalList.map((personalHistory, index) => (
                                                    <PersonalMedicalHistory
                                                        key={index}
                                                        historyType={personalHistory.historyType}
                                                        historyDate={personalHistory.historyDate}
                                                        historyRemarks={personalHistory.historyRemarks}
                                                        getHistoryType={(historyType) => getHistoryType(historyType, index)}
                                                        getHistoryDate={(historyDate) => getHistoryDate(historyDate, index)}
                                                        getHistoryRemarks={(historyRemarks) => getHistoryRemarks(historyRemarks, index)}
                                                    />
                                                ))}
                                            </div>
                                        ) : (<></>)}




                                        {currentPage >= 2 && currentPage <= 3 ? (
                                            <div className='flex justify-between mt-8'>
                                                <div className="inline">
                                                    <button
                                                        onClick={() => setCurrentPage(currentPage - 1)}
                                                        className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button'
                                                    >
                                                        Back
                                                    </button>
                                                </div>

                                                <div className="inline">
                                                    <button
                                                        onClick={() => setCurrentPage(currentPage + 1)}
                                                        className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button'
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (<></>)}



                                        {currentPage == 4 ? (
                                            <div className='flex justify-between mt-8'>
                                                <div className="inline">
                                                    <button
                                                        onClick={() => setCurrentPage(currentPage - 1)}
                                                        className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button'
                                                    >
                                                        Back
                                                    </button>
                                                </div>
                                                <div className="inline">
                                                    <button
                                                        className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='submit'
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>

                                        ) : (<></>)}

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {ShowForm2 && (
                <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-2xl max-h-full mx-auto lato">
                        <div className="flex items-start justify-between p-4 border-b rounded-t bg-blue-800">
                            <h3 className="p-2 text-xl font-semibold text-white-900 dark:text-white">
                                EDIT PATIENT INFORMATION FORM
                            </h3>
                            <button
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-slate-50 dark:hover:text-black"
                                onClick={() => { setShowForm2(false); clearFormValues(); setCurrentPage(1); }}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="relative bg-white shadow shadow-2xl drop-shadow-2xl border border-black">
                            <div className="p-10 space-y-6 text-black">
                                <form className="mx-auto exo">
                                    <div className="space-y-12 text-black">
                                        {currentPage == 1 ? (
                                            <div className="border-b border-gray-900/10 pb-12">
                                                <h2 className="text-base font-semibold leading-7 text-black">Personal Information</h2>

                                                <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-9">
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-black">
                                                            First name <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="first-name"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={firstName}
                                                                onChange={(e) => setFirstName(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="middle-name" className="block text-sm font-medium leading-6 text-black">
                                                            Middle name
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="middle-name"
                                                                id="middle-name"
                                                                autoComplete="middle-name"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={middleName}
                                                                onChange={(e) => setMiddleName(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-black">
                                                            Last name <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="last-name"
                                                                id="last-name"
                                                                autoComplete="family-name"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={lastName}
                                                                onChange={(e) => setLastName(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-9'>
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="sex" className="block text-sm font-medium leading-6 text-black">
                                                            Sex <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <select
                                                                id="sex"
                                                                name="sex"
                                                                autoComplete="sex"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 p-3"
                                                                value={sex}
                                                                readOnly={true}
                                                            >
                                                                <option value="Male" selected>Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="bloodType" className="block text-sm font-medium leading-6 text-black">
                                                            Blood Type <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <select
                                                                id="bloodType"
                                                                name="bloodType"
                                                                autoComplete="bloodType"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 p-3"
                                                                value={bloodType}
                                                                onChange={(e) => setBloodType(e.target.value)}
                                                            >
                                                                <option selected>A+</option>
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
                                                        <label htmlFor="number" className="block text-sm font-medium leading-6 text-black">
                                                            Phone number <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="number"
                                                                name="number"
                                                                type="number"
                                                                autoComplete="phone number"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={phoneNumber}
                                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-9'>
                                                    <div className="col-span-full">
                                                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-black">
                                                            Street address <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="street-address"
                                                                id="street-address"
                                                                autoComplete="street-address"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={streetAddress}
                                                                onChange={(e) => setStreetAddress(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-8'>
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                                            Email address <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="email"
                                                                name="email"
                                                                type="email"
                                                                autoComplete="email"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={email}
                                                                readOnly={true}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-8'>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="emergencyContactName" className="block text-sm font-medium leading-6 text-black">
                                                            Emergency Contact Name <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="emergencyContactName"
                                                                id="emergencyContactName"
                                                                autoComplete="emergencyContactName"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={emergencyContactName}
                                                                onChange={(e) => setEmergencyContactName(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="emergencyContactName" className="block text-sm font-medium leading-6 text-black">
                                                            Emergency Contact Phone Number <RequiredAsterisk />
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="number"
                                                                name="emergencyContactNumber"
                                                                id="emergencyContactNumber"
                                                                autoComplete="emergencyContactNumber"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={emergencyContactNumber}
                                                                onChange={(e) => setEmergencyContactNumber(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-8'>
                                                    <div className="col-span-full">
                                                        <label htmlFor="allergies" className="block text-sm font-medium leading-6 text-black">
                                                            Allergies
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="allergies"
                                                                id="allergies"
                                                                autoComplete="allergies"
                                                                className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                                value={allergies}
                                                                onChange={(e) => setAllergies(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end mt-8">
                                                    <button
                                                        onClick={() => setCurrentPage(currentPage + 1)}
                                                        className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button'
                                                    >
                                                        Next
                                                    </button>
                                                </div>

                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        {currentPage == 2 ? (
                                            <div>
                                                <br />
                                                <div style={{ float: "right" }}>
                                                    <button className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button' onClick={handleRemoveClickFamily}>
                                                        Remove
                                                    </button>
                                                    <button className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button' style={{ marginLeft: "1vw" }} onClick={handleAddClickFamily}>Add Form</button>
                                                </div>
                                                {familyHistoryList.map((familyHistory, index) => (
                                                    <FamilyHistory
                                                        key={index}
                                                        relativeFullName={familyHistory.relativeName}
                                                        relationshipWithRelative={familyHistory.relationshipWithRelative}
                                                        relativeCondition={familyHistory.relativeCondition}
                                                        relativeMedications={familyHistory.relativeMedications}
                                                        getRelativeFullName={(fullname) => getRelativeFullName(fullname, index)}
                                                        getRelationshipWithRelative={(relationship) => getRelationshipWithRelative(relationship, index)}
                                                        getRelativeCondition={(condition) => getRelativeCondition(condition, index)}
                                                        getRelativeMedications={(medications) => getRelativeMedications(medications, index)}
                                                        style={{ marginTop: "1vh" }}
                                                    />
                                                ))}
                                            </div>
                                        ) : (<></>)}



                                        {currentPage == 3 ? (
                                            <div>
                                                <br />
                                                <div style={{ float: "right" }}>
                                                    <button className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button' onClick={handleRemoveClickVaccine}>
                                                        Remove
                                                    </button>
                                                    <button className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button' style={{ marginLeft: "1vw" }} onClick={handleAddClickVaccine}>Add Form</button>
                                                </div>
                                                {vaccinationList.map((vaccinationHistory, index) => (
                                                    <Vaccination
                                                        key={index}
                                                        vaccineType={vaccinationHistory.vaccineType}
                                                        vaccineBrand={vaccinationHistory.vaccineBrand}
                                                        vaccineDate={vaccinationHistory.vaccineDate}
                                                        vaccineRemarks={vaccinationHistory.vaccineRemarks}
                                                        getVaccineType={(vaccineType) => getVaccineType(vaccineType, index)}
                                                        getVaccineBrand={(vaccineBrand) => getVaccineBrand(vaccineBrand, index)}
                                                        getVaccineDate={(vaccineDate) => getVaccineDate(vaccineDate, index)}
                                                        getVaccineRemarks={(vaccineRemarks) => getVaccineRemarks(vaccineRemarks, index)}
                                                    />
                                                ))}
                                            </div>
                                        ) : (<></>)}

                                        {currentPage == 4 ? (
                                            <div>
                                                <br />
                                                <div style={{ float: "right" }}>
                                                    <button className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button' onClick={handleRemoveClickPersonal}>
                                                        Remove
                                                    </button>
                                                    <button className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button' style={{ marginLeft: "1vw" }} onClick={handleAddClickPersonal}>Add Form</button>
                                                </div>
                                                {personalList.map((personalHistory, index) => (
                                                    <PersonalMedicalHistory
                                                        key={index}
                                                        historyType={personalHistory.historyType}
                                                        historyDate={personalHistory.historyDate}
                                                        historyRemarks={personalHistory.historyRemarks}
                                                        getHistoryType={(historyType) => getHistoryType(historyType, index)}
                                                        getHistoryDate={(historyDate) => getHistoryDate(historyDate, index)}
                                                        getHistoryRemarks={(historyRemarks) => getHistoryRemarks(historyRemarks, index)}
                                                    />
                                                ))}
                                            </div>
                                        ) : (<></>)}




                                        {currentPage >= 2 && currentPage <= 3 ? (
                                            <div className='flex justify-between mt-8'>
                                                <div className="inline">
                                                    <button
                                                        onClick={() => setCurrentPage(currentPage - 1)}
                                                        className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button'
                                                    >
                                                        Back
                                                    </button>
                                                </div>

                                                <div className="inline">
                                                    <button
                                                        onClick={() => setCurrentPage(currentPage + 1)}
                                                        className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button'
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (<></>)}



                                        {currentPage == 4 ? (
                                            <div className='flex justify-between mt-8'>
                                                <div className="inline">
                                                    <button
                                                        onClick={() => setCurrentPage(currentPage - 1)}
                                                        className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='button'
                                                    >
                                                        Back
                                                    </button>
                                                </div>
                                                <div className="inline">
                                                    <button
                                                        className="p-3 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        type='buttom'
                                                        onClick={updatePatientInformation}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </div>

                                        ) : (<></>)}

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PatientList;