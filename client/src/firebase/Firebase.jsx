// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRzYVh7OTgw1JALTgi6aXTdemOrtZycBo",
    authDomain: "health-care-system-1dc06.firebaseapp.com",
    projectId: "health-care-system-1dc06",
    storageBucket: "health-care-system-1dc06.appspot.com",
    messagingSenderId: "229003666985",
    appId: "1:229003666985:web:bd6f8e70a2ad9f12af9e38",
    measurementId: "G-8RZ521Q1SY"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const auth = getAuth(firebase);
// const analytics = getAnalytics(firebase);


export const config = {
    auth: getAuth(firebase),
    firestore: getFirestore(firebase),
    storage: getStorage(firebase),
    storageRef: ref(getStorage(firebase))
}

export const user = {
    uid: null,
    credentials: null,
    securityType: null
}

export const db = getFirestore(firebase)


