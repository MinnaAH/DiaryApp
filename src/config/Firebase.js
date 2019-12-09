import * as firebase from 'firebase';
import '@firebase/firestore'


const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    databaseURL: "DATABASE_URL",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: MESSAGE_SENDER_ID
    appId: "APP_ID"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;