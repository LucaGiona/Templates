/* ═══════════════════════════════════════════
   ACCORDION.JS — Standalone UI Component
   Keine Dependencies · Wiederverwendbar
   ═══════════════════════════════════════════

   EVENTS (optional abhören):
   document.addEventListener('acc:open',  e => console.log(e.detail.item))
   document.addEventListener('acc:close', e => console.log(e.detail.item))
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  function initAccordion(containerSelector = '.accordion') {
    const containers = document.querySelectorAll(containerSelector);

    containers.forEach(accordion => {
      const items = accordion.querySelectorAll('.acc-item');

      function openItem(item) {
        // Alle schließen
        items.forEach(i => {
          if (i !== item) closeItem(i);
        });

        item.classList.add('open');

        // Custom Event feuern
        document.dispatchEvent(new CustomEvent('acc:open', { detail: { item } }));
      }

      function closeItem(item) {
        item.classList.remove('open');
        document.dispatchEvent(new CustomEvent('acc:close', { detail: { item } }));
      }

      items.forEach(item => {
        // Klick auf Item → öffnen
        item.addEventListener('click', (e) => {
          // Schließen-Button abfangen
          if (e.target.closest('.acc-close')) return;
          // Button abfangen (öffnet Drawer o.ä. — hier erweiterbar)
          if (e.target.closest('.acc-btn')) return;

          if (!item.classList.contains('open')) {
            openItem(item);
          }
        });

        // Schließen-Button
        const closeBtn = item.querySelector('.acc-close');
        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeItem(item);
          });
        }
      });

      // Escape → alle schließen
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          items.forEach(i => closeItem(i));
        }
      });

      // ── Optional: erstes Item beim Laden öffnen ──
      // openItem(items[0]);
    });
  }

  // Auto-init wenn DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAccordion());
  } else {
    initAccordion();
  }

  // Für manuelle Initialisierung exportieren (z.B. nach dynamischem Laden)
  window.AccordionInit = initAccordion;
})();
