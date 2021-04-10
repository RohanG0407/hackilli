import {gsap} from "gsap"
import { ScrollTrigger }　from "gsap/ScrollTrigger.js"

gsap.registerPlugin(ScrollTrigger);

export class scrollGraphic {
    static init(container) {
        console.log("Called ScrollGraphic")
        let downArrow = container.querySelector("#scrollGraphic");

        let tl = gsap.timeline({repeat: -1});

        tl.to(downArrow, {
            y: "5",
            duration: .2
        });
        tl.to(downArrow, {
            y: "0",
            duration: .2
        });
    }
}
