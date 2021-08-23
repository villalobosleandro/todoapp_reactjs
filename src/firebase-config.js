import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDMq6Qx2vL03zRgzObqNdWe0O1r5KCXWgw",
  authDomain: "todoapp-reactjs-f9ed1.firebaseapp.com",
  projectId: "todoapp-reactjs-f9ed1",
  storageBucket: "todoapp-reactjs-f9ed1.appspot.com",
  messagingSenderId: "58263101476",
  appId: "1:58263101476:web:d7df901226c8c7eb14f8b1"
})

export const auth = app.auth()
export default app