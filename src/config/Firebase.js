import * as firebase from 'firebase';
import '@firebase/firestore'


const firebaseConfig = {
    //Firebase konfigurointi asetukset
}

firebase.initializeApp(firebaseConfig);

export default firebase;