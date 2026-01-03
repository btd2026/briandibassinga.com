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
    // SVG Stroke Animation - Calculate path lengths and animate
    const animateSvg = () => {
      const svgGroup = document.getElementById('animate');
      if (!svgGroup) return;

      const paths = svgGroup.querySelectorAll('path, line');
      paths.forEach((path, index) => {
        const length = path.getTotalLength ? path.getTotalLength() : 100;
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.animation = `drawStroke 1.5s ease-out ${index * 0.1}s forwards`;
      });
    };

    // Add the keyframes dynamically for SVG
    const style = document.createElement('style');
    style.textContent = `
      @keyframes drawStroke {
        to {
          stroke-dashoffset: 0;
        }
      }
    `;
    document.head.appendChild(style);

    // Check for reduced motion preference
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!motionMq.matches) {
      animateSvg();
    } else {
      // For users who prefer reduced motion, show immediately
      const svgGroup = document.getElementById('animate');
      if (svgGroup) {
        const paths = svgGroup.querySelectorAll('path, line');
        paths.forEach(path => {
          path.style.strokeDashoffset = 0;
        });
      }
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
