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
    // GSAP Greeting Animation - Cycle through HI → Bonjour → 你好 with stroke draw effect
    const initGreetingAnimation = () => {
      const greetingEn = document.getElementById('greeting-en');
      const greetingFr = document.getElementById('greeting-fr');
      const greetingZh = document.getElementById('greeting-zh');
      const signatureSvg = document.querySelector('.signature-svg');
      const intro = document.querySelector('.intro');

      if (!greetingEn || !greetingFr || !greetingZh) return;

      // Check for reduced motion preference
      const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (motionMq.matches) {
        greetingEn.style.opacity = '1';
        if (signatureSvg) signatureSvg.style.opacity = '1';
        if (intro) intro.style.opacity = '1';
        document.querySelectorAll('section').forEach(s => s.style.opacity = '1');
        return;
      }

      // Helper function to set up strokes for animation
      const setupStrokes = (svgElement) => {
        const strokes = svgElement.querySelectorAll('line, path, ellipse, circle');
        strokes.forEach(stroke => {
          if (stroke.tagName === 'circle' || stroke.classList.contains('cls-3')) return; // Skip filled elements
          const length = stroke.getTotalLength ? stroke.getTotalLength() : 100;
          stroke.style.strokeDasharray = length;
          stroke.style.strokeDashoffset = length;
        });
      };

      // Helper function to animate strokes (draw or erase)
      const animateStrokes = (svgElement, reverse = false) => {
        const tl = gsap.timeline();
        const strokes = svgElement.querySelectorAll('line, path, ellipse');

        strokes.forEach((stroke, i) => {
          const length = stroke.getTotalLength ? stroke.getTotalLength() : 100;

          if (reverse) {
            // Erase: from 0 to full length
            tl.to(stroke, {
              strokeDashoffset: length,
              duration: 0.4,
              ease: "power2.in"
            }, i * 0.05);
          } else {
            // Draw: from full length to 0
            tl.to(stroke, {
              strokeDashoffset: 0,
              duration: 0.5,
              ease: "power2.out"
            }, i * 0.08);
          }
        });

        return tl;
      };

      // Set up all greeting strokes initially
      setupStrokes(greetingEn);
      setupStrokes(greetingFr);
      setupStrokes(greetingZh);

      // Set up signature strokes
      if (signatureSvg) {
        const sigStrokes = signatureSvg.querySelectorAll('.cls-1');
        sigStrokes.forEach(stroke => {
          const length = stroke.getTotalLength ? stroke.getTotalLength() : 500;
          stroke.style.strokeDasharray = length;
          stroke.style.strokeDashoffset = length;
        });
      }

      // Master timeline for looping animation
      const masterTl = gsap.timeline({ repeat: -1 });

      // Show English and draw it
      masterTl.set(greetingEn, { opacity: 1 });
      masterTl.set([greetingFr, greetingZh], { opacity: 0 });
      masterTl.add(animateStrokes(greetingEn, false));

      // Hold for 2.5 seconds
      masterTl.to({}, { duration: 2.5 });

      // Erase English
      masterTl.add(animateStrokes(greetingEn, true));

      // Transition to French
      masterTl.set(greetingEn, { opacity: 0 });
      masterTl.set(greetingFr, { opacity: 1 });
      setupStrokes(greetingFr); // Reset strokes
      masterTl.add(animateStrokes(greetingFr, false));

      // Hold for 2.5 seconds
      masterTl.to({}, { duration: 2.5 });

      // Erase French
      masterTl.add(animateStrokes(greetingFr, true));

      // Transition to Chinese
      masterTl.set(greetingFr, { opacity: 0 });
      masterTl.set(greetingZh, { opacity: 1 });
      setupStrokes(greetingZh); // Reset strokes
      masterTl.add(animateStrokes(greetingZh, false));

      // Hold for 2.5 seconds
      masterTl.to({}, { duration: 2.5 });

      // Erase Chinese
      masterTl.add(animateStrokes(greetingZh, true));

      // After first cycle, hide greeting and show signature
      masterTl.call(() => {
        // Fade out greeting
        gsap.to([greetingEn, greetingFr, greetingZh], {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            // Fade in signature
            if (signatureSvg) {
              gsap.to(signatureSvg, {
                opacity: 1,
                duration: 0.5,
                onStart: () => {
                  // Animate signature drawing
                  const sigStrokes = signatureSvg.querySelectorAll('.cls-1');
                  sigStrokes.forEach((stroke, i) => {
                    const length = stroke.getTotalLength ? stroke.getTotalLength() : 500;
                    gsap.to(stroke, {
                      strokeDashoffset: 0,
                      duration: 0.6,
                      ease: "power2.out"
                    }, i * 0.1);
                  });
                }
              });
            }

            // Fade in intro
            if (intro) {
              gsap.to(intro, {
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
                delay: 0.5
              });
            }

            // Fade in sections
            gsap.to('section', {
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
              delay: 1
            });
          }
        });
      });

      // Reset for loop - hide Chinese, show English
      masterTl.set(greetingZh, { opacity: 0 });
      masterTl.set(greetingEn, { opacity: 1 });
      setupStrokes(greetingEn); // Reset strokes for next loop
    };

    // Initialize greeting animation after GSAP is available
    if (typeof gsap !== 'undefined') {
      initGreetingAnimation();
    } else {
      window.addEventListener('load', initGreetingAnimation);
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
