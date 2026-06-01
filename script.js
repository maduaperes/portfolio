const langPT = document.getElementById("lang-pt");
const langEN = document.getElementById("lang-en");

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

function translateToEnglish() {
  document.title = "Portfolio - Madu Peres";

  // MENU
  setText("nav-home", "HOME");
  setText("nav-about", "ABOUT");
  setText("nav-services", "SERVICES");
  setText("nav-resume", "RESUME");
  setText("nav-contact", "CONTACT");

  // HERO
  setText("hero-subtitle", "— Hello! I'm,");

  setText(
    "hero-description",
    "Software developer in progress, focused on building modern interfaces, clean code and intelligent digital solutions while expanding my knowledge in technology.",
  );

  setText("contactBtn", "GET IN TOUCH");

  // ABOUT
  setText("about-tag", "Who I Am");
  setText("about-title", "About Me");

  setText(
    "about-text-1",
    "I am fascinated by the ability to transform lines of code into real solutions that impact people's daily lives. My journey in technology began with curiosity about how the web works behind the scenes, and today I focus on creating applications that combine intuitive design, accessibility and performance.",
  );

  setText(
    "about-text-2",
    "Currently, I am improving my skills in software architecture, design patterns and agile development. I divide my time between college, personal projects and technology communities.",
  );

  setText("counter-years", "+2 Years");
  setText("counter-studies", "Practical Studies");
  setText("counter-projects", "GitHub Projects");
  setText("counter-dedication", "Dedication");

  // SKILLS
  setText("skills-title", "My Tech Skills");

  setText(
    "skills-description",
    "Technologies and tools that I use in my development ecosystem:",
  );

  setText("other-skills-title", "Other Tools:");

  // BADGES
  setText("badge-git", "Git & GitHub");
  setText("badge-ai", "Artificial Intelligence");
  setText("badge-genai", "Generative AI");
  setText("badge-logic", "Programming Logic");
  setText("badge-oop", "Object-Oriented Programming");
  setText("badge-data", "Data Analysis");
  setText("badge-kpi", "Key Performance Indicators (KPIs)");
  setText("badge-office", "Microsoft Office");

  // SERVICES
  setText("services-tag", "What I Do");
  setText("services-title", "Professional Services");

  setText(
    "services-subtitle",
    "Solutions designed to transform ideas into high-quality products.",
  );

  setText("service-front-title", "Front-end Development");

  setText(
    "service-front-description",
    "Development of dynamic, clean and fast web applications using modern component-based ecosystems.",
  );

  document.getElementById("service-front-item1").innerHTML =
    '<i class="fas fa-check"></i> Institutional Websites';

  document.getElementById("service-front-item2").innerHTML =
    '<i class="fas fa-check"></i> Single Page Applications (SPA)';

  setText("service-back-title", "Back-end Development");

  setText(
    "service-back-description",
    "Creation of structured APIs, efficient business rules and secure database integrations.",
  );

  document.getElementById("service-back-item1").innerHTML =
    '<i class="fas fa-check"></i> REST API Integrations';

  document.getElementById("service-back-item2").innerHTML =
    '<i class="fas fa-check"></i> Data Modeling';

  setText("service-responsive-title", "Responsive Interfaces");

  setText(
    "service-responsive-description",
    "Development focused on adapting applications to smartphones, tablets and desktops.",
  );

  document.getElementById("service-responsive-item1").innerHTML =
    '<i class="fas fa-check"></i> Mobile-First Philosophy';

  document.getElementById("service-responsive-item2").innerHTML =
    '<i class="fas fa-check"></i> Layout Optimization';

  setText("service-uiux-title", "Prototyping & UI/UX");

  setText(
    "service-uiux-description",
    "Transformation of business requirements into interactive wireframes and visual prototypes before development.",
  );

  document.getElementById("service-uiux-item1").innerHTML =
    '<i class="fas fa-check"></i> Information Architecture';

  document.getElementById("service-uiux-item2").innerHTML =
    '<i class="fas fa-check"></i> Figma Layout Design';

  // RESUME
  setText("resume-tag", "Journey");
  setText("resume-title", "Resume & Experience");

  document.getElementById("education-title").innerHTML =
    '<i class="fas fa-graduation-cap"></i> Academic Background';

  document.getElementById("experience-title").innerHTML =
    '<i class="fas fa-briefcase"></i> Professional Experience';

  // EDUCATION
  setText("ads-title", "Systems Analysis and Development");
  setText("ads-place", "SENAC - Sorocaba, Brazil");

  setText(
    "ads-description",
    "Program focused on requirements engineering, structured logic, relational databases and IT governance.",
  );

  setText("cc-title", "Computer Science");
  setText("cc-place", "UNIP - Sorocaba, Brazil");

  setText(
    "cc-description",
    "Bachelor's degree focused on algorithms, systems architecture and applied artificial intelligence.",
  );

  // EXPERIENCE
  setText("fr-title", "Administrative Assistant");
  setText("fr-place", "FR Real Estate Agency");

  setText(
    "fr-description",
    "Support for administrative routines, document organization, customer service and internal processes.",
  );

  setText("cnh-title", "Administrative Assistant (Controlling)");
  setText("cnh-place", "CNH Industrial Brazil");

  setText(
    "cnh-description",
    "Operational support for the controlling department, assisting with financial data flows and internal reports.",
  );

  // PROJECTS
  setText("projects-title", "Featured Projects");

  setText(
    "projects-description",
    "Some recently developed solutions that demonstrate my skills in practice:",
  );

  setText("project1-image-text", "[ Project Image 1 ]");
  setText("project1-title", "E-Commerce Dashboard");

  setText(
    "project1-description",
    "Administrative dashboard for inventory and real-time sales management integrated with a relational database.",
  );

  setText("project2-image-text", "[ Project Image 2 ]");
  setText("project2-title", "Personal Finance App");

  setText(
    "project2-description",
    "Responsive interface for monthly cash flow management with interactive expense charts.",
  );

  document.getElementById("project1-code").innerHTML =
    '<i class="fab fa-github"></i> Code';

  document.getElementById("project1-demo").innerHTML =
    '<i class="fas fa-external-link-alt"></i> Live Demo';

  document.getElementById("project2-code").innerHTML =
    '<i class="fab fa-github"></i> Code';

  document.getElementById("project2-demo").innerHTML =
    '<i class="fas fa-external-link-alt"></i> Live Demo';

  // CONTACT
  setText("contact-tag", "Connection");
  setText("contact-title", "Let's Talk?");

  setText(
    "contact-subtitle",
    "Feel free to send a message about opportunities, projects or feedback.",
  );

  setText("email-title", "Direct Email");
  setText("location-title", "Location");
  setText("linkedin-title", "Professional Network");
  setText("location-text", "Sorocaba - SP, Brazil");

  setText("label-name", "Your Name");
  setText("label-email", "Your Email");
  setText("label-subject", "Subject");
  setText("label-message", "Message");

  document.querySelector(".translate-name-placeholder").placeholder =
    "Example: John Smith";

  document.querySelector(".translate-email-placeholder").placeholder =
    "Example: john@email.com";

  document.querySelector(".translate-subject-placeholder").placeholder =
    "Example: Job Opportunity";

  document.querySelector(".translate-message-placeholder").placeholder =
    "Write your message here...";

  document.getElementById("submit-button").innerHTML =
    'Send Message <i class="fas fa-paper-plane"></i>';

  // FOOTER
  setText(
    "footer-text",
    "© 2026 Madu Peres. All rights reserved. Developed with focus and dedication.",
  );

  langEN.classList.add("active-lang");
  langPT.classList.remove("active-lang");
}

