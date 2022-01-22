// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB23IyJA_DG-Ge3RbTR86yZ4tjGljKMl0M',
  authDomain: 'photo-gallery-using-firebase.firebaseapp.com',
  projectId: 'photo-gallery-using-firebase',
  storageBucket: 'photo-gallery-using-firebase.appspot.com',
  messagingSenderId: '726495379886',
  appId: '1:726495379886:web:d3b33533cf23c560fd483f'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
console.log('firebase initialized')
const storage = firebase.storage()
const db = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { storage, db, timestamp }
