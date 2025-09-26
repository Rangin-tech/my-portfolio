// Fade-in sections and cards
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      const cards = entry.target.querySelectorAll(".card");
      cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.2}s`;
        card.classList.add("visible");
      });
    }
  });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));

// Smooth scroll for navbar
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    if(link.getAttribute('href').startsWith('#')){
      e.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Typing animation in hero
const typedText = document.querySelector('.typed-text');
const texts = ["Java Developer", "Data Analyst", "Tech Enthusiast"];
let index = 0, charIndex = 0;
function type() {
  if(charIndex < texts[index].length){
    typedText.textContent += texts[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 150);
  } else {
    setTimeout(erase, 1000);
  }
}
function erase() {
  if(charIndex > 0){
    typedText.textContent = texts[index].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, 100);
  } else {
    index = (index + 1) % texts.length;
    setTimeout(type, 500);
  }
}
document.addEventListener("DOMContentLoaded", () => type());

// Highlight navbar on scroll
const navLinks = document.querySelectorAll('nav a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if(pageYOffset >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Check local storage (remember user choice)
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});
