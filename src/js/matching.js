import "../styling/index.scss"
import "../styling/matching.scss"
import "../js/maps"
import "../styling/transitions.scss"
//import "../js/script"

let doc = document.getElementById()

window.addEventListener('load', (event) => {
    console.log("loaded")
    var starCountRef = firebase.database().ref('users/');
    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
    });
});
