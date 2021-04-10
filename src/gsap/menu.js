import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import barba from "@barba/core";

gsap.registerPlugin(ScrollToPlugin);

//LOCAL DECLARATIONS
let homeMenuLink = document.getElementById("homeLink");
let worksMenuLink = document.getElementById("worksLink");
let aboutMenuLink = document.getElementById("aboutLink");

let homeMenu = "#homeMenu"
let worksMenu = "#worksMenu"
let aboutMenu = "#aboutMenu"

let transitionDuration = 0;
let defaultBackgroundColor = 'aliceblue';
let defaultTextColor = '#e8e8e8';
let selectedTextColor = '#23CE6B';

function menuEnter(element, title) {
    if(document.title !== title) {
        gsap.to(element, {
            color: selectedTextColor,
            duration: .1
        })
    }

}

function menuExit(element, title) {
    if(document.title !== title) {
        gsap.to(element, {
            color: defaultTextColor,
            duration: .1
        })
    }

}

// Clears all the highlighted elements in topMenu expect the parameter element
function clearTopMenu(element) {
    let arr = [homeMenu,worksMenu,aboutMenu]
    const index = arr.indexOf(element);
    if (index > -1) {
        arr.splice(index, 1);
    }
    for(let i = 0; i < arr.length; i++) {
        gsap.to(arr[i] ,{
            color: defaultTextColor,
            duration: transitionDuration
        });
    }

}

document.addEventListener("DOMContentLoaded", () => {
    if(document.title !== "Landing") {
        homeMenuLink = document.getElementById("homeLinkTop");
        worksMenuLink = document.getElementById("worksLinkTop");
        aboutMenuLink = document.getElementById("aboutLinkTop");

        homeMenu = "#homeMenuTop"
        worksMenu = "#worksMenuTop"
        aboutMenu = "#aboutMenuTop"
    } else {
        homeMenuLink = document.getElementById("homeLink");
        worksMenuLink = document.getElementById("worksLink");
        aboutMenuLink = document.getElementById("aboutLink");

        homeMenu = "#homeMenu"
        worksMenu = "#worksMenu"
        aboutMenu = "#aboutMenu"
    }

    //Do something to current pages menu item

    if(document.title === 'Landing') {
        clearTopMenu(homeMenu)
        gsap.to(homeMenu ,{
            color: selectedTextColor,
            duration: transitionDuration
        });
    } else if(document.title === 'Works') {
        clearTopMenu(worksMenu)
        gsap.to(worksMenu ,{
            color: selectedTextColor,
            duration: transitionDuration
        });
    } else {
        clearTopMenu(aboutMenu)
        gsap.to(aboutMenu ,{
            color: selectedTextColor,
            duration: transitionDuration
        });
    }



    homeMenuLink.addEventListener('mouseover', () => {
        menuEnter(homeMenu, "Landing");
    });

    homeMenuLink.addEventListener('mouseleave', () => {
        menuExit(homeMenu, "Landing");
    });

    homeMenuLink.addEventListener('click', () => {
        //window.location.href = "../index.html"
    })

    worksMenuLink.addEventListener('mouseover', () => {
        menuEnter(worksMenu, "Works");
    });

    worksMenuLink.addEventListener('mouseleave', () => {
        menuExit(worksMenu, "Works");
    });


//About event listeners

    aboutMenuLink.addEventListener('mouseover', () => {
        menuEnter(aboutMenu, "About");
    });

    aboutMenuLink.addEventListener('mouseleave', () => {
        menuExit(aboutMenu, "About");
    });


})

function changePage(page) {
    barba.go(page);
}





