import { config, signInAuth } from "../../../../firebase/Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import RequiredAsterisk from "./components/asterisk";
import emailjs, { send } from 'emailjs-com';

function StaffList() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        emailFormatted: '',
        password: '',
        clinicName: '',
    });

    function formatEmail(email) {
        const [localPart] = email.split('@');
        const newEmail = `${localPart}@healthcare.staff.com`;
        return newEmail;
    }

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
        <form className="mx-96" onSubmit={initializeClinic}>
            <div className="border-b border-gray-900/10 pb-12">

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
                                autoComplete="last-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                required
                            />
                        </div>
                    </div>

                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
        </form>)
}

export default StaffList;
