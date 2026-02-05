import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7wJppXtFrSOnz2ajZ0Ib0iCrrhu5YAbA",
  authDomain: "room-management-app-e48b9.firebaseapp.com",
  projectId: "room-management-app-e48b9",
  storageBucket: "room-management-app-e48b9.firebasestorage.app",
  messagingSenderId: "671186566405",
  appId: "1:671186566405:web:eb53506b0b4192ce560b6c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
