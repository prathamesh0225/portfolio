// Typewriter effect
const typewriterElement = document.getElementById("typewriter");
const words = ["Frontend Developer", "Chess Player"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  const visibleText = currentWord.substring(0, charIndex);
  typewriterElement.textContent = visibleText;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  type();
  
  // GSAP intro animation
  gsap.from("#hero div", {
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: "power2.out"
  });
});


// Animate hero text on load
gsap.from("#hero h2", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power3.out"
  });
  
  gsap.from("#hero p", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.5,
    ease: "power2.out"
  });
  
  gsap.from("#hero a", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    delay: 1,
    ease: "back.out(1.7)"
  });
  
  // Animate projects on scroll
  gsap.utils.toArray(".project").forEach((proj, i) => {
    gsap.from(proj, {
      scrollTrigger: {
        trigger: proj,
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: i * 0.1,
      ease: "power2.out"
    });
  });
  
// Navbar scroll shrink & center float effect
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
  
    if (window.scrollY > 50) {
      gsap.to(navbar, {
        duration: 0.1,
        borderRadius: "9999px", // pill shape
        width: "60%",
        left: "50%",             // center horizontally
        x: "-50%",               // offset by half
        top: "1.5rem",           // float below top
        backgroundColor: "#ffffff",
        padding: "0.75rem 2rem",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        ease: "power2.out"
      });
    } else {
      gsap.to(navbar, {
        duration: 0.5,
        borderRadius: "0px",
        width: "100%",
        left: "0",
        x: "0",
        top: "0",
        backgroundColor: "transparent",
        padding: "1rem 1.5rem",
        boxShadow: "none",
        ease: "power2.out"
      });
    }
  });
  
//project animation
  gsap.registerPlugin(ScrollTrigger);

const projects = gsap.utils.toArray('.project-item');

projects.forEach((project, index) => {
  // Hide all at start
  gsap.set(project, { opacity: 0, zIndex: 0, pointerEvents: "none" });

  // Animate in per scroll section
  ScrollTrigger.create({
    trigger: "#projects",
    start: () => `top+=${index * window.innerHeight} top`,
    end: () => `top+=${(index + 1) * window.innerHeight} top`,
    scrub: true,
    onEnter: () => showProject(index),
    onEnterBack: () => showProject(index)
  });
});

function showProject(activeIndex) {
  projects.forEach((project, i) => {
    if (i === activeIndex) {
      gsap.to(project, {
        opacity: 1,
        duration: 0.5,
        zIndex: 2,
        pointerEvents: "auto"
      });
    } else {
      gsap.to(project, {
        opacity: 0,
        duration: 0.5,
        zIndex: 0,
        pointerEvents: "none"
      });
    }
  });
}
