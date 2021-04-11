import "../styling/index.scss"
//import "../gsap/menu"

//import {writeUserData, readData} from "./firebase-database";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

let firebaseConfig = {
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

var data = null

let random_situation;

firebase.database().ref('/situations').once('value').then((snapshot) => {
    data = snapshot.val()

    let min = Math.ceil(1);
    let max = Math.floor(4);
    let num = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive

    if(num === 1) {
        random_situation = data.one
    } else if(num === 2) {
        random_situation = data.two
    } else {
        random_situation = data.three
    }

    //console.log(random_situation)
});

//initializing things to manipulate
const offsetRight = 1.65;
const offsetLeft = -4.9;
let question0 = document.getElementById("questionName0");
let question1 = document.getElementById("questionName1");
let question2 = document.getElementById("questionName2");
let question3 = document.getElementById("questionName3");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let button4 = document.getElementById("button4");
let button5 = document.getElementById("button5");
let button6 = document.getElementById("button6");
let input = document.getElementById("textfield");
let Q1 = document.getElementById("question1");
let Q2 = document.getElementById("question2");
let Q3 = document.getElementById("question3");
let A1 = document.getElementById("answer1");
let A2 = document.getElementById("answer2");
let A3 = document.getElementById("answer3");
let A4 = document.getElementById("answer4");
let A5 = document.getElementById("answer5");
let A6 = document.getElementById("answer6");
let e_or_I
let n_or_s
let f_or_t
let psycho_type = "";
let username;

//disables all buttons excpet 1 and 2
button1.style.pointerEvents = "none";
button2.style.pointerEvents = "none";
button3.style.pointerEvents = "none";
button4.style.pointerEvents = "none";
button5.style.pointerEvents = "none";
button6.style.pointerEvents = "none";

//assigns each button an on click event listener
document.getElementById("button1").addEventListener
("click", function() {
    initialMove(button1, button2, offsetRight, offsetLeft)
    e_or_I = "extrovert"
    psycho_type = "E"
    console.log(psycho_type)
});

document.getElementById("button2").addEventListener
("click", function() {
    initialMove(button2, button1, offsetLeft, offsetRight)
    e_or_I = "introvert"
    psycho_type = "I"
    console.log(psycho_type)
});

document.getElementById("button3").addEventListener
("click", function() {
    secondMove(button3, button4, offsetRight, offsetLeft)
    n_or_s = "intuition"
    psycho_type = psycho_type.concat("N")
    console.log(psycho_type)
});

document.getElementById("button4").addEventListener
("click", function() {
    secondMove(button4, button3, offsetLeft, offsetRight)
    n_or_s = "sensing"
    psycho_type = psycho_type.concat("S")
    console.log(psycho_type)
});

document.getElementById("button5").addEventListener
("click", function() {
    f_or_t = "feeling"
    psycho_type = psycho_type.concat("F")
    console.log(psycho_type)
    firebase.database().ref('/users/').push({
        name: username,
        type: psycho_type
    });
});

document.getElementById("button6").addEventListener
("click", function() {
    f_or_t = "thinking"
    psycho_type = psycho_type.concat("T")
    console.log(psycho_type)
    firebase.database().ref('/users/').push({
        name: username,
        type: psycho_type
    });
});

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        let usersData = firebase.database().ref('users');
        //let newPostKey = firebase.database().ref().child('users').push().key;

        usersData.get().then(function(snapshot) {
            username = input.value
            if (snapshot.exists()) {
                let snap = snapshot.val();
                console.log(snap);
                for (let key in snap) {
                    if (snap.hasOwnProperty(key)) {
                        console.log(key + " -> " + snap[key]['name']);
                        if(snap[key]['name'] === input.value) {
                            // Move to another page and break
                            break
                        }
                    }
                }
            }
            else {
                console.log("No data available");
            }
        }).catch(function(error) {
            console.error(error);
        });


        firstMove(button1, button2);
    }
});

function addText(questionField, questionText, answerField1, answerField2, answerText1, answerText2) {
    questionField.innerHTML = questionText;
    answerField1.innerHTML = answerText1;
    answerField2.innerHTML = answerText2;
}


function firstMove(button1, button2) {
    removeQuestion(question0, input, null);
    setTimeout(function(){
        //addText(Q1,random_situation.question,A1, A2, random_situation.extrovert.answer,random_situation.introvert.answer)
        addText(Q1,random_situation.question,A1, A2, random_situation.extrovert.answer,random_situation.introvert.answer)
        addQuestion(question1, button1, button2);
    }, 2000);
    setTimeout(function(){
        sortButtons(null, null, button1, button2);
    }, 3000);
}

function initialMove(button1, button2, offset1, offset2) {
    moveLogo();
    moveQuestion(question1, question2, button3, button4);
    moveButton(button1, button2, offset1, offset2);
    setTimeout(function(){
        //addText(Q2,random_situation.extrovert.question,A3, A4, random_situation.extrovert.intuition.answer,random_situation.extrovert.sensing.answer)
        addText(Q2,random_situation[e_or_I]["question"],A3, A4, random_situation[e_or_I]["intuition"]["answer"],random_situation[e_or_I]["sensing"]["answer"])
        addQuestion(question2, button3, button4);
    }, 2000);
    setTimeout(function(){
        sortButtons(button1, button2, button3, button4);
    }, 3000);
}

