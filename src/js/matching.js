import "../styling/index.scss"
import "../styling/matching.scss"
import "../js/maps"

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

let database = firebase.database()

let userObj = sessionStorage.getItem("user")
userObj = JSON.parse(userObj)
console.log(userObj["type"])


var userData = firebase.database().ref('users/');
userData.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            console.log(key + " -> " + data[key]['name']);
            if(data[key]['type'] === userObj['type'] && data[key]['name'] != userObj['name']) {
                window.location.replace("about.html")
                break
            }
        }
    }
});

