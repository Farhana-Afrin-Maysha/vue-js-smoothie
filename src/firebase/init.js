import firebase from 'firebase'
// import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC6akGdtnCfPsqT_zdZieFShHEj8bSu9Wc",
    authDomain: "vue-js-smoothie.firebaseapp.com",
    databaseURL: "https://vue-js-smoothie.firebaseio.com",
    projectId: "vue-js-smoothie",
    storageBucket: "vue-js-smoothie.appspot.com",
    messagingSenderId: "200562895606",
    appId: "1:200562895606:web:d8b730d5ef131e36489ad7",
    measurementId: "G-DYBXQCHHQS"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()
  firebase.analytics(); 


  export default db