function translateToPortuguese() {
  location.reload();
}

if (langEN) {
  langEN.addEventListener("click", (e) => {
    e.preventDefault();
    translateToEnglish();
  });
}

if (langPT) {
  langPT.addEventListener("click", (e) => {
    e.preventDefault();
    translateToPortuguese();
  });
}

/* =========================
   FIX: MOBILE MENU CLOSE
   ========================= */
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("mobileMenu");

    if (menu && typeof bootstrap !== "undefined") {
      const instance = bootstrap.Collapse.getOrCreateInstance(menu);
      instance.hide();
    }
  });
});

/* =========================
   FIX: SCROLL SUAVE + OFFSET HEADER
   ========================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId.length > 1) {
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  });
});

/* =========================
   FIX: ACTIVE MENU ON SCROLL
   ========================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".main-nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* =========================
   FIX: LANGUAGE SAFETY STATE
   (evita bug visual de "active-lang")
   ========================= */
function setActiveLang(lang) {
  if (!langPT || !langEN) return;

  langPT.classList.remove("active-lang");
  langEN.classList.remove("active-lang");

  if (lang === "en") {
    langEN.classList.add("active-lang");
  } else {
    langPT.classList.add("active-lang");
  }
}

/* sobrescreve apenas as partes finais do seu idioma */
function translateToEnglishSafe() {
  translateToEnglish();
  setActiveLang("en");
}

function translateToPortugueseSafe() {
  location.reload();
}

/* rebind seguro */
if (langEN) {
  langEN.removeEventListener("click", translateToEnglish);
  langEN.addEventListener("click", (e) => {
    e.preventDefault();
    translateToEnglishSafe();
  });
}

if (langPT) {
  langPT.removeEventListener("click", translateToPortuguese);
  langPT.addEventListener("click", (e) => {
    e.preventDefault();
    translateToPortugueseSafe();
  });
}

/* =========================
   FIX: MOBILE LANGUAGE BUTTONS
   ========================= */
const langPTMobile = document.getElementById("lang-pt-m");
const langENMobile = document.getElementById("lang-en-m");

if (langENMobile) {
  langENMobile.addEventListener("click", (e) => {
    e.preventDefault();
    translateToEnglish();
  });
}

if (langPTMobile) {
  langPTMobile.addEventListener("click", (e) => {
    e.preventDefault();
    translateToPortuguese();
  });
}

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Script mínimo para o toggle
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function setupToggle(btn) {
  if (!btn) return;
  btn.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    applyTheme(isDark ? "light" : "dark");
  });
}

setupToggle(document.getElementById("themeToggle"));
setupToggle(document.getElementById("themeToggleMobile"));

// Usa preferência salva ou detecta o sistema
const saved = localStorage.getItem("theme");

if (saved) {
  applyTheme(saved);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");

  // Atualiza em tempo real se o sistema mudar e o usuário não tiver escolhido
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
}