function secondMove(firstButton, secondButton, offset1, offset2) {
    moveQuestion(question2, question3, button5, button6);
    moveButton(firstButton, secondButton, offset1, offset2);
    removeQuestion(question1, button1, button2);
    setTimeout(function(){
        //addText(Q3,random_situation.extrovert.intuition.question,A5, A6, random_situation.extrovert.intuition.feeling.answer,random_situation.extrovert.intuition.thinking.answer)
        addText(Q3,random_situation[e_or_I][n_or_s]["question"],A5, A6, random_situation[e_or_I][n_or_s]["feeling"]["answer"],random_situation[e_or_I][n_or_s]["thinking"]["answer"])
        addQuestion(question3, button5, button6);
    }, 2000);
    setTimeout(function(){
        sortButtons(button3, button4, button5, button6);
    }, 3000);
}

function sortButtons(button1, button2, button3, button4) {
    if(button1 != null && button2 != null) {
        button1.style.pointerEvents = "none";
        button2.style.pointerEvents = "none";
    }
    button3.style.zIndex = 10;
    button3.style.pointerEvents = "auto";
    button4.style.zIndex = 10;
    button4.style.pointerEvents = "auto";
}

function moveLogo() {
    var question = document.getElementById("logo");
    var initialTop =  question.offsetTop;
    console.log("hi");
    animate({
        duration: 3000,
        timing: quadEaseInOut,
        draw: function(progress) {
            question.style.top = initialTop - (progress * initialTop) + 'px';
        }
    });
}

function moveQuestion(firstQuestion, secondQuestion, button1, button2) {
    var initialWidth = firstQuestion.offsetWidth - 31;
    var initialHeight = firstQuestion.offsetHeight - 31;
    var initialTop = firstQuestion.offsetTop;
    animate({
        duration: 3000,
        timing: quadEaseInOut,
        draw: function(progress) {
            firstQuestion.style.width = -(progress * initialWidth / 1.7) + initialWidth + 'px';
            firstQuestion.style.height = -(progress * initialHeight / 1.7) + initialHeight + 'px';
            firstQuestion.style.top = initialTop - (progress * initialTop / 2) + 'px';
        }
    });
}

function moveButton(chosenButton, otherButton, offset1, offset2) {
    let initialWidth = chosenButton.offsetWidth;
    let initialHeight = chosenButton.offsetHeight - 3;
    let initialTop = chosenButton.offsetTop;
    let initialLeft1 = chosenButton.offsetLeft;
    let initialLeft2 = otherButton.offsetLeft;

    animate({
        duration: 2100,
        draw: function(progress) {
            chosenButton.style.width = -(progress * initialWidth / 4) + initialWidth + 'px';
            chosenButton.style.height = -(progress * initialHeight / 1.7) + initialHeight + 'px';
            chosenButton.style.top = initialTop - (progress * initialTop / 1.9) + 'px';
            chosenButton.style.left = initialLeft1 + (progress * initialLeft1 / offset1) + 'px';
            otherButton.style.width = -(progress * initialWidth / 4) + initialWidth + 'px';
            otherButton.style.height = -(progress * initialHeight / 1.7) + initialHeight + 'px';
            otherButton.style.top = initialTop - (progress * initialTop / 1.9) + 'px';
            otherButton.style.left = initialLeft2 + (progress * initialLeft2 / offset2) + 'px';
            otherButton.style.opacity = 0.35 - (progress * 4 * 0.35);
        },
        timing: quadEaseInOut
    });
}

function removeQuestion(question, button1, button2) {
    animate({
        duration: 1000,
        draw: function(progress) {
            question.style.opacity = 0.35 - (progress * 0.35)
            if(button1 != null) {
                button1.style.opacity = 0.35 - (progress * 0.35);
            }
            if(button2 != null) {
                button2.style.opacity = 0.35 - (progress * 0.35);
            }
        },
        timing: quadEaseInOut
    });
}

function addQuestion(question, button1, button2) {
    animate({
        duration: 2500,
        draw: function(progress) {
            question.style.opacity = (progress * 0.35)
            button1.style.opacity = (progress * 0.35);
            button2.style.opacity = (progress * 0.35);
        },
        timing: quadEaseInOut
    });
}

//ANIMATION CODEEEE
function quad(timeFraction) {
    return Math.pow(timeFraction, 1.5);
}

function makeEaseInOut(timing) {
    return function(timeFraction) {
        if (timeFraction < .5)
            return timing(2 * timeFraction) / 2;
        else
            return (2 - timing(2 * (1 - timeFraction))) / 2;
    }
}

let quadEaseInOut = makeEaseInOut(quad);

function animate({timing, draw, duration}) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current animation state
        let progress = timing(timeFraction)

        draw(progress); // draw it

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}
