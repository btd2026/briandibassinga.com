// Fabio Ottaviani Inspired Portfolio - JavaScript

(() => {
  const ready = (fn) => {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    }
  };

  ready(() => {
    // GSAP Greeting Animation - Cycle through Hello, Bonjour, 你好
    const initGreetingAnimation = () => {
      const greetingEn = document.getElementById('greeting-en');
      const greetingFr = document.getElementById('greeting-fr');
      const greetingZh = document.getElementById('greeting-zh');

      if (!greetingEn || !greetingFr || !greetingZh) return;

      // Check for reduced motion preference
      const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (motionMq.matches) {
        // For users who prefer reduced motion, just show English
        greetingEn.style.opacity = '1';
        return;
      }

      // GSAP timeline for cycling greetings
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      // Start with Hello (English) - fade in with scale
      tl.fromTo(greetingEn,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
      );

      // Hold English, then transition to French
      tl.to(greetingEn,
        { opacity: 0, scale: 1.1, duration: 0.5, ease: "power2.in" },
        "+=2.5"
      );

      // Fade in Bonjour
      tl.fromTo(greetingFr,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3"
      );

      // Hold French, then transition to Chinese
      tl.to(greetingFr,
        { opacity: 0, scale: 1.1, duration: 0.5, ease: "power2.in" },
        "+=2.5"
      );

      // Fade in 你好
      tl.fromTo(greetingZh,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3"
      );

      // Hold Chinese, then transition back to English
      tl.to(greetingZh,
        { opacity: 0, scale: 1.1, duration: 0.5, ease: "power2.in" },
        "+=2.5"
      );

      // Fade back to English (completes the loop)
      tl.fromTo(greetingEn,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3"
      );
    };

    // Initialize greeting animation after GSAP is available
    if (typeof gsap !== 'undefined') {
      initGreetingAnimation();
    } else {
      // Fallback if GSAP takes a moment to load
      window.addEventListener('load', initGreetingAnimation);
    }

    // Link hover effects with mouse tracking
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      const overlay = link.querySelector('.overlay');
      const linkText = link.querySelector('.link');

      if (overlay) {
        link.addEventListener('mouseenter', (e) => {
          const rect = link.getBoundingClientRect();
          const mouseY = e.clientY - rect.top;

          // Set transform origin based on mouse position
          const originY = mouseY > rect.height / 2 ? 'top' : 'bottom';
          overlay.style.transformOrigin = originY;
        });
      }
    });

    // Scroll-triggered animations for sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          sectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

    // Typing indicator (kept from original for Discord project)
    const typingEl = document.querySelector("[data-typing]");
    if (typingEl) {
      const snippets = [
        "Discord voice → STT (Deepgram) → translation → inline bot",
        "Discord voice → captions overlay → real-time chat",
        "Discord voice → Deepgram → translation → publish"
      ];
      let idx = 0;
      const render = () => {
        typingEl.textContent = snippets[idx];
        idx = (idx + 1) % snippets.length;
      };
      render();
      setInterval(render, 2600);
    }

    // Discord accordion (kept for project pages)
    const accordion = document.querySelector("[data-discord-accordion]");
    if (accordion) {
      const items = Array.from(accordion.querySelectorAll(".timeline-item"));
      const closeAll = () => items.forEach((item) => item.classList.remove("is-open"));
      items.forEach((item) => {
        const trigger = item.querySelector(".timeline-trigger");
        trigger.addEventListener("click", () => {
          const isOpen = item.classList.contains("is-open");
          closeAll();
          if (!isOpen) item.classList.add("is-open");
        });
      });

      const accordionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            }
          });
        },
        { threshold: 0.25 }
      );
      items.forEach((item) => accordionObserver.observe(item));
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  });
})();
