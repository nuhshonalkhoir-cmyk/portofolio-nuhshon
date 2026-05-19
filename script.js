/* ============================================================
   PORTFOLIO SMK TKJ — AURORA UI + ELDOURA UI
   File   : script.js
   Author : Muhammad Rizky
   ============================================================ */

/* ─── 1. SCROLL ANIMATION (Fade-Up Observer) ─── */
const fadeEls = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Staggered delay untuk efek berurutan
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));


/* ─── 2. SKILL BAR ANIMATION ─── */
const skillBars = document.querySelectorAll('.skill-bar');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.style.width; // simpan lebar target

      // Reset ke 0, lalu animasikan ke target
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 200);

      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => barObserver.observe(bar));


/* ─── 3. NAVBAR SCROLL EFFECT ─── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(5,8,16,0.85)';
    nav.style.boxShadow = '0 1px 20px rgba(0,0,0,0.4)';
  } else {
    nav.style.background = 'rgba(5,8,16,0.6)';
    nav.style.boxShadow = 'none';
  }
});


/* ─── 4. ACTIVE NAV LINK (Highlight section aktif) ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active-nav');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));


/* ─── 5. TOAST NOTIFICATION ─── */
/**
 * Tampilkan toast notification
 * @param {string} message - Pesan yang ditampilkan
 * @param {string} icon    - Emoji/icon (opsional, default ✅)
 */
function showToast(message, icon = '✅') {
  const toast = document.getElementById('toast');
  const toastIcon = toast.querySelector('span:first-child');
  const toastText = toast.querySelector('span:last-child');

  toastIcon.textContent = icon;
  toastText.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}


/* ─── 6. CONTACT FORM — VALIDASI & KIRIM ─── */
function sendMessage() {
  const nameInput    = document.querySelector('.el-input[data-field="name"]');
  const emailInput   = document.querySelector('.el-input[data-field="email"]');
  const subjectInput = document.querySelector('.el-input[data-field="subject"]');
  const msgTextarea  = document.querySelector('.el-textarea[data-field="message"]');

  const fields = [nameInput, emailInput, subjectInput, msgTextarea];
  let isValid = true;

  // Reset border
  fields.forEach(field => {
    if (field) field.style.borderColor = '';
  });

  // Validasi kosong
  fields.forEach(field => {
    if (field && !field.value.trim()) {
      isValid = false;
      field.style.borderColor = 'rgba(236,72,153,0.5)';
      setTimeout(() => {
        if (field) field.style.borderColor = '';
      }, 2000);
    }
  });

  // Validasi format email
  if (emailInput && emailInput.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      isValid = false;
      emailInput.style.borderColor = 'rgba(236,72,153,0.5)';
      setTimeout(() => {
        if (emailInput) emailInput.style.borderColor = '';
      }, 2000);
    }
  }

  if (!isValid) {
    showToast('Harap isi semua field dengan benar!', '⚠️');
    return;
  }

  // Simulasi pengiriman (loading state)
  const btn = document.querySelector('.send-btn');
  if (btn) {
    btn.textContent = '⏳ Mengirim...';
    btn.disabled = true;
  }

  setTimeout(() => {
    // Reset form
    fields.forEach(field => {
      if (field) field.value = '';
    });

    // Reset button
    if (btn) {
      btn.textContent = '🚀 Kirim Pesan';
      btn.disabled = false;
    }

    showToast('Pesan berhasil terkirim! 🎉');
  }, 1200);
}


/* ─── 7. SMOOTH SCROLL untuk nav links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('nav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ─── 8. PROJECT CARD — Hover ripple effect ─── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.zIndex = '2';
  });
  card.addEventListener('mouseleave', function () {
    this.style.zIndex = '';
  });
});


/* ─── 9. TYPING EFFECT pada hero subtitle ─── */
const heroSub = document.querySelector('.hero-sub');
if (heroSub) {
  const originalText = heroSub.textContent;
  heroSub.textContent = '';
  heroSub.style.opacity = '1';

  let charIndex = 0;
  const typeSpeed = 30; // ms per karakter

  function typeChar() {
    if (charIndex < originalText.length) {
      heroSub.textContent += originalText[charIndex];
      charIndex++;
      setTimeout(typeChar, typeSpeed);
    }
  }

  // Mulai setelah animasi awal selesai (0.8s delay + 0.3s animasi = ~1.2s)
  setTimeout(typeChar, 1200);
}