import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC18fbPwhd8K_UMFyUrugQMVd8BtLTwsXs",
  authDomain: "firechat-5303d.firebaseapp.com",
  databaseURL: "https://firechat-5303d.firebaseio.com",
  projectId: "firechat-5303d",
  storageBucket: "firechat-5303d.appspot.com",
  messagingSenderId: "1018979936258",
  appId: "1:1018979936258:web:45c40771351023a9821f1b",
  measurementId: "G-DTQ5SZHMGX"
};

const settings = {};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.firestore().settings(settings);

export const firebaseAuth = firebaseApp.auth();
export default firebase 