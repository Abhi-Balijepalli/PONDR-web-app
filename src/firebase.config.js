import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Cookies } from 'react-cookie';

export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
};

firebase.initializeApp(firebaseConfig);

export default firebase;
