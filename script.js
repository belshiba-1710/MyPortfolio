
const $ = (selector) => document.querySelector(selector);

// Animated name
const nameElement = $("#myName");
const fullName = "Belshiba J";

nameElement.innerHTML = "";
[...fullName].forEach((letter, index) => {
  const span = document.createElement("span");
  span.textContent = letter;
  span.style.display = "inline-block";
  span.style.opacity = "0";
  span.style.transform = "translateY(25px)";
  span.style.transition = "opacity .45s ease, transform .45s ease";
  span.style.transitionDelay = `${index * 0.09}s`;
  if (letter === " ") span.style.width = "0.25em";
  nameElement.appendChild(span);

  requestAnimationFrame(() => {
    setTimeout(() => {
      span.style.opacity = "1";
      span.style.transform = "translateY(0)";
    }, 60);
  });
});

const nameDot = document.createElement("span");
nameDot.textContent = ".";
nameDot.style.color = "var(--accent)";
nameElement.appendChild(nameDot);

// Typing animation
const typingText = $("#typingText");
const words = [
  "Computer Science Student",
  "Web Developer",
  "Creative Learner"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const word = words[wordIndex];

  typingText.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(typeEffect, 85);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeEffect, 1200);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 40);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 300);
  }
}
typeEffect();

// Upload photo and preview it
const photoUpload = $("#photoUpload");
const profilePhoto = $("#profilePhoto");
const photoPlaceholder = $("#photoPlaceholder");

photoUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    this.value = "";
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    alert("Please select a photo smaller than 10 MB.");
    this.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    profilePhoto.src = event.target.result;
    profilePhoto.hidden = false;
    photoPlaceholder.hidden = true;

    try {
      localStorage.setItem("belshibaPortfolioPhoto", event.target.result);
    } catch (error) {
      console.log("Photo preview is temporary because browser storage is full.");
    }
  };

  reader.readAsDataURL(file);
});

// Restore previously selected photo in this browser
try {
  const savedPhoto = localStorage.getItem("belshibaPortfolioPhoto");
  if (savedPhoto) {
    profilePhoto.src = savedPhoto;
    profilePhoto.hidden = false;
    photoPlaceholder.hidden = true;
  }
} catch (error) {
  console.log("Saved photo could not be loaded.");
}

// Dark / light theme
const themeToggle = $("#themeToggle");
const savedTheme = localStorage.getItem("belshibaTheme");

if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}
themeToggle.textContent =
  document.documentElement.dataset.theme === "light" ? "☾" : "☼";

themeToggle.addEventListener("click", () => {
  const isLight = document.documentElement.dataset.theme !== "light";
  document.documentElement.dataset.theme = isLight ? "light" : "dark";
  localStorage.setItem("belshibaTheme", isLight ? "light" : "dark");
  themeToggle.textContent = isLight ? "☾" : "☼";
});

// Mobile navigation
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Copy email
$("#copyEmail").addEventListener("click", async () => {
  const email = "belshijebakumar1710@gmail.com";
  const message = $("#copyMessage");

  try {
    await navigator.clipboard.writeText(email);
    message.textContent = "Email copied successfully! 💜";
  } catch (error) {
    message.textContent = "Email: " + email;
  }
});

// Back to top
const backTop = $("#backTop");

window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 400);
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Current year
$("#year").textContent = new Date().getFullYear();
