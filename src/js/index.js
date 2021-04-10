import "../styling/index.scss"
//import "../gsap/menu"

//import {writeUserData, readData} from "./firebase-database";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyDADvqzekpnzT_Fc4U2SQeop5d4bn_P3QE",
    authDomain: "hackilli.firebaseapp.com",
    databaseURL: "https://hackilli-default-rtdb.firebaseio.com",
    projectId: "hackilli",
    storageBucket: "hackilli.appspot.com",
    messagingSenderId: "630237405175",
    appId: "1:630237405175:web:2846a328473902acd358f2",
    measurementId: "G-R0EWT106GW"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database()

let name = "rohan"
let email = "Hangar"
let userId = 10

firebase.database().ref('/buildings/yes').set({
    username: name,
    email: email
});



