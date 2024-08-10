import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1dMPqFyV-l_eyWt6Lje7dsUsxSj1LY4A",
  authDomain: "ai-customer-support-5f558.firebaseapp.com",
  projectId: "ai-customer-support-5f558",
  storageBucket: "ai-customer-support-5f558.appspot.com",
  messagingSenderId: "152013574716",
  appId: "1:152013574716:web:525c0e5ed48aeb00e76939",
  measurementId: "G-54479NMKSR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
