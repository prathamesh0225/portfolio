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

//skills animation

gsap.registerPlugin(ScrollTrigger);

let skillsWrapper = document.querySelector("#skillsWrapper");
let panels = gsap.utils.toArray(".skill-panel");

gsap.to(skillsWrapper, {
  xPercent: -25 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#skills",
    pin: true,
    scrub: 2,
    // end: () => "+=" + (window.innerWidth * (panels.length - 1)), // Correct end value
  },
});


//  progress animation
gsap.utils.toArray(".progress-bar").forEach((bar) => {
    const percent = bar.getAttribute("data-percent");
    const fill = bar.querySelector(".progress-fill");
  
    gsap.fromTo(
      fill,
      { width: "0%" },
      {
        width: percent + "%",
        scrollTrigger: {
          trigger: bar,
          start: "top 250%",
          scrub: true,
        },
      }
    );
  });

//contact section

gsap.registerPlugin(ScrollTrigger);

// Animate the entire contact section (fade & scale in)
gsap.from("#contact", {
  opacity: 0,
  scale: 0.95,
  duration: 1.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
    toggleActions: "play none none reset",
  },
});

// Animate the left info panel (from left)
gsap.from("#contact .max-w-6xl > div:first-child", {
  x: -100,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
    toggleActions: "play none none reset",
  },
});

// Animate the form (from right)
gsap.from("#contact form", {
  x: 100,
  opacity: 0,
  duration: 1,
  delay: 0.4,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
    toggleActions: "play none none reset",
  },
});

// Animate each input/textarea/button with staggered effect
gsap.from("#contact input, #contact textarea, #contact button", {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.15,
  scrollTrigger: {
    trigger: "#contact form",
    start: "top 85%",
    toggleActions: "play none none reset",
  },
});

// emailjs connections

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_gueu7ub", "template_hl3pcrc", this)
      .then(function () {
        alert("✅ Message sent successfully!");
        document.getElementById("contact-form").reset();
      }, function (error) {
        alert("❌ Failed to send message: " + JSON.stringify(error));
      });
  });