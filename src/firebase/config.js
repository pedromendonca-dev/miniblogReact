
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBsjdaSLeXYkZd5vrFqHNwV8pKDx3_QN2M",
  authDomain: "miniblog-ddfee.firebaseapp.com",
  projectId: "miniblog-ddfee",
  storageBucket: "miniblog-ddfee.appspot.com",
  messagingSenderId: "1047923592972",
  appId: "1:1047923592972:web:c0db302e2224c4c0d4c329"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };