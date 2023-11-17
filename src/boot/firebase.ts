import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBEA3HvlI8XjA7-7-grRlbwfEOrSUPYQgk',
  authDomain: 'x-clone-3fb96.firebaseapp.com',
  projectId: 'x-clone-3fb96',
  storageBucket: 'x-clone-3fb96.appspot.com',
  messagingSenderId: '200952610903',
  appId: '1:200952610903:web:5cee0a9e2a12d4c844a312',
  databaseURL:
    'https://x-clone-3fb96-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const db = getFirestore();

export { firebaseApp, db, database };
