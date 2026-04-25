/* ═══════════════════════════════════════
   TIB BOLIVIA 2026  |  script.js
═══════════════════════════════════════ */

/* ── NAVBAR SCROLL ────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── HAMBURGER MENU ───────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── COUNTDOWN ────────────────────────── */
const EVENT_DATE = new Date('2026-10-22T09:00:00-04:00');

function padZ(n, digits = 2) {
  return String(n).padStart(digits, '0');
}

function updateCountdown() {
  const now  = new Date();
  const diff = EVENT_DATE - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent  = '000';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-min').textContent   = '00';
    document.getElementById('cd-sec').textContent   = '00';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);

  document.getElementById('cd-days').textContent  = padZ(days, 3);
  document.getElementById('cd-hours').textContent = padZ(hours);
  document.getElementById('cd-min').textContent   = padZ(mins);
  document.getElementById('cd-sec').textContent   = padZ(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ── SCROLL REVEAL ────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('visible'), delay);
        revealObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
  revealObserver.observe(el);
});

/* Stagger cards in grids */
document.querySelectorAll(
  '.benefit-card, .org-card, .part-item, .media-card'
).forEach((el, i) => {
  el.dataset.delay = (i % 6) * 80;
});

/* ── VISITOR TABS ─────────────────────── */
document.querySelectorAll('.vtab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    document.querySelectorAll('.vtab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.vtab-content').forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    const content = document.getElementById('tab-' + target);
    if (content) content.classList.add('active');
  });
});

/* ── FORM SUBMISSIONS ─────────────────── */
function handleForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    const original = btn.textContent;

    btn.textContent = 'Enviando...';
    btn.disabled = true;
    btn.style.opacity = '.7';

    setTimeout(() => {
      btn.textContent = '✓ Enviado con éxito';
      btn.style.background = 'var(--c5)';
      btn.style.color = '#050918';

      setTimeout(() => {
        form.reset();
        btn.textContent = original;
        btn.disabled = false;
        btn.style.opacity = '';
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    }, 1200);
  });
}

handleForm('participateForm');
handleForm('visitorForm');
handleForm('prensaForm');
handleForm('contactForm');

/* ── SMOOTH ANCHOR SCROLL ─────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 72;

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});

/* ── ACTIVE NAV LINK ──────────────────── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + id
            ? '#fff'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => activeObserver.observe(s));

/* ── HERO INITIAL REVEAL ──────────────── */
document.querySelectorAll('.hero .reveal').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.12) + 's';
  requestAnimationFrame(() => el.classList.add('visible'));
});
