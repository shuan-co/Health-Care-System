import { useNavigate } from "react-router-dom";
import './ClinicAdminDashboard.css'
import { user, db, config, signInAuth } from '../../../firebase/Firebase'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import RequiredAsterisk from "./staffForm/components/asterisk";
import { createUserWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import emailjs, { send } from 'emailjs-com';


function ClinicAdminDashboard() {
    const [adminName, setAdminName] = useState("")
    const [clinicName, setClinicName] = useState("")
    const [selected, setSelected] = useState("dashboard")
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        emailFormatted: '',
        password: '',
        clinicName: '',
    });
    const navigate = useNavigate();

    function changeSelected(selected) {
        setSelected(selected)
    }

    function formatEmail(email) {
        const [localPart] = email.split('@');
        const newEmail = `${localPart}@healthcare.staff.com`;
        return newEmail;
    }

    useEffect(() => {
        try {
            async function getClinicName() {
                const unsubscribe = onAuthStateChanged(config.auth, async (user) => {
                    if (user.uid) {
                        const docRef = doc(db, "clinicAdmins", user.uid);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            setClinicName(docSnap.data().clinicName);
                        } else {
                            console.log("No such document!");
                        }
                    }
                })
            }
            getClinicName();
        } catch (error) {
            console.log(error);
        }

        try {

            async function getAdminName() {
                const unsubscribe = onAuthStateChanged(config.auth, async (user) => {
                    if (clinicName) {
                        const docRef = doc(db, clinicName, "admin");
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            setAdminName(docSnap.data().firstname + " " + docSnap.data().lastname);
                            console.log(adminName);
                        } else {
                            console.log("No such document!");
                        }
                    }
                })
            }

            getAdminName();
        } catch (error) {
            console.log(error);
        }
    }, [user.uid, clinicName]);

    async function initializeClinic(e) {
        e.preventDefault();

        const firstName = e.target['first-name'].value;
        const lastName = e.target['last-name'].value;
        const email = e.target['email'].value;
        const password = e.target['password'].value;
        const emailFormatted = formatEmail(email);

        setFormData({
            ...formData,
            firstName,
            lastName,
            email,
            emailFormatted,
            password,
        });
    }

    useEffect(() => {
        console.log(config.auth.currentUser.email);
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
                                console.log('Email sent:', result.text);
                                alert('Email sent successfully!');
                            },
                            (error) => {
                                console.error('Email error:', error.text);
                                alert('Failed to send email.');
                            }
                        );
                }

                getDoc(doc(config.firestore, "clinicAdmins", config.auth.currentUser.uid))
                    .then((docSnapshot) => {
                        if (docSnapshot.exists()) {
                            // The document exists
                            const data = docSnapshot.data();
                            console.log("Document data:", data);

                            // Now you can access individual fields within the document
                            const clinicName = data.clinicName;
                            createUserWithEmailAndPassword(signInAuth.auth, formData.emailFormatted, formData.password)
                                .then((userCredential) => {
                                    setDoc(doc(config.firestore, "clinicStaffs", userCredential.user.uid), {
                                        clinicName: clinicName,
                                    });

                                    setDoc(doc(config.firestore, clinicName, "staff", "staffList", userCredential.user.uid), {
                                        firstname: formData.firstName,
                                        lastname: formData.lastName,
                                        email: formData.email
                                    });
                                    sendEmail();
                                    // SignOut 2nd authentication
                                    signOut(getAuth(signInAuth.auth)).then(() => {
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


    return (
        <div className="h-screen w-full flex overflow-hidden bg-white">
            <Sidebar selected={selected} name={adminName} changeSelected={changeSelected} />
            {selected == "dashboard" ? (
                <div style={{ float: "left", width: "100vh", height: "100vh", marginLeft: "5vw", marginTop: "13vh" }}>
                    <h1 className="text-4xl exo">Welcome Back, {adminName}</h1>
                    <div className="mt-10" style={{ width: "70vw", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div onClick={() => navigate('./stafflist')} className='Pdashboard-Card-BoxShadow' style={{ border: "2px solid #00008B", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <div style={{ border: "2px solid #00008B", background: "linear-gradient(to bottom, #F6FFF0, #87CEEB)", width: "60%", height: "50%", borderRadius: "10px" }}>

                            </div>
                            <br />
                            <span class="ml-3 text-blue-900 text-2xl text-center font-semibold">View Staff<br />List</span>
                        </div>

                        <div className='Pdashboard-Card-BoxShadow' style={{ border: "2px solid #00008B", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginLeft: "8vh" }}>
                            <div onClick={() => setShowForm(true)} style={{ border: "2px solid #00008B", background: "linear-gradient(to bottom, #F6FFF0, #87CEEB)", width: "60%", height: "50%", borderRadius: "10px" }}>

                            </div>
                            <br />
                            <span class="ml-3 text-blue-900 text-2xl text-center font-semibold">Add New <br />Staff</span>
                        </div>
                    </div>
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

            {showForm && (
                <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full shadow-2xl drop-shadow-2xl border border-black">
                    <div className="relative w-full max-w-2xl max-h-full mx-auto">
                        <div className="flex items-start justify-between p-4 border-b rounded-t bg-blue-800">
                            <h3 className="text-xl font-semibold text-white-900 dark:text-white">
                                Add User
                            </h3>
                            <button
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-slate-50 dark:hover:text-black"
                                onClick={() => setShowForm(false)}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="relative bg-slate-50 shadow exo">
                            <div className="p-6 space-y-6">
                                <form onSubmit={initializeClinic}>
                                    <div className="border-b border-gray-900/10 pb-12">

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                        required
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
                                                        autoComplete="last-name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-6">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
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
                                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
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

                                        <div className="mt-10 flex justify-end">
                                            <button
                                                className="rounded-md bg-indigo-600 p-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ClinicAdminDashboard;
