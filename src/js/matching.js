import "../styling/index.scss"
import "../styling/matching.scss"
import "../js/maps"

let doc = document.getElementById()

window.addEventListener('load', (event) => {
    console.log("loaded")
    var starCountRef = firebase.database().ref('users/');
    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
    });
});
