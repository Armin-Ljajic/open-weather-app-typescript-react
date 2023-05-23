import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBIjJLjwfpQQqUgS85Z4N3vfW_JNUdID1k",
    authDomain: "weather-app-typescript.firebaseapp.com",
    projectId: "weather-app-typescript",
    storageBucket: "weather-app-typescript.appspot.com",
    messagingSenderId: "274995627442",
    appId: "1:274995627442:web:a5e1a9ae105cd69285d0ab",
    measurementId: "G-TB4J69TBMZ",
}; //this is where your firebase app values you copied will go

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);