import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBSP5LrxWXqNxkaK7JYwtK2ZbXJ88-C4e8",
  authDomain: "app-vendas-b2bc7.firebaseapp.com",
  projectId: "app-vendas-b2bc7",
  storageBucket: "app-vendas-b2bc7.firebasestorage.app",
  messagingSenderId: "567875368143",
  appId: "1:567875368143:web:ef3fe5e7da7d6fac7cb3ba"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
