// =============================================
//  APRENDA PROGRAMAÇÃO — JS GLOBAL
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Active nav link ----
  const links = document.querySelectorAll('nav a.nav-link');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  // ---- Mobile nav toggle ----
  const toggle = document.getElementById('nav-toggle');
  const navEl   = document.getElementById('main-nav');
  if (toggle && navEl) {
    toggle.addEventListener('click', () => navEl.classList.toggle('open'));
  }

  // ---- Code block copy button ----
  document.querySelectorAll('.code-block').forEach(block => {
    const btn = document.createElement('button');
    btn.textContent = 'Copiar';
    btn.style.cssText = `
      position:absolute; top:10px; right:10px;
      background:#30363d; color:#adb5bd;
      border:1px solid #444c56; border-radius:5px;
      padding:3px 10px; font-size:11px; cursor:pointer;
      font-family:-apple-system,sans-serif;
    `;
    btn.addEventListener('click', () => {
      const text = block.innerText.replace('Copiar', '').trim();
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = '✓ Copiado!';
        btn.style.color = '#56d364';
        setTimeout(() => { btn.textContent = 'Copiar'; btn.style.color = '#adb5bd'; }, 1800);
      });
    });
    block.style.position = 'relative';
    block.appendChild(btn);
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Scroll-in animation ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.section, .card, .home-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .4s ease, transform .4s ease';
    observer.observe(el);
  });

  // ---- Progress bar on scroll ----
  const bar = document.getElementById('scroll-bar');
  if (bar) {
    window.addEventListener('scroll', () => {
      const docH   = document.documentElement.scrollHeight - window.innerHeight;
      const pct    = (window.scrollY / docH) * 100;
      bar.style.width = pct + '%';
    });
  }

});
