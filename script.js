// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
});

// ========== BURGER MENU ==========
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========== SCROLL TO TOP ==========
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== COUNTER ANIMATION ==========
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const counters = document.querySelectorAll('.stat-num');
let countersStarted = false;

// ========== INTERSECTION OBSERVER ==========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Start counters when hero stats are visible
      if (!countersStarted && entry.target.classList.contains('hero-stats')) {
        countersStarted = true;
        counters.forEach(animateCounter);
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .hero-stats').forEach(el => observer.observe(el));

// Add reveal class to elements
const revealTargets = [
  '.service-card',
  '.price-card',
  '.testi-card',
  '.about-text',
  '.contact-info',
  '.contact-form-wrap',
  '.feature-item',
  '.footer-col',
  '.footer-brand'
];
revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(el);
  });
});

// ========== PRICING TOGGLE ==========
const toggleSwitch = document.getElementById('toggleSwitch');
const toggleMonthly = document.getElementById('toggleMonthly');
const toggleYearly = document.getElementById('toggleYearly');
let isYearly = false;

toggleSwitch.addEventListener('click', () => {
  isYearly = !isYearly;
  toggleSwitch.classList.toggle('on', isYearly);
  toggleMonthly.classList.toggle('active', !isYearly);
  toggleYearly.classList.toggle('active', isYearly);

  document.querySelectorAll('.monthly-price').forEach(el => {
    el.style.display = isYearly ? 'none' : 'inline';
  });
  document.querySelectorAll('.yearly-price').forEach(el => {
    el.style.display = isYearly ? 'inline' : 'none';
  });
});

toggleMonthly.addEventListener('click', () => {
  if (isYearly) toggleSwitch.click();
});
toggleYearly.addEventListener('click', () => {
  if (!isYearly) toggleSwitch.click();
});

// ========== FORM VALIDATION ==========
const form = document.getElementById('contactForm');

function validate() {
  let valid = true;

  const name = document.getElementById('name');
  const nameErr = document.getElementById('nameErr');
  if (!name.value.trim() || name.value.trim().length < 2) {
    nameErr.textContent = 'Атыңызды жазыңыз';
    name.classList.add('invalid');
    valid = false;
  } else {
    nameErr.textContent = '';
    name.classList.remove('invalid');
  }

  const phone = document.getElementById('phone');
  const phoneErr = document.getElementById('phoneErr');
  const phoneVal = phone.value.replace(/\D/g, '');
  if (!phoneVal || phoneVal.length < 10) {
    phoneErr.textContent = 'Дұрыс телефон нөмірін жазыңыз';
    phone.classList.add('invalid');
    valid = false;
  } else {
    phoneErr.textContent = '';
    phone.classList.remove('invalid');
  }

  const email = document.getElementById('email');
  const emailErr = document.getElementById('emailErr');
  if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailErr.textContent = 'Email дұрыс емес';
    email.classList.add('invalid');
    valid = false;
  } else {
    emailErr.textContent = '';
    email.classList.remove('invalid');
  }

  const service = document.getElementById('service');
  const serviceErr = document.getElementById('serviceErr');
  if (!service.value) {
    serviceErr.textContent = 'Қызметті таңдаңыз';
    service.classList.add('invalid');
    valid = false;
  } else {
    serviceErr.textContent = '';
    service.classList.remove('invalid');
  }

  return valid;
}

// Phone mask
document.getElementById('phone').addEventListener('input', function() {
  let val = this.value.replace(/\D/g, '');
  if (val.startsWith('7') && val.length > 0) {
    val = val.substring(0, 11);
    let formatted = '+7';
    if (val.length > 1) formatted += ' (' + val.substring(1, 4);
    if (val.length >= 4) formatted += ') ' + val.substring(4, 7);
    if (val.length >= 7) formatted += '-' + val.substring(7, 9);
    if (val.length >= 9) formatted += '-' + val.substring(9, 11);
    this.value = formatted;
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const btn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');

  btn.disabled = true;
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';

  // Simulate API call
  await new Promise(r => setTimeout(r, 1600));

  // Show success
  form.querySelector('h3').style.display = 'none';
  form.querySelectorAll('.form-group, .form-row, .btn-submit').forEach(el => el.style.display = 'none');
  document.getElementById('formSuccess').classList.add('show');
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active-nav'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active-nav');
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// Active nav style
const navStyle = document.createElement('style');
navStyle.textContent = `.nav-links a.active-nav { color: #f0f0f8 !important; }`;
document.head.appendChild(navStyle);