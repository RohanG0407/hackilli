import "../styling/about.scss"
import firebase from "firebase/app";
import "firebase/storage";
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

var storage = firebase.storage();
var audioData = null;

var MSGS = require("./Messages.js");
var messages = new MSGS.Messages("#msgHolder");

var AP = require("./AudioPlayer.js");
var player = new AP.AudioPlayer("#recPlayer");

const recButton = document.getElementById("recordButton");
const sendButton = document.getElementById("sendButton");

var messageCount = 0;

var user = JSON.parse(sessionStorage.getItem("user"));
var matchUser = sessionStorage.getItem("match");
var userData = firebase.database().ref('/messages/');


sendButton.addEventListener("click", function(e) {
    if (player.checkNew() === true) {
        sendMessage(user.name, player.getSrc());
        firebase.database().ref('/messages/').push({
            update: user.name,
        });
        var storageRef = firebase.storage().ref().child("audios").child(user.name + ".webm")
        storageRef.put(audioData).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }

});


userData.on('value', (snapshot) => {
    let name = null;
    const data = snapshot.val();
    let len = (Object.keys(data)).length
    let update_name = data[Object.keys(data)[len - 1]]['update']

    if(update_name != user.name) {
        firebase.storage().ref().child('audios/' + matchUser + '.webm').getMetadata()
            .then((metadata) => {
                name = metadata.name
                console.log(name)
            })
            .catch((error) => {
                // Uh-oh, an error occurred!
            });
        firebase.storage().ref().child('audios/' + matchUser + '.webm').getDownloadURL()
            .then((metadata) => {

                sendMessage(matchUser, metadata);

            })
            .catch((error) => {
                // Uh-oh, an error occurred!
            });
    }


});

function sendMessage(person, src) {
    var messageData = messages.createMsg();
    var msg = messageData[0];
    var count = messageData[1];
    var textDiv = document.createElement('div');
    var audioDiv = document.createElement('div');

    msg.appendChild(textDiv);
    msg.appendChild(audioDiv);
    audioDiv.id = "audio" + count;

    msg.style.width = "55%";
    msg.style.height = "30%";
    msg.style.height = "90px";
    msg.style.margin = "2%";
    msg.style.borderRadius = "35px";

    textDiv.style.width = "100%";
    textDiv.style.height = "40%";
    textDiv.style.userSelect = "none";
    textDiv.style.fontFamily = "Londrina solid, cursive";
    textDiv.style.textAlign = "center";
    textDiv.style.fontSize = "200%";

    var audio = null;
    console.log(user);

    if (person === user.name) {
        audio = new AP.AudioPlayer("#" + audioDiv.id);
        msg.style.backgroundImage = "linear-gradient(0deg, var(--recRed) 0%, var(--purple) 100%)";
        msg.style.float = "right";
        textDiv.innerHTML = user.name;
    } else {
        audio = new AP.AudioPlayer("#" + audioDiv.id, "#2af598", "#0fbed8");
        msg.style.backgroundImage = "linear-gradient(0deg, var(--recRed) 0%, var(--purple) 100%)";
        msg.style.float = "left";
        textDiv.innerHTML = person;
    }
    audio.setSrc(src);
}

function handleMic() {
    var micEnabled = false;
    var recPressed = false;
    navigator.permissions.query({name:'microphone'}).then(function(perm) {
        if (perm.state == 'granted') {micEnabled = true;}
        else {micEnabled = false;}

        updateMic();

        perm.onchange = function() {
            if (perm.state == 'granted') {micEnabled = true;}
            else {micEnabled = false;}
            updateMic();
        };
    });

    function updateMic() {
        navigator.mediaDevices.getUserMedia({audio: true, video: false})
            .then(handleSuccess).catch(function (err) {
            micEnabled = false
    });
    }

    const handleSuccess = function(stream) {
        const options = {mimeType: 'audio/webm'};
        const recorder = new MediaRecorder(stream, options);

        recButton.addEventListener('mousedown', function(e) {
            if (micEnabled === true) {
                recPressed = true;
                recButton.value = true;
                recorder.start();
            }
        });

        recButton.addEventListener('mouseout', function(e) {
            stopRec();
        });

        recButton.addEventListener('mouseup', function(e) {
            stopRec();
        });

        function stopRec() {
            recPressed = false;
            recButton.value = false;
            try {
                recorder.stop();
            } catch(e) {}
        }

        recorder.addEventListener('dataavailable', function(e) {
            if (e.data.size != 0) {
                const audioUrl = URL.createObjectURL(e.data);
                audioData = e.data;
                player.setSrc(audioUrl);
            }
        });
    };
}

handleMic();