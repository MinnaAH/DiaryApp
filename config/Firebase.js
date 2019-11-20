import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'XXXX',
    authDomain: 'XXXX',
    databaseURL: 'XXXX',
    projectId: 'XXXX',
    storageBucket: '',
    messagingSenderId: 'XXXX',
    appId: 'XXXX'
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase