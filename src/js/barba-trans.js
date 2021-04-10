import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import {landingLeave, landingEnter, pageEnter, pageLeave, pageToLandingEnter, pageToLandingLeave} from "../gsap/transition-animations/animation-imports"
import {scrollGraphic} from "../gsap/scrollGraphic"
import {aboutTransitions} from "../gsap/transition-animations/aboutTransitions";
import barbaCss from '@barba/css';


//barba.use(barbaCss);
barba.use(barbaPrefetch);

barba.init({
    cacheIgnore: false,
    transitions: [
        // Transition from Landing Page to any other page
        {
            name: "from-landing",
            from: {
                namespace: "landing"
            },
            to: {
                namespace: [
                    "about",
                    "works",
                ]
            },
            leave: ({current}) => landingLeave(current.container),
            enter(data){
                landingEnter(data.next);
            },
        },
        // From any page to landing
        {
            name: "to-landing",
            from: {
                namespace: [
                    "about",
                    "works",
                ]
            },
            to: {
                namespace: "landing"
            },
            leave: ({current}) => pageToLandingLeave(current.container),
            enter(data){
                pageToLandingEnter(data.next);
            },
        },
        //General Transitions
        {
            name: "general-transition",
            leave: ({current}) => pageLeave(current.container),
            enter(data){
                pageEnter(data.next);
            }
        },
        {
            name: "first-landing",
            namespace: "landing",
            once: import("./index")
        },
        {
            name: "first-works",
            namespace: "works",
            once: import('./works')
        },
        {
            name: "first-about",
            namespace: "about",
            once: import('./about'),
        }
    ],
    views: [
        {
            namespace: "about",
            beforeLeave(data) {
                aboutTransitions.cleanUp()
            },
            beforeEnter(data) {
                console.log("triggered about")
                let topMenu = document.getElementById("topMenu")
                topMenu.style.display = 'inline-flex'
                let unique_contents = document.getElementsByClassName("unique-contents")
                unique_contents[0].style.height = "100vh";
                scrollGraphic.init(data.next.container)
                aboutTransitions.init(data.next.container)

            },
            afterEnter(data) {
                window.document.dispatchEvent(new Event("DOMContentLoaded", {
                    bubbles: true,
                    cancelable: true
                }));
                window.dispatchEvent(new Event("resize"));
            }
        },
        {
            namespace: "works",
            beforeEnter(data) {
                scrollGraphic.init(data.next.container)
                let topMenu = document.getElementById("topMenu")
                topMenu.style.display = 'inline-flex'
            },
            afterEnter(data) {
                window.document.dispatchEvent(new Event("DOMContentLoaded", {
                    bubbles: true,
                    cancelable: true
                }));
            }
        },
        {
            namespace: "landing",
            beforeEnter(data) {
            },
            afterEnter(data) {
                window.document.dispatchEvent(new Event("DOMContentLoaded", {
                    bubbles: true,
                    cancelable: true
                }));
                let topMenu = document.getElementById("topMenu")
                topMenu.style.display = 'none'
                console.log("triggered landing")
                let unique_contents = document.getElementsByClassName("unique-contents")
                unique_contents[0].style.height = "100vh";
            }
        },

    ]
})


