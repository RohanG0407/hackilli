class Messages {
    constructor(selector) {
        this.playerElement = document.querySelector(selector);
        this.playerElement.style.overflowY = "auto";
        this.msgCount = 0;
    }

    createMsg() {
        var message = document.createElement('div');
        message.id = "msg" + this.msgCount;
        this.playerElement.appendChild(message);
        this.msgCount++;
        return [message, this.msgCount];
    }
}
module.exports.Messages = Messages;