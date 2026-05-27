import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

//Ajuste para autenticar e acessar o banco
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg4cdh9_NbTCOvxNC8FADkUHptfRabARo",
  authDomain: "aulafbquarta.firebaseapp.com",
  databaseURL: "https://aulafbquarta.firebaseio.com",
  projectId: "aulafbquarta",
  storageBucket: "aulafbquarta.firebasestorage.app",
  messagingSenderId: "1024382419155",
  appId: "1:1024382419155:web:aedeb765b314dfe3e8d426",
  measurementId: "G-QHMB7BYMT6"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;