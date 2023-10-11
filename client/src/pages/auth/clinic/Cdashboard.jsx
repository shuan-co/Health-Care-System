import React, { useState, useEffect } from 'react';
import ClinicTest from './ClinicTest';
import { config } from '../../../firebase/Firebase';
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore'
import { user } from '../../../firebase/Firebase';
import { Link } from 'react-router-dom';
import iconuser from './OIP.jpg';

function Cdashboard() {
    const [clinicName, setClinicName] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(config.auth, (user) => {
            if (user) {
                setClinicName(user.uid);
            } else {
                setClinicName('');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="flex h-screen">
         <div className="w-1/4" style={{ backgroundColor: '#31493C' }}>
          <div className="p-4 square-lg">
            <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <p className="text-center text-xl font-bold mb-4">{user.displayName}</p>
            <button className="text-black font-bold py-2 px-4 rounded mb-2 w-full hover:bg-gray-200">Notifications</button>
            <button className="text-black font-bold py-2 px-4 rounded mb-2 w-full hover:bg-gray-200">Inbox</button>
            <button className="text-black font-bold py-2 px-4 rounded mb-2 w-full hover:bg-gray-200">Contact Us</button>
            <button className="text-black font-bold py-2 px-4 rounded w-full hover:bg-gray-200">Log Out</button>
          </div>
         </div>
         <div className="w-1/2 mt-40 mb-40 ml-4 flex flex-col items-center justify-center">
            <div className="text-center text-xl font-bold mb-4">
                Hello, User
            </div>
         <Link to={{ pathname: "/clinictest", state: { clinicName: clinicName } }} className="w-3/3 bg-gray-200 mt-40 mb-40 ml-4 flex flex-col items-center justify-center">
              <img src={iconuser} alt="Image" style={{ width: 'auto', height: 'auto' }} />
              <div className="text-black font-bold py-2 px-4 rounded w-full text-center">Patient Records (Personal & Medical)</div>
         </Link>
         </div>
         <div className="w-1 mt-40 mb-40 ml-4 flex flex-col space-y-2 p-2">
           <div className="bg-gray-200 p-4 h-80 w-80 py-4">
             Placeholder
           </div>
          <div className="bg-gray-200 p-4 h-80 w-80 py-4">
             Placeholder
          </div>
         </div>
        </div>
    );    
}

export default Cdashboard;
