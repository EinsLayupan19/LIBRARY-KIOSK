// firebase-config.js
// REPLACE WITH YOUR ACTUAL FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDf05LxH-VNXsXTfMPGEDcPOO8HSJnNLjU",
  authDomain: "neu-library-system-e7174.firebaseapp.com",
  projectId: "neu-library-system-e7174",
  storageBucket: "neu-library-system-e7174.firebasestorage.app",
  messagingSenderId: "245837692302",
  appId: "1:245837692302:web:bea8ac361ce19b186b38df"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

console.log("✅ Firebase initialized with project:", firebaseConfig.projectId);