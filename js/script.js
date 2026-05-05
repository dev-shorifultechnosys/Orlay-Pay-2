document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const backToTop = document.getElementById("backToTop");
  const demoForm = document.getElementById("demoForm");
  const successMessage = document.querySelector(".success-message");
  const revealItems = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    const scrollPoint = window.scrollY + 130;

    document.querySelectorAll("main section[id]").forEach((section) => {
      const id = section.getAttribute("id");
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPoint >= top && scrollPoint < bottom) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }

  function handleScroll() {
    header.classList.toggle("scrolled", window.scrollY > 18);
    backToTop.classList.toggle("show", window.scrollY > 460);
    updateActiveNav();
  }

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      const nav = document.getElementById("mainNav");
      if (nav && nav.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealItems.forEach((item) => observer.observe(item));

  if (demoForm) {
    demoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      successMessage.classList.remove("show");

      if (!demoForm.checkValidity()) {
        demoForm.classList.add("was-validated");
        return;
      }

      const payload = Object.fromEntries(new FormData(demoForm).entries());
      console.log("Orlay Pay demo request:", payload);

      demoForm.reset();
      demoForm.classList.remove("was-validated");
      successMessage.classList.add("show");
    });
  }
});
