import "../styling/about.scss"

const player = document.getElementById('player');

var rec_pressed = false;
const rec_but = document.getElementById("record");

const handleSuccess = function(stream) {
    const options = {mimeType: 'audio/webm'};
    const mediaRecorder = new MediaRecorder(stream, options);

    rec_but.addEventListener('mousedown', function(e) {
        rec_pressed = true;
        mediaRecorder.start();
        console.log(mediaRecorder.state);
    });

    rec_but.addEventListener('mouseup', function(e) {
        rec_pressed = false;
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
    });

    mediaRecorder.addEventListener('dataavailable', function(e) {
        // send e.data
        console.log(e.data)
    });
};

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(handleSuccess);