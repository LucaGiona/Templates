// ── Burger Menu · Variante 2: Top Bar Dropdown ──

const burgerBtn = document.getElementById('burger-btn');
const burgerNav = document.getElementById('burger-nav');

function openMenu() {
  burgerNav.classList.add('open');
  burgerBtn.classList.add('open');
  burgerBtn.setAttribute('aria-label', 'Menü schließen');
}

function closeMenu() {
  burgerNav.classList.remove('open');
  burgerBtn.classList.remove('open');
  burgerBtn.setAttribute('aria-label', 'Menü öffnen');
}

burgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  burgerNav.classList.contains('open') ? closeMenu() : openMenu();
});

// Klick außerhalb schließt das Menü
document.addEventListener('click', (e) => {
  if (!burgerNav.contains(e.target) && !burgerBtn.contains(e.target)) {
    closeMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// ── Aktive Seite markieren ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.burger-nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});
