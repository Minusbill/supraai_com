/* ========================================
   超灵智能 - Main JavaScript
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollAnimations();
  initContactForm();
  initNavHighlight();
});

/* === Navigation === */
function initNavigation() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  // Hamburger toggle for mobile
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      links.classList.toggle("open");
    });

    // Close menu when a link is clicked
    const allNavClicks = links.querySelectorAll("a:not(.nav-dropdown-trigger)");
    allNavClicks.forEach((link) => {
      link.addEventListener("click", () => {
        toggle.classList.remove("open");
        links.classList.remove("open");
      });
    });
  }

  // Dropdown: click to toggle (desktop + mobile unified)
  const dropdownTrigger = document.querySelector(".nav-dropdown-trigger");
  const dropdown = document.querySelector(".nav-dropdown");
  if (dropdownTrigger && dropdown) {
    dropdownTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });

    // Click outside to close
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });

    // Close after clicking a dropdown link
    const dropdownLinks = dropdown.querySelectorAll(".nav-dropdown-menu a");
    dropdownLinks.forEach((link) => {
      link.addEventListener("click", () => {
        dropdown.classList.remove("open");
      });
    });
  }

  // Nav shadow on scroll
  if (nav) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 10) {
          nav.classList.add("scrolled");
        } else {
          nav.classList.remove("scrolled");
        }
      },
      { passive: true }
    );
  }
}

/* === Smooth Scroll === */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

/* === Scroll Animations (Intersection Observer) === */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* === Nav Active Highlight === */
function initNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[data-section]");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.section === id);
          });
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "-80px 0px -50% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/* === Contact Form Handler === */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmit();
  });
}

function handleSubmit() {
  const btn = document.querySelector(".submit-btn");
  if (!btn || btn.disabled) return;

  // Basic validation
  const name = document.getElementById("formName");
  const contact = document.getElementById("formContact");

  if (name && !name.value.trim()) {
    name.focus();
    shakeElement(name);
    return;
  }

  if (contact && !contact.value.trim()) {
    contact.focus();
    shakeElement(contact);
    return;
  }

  // Success state
  btn.textContent = "\u2713 \u5df2\u63d0\u4ea4\uff01\u6211\u4eec\u5c06\u5728 24 \u5c0f\u65f6\u5185\u8054\u7cfb\u60a8";
  btn.style.background = "#1E3A5F";
  btn.disabled = true;

  // Optionally collect form data for future backend integration
  const formData = {
    name: name ? name.value.trim() : "",
    company: document.getElementById("formCompany")
      ? document.getElementById("formCompany").value.trim()
      : "",
    contact: contact ? contact.value.trim() : "",
    service: document.getElementById("formService")
      ? document.getElementById("formService").value
      : "",
    message: document.getElementById("formMessage")
      ? document.getElementById("formMessage").value.trim()
      : "",
  };

  console.log("Form submitted:", formData);
  // TODO: Send to backend API when ready
}

function shakeElement(el) {
  el.style.borderColor = "#e53e3e";
  el.classList.add("shake");
  setTimeout(() => {
    el.style.borderColor = "";
    el.classList.remove("shake");
  }, 600);
}

// Add shake animation dynamically
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
  }
  .shake { animation: shake 0.4s ease; }
`;
document.head.appendChild(shakeStyle);
