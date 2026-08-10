/* =========================
   TEMA
   ========================= */

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

// Primeira carga: respeita escolha do usuário, senão segue o sistema
const saved = localStorage.getItem("theme");
applyTheme(saved || null);

// Atualiza em tempo real se o sistema mudar (e o usuário não tiver escolhido)
mediaQuery.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    applyTheme(null); // mantém sem data-theme → CSS @media age livre
  }
});

function setupToggle(btn) {
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") ||
      (mediaQuery.matches ? "dark" : "light");

    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
}

setupToggle(document.getElementById("themeToggle"));
setupToggle(document.getElementById("themeToggleMobile"));

/* =========================
   MENU MOBILE FLUIDO
   ========================= */
const hamburger = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");
    mobileMenu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", !isOpen);
  });

  document.querySelectorAll(".close-menu").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================
   HEADER SHADOW NO SCROLL
   ========================= */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 10);
});

/* =========================
   SCROLL SUAVE + OFFSET HEADER
   ========================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length <= 1) return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

/* =========================
   ACTIVE MENU NO SCROLL
   ========================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".main-nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (
      pageYOffset >= sectionTop &&
      pageYOffset < sectionTop + section.clientHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
});

/* =========================
   IDIOMA
   ========================= */
const langPT = document.getElementById("lang-pt");
const langEN = document.getElementById("lang-en");
const langPTMobile = document.getElementById("lang-pt-m");
const langENMobile = document.getElementById("lang-en-m");

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setActiveLang(lang) {
  [langPT, langPTMobile].forEach((el) =>
    el?.classList.toggle("active-lang", lang === "pt"),
  );
  [langEN, langENMobile].forEach((el) =>
    el?.classList.toggle("active-lang", lang === "en"),
  );
}

function translateToEnglish() {
  document.documentElement.lang = "en";
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
  setText("project1-title", "ProcessDebt");
  setText(
    "project1-description",
    "Diagnosis and measurement platform for process inefficiency, applying the Technical Debt concept to business process management. Project in progress...",
  );
  setText("project2-title", "SkillBridge");
  setText(
    "project2-description",
    "Organizational Knowledge Retention, Transfer and Mapping System. Project in progress...",
  );
  document.getElementById("project1-code").innerHTML =
    '<i class="fab fa-github"></i> Code';
  document.getElementById("project1-demo").innerHTML =
    '<i class="fas fa-external-link-alt"></i> Live Demo';
  document.getElementById("project2-code").innerHTML =
    '<i class="fab fa-github"></i> Code';
  document.getElementById("project2-demo").innerHTML =
    '<i class="fas fa-external-link-alt"></i> Live Demo';

  // MODAL DO PROCESSDEBT
  setText("pd-modal-title", "Project in progress...");
  setText(
    "pd-modal-text",
    "Would you like to go to the prototype currently in development on Figma?",
  );
  setText("processdebt-modal-confirm", "Yes");
  setText("processdebt-modal-cancel", "Cancel");

  // CONTACT
  setText("contact-tag", "Connection");
  setText("contact-title", "Let's Talk?");
  setText(
    "contact-subtitle",
    "Feel free to send a message about opportunities, projects or feedback.",
  );
  setText("email-title", "Direct Email");
  setText("location-title", "Location");
  setText("location-text", "Sorocaba - SP, Brazil");
  setText("linkedin-title", "Professional Network");
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
    'Send by Email <i class="fas fa-paper-plane"></i>';
  const whatsappBtnEl = document.getElementById("whatsapp-button");
  if (whatsappBtnEl) {
    whatsappBtnEl.innerHTML =
      'Send via WhatsApp <i class="fab fa-whatsapp"></i>';
  }

  // FOOTER
  setText(
    "footer-text",
    "© 2026 Madu Peres. All rights reserved. Developed with focus and dedication.",
  );

  setActiveLang("en");
}

function translateToPortuguese() {
  location.reload();
}

langEN?.addEventListener("click", (e) => {
  e.preventDefault();
  translateToEnglish();
});
langPT?.addEventListener("click", (e) => {
  e.preventDefault();
  translateToPortuguese();
});
langENMobile?.addEventListener("click", (e) => {
  e.preventDefault();
  translateToEnglish();
});
langPTMobile?.addEventListener("click", (e) => {
  e.preventDefault();
  translateToPortuguese();
});

const whatsappButton = document.getElementById("whatsapp-button");

if (whatsappButton) {
  whatsappButton.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const phoneNumber = "5515996514120"; //

    const text = `
*Olá Madu, vim pelo seu portfólio!*

Nome: ${name}
Email: ${email}
Assunto: ${subject}

Mensagem:
${message}
    `;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  });
}

/* =========================
   MODAL: ProcessDebt - Protótipo em desenvolvimento
   ========================= */
(function () {
  const FIGMA_URL =
    "https://www.figma.com/design/RSdPrrbAmS5hDzvLVaWYVh/ProcessDebt---Prot%C3%B3tipo-UI?node-id=0-1&t=fPJyU0fxDm9zVkUl-0";

  const overlay = document.getElementById("processdebt-modal-overlay");
  const confirmBtn = document.getElementById("processdebt-modal-confirm");
  const cancelBtn = document.getElementById("processdebt-modal-cancel");

  window.openProcessDebtModal = function () {
    overlay?.classList.add("pd-modal-open");
  };

  function closeProcessDebtModal() {
    overlay?.classList.remove("pd-modal-open");
  }

  confirmBtn?.addEventListener("click", function () {
    window.open(FIGMA_URL, "_blank", "noopener,noreferrer");
    closeProcessDebtModal();
  });

  cancelBtn?.addEventListener("click", closeProcessDebtModal);

  overlay?.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeProcessDebtModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      overlay?.classList.contains("pd-modal-open")
    ) {
      closeProcessDebtModal();
    }
  });
})();
