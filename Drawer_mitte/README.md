# Accordion Layout Component

Wiederverwendbarer Akkordeon-Baustein. Horizontal auf Desktop, vertikal auf Mobile.
Keine Dependencies, kein Framework.

## Dateien

```
accordion/
├── accordion.css   ← Styles + CSS-Variablen
├── accordion.js    ← Interaktion (Öffnen/Schließen)
├── demo.html       ← Funktionierendes Beispiel
└── README.md
```

## Schnellstart

```html
<link rel="stylesheet" href="accordion.css">

<div class="accordion">
  <div class="acc-item">
    <img class="acc-bg" src="bild.jpg" alt="">
    <div class="acc-accent-line"></div>
    <div class="acc-overlay"></div>
    <button class="acc-close">✕</button>
    <div class="acc-content">
      <div class="acc-label">Kategorie</div>
      <div class="acc-nummer">01</div>
      <h2 class="acc-titel">Titel</h2>
      <p class="acc-text">Beschreibung</p>
      <button class="acc-btn">Mehr</button>
    </div>
  </div>
  <!-- weitere .acc-item -->
</div>

<script src="accordion.js"></script>
```

## Theming via CSS-Variablen

```css
:root {
  --acc-accent:       #eb4734;   /* Akzentfarbe */
  --acc-bg:           #111;      /* Body-Hintergrund */
  --acc-item-bg:      #1a1a1a;
  --acc-overlay-to:   rgba(0,0,0,0.85);
  --acc-height:       520px;     /* Desktop-Höhe */
  --acc-collapsed:    72px;      /* Breite geschlossene Spalte */
  --acc-font-display: 'Playfair Display', serif;
  --acc-font-body:    'Cormorant Garamond', serif;
}
```

## Responsive Verhalten

| Breakpoint | Verhalten |
|---|---|
| ≥ 901px | Horizontal — Items expandieren nach rechts |
| 601–900px | Horizontal — kompaktere Höhe |
| ≤ 600px | Vertikal — Items expandieren nach unten |

## Events (optional)

```js
document.addEventListener('acc:open',  e => console.log('geöffnet:', e.detail.item));
document.addEventListener('acc:close', e => console.log('geschlossen:', e.detail.item));
```

## Bilder ersetzen

Im `demo.html` sind CSS-Gradient-Backgrounds als Placeholder. Einfach austauschen:

```html
<!-- Vorher (Placeholder): -->
<div class="acc-bg" style="background: linear-gradient(...)"></div>

<!-- Nachher (echtes Bild): -->
<img class="acc-bg" src="/assets/dein-bild.jpg" alt="Beschreibung">
```

## Beliebig viele Items

Funktioniert mit 2–6+ Items. CSS passt die Flex-Verhältnisse automatisch an.
