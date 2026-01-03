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
    // Signature Animation - Fabio Ottaviani style
    const initSignatureAnimation = () => {
      const signatureSvg = document.getElementById('hero-signature');
      const intro = document.querySelector('.intro');

      if (!signatureSvg) return;

      // Check for reduced motion preference
      const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (motionMq.matches) {
        signatureSvg.style.opacity = '1';
        // Set all strokes to fully drawn
        const strokes = signatureSvg.querySelectorAll('.cls-1');
        strokes.forEach(stroke => {
          const length = stroke.getTotalLength ? stroke.getTotalLength() : 500;
          stroke.style.strokeDasharray = length;
          stroke.style.strokeDashoffset = 0;
        });
        if (intro) intro.style.opacity = '1';
        document.querySelectorAll('section').forEach(s => s.style.opacity = '1');
        return;
      }

      // Set up strokes for animation
      const strokes = signatureSvg.querySelectorAll('.cls-1');
      strokes.forEach(stroke => {
        const length = stroke.getTotalLength ? stroke.getTotalLength() : 500;
        stroke.style.strokeDasharray = length;
        stroke.style.strokeDashoffset = length;
      });

      // Animate signature drawing
      const tl = gsap.timeline();

      // Fade in signature and draw strokes simultaneously
      tl.to(signatureSvg, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out"
      });

      // Draw each stroke with slight stagger
      strokes.forEach((stroke, i) => {
        tl.to(stroke, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.out"
        }, i * 0.12);
      });

      // Fade in intro after signature is drawn
      if (intro) {
        tl.to(intro, {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out"
        }, "-=0.5");
      }

      // Fade in sections
      tl.to('section', {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1");
    };

    // Initialize signature animation after GSAP is available
    if (typeof gsap !== 'undefined') {
      initSignatureAnimation();
    } else {
      window.addEventListener('load', initSignatureAnimation);
    }

    // Link hover effects with mouse tracking
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      const overlay = link.querySelector('.overlay');

      if (overlay) {
        link.addEventListener('mouseenter', (e) => {
          const rect = link.getBoundingClientRect();
          const mouseY = e.clientY - rect.top;
          const originY = mouseY > rect.height / 2 ? 'top' : 'bottom';
          overlay.style.transformOrigin = originY;
        });
      }
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
  };
})();
