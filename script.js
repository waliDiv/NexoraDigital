/* =========================================================
   NexoraDigital — script.js
   Vanilla JS: cursor, scroll reveal, counters, slider,
   accordion, tilt cards, particles, nav, forms
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide'), 600);
  });

  /* ---------- Custom cursor ---------- */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  if (window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    document.querySelectorAll('a, button, .tilt, .acc-head').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('active'));
      el.addEventListener('mouseleave', () => ring.classList.remove('active'));
    });
  }

  /* ---------- Scroll progress bar ---------- */
  const scrollBar = document.getElementById('scrollBar');
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    scrollBar.style.width = scrolled + '%';

    if (h.scrollTop > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    if (h.scrollTop > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  };
  document.addEventListener('scroll', onScroll);
  onScroll();

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Mobile nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }));

  /* ---------- Scroll reveal (AOS-style) ---------- */
  const revealEls = document.querySelectorAll('[data-aos]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => entry.target.classList.add('aos-show'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        let current = 0;
        const duration = 1600;
        const stepTime = Math.max(Math.floor(duration / target), 16);
        const step = () => {
          current += Math.ceil(target / (duration / stepTime));
          if (current >= target) { el.textContent = target; }
          else { el.textContent = current; requestAnimationFrame ? setTimeout(step, stepTime) : null; }
        };
        step();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Floating particles in hero ---------- */
  const particlesWrap = document.getElementById('particles');
  if (particlesWrap) {
    const count = window.innerWidth < 768 ? 16 : 30;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.bottom = '-10px';
      p.style.animationDuration = (8 + Math.random() * 10) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.opacity = (0.3 + Math.random() * 0.5).toString();
      particlesWrap.appendChild(p);
    }
  }

  /* ---------- Mouse parallax on hero visual ---------- */
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.matchMedia('(hover: hover)').matches) {
    document.querySelector('.hero').addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ---------- Card tilt effect ---------- */
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -12;
      const rotateY = ((x / rect.width) - 0.5) * 12;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  /* ---------- Button ripple effect ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* ---------- Testimonials slider ---------- */
  const track = document.getElementById('tTrack');
  const dotsWrap = document.getElementById('tDots');
  if (track) {
    const slides = track.children;
    let index = 0;

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }

    function goTo(i) {
      index = i;
      track.style.transform = `translateX(-${index * 100}%)`;
      [...dotsWrap.children].forEach((d, di) => d.classList.toggle('active', di === index));
    }

    let autoSlide = setInterval(() => {
      index = (index + 1) % slides.length;
      goTo(index);
    }, 5000);

    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => { index = (index + 1) % slides.length; goTo(index); }, 5000);
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.acc-item').forEach(item => {
    const head = item.querySelector('.acc-head');
    head.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  /* ---------- Contact form (demo submit) ---------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.textContent = 'Sending your message...';
      setTimeout(() => {
        formStatus.textContent = "Thanks! We'll get back to you within one business day.";
        form.reset();
      }, 900);
    });
  }

  /* ---------- Newsletter form (demo submit) ---------- */
  const newsForm = document.getElementById('newsForm');
  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsForm.querySelector('input');
      input.value = '';
      input.placeholder = 'Subscribed ✓';
      setTimeout(() => { input.placeholder = 'Your email'; }, 2500);
    });
  }

});
