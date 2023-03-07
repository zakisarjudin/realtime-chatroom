import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDg6JyOqGBSIRFsp4rPUcDH9Ssg8r6llOs",
  authDomain: "fir-chatroom-b26b9.firebaseapp.com",
  projectId: "fir-chatroom-b26b9",
  storageBucket: "fir-chatroom-b26b9.appspot.com",
  messagingSenderId: "915181393353",
  appId: "1:915181393353:web:f368f33242d7eace010418",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
