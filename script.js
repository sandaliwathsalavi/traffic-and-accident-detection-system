const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section");
const fadeElements = document.querySelectorAll(".fade-in");
const contactForm = document.querySelector(".contact-form");
const dropdownParents = document.querySelectorAll(".has-dropdown");
const timelineSteps = document.querySelectorAll(".fade-step");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(navLinks.classList.contains("open")));
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Dropdown behavior:
// - Desktop: opens instantly on hover and click without flicker.
// - Mobile: opens on click and remains accessible.
dropdownParents.forEach((parent) => {
  const trigger = parent.querySelector(".dropdown-trigger");
  let closeTimeout;

  if (!trigger) {
    return;
  }

  const openDropdown = () => {
    clearTimeout(closeTimeout);
    parent.classList.add("open");
    trigger.setAttribute("aria-expanded", "true");
  };

  const closeDropdown = () => {
    clearTimeout(closeTimeout);
    closeTimeout = setTimeout(() => {
      parent.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    }, 40);
  };

  trigger.addEventListener("click", (event) => {
    if (window.innerWidth <= 900) {
      event.preventDefault();
      parent.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(parent.classList.contains("open")));
      return;
    }
    event.preventDefault();
    const isOpen = parent.classList.contains("open");
    dropdownParents.forEach((item) => {
      item.classList.remove("open");
      const itemTrigger = item.querySelector(".dropdown-trigger");
      if (itemTrigger) {
        itemTrigger.setAttribute("aria-expanded", "false");
      }
    });
    if (!isOpen) {
      openDropdown();
    }
  });

  parent.addEventListener("mouseenter", () => {
    if (window.innerWidth > 900) {
      openDropdown();
    }
  });

  parent.addEventListener("mouseleave", () => {
    if (window.innerWidth > 900) {
      closeDropdown();
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".has-dropdown")) {
    dropdownParents.forEach((parent) => {
      parent.classList.remove("open");
      const trigger = parent.querySelector(".dropdown-trigger");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  }
});

// Highlight active navigation link while scrolling.
window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// Fade-in animation when sections enter viewport.
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18
  }
);

fadeElements.forEach((element) => observer.observe(element));

const timelineObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

timelineSteps.forEach((step, index) => {
  step.style.transitionDelay = `${index * 0.1}s`;
  timelineObserver.observe(step);
});

const cardObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".lift-card, .method-step").forEach((card, index) => {
  card.style.transitionDelay = `${Math.min(index * 0.03, 0.2)}s`;
  cardObserver.observe(card);
});

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thank you! Replace this with your backend contact handler.");
  });
}
