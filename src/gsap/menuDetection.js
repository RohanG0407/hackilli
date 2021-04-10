console.log("menuDetection began here");

document.addEventListener('DOMContentLoaded', () => {
    let topMenu = document.getElementById('topMenu');
    let minMenu = document.getElementById('minMenu');

    if(window.innerWidth <= 700) {
        topMenu.style.display = "none";
        minMenu.style.display = 'block';

    }
    if(window.innerWidth >= 700){
        topMenu.style.display = "inline-flex";
        minMenu.style.display = 'none';
    }
});

window.addEventListener('resize' ,(e) => {
    let topMenu = document.getElementById('topMenu');
    let minMenu = document.getElementById('minMenu');

    if(window.innerWidth <= 700) {
        topMenu.style.display = "none";
        minMenu.style.display = 'block';
    }
    if(window.innerWidth >= 700){
        topMenu.style.display = "inline-flex";
        minMenu.style.display = 'none';
    }

});