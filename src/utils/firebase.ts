import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvgbHoh8UJCL1IUBUVTs0-REcnUYDEozM",
  authDomain: "images-8f36e.firebaseapp.com",
  projectId: "images-8f36e",
  storageBucket: "images-8f36e.appspot.com",
  messagingSenderId: "754220118464",
  appId: "1:754220118464:web:25981fd3fa98c9d5315825",
  measurementId: "G-D2SBJJRBNR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);