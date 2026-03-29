// ── Burger Menu · Variante 3: Fullscreen Overlay ──

const burgerBtn     = document.getElementById('burger-btn');
const burgerOverlay = document.getElementById('burger-overlay');

function openMenu() {
  burgerOverlay.classList.add('open');
  burgerBtn.classList.add('open');
  burgerBtn.setAttribute('aria-label', 'Menü schließen');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  burgerOverlay.classList.remove('open');
  burgerBtn.classList.remove('open');
  burgerBtn.setAttribute('aria-label', 'Menü öffnen');
  document.body.style.overflow = '';
}

burgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  burgerOverlay.classList.contains('open') ? closeMenu() : openMenu();
});

// Klick auf Overlay-Hintergrund (nicht auf Nav) schließt das Menü
burgerOverlay.addEventListener('click', (e) => {
  if (e.target === burgerOverlay) closeMenu();
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
