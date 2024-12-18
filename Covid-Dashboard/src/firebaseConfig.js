import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpWHI_zEppnARJg-IRZaQZjZ5R2JBQuZg",
  authDomain: "covid-app-09.firebaseapp.com",
  projectId: "covid-app-09",
  storageBucket: "covid-app-09.firebasestorage.app",
  messagingSenderId: "964775560210",
  appId: "1:964775560210:web:8f55091106ea0c48d5c4cb",
  measurementId: "G-RNW3Y8P2M5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;