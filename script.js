// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor (Only for non-touch devices)
if (window.matchMedia("(pointer: fine)").matches) {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Small delay for the follower ring
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 80);
    });

    // Enlarge cursor on hover points
    document.querySelectorAll('a, button, .project-card').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.borderColor = 'rgba(255, 42, 95, 0.5)';
            cursorFollower.style.backgroundColor = 'rgba(255, 42, 95, 0.1)';
        });
        item.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = 'var(--accent)';
            cursorFollower.style.backgroundColor = 'transparent';
        });
    });
}

// Mobile Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Update active nav link based on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Typing Effect Logic
const typingText = document.getElementById('typing-text');
const words = ['Web Applications', 'Modern Interfaces', 'Interactive UI'];
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, letterIndex + 1);
        letterIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && letterIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect
if(typingText) setTimeout(typeEffect, 1000);

// Initialize VanillaTilt for 3D hover effects
VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// ==== GSAP Scroll Animations ====

// Hero Animations timeline
const tl = gsap.timeline();

tl.from(".nav-container", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
})
.from(".greeting", {
    y: 20,
    opacity: 0,
    duration: 0.5
})
.from(".name", {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: "back.out(1.7)"
}, "-=0.2")
.from(".title", {
    y: 20,
    opacity: 0,
    duration: 0.5
}, "-=0.4")
.from(".description", {
    y: 20,
    opacity: 0,
    duration: 0.5
}, "-=0.3")
.from(".hero-btns a", {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1
}, "-=0.2")
.from(".hero-content .social-links a", {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "back.out(2)"
}, "-=0.3")
.from(".image-wrapper", {
    x: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
}, "-=1")
.from(".floating-icon", {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: "back.out(1.5)"
}, "-=0.5");


// ScrollTrigger Animations
gsap.utils.toArray('.reveal-up').forEach(elem => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

gsap.utils.toArray('.reveal-left').forEach(elem => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

gsap.utils.toArray('.reveal-right').forEach(elem => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

// Counter Animation for Stats
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    gsap.to(counter, {
        scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            once: true
        },
        innerHTML: counter.getAttribute('data-target'),
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power2.out"
    });
});
