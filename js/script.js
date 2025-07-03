// Initialize particles.js background
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 60,
      "density": {
        "enable": true,
        "value_area": 1000
      }
    },
    "color": { "value": "#ffffff" },
    "shape": {
      "type": "circle",
      "stroke": { "width": 0, "color": "#000000" }
    },
    "opacity": {
      "value": 0.4,
      "random": true
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.2,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "out_mode": "out"
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      }
    },
    "modes": {
      "repulse": { "distance": 100 },
      "push": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
});

window.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("animated-title");
  if (!el) return;


  const splitter = new SplitText(el, {
    type: "chars", 
  });

  const chars = splitter.chars;


  chars.forEach((char) => {
    char.style.willChange = "transform, opacity";
  });


  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: "top 80%", 
      toggleActions: "play none none none",
      once: true, 
    },
  });


  tl.set(chars, { opacity: 0, y: 40 });


  tl.to(chars, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.05, 
  });
});
function decryptTextEffect({
  elementId,
  speed = 50,
  iterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/',
}) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const originalText = el.innerText;
  const textLength = originalText.length;
  let iteration = 0;

  const randomChar = () => characters[Math.floor(Math.random() * characters.length)];

  const scramble = () => {
    const scrambled = originalText
      .split('')
      .map((char, i) => {
        if (char === ' ' || iteration >= iterations) return char;
        return randomChar();
      })
      .join('');

    el.innerText = scrambled;

    iteration++;

    if (iteration < iterations) {
      setTimeout(scramble, speed);
    } else {
      el.innerText = originalText;
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        scramble();
        observer.disconnect();
      }
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(el);
}

decryptTextEffect({
  elementId: 'decrypted-text',
  speed: 40,
  iterations: 15,
});
