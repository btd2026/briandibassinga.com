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
    // Scroll to top on refresh/load
    window.scrollTo(0, 0);

    // ============================================
    // SIGNATURE ANIMATION - Fabio Ottaviani style
    // ============================================
    const initSignatureAnimation = () => {
      const signatureSvg = document.getElementById('hero-signature');
      const intro = document.querySelector('.intro');

      if (!signatureSvg) return;

      // Check for reduced motion preference
      const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (motionMq.matches) {
        signatureSvg.style.opacity = '1';
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
      if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline();

        tl.to(signatureSvg, {
          opacity: 1,
          duration: 0.1
        });

        strokes.forEach((stroke, i) => {
          tl.to(stroke, {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.out"
          }, i * 0.12);
        });

        if (intro) {
          tl.to(intro, {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out"
          }, "-=0.5");
        }

        // Simple fade in sections
        tl.to('section', {
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }, "-=0.5");
      } else {
        // Fallback without GSAP
        signatureSvg.style.opacity = '1';
        strokes.forEach((stroke, i) => {
          setTimeout(() => {
            stroke.style.transition = 'stroke-dashoffset 0.8s ease-out';
            stroke.style.strokeDashoffset = 0;
          }, i * 120);
        });
        if (intro) {
          setTimeout(() => {
            intro.style.opacity = '1';
          }, 800);
        }
        setTimeout(() => {
          document.querySelectorAll('section').forEach(s => s.style.opacity = '1');
        }, 1200);
      }
    };

    // Initialize signature animation after GSAP is available
    if (typeof gsap !== 'undefined') {
      initSignatureAnimation();
      // Wait for ScrollTrigger to be available
      if (gsap.ScrollTrigger) {
        initSplitTextAnimation();
      } else {
        // Load ScrollTrigger dynamically
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
        script.onload = () => {
          gsap.registerPlugin(ScrollTrigger);
          initSplitTextAnimation();
        };
        document.head.appendChild(script);
      }
    } else {
      window.addEventListener('load', () => {
        initSignatureAnimation();
        initSplitTextAnimation();
      });
    }

    // ============================================
    // SPLIT LETTER ANIMATION - Zendigital style
    // ScrollTrigger with random animation amplitude
    // ============================================
    function initSplitTextAnimation() {
      const headings = document.querySelectorAll('section h2');

      headings.forEach(heading => {
        const text = heading.textContent.trim();
        const words = text.split(' ');

        // Create the animated-text-section structure
        const container = document.createElement('div');
        container.className = 'animated-text-section';

        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';

        const wordList = document.createElement('ul');
        wordList.className = 'word-list';

        words.forEach((word, wordIndex) => {
          const li = document.createElement('li');
          li.className = 'word-item';

          const letters = word.split('');
          letters.forEach((letter, letterIndex) => {
            const span = document.createElement('span');
            span.className = 'letter';
            // Double-span technique for reveal effect
            span.innerHTML = `<span>${letter}</span><span>${letter}</span>`;
            li.appendChild(span);
          });

          wordList.appendChild(li);
        });

        textContainer.appendChild(wordList);
        container.appendChild(textContainer);

        // Replace original heading with animated version
        heading.parentNode.insertBefore(container, heading);
        heading.style.display = 'none';
      });

      // Animate letters on scroll - Zendigital style
      const animatedSections = document.querySelectorAll('.animated-text-section');

      animatedSections.forEach((section) => {
        const letters = section.querySelectorAll('.letter');
        let hasAnimated = false;

        // Set initial state - letters start from below
        gsap.set(letters, { y: '100%' });

        // Animation function for each section
        const animateText = () => {
          letters.forEach((letter, index) => {
            // Kill any existing tweens on this letter
            gsap.killTweensOf(letter);

            // Get current Y position to animate from (avoid snapping)
            const currentY = gsap.getProperty(letter, 'y');

            // Animate to random Y position first (scramble effect)
            // Start from current position if not at 100%, otherwise from below
            const startDelay = index * 0.05;
            const randomY = Math.random() * 100 + 20;

            if (currentY !== '100%' && currentY !== 100) {
              // Smoothly transition to random position from current
              gsap.to(letter, {
                y: `${randomY}%`,
                duration: 1.5,
                ease: 'power3.inOut',
                delay: startDelay
              });
            } else {
              // Full scramble animation from below
              gsap.fromTo(letter,
                { y: '100%' },
                {
                  y: `${randomY}%`,
                  duration: 2.5,
                  ease: 'power3.inOut',
                  delay: startDelay
                }
              );
            }

            // Then settle to 0 (readable position)
            gsap.to(letter, {
              y: '0%',
              duration: 1.5,
              ease: 'power3.out',
              delay: startDelay + (currentY === '100%' || currentY === 100 ? 2.5 : 1.5),
              onComplete: () => {
                // Subtle floating animation after settling
                gsap.to(letter, {
                  y: '-3%',
                  duration: 4,
                  ease: 'sine.inOut',
                  repeat: -1,
                  yoyo: true,
                  repeatDelay: 1
                });
              }
            });
          });
        };

        // ScrollTrigger for initial animation and scroll-based re-animation
        ScrollTrigger.create({
          trigger: section,
          start: 'top 85%',
          end: 'bottom 10%',
          onEnter: () => {
            // Kill floating animations
            letters.forEach(letter => gsap.killTweensOf(letter));
            // Only animate if not already animated (for sections below fold on load)
            if (!hasAnimated) {
              hasAnimated = true;
              animateText();
            } else {
              // If already animated, settle to readable state
              gsap.to(letters, {
                y: '0%',
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.02
              });
            }
          },
          onLeave: () => {
            // Smoothly return to readable state when leaving
            letters.forEach(letter => gsap.killTweensOf(letter));
            gsap.to(letters, {
              y: '0%',
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.02
            });
          },
          onEnterBack: () => {
            // Re-animate when scrolling back up
            letters.forEach(letter => gsap.killTweensOf(letter));
            animateText();
          },
          onLeaveBack: () => {
            // Smoothly return when leaving backwards
            letters.forEach(letter => gsap.killTweensOf(letter));
            gsap.to(letters, {
              y: '0%',
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.02
            });
          }
        });

        // Trigger animation for visible sections on page load
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          hasAnimated = true;
          // Small delay to ensure ScrollTrigger is ready
          setTimeout(() => animateText(), 100);
        }
      });
    }

    // ============================================
    // LINK HOVER EFFECTS - Fabio style
    // ============================================
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

    // ============================================
    // TYPOING INDICATOR (for Discord project pages)
    // ============================================
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

    // ============================================
    // DISCORD ACCORDION (for project pages)
    // ============================================
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

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
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
