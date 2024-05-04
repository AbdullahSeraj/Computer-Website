// Local Storage For Colors
let mainColors = localStorage.getItem("color_option");

if(mainColors !== null) {
    document.documentElement.style.setProperty("--main-color", mainColors);

    document.querySelectorAll(".colors-list li").forEach(ele => {
        ele.classList.remove("active");
        if (mainColors === ele.dataset.color){
            ele.classList.add("active");
        }
    });
};


let backgroundOption = true;
let backgroundInterval;

// Local Storage For Background
let backgroundLocalItem = localStorage.getItem("background_option");

if(backgroundLocalItem !== null) {

    if(backgroundLocalItem === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }

    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    })

    if(backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");

    }
} 


// Start Setting Box
document.querySelector(".font").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
}

// Colors
const myColors = document.querySelectorAll(".colors-list li");

myColors.forEach(function(li) {
    li.addEventListener("click", function(e) {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);
    })
})

// Random Backgrounds
let randomBackEl = document.querySelectorAll(".random-backgrounds");

randomBackEl.forEach(spans => {
    spans.addEventListener("click", e => {
        handleActive(e);

        if(e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    })
})

// End Setting Box


// Start Landing Page
let landingPage = document.querySelector(".landing-page");

let imgs = ["landing_1.webp", "landing_2.jpeg", "landing_3.jpg", "landing_4.jpg", "landing_5.webp"];

function randomizeImgs() {
    if (backgroundOption) {
        backgroundInterval = setInterval(() => {
            let myRandom = Math.floor(Math.random()*imgs.length)
        
            landingPage.style.backgroundImage = `url("images/${imgs[myRandom]}")`;
        }, 5000);
    }
}

randomizeImgs();
// End Landing Page

// Skills Data Progress
let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOffsetHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop+2 > (skillsOffsetTop + skillsOffsetHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
    }
}


// Gallery Images 
let galleryImgs = document.querySelectorAll(".gallery img");

galleryImgs.forEach(img => {
    img.addEventListener("click", function() {

        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.alt !== "") {
            let popupAlt = document.createElement("h3");
            let textH3 = document.createTextNode(img.alt);
            popupAlt.className = "popup-h3";
            popupAlt.appendChild(textH3);
            popupBox.appendChild(popupAlt);
        }

        let popupImg = document.createElement("img");
        popupImg.classList = "popup-img";
        popupImg.src = img.src;

        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);

        let popupClose = document.createElement("div");
        popupClose.className = "popup-close";
        popupClose.innerHTML = "X";
        popupBox.appendChild(popupClose);

    });
});

// Popup Close
document.addEventListener("click", function(e) {
    if(e.target.className === "popup-close") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
})


// Select All Bullets and Links
const allBullet = document.querySelectorAll(".nev-bullets .bullet");
let allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements){

    elements.forEach(element => {
    
        element.addEventListener("click", e => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({behavior: "smooth"});
        })
    })

}

scrollToSomewhere(allLinks);
scrollToSomewhere(allBullet);


// Handle Active State 
function handleActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });

    ev.target.classList.add("active");
}


// Show Option

let bulletsSpans = document.querySelectorAll(".bullets-option span");

let nevBullets = document.querySelector(".nev-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");


if(bulletLocalItem !== null) {
    bulletsSpans.forEach(function (bullet) {
        bullet.classList.remove("active");
    })
    
    if(bulletLocalItem === "block") {
        nevBullets.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else{
        nevBullets.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpans.forEach((span) => {

    span.addEventListener("click", function(e) {
        if(e.target.dataset.display === "show"){
            nevBullets.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        } else {
            nevBullets.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
        
        handleActive(e);
    })
})

// Reset Options 
document.querySelector(".reset-options").onclick = function() {
    // window.localStorage.clear();
    window.localStorage.removeItem("color_option");
    window.localStorage.removeItem("background_option");
    window.localStorage.removeItem("bullets_option");
    window.location.reload();
}

// Toggle Menu
let toggleMenu = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");


toggleMenu.onclick = function(e) {

    e.stopPropagation();

    this.classList.toggle("menu-active");

    links.classList.toggle("open");
}

// Click Anywhere outside Menu and Toggle Button
document.addEventListener("click", function(e) {

    if(e.target !== toggleMenu && e.target !== links) {

        if(links.classList.contains("open")) {
            
            toggleMenu.classList.toggle("menu-active");
            links.classList.toggle("open");
        }
    }
})

links.onclick = function(e) {
    e.stopPropagation();
}