/* ============================================
   script.js — Portofolio Nuhshon | SMK TKJ
   Aurora UI × Eldoura Design System
   ============================================ */

/* ─────────────────────────────────────────────
   1. SKILL BAR ANIMATION (IntersectionObserver)
   Animasi progress bar muncul saat di-scroll
   ───────────────────────────────────────────── */
const bars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.3 });

bars.forEach(bar => skillObserver.observe(bar));


/* ─────────────────────────────────────────────
   2. NAV SCROLL EFFECT
   Background navbar berubah saat di-scroll
   ───────────────────────────────────────────── */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(4,5,15,0.92)';
  } else {
    nav.style.background = 'rgba(4,5,15,0.7)';
  }
});


/* ─────────────────────────────────────────────
   3. CURSOR GLOW EFFECT
   Efek cahaya mengikuti kursor mouse
   ───────────────────────────────────────────── */
const cursor = document.createElement('div');

cursor.style.cssText = `
  position: fixed;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(123,47,247,0.07), transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.8s ease, top 0.8s ease;
`;

document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});


/* ─────────────────────────────────────────────
   4. ACTIVE NAV LINK HIGHLIGHT
   Tandai link nav yang aktif saat scroll section
   ───────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + id) {
          link.style.color = 'var(--text-primary)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));


/* ─────────────────────────────────────────────
   5. FADE IN CARDS ON SCROLL
   Animasi masuk untuk skill card & project card
   ───────────────────────────────────────────── */
const animCards = document.querySelectorAll(
  '.skill-card, .project-card, .cert-item, .info-item'
);

animCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animCards.forEach(card => cardObserver.observe(card));
