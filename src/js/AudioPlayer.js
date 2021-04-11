class AudioPlayer {
    constructor(selector, color1="#ff00ff", color2="#ff6600", color3="#32CD32", color4="#fff") {
        this.playerElement = document.querySelector(selector);
        this.playerElement.style.width = "100%";
        this.playerElement.style.height = "60%";
        this.playerElement.style.float = "right";
        this.playerElement.style.display = "flex";
        this.playerElement.style.justifyContent = "center";
        this.playerElement.style.alignItems = "center";
        this.playerElement.style.borderRadius = "50px";
        this.playerElement.style.background = "linear-gradient(to right bottom, " + color1 + ", " + color2;

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

        this.playerElement.appendChild(playButton);
        this.playerElement.appendChild(bar);

        this.audioElement = document.createElement("audio");
        var audio = this.audioElement;

        audio.addEventListener("durationchange", function() {
            if (this.duration !== Infinity) { audioDuration = this.duration; }
        });

        audio.muted = false;

        audio.addEventListener("timeupdate", function() {
            var width = 100 * this.currentTime / audioDuration;
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

        this.isNew = false;
    }

    setSrc(src) {
        if (src != null) {
            this.audioElement.src = src;
            this.isNew = true;
        }
    }

    getSrc() {
        return this.audioElement.src;
    }

    checkNew() {
        if (this.isNew === true) {
            this.isNew = false;
            return true;
        }
        return false;
    }

    getElement() {
        return this.playerElement;
    }

    play() { this.audioElement.play(); }
}
module.exports.AudioPlayer = AudioPlayer;