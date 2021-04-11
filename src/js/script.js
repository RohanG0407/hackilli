import Highway from '@dogstudio/highway';
//import {Fade} from '../js/fade';
var fade = require("./fade.js");

const H  = new Highway.Core({
    transition:{
        default: fade.Fade()
    }
})

console.log("test")