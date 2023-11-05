import { config, signInAuth } from "../../../../firebase/Firebase";
import { doc, setDoc, getDoc, getDocs, collection, addDoc, startAfter, limit, query, startAt } from "firebase/firestore";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import pfp from './pfp.jpg'

function PatientList() {

    const [clinicName, setClinicName] = useState('');
    const [loading, setLoading] = useState(true); // Initial loading state
    const [last, setLast] = useState("");

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

    return (
        <>
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

                        < div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
                            <div class="flex items-center justify-between pb-6">
                                <div>
                                    <h2 class="font-semibold text-gray-700">User Accounts</h2>
                                    <span class="text-xs text-gray-500">View accounts of registered users</span>
                                </div>
                                <div class="flex items-center justify-between space-x-4">
                                    <button class="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                                        </svg>

                                        SEARCH
                                    </button>

                                    <button class="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
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
                                                <tr>
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