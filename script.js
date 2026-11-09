// Navegação com fundo ao rolar
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

function updateNavigation() {
  navbar.classList.toggle("scrolled", window.scrollY > 35);

  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 150) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", updateNavigation, { passive: true });
updateNavigation();

// Tema claro/escuro com preferência salva
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") document.body.classList.add("light");

function updateThemeButton() {
  const isLight = document.body.classList.contains("light");
  themeToggle.textContent = isLight ? "☾" : "☀";
  themeToggle.setAttribute("aria-label", isLight ? "Ativar tema escuro" : "Ativar tema claro");
}
updateThemeButton();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  updateThemeButton();
});

// Animações de entrada
const animatedElements = document.querySelectorAll(".fade-in");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedElements.forEach((element) => observer.observe(element));
} else {
  animatedElements.forEach((element) => element.classList.add("show"));
}

// Fecha o menu mobile depois de escolher uma seção
document.querySelectorAll(".navbar .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("menuNavbar");
    if (menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});
