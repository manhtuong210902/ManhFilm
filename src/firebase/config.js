// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBnMZdF-rfzzph_4Pxh7r7OpmJE-qLdgVM',
    authDomain: 'manh-film.firebaseapp.com',
    projectId: 'manh-film',
    storageBucket: 'manh-film.appspot.com',
    messagingSenderId: '364047870151',
    appId: '1:364047870151:web:7562b4f664c83b1e3df6e2',
    measurementId: 'G-09P9D0P9QR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
