import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js"
import {scrollGraphic} from "../scrollGraphic";
gsap.registerPlugin(ScrollTrigger);


export class aboutTransitions {
    static init(container) {

        // LOCAL DECLARATIONS

        let markers = false

        let skills = container.querySelector("#skills");
        let contact = container.querySelector("#contact");

        let socialsMenu = container.querySelector("#socials-menu")
        let github = container.querySelector("#githubLink")
        let facebook = container.querySelector("#facebookLink")
        let linkedin = container.querySelector("#linkedinLink")
        let mail = container.querySelector("#mailLink")
        let scrollIcon = container.querySelector("#scrollGraphic")

        let bottomScreen = container.querySelector("#bottomScreen")

        let menuLink = container.getElementsByTagName("a")

        Array.from(menuLink).forEach(function(element) {
            element.addEventListener('click', () => {
            });
        });

        //Animates the skills container

        let tl = gsap.timeline();

        tl.to([skills,contact], {
            scrollTrigger: {
                id: "desc",
                trigger: skills,
                markers: markers,
                start: "top bottom",
                end: "bottom bottom",
                //start: "top bottom",
                //end: "bottom bottom",
                scrub: 1
            },
            opacity: 1,
            x: 100
        });

        gsap.to(socialsMenu, {
            scrollTrigger: {
                id: "socialsMenu",
                trigger: bottomScreen,
                markers: markers,
                start: "bottom bottom",
                end: "bottom bottom",
                scrub: 1
            },
            opacity: 1,
            y: -10
        });

        //Event lisenters for social media menu
        github.addEventListener('mouseover', () => {
            github.getElementsByTagName('img')[0].src = "./assets/icons/green-github.png";
        });
        github.addEventListener('mouseleave', () => {
            github.getElementsByTagName('img')[0].src = "./assets/icons/white-github.png";
        });
        facebook.addEventListener('mouseover', () => {
            facebook.getElementsByTagName('img')[0].src = "./assets/icons/green-facebook.png";
        });
        facebook.addEventListener('mouseleave', () => {
            facebook.getElementsByTagName('img')[0].src = "./assets/icons/white-facebook.png";
        });
        linkedin.addEventListener('mouseover', () => {
            linkedin.getElementsByTagName('img')[0].src = "./assets/icons/green-linkedin.png";
        });
        linkedin.addEventListener('mouseleave', () => {
            linkedin.getElementsByTagName('img')[0].src = "./assets/icons/white-linkedin.png";
        });
        mail.addEventListener('mouseover', () => {
            mail.getElementsByTagName('img')[0].src = "./assets/icons/green-mail.png";
        });
        mail.addEventListener('mouseleave', () => {
            mail.getElementsByTagName('img')[0].src = "./assets/icons/white-mail.png";
        });
    }


    static cleanUp() {
        ScrollTrigger.getById("desc").kill(true);
        ScrollTrigger.getById("socialsMenu").kill(true);

    }


}

