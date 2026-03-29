/* ═══════════════════════════════════════════
   DRAWER.JS — Standalone UI Component
   Slide-up Drawer · Touch-Swipe zum Schließen
   ═══════════════════════════════════════════

   VERDRAHTUNG:
   Beliebiges Element mit data-drawer="ID"
   öffnet .drawer#ID beim Klick.

   EVENTS (optional abhören):
   document.addEventListener('drawer:open',  e => e.detail.drawer)
   document.addEventListener('drawer:close', e => e.detail.drawer)
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  function initDrawer() {
    const backdrop = document.getElementById('drawer-backdrop');
    if (!backdrop) return;

    // ── Öffnen ──
    function openDrawer(drawerId) {
      const drawer = document.getElementById(drawerId);
      if (!drawer) return;

      // Alle anderen schließen
      document.querySelectorAll('.drawer.open').forEach(d => {
        if (d !== drawer) closeDrawer(d);
      });

      drawer.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';

      document.dispatchEvent(new CustomEvent('drawer:open', { detail: { drawer } }));
    }

    // ── Schließen ──
    function closeDrawer(drawer) {
      if (!drawer) return;
      drawer.classList.remove('open');

      const anyOpen = document.querySelector('.drawer.open');
      if (!anyOpen) {
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
      }

      document.dispatchEvent(new CustomEvent('drawer:close', { detail: { drawer } }));
    }

    function closeAll() {
      document.querySelectorAll('.drawer.open').forEach(d => closeDrawer(d));
    }

    // ── Trigger: data-drawer="ID" ──
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-drawer]');
      if (!trigger) return;
      const id = trigger.getAttribute('data-drawer');
      if (!id) return;
      e.stopPropagation();
      openDrawer(id);
    });

    // ── Close-Button innerhalb Drawer ──
    document.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('.drawer-close');
      if (!closeBtn) return;
      closeDrawer(closeBtn.closest('.drawer'));
    });

    // ── Backdrop ──
    backdrop.addEventListener('click', closeAll);

    // ── Escape ──
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll();
    });

    // ── Touch Swipe nach unten → schließen ──
    document.querySelectorAll('.drawer').forEach(drawer => {
      let startY = 0;
      let startScrollTop = 0;

      drawer.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        startScrollTop = drawer.scrollTop;
      }, { passive: true });

      drawer.addEventListener('touchend', (e) => {
        const deltaY = e.changedTouches[0].clientY - startY;
        // Nur schließen wenn: nach unten gewischt UND Drawer war ganz oben gescrollt
        if (deltaY > 60 && startScrollTop <= 0) {
          closeDrawer(drawer);
        }
      }, { passive: true });
    });
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDrawer);
  } else {
    initDrawer();
  }

  window.DrawerInit = initDrawer;
})();
