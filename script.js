document.addEventListener("DOMContentLoaded", () => {
  // ─── Mobile Menu Toggle ───
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinksList = document.querySelector(".nav-links");
  const toggleIcon = mobileToggle.querySelector("i");

  mobileToggle.addEventListener("click", () => {
    navLinksList.classList.toggle("active");
    if (navLinksList.classList.contains("active")) {
      toggleIcon.classList.replace("ph-list", "ph-x");
    } else {
      toggleIcon.classList.replace("ph-x", "ph-list");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinksList.classList.remove("active");
      toggleIcon.classList.replace("ph-x", "ph-list");
    });
  });

  // ─── Sticky Navbar on Scroll ───
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // ─── Scroll Animations ───
  const animatedElements = document.querySelectorAll(".fade-up, .fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  animatedElements.forEach((el) => observer.observe(el));

  setTimeout(() => {
    animatedElements.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("visible");
      }
    });
  }, 100);

  // ─── Before & After Slider ───
  document.querySelectorAll("[data-ba-slider]").forEach((slider) => {
    const beforeLayer = slider.querySelector(".ba-before");
    const handle = slider.querySelector("[data-ba-handle]");
    let isDragging = false;

    function updatePosition(x) {
      const rect = slider.getBoundingClientRect();
      let percent = ((x - rect.left) / rect.width) * 100;
      percent = Math.max(5, Math.min(95, percent));
      beforeLayer.style.width = percent + "%";
      handle.style.left = percent + "%";
    }

    slider.addEventListener("mousedown", (e) => {
      isDragging = true;
      updatePosition(e.clientX);
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) updatePosition(e.clientX);
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });

    slider.addEventListener(
      "touchstart",
      (e) => {
        isDragging = true;
        updatePosition(e.touches[0].clientX);
      },
      { passive: true },
    );

    slider.addEventListener(
      "touchmove",
      (e) => {
        if (isDragging) updatePosition(e.touches[0].clientX);
      },
      { passive: true },
    );

    slider.addEventListener("touchend", () => {
      isDragging = false;
    });
  });

  // ─── Testimonial Carousel ───
  const reviews = [
    {
      quote:
        "I was looking for the best dental implants in Rewari and found Sohan Dental Clinic. Dr. Kapil is extremely professional and the procedure was smooth. Highly recommended!",
      author: "Rakesh Yadav",
      role: "Implant Patient",
    },
    {
      quote:
        "Got my teeth whitening done here and the results are amazing! The whole clinic is very clean and modern. Dr. Kapil Mehendiratta explains everything before any procedure.",
      author: "Priya Sharma",
      role: "Whitening Patient",
    },
    {
      quote:
        "My son's braces treatment at Sohan Dental has been wonderful. Dr. Kapil and his team are very patient with kids. Best orthodontist experience in Rewari!",
      author: "Sunil Verma",
      role: "Orthodontics Patient",
    },
  ];

  let currentReview = 0;
  const quoteEl = document.getElementById("reviewQuote");
  const authorEl = document.getElementById("reviewAuthor");
  const roleEl = document.getElementById("reviewRole");
  const counterEl = document.getElementById("reviewCounter");
  const prevBtn = document.getElementById("prevReview");
  const nextBtn = document.getElementById("nextReview");

  function showReview(index) {
    const review = reviews[index];
    const box = document.getElementById("reviewBox");
    box.style.opacity = "0";
    setTimeout(() => {
      quoteEl.textContent = `"${review.quote}"`;
      authorEl.textContent = review.author;
      roleEl.textContent = review.role;
      counterEl.textContent = `${index + 1} / ${reviews.length}`;
      box.style.opacity = "1";
    }, 250);
  }

  if (prevBtn && nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentReview = (currentReview + 1) % reviews.length;
      showReview(currentReview);
    });

    prevBtn.addEventListener("click", () => {
      currentReview = (currentReview - 1 + reviews.length) % reviews.length;
      showReview(currentReview);
    });
  }

  // ─── Form Submission ───
  const form = document.getElementById("appointmentForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'Sending... <i class="ph ph-spinner"></i>';
      submitBtn.style.opacity = "0.8";
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML =
          'Appointment Requested! <i class="ph-fill ph-check-circle"></i>';
        submitBtn.style.backgroundColor = "#2ecc71";
        form.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = "";
          submitBtn.style.opacity = "1";
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ─── FAQ Accordion ───
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      document.querySelectorAll(".faq-question").forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        b.closest(".faq-item")
          .querySelector(".faq-answer")
          .classList.remove("open");
      });

      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        answer.classList.add("open");
      }
    });
  });
});
