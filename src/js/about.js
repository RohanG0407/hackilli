import "../styling/about.scss"

var AP = require("./AudioPlayer.js");
var player = new AP.AudioPlayer(".recPlayer");

const recButton = document.getElementById("recordButton");
const sendButton = document.getElementById("sendButton");

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
            }
        });
    };
}

handleMic();