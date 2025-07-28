// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4B8BJ0Xoyfw03_u2RHj7wZ_nzo8tL49I",
  authDomain: "ipl-match-prediction.firebaseapp.com",
  projectId: "ipl-match-prediction",
  storageBucket: "ipl-match-prediction.appspot.com",
  messagingSenderId: "473566094538",
  appId: "1:473566094538:web:a30bd524411c4e1aae0033",
  measurementId: "G-SZ8FWTEG1T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
