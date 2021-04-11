class AudioPlayer {
    constructor(selector, color1="#273c75", color2="#079992", color3="#32CD32", color4="#fff") {
        var playerElement = document.querySelector(selector);
        playerElement.style.width = "100%";
        playerElement.style.height = "100%";
        playerElement.style.float = "right";
        playerElement.style.display = "flex";
        playerElement.style.justifyContent = "center";
        playerElement.style.alignItems = "center";
        playerElement.style.borderRadius = "50px";
        playerElement.style.background = "linear-gradient(to right bottom, " + color1 + ", " + color2;

        var buttonSize = "40px";
        var textSize = "35px";
        var white = "#fff";
        var playText = "&#9658";
        var pauseText = "&#10074&#10074";

        var playButton = document.createElement("div");
        playButton.style.display = "flex";
        playButton.style.float = "left";
        playButton.style.justifyContent = "center";
        playButton.style.alignItems = "center";
        playButton.style.marginRight = "10px";
        playButton.style.width = buttonSize;
        playButton.style.height = buttonSize;
        playButton.style.fontSize = textSize;
        playButton.style.color = white;
        playButton.style.userSelect = "none";
        playButton.innerHTML = playText;

        var playing = false;

        var audioDuration = NaN;

        var bar = document.createElement("div");
        bar.style.backgroundColor = "#bababa";
        bar.style.display = "flex";
        bar.style.float = "left";
        bar.style.width = "calc(70% - " + buttonSize + " + 20px)";
        bar.style.height = textSize;

        var progress = document.createElement("div");
        progress.style.width = "0%";
        progress.style.height = "100%";

        progress.style.background = "linear-gradient(to right bottom, " + color3 + ", " + color4;
        progress.style.float = "left";

        bar.appendChild(progress);

        playerElement.appendChild(playButton);
        playerElement.appendChild(bar);

        this.audioElement = document.createElement("audio");
        var audio = this.audioElement;

        audio.addEventListener("durationchange", function() {
            if (this.duration !== Infinity) {
                audioDuration = this.duration;
                console.log("New Duration: " + audioDuration);
            }
        });

        audio.muted = false;

        audio.addEventListener("timeupdate", function() {
            var width = 100 * this.currentTime / audioDuration;
            console.log("Progress: " + width);
            progress.style.width = width + "%";
        });

        audio.addEventListener("ended", function() {
            playButton.innerHTML = playText;
            playing = false;
        });

        playButton.addEventListener('click', function() {
            playing = !playing;
            if (playing == true) {
                try {audio.play();}
                catch(e) {}
                this.innerHTML = pauseText;
            } else {
                try {audio.pause();}
                catch(e) {}
                this.innerHTML = playText;
            }
        });
    }

    setSrc(src) { if (src != null) { this.audioElement.src = src; } }

    play() { this.audioElement.play(); }
}
module.exports.AudioPlayer = AudioPlayer;