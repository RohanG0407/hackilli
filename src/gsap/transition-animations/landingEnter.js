import {gsap} from "gsap";

const landingEnter = (next) => {

    console.log("added top menu")
     return gsap.from(next.container, {
        opacity: 0,
        duration: 1
    });
}

export default landingEnter;
