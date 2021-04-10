import {gsap} from "gsap"
import '../css/about.scss'

let minMenu = document.getElementById('minMenu');

function menuEnter(element, title) {
    if(document.title != title) {
        gsap.to(element, {backgroundColor: "black", duration: .7});
        gsap.to(element, {color: "white", duration: .7})
    }

}

function menuExit(element, title) {
    if(document.title != title) {
        gsap.to(element, {backgroundColor: "white", duration: .7});
        gsap.to(element, {color: "black", duration: .7})
    }

}

minMenu.addEventListener('click', () => {
    let expandedMenu = document.querySelector('#expandedMenu');
    let expandedMenuStyle = getComputedStyle(expandedMenu);
    expandedMenu = document.getElementById('expandedMenu')
    if(expandedMenuStyle.display === 'none') {
        expandedMenu.style.display = 'flex';
    } else {
        expandedMenu.style.display = 'none';
    }
});

let worksMenuex = document.getElementById("worksLinkex");
let blogMenuex = document.getElementById("blogLinkex");
let inspirationMenuex = document.getElementById("inspirationLinkex");
let aboutMenuex = document.getElementById("aboutLinkex");


worksMenuex.addEventListener('mouseover', () => {
    menuEnter("#worksMenuex", "Projects");
});

worksMenuex.addEventListener('mouseleave', () => {
    menuExit("#worksMenuex", "Projects");
});

blogMenuex.addEventListener('mouseover', () => {
    menuEnter("#blogMenuex", "Blog");
});

blogMenuex.addEventListener('mouseleave', () => {
    menuExit("#blogMenuex", "Blog");
});

inspirationMenuex.addEventListener('mouseover', () => {
    menuEnter("#inspirationMenuex", "Inspiration");
});

inspirationMenuex.addEventListener('mouseleave', () => {
    menuExit("#inspirationMenuex", "Inspiration");
});

aboutMenuex.addEventListener('mouseover', () => {
    menuEnter("#aboutMenuex", "About");
});

aboutMenuex.addEventListener('mouseleave', () => {
    menuExit("#aboutMenuex", "About");
});