import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZaa9cvjjUKT2wiBJ8SNajtsGlTxpqQ7Q",
  authDomain: "bloombuddy-33bf6.firebaseapp.com",
  projectId: "bloombuddy-33bf6",
  storageBucket: "bloombuddy-33bf6.firebasestorage.app",
  messagingSenderId: "36470137893",
  appId: "1:36470137893:web:ef7f7e4ac4994f48554bcc",
  measurementId: "G-91KH6TTGWK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, analytics, auth, db};