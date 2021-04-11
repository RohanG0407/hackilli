import "../styling/about.scss"


var MSGS = require("./Messages.js");
var messages = new MSGS.Messages("#msgHolder");

var AP = require("./AudioPlayer.js");
var player = new AP.AudioPlayer("#recPlayer");

const recButton = document.getElementById("recordButton");
const sendButton = document.getElementById("sendButton");

var messageCount = 0;

sendButton.addEventListener("click", function(e) {
    if (player.checkNew() === true) {
        sendMessage("YOU", player.getSrc());
        sendMessage("UR MOM", player.getSrc());
    }
});

function sendMessage(person="YOU", src) {
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

    if (person === "YOU") {
        audio = new AP.AudioPlayer("#" + audioDiv.id);
        msg.style.backgroundImage = "linear-gradient(0deg, var(--recRed) 0%, var(--purple) 100%)";
        msg.style.float = "right";
        textDiv.innerHTML = person;
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
                player.setSrc(audioUrl);
                console.log(e.data)
            }
        });
    };
}

handleMic();