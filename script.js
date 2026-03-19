// Navigation Toggler
// Navigation Toggler
const navTogglerBtn = document.querySelector(".nav-toggler");
const navMenu = document.querySelector(".nav");

navTogglerBtn.addEventListener("click", () => {
    menuTogglerBtn();
});

function menuTogglerBtn() {
    navMenu.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
}

// Section Switching
const navLinks = document.querySelectorAll(".nav li a");
const sections = document.querySelectorAll(".section");

function showSection(element) {
    // Hide all sections
    sections.forEach((section) => {
        section.classList.add("hidden");
    });
    // Show the target section
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.remove("hidden");
}

navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
        // Prevent default anchor behavior
        e.preventDefault();

        // Remove active class from all nav links
        navLinks.forEach((navLink) => {
            navLink.classList.remove("active");
        });
        
        // Add active class to clicked link
        this.classList.add("active");
        
        // Show target section
        showSection(this);

        // Close menu upon clicking a link (for mobile views)
        if (window.innerWidth < 1200) {
            menuTogglerBtn();
        }
    });
});

// Setup initial state: only show Home section
document.addEventListener("DOMContentLoaded", () => {
    sections.forEach((section) => {
        if (section.id !== "home") {
            section.classList.add("hidden");
        }
    });
});

// Theme Light and Dark Mode
const themeBtn = document.querySelector(".theme-btn");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const icon = themeBtn.querySelector("i");
    if(document.body.classList.contains("dark")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        localStorage.setItem("theme-color", "dark");
    } else {
        icon.classList.add("fa-moon");
        icon.classList.remove("fa-sun");
        localStorage.setItem("theme-color", "light");
    }
});

// Load theme preference on load
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme-color");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeBtn.querySelector("i").classList.remove("fa-moon");
        themeBtn.querySelector("i").classList.add("fa-sun");
    }
});
