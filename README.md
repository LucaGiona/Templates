# UI Templates

[🇬🇧 English see below](#english)

Eine wachsende Sammlung wiederverwendbarer UI-Komponenten.
Kein Framework, keine Dependencies — reines HTML, CSS und JavaScript.

---

## Templates

### Accordion + Drawer

| Variante | Beschreibung |
|---|---|
| [`Drawer_mitte`](./Drawer_mitte/) | Accordion mit Modal-Drawer (zentriert, schwebt) |
| [`Drawer_unten`](./Drawer_unten/) | Accordion mit Drawer (Slide-up von unten) |

**Enthaltene Dateien:**
- `accordion.css` + `accordion.js` — Horizontales Accordion, mobil vertikal
- `drawer.css` + `drawer.js` — Drawer/Modal Panel
- `demo.html` — Funktionierendes Beispiel

---

## Prinzipien

- **Keine Dependencies** — läuft ohne npm, ohne Framework
- **CSS-Variablen** — einfaches Theming per `:root` Overrides
- **Custom Events** — alle Komponenten feuern eigene Events zum Abhören
- **Responsive** — Mobile-first, funktioniert auf allen Screens

---

## Verwendung

Dateien in dein Projekt kopieren und per `<link>` / `<script>` einbinden:

```html
<link rel="stylesheet" href="accordion.css">
<link rel="stylesheet" href="drawer.css">

<!-- ... dein HTML ... -->

<script src="accordion.js"></script>
<script src="drawer.js"></script>
```

Theming per CSS-Variable:

```css
:root {
  --acc-accent: #eb4734;
  --acc-font-display: 'Playfair Display', serif;
}
```

---

## Lizenz

MIT — frei verwendbar, anpassbar, weitergabe erwünscht.

---
---

## English

<a name="english"></a>

# UI Templates

A growing collection of reusable UI components.
No framework, no dependencies — plain HTML, CSS and JavaScript.

---

## Templates

### Accordion + Drawer

| Variant | Description |
|---|---|
| [`Drawer_mitte`](./Drawer_mitte/) | Accordion with modal drawer (centered, floating) |
| [`Drawer_unten`](./Drawer_unten/) | Accordion with drawer (slide-up from bottom) |

**Included files:**
- `accordion.css` + `accordion.js` — Horizontal accordion, vertical on mobile
- `drawer.css` + `drawer.js` — Drawer/modal panel
- `demo.html` — Working example

---

## Principles

- **No dependencies** — runs without npm or any framework
- **CSS variables** — easy theming via `:root` overrides
- **Custom events** — all components dispatch events you can listen to
- **Responsive** — mobile-first, works on all screen sizes

---

## Usage

Copy the files into your project and include them via `<link>` / `<script>`:

```html
<link rel="stylesheet" href="accordion.css">
<link rel="stylesheet" href="drawer.css">

<!-- ... your HTML ... -->

<script src="accordion.js"></script>
<script src="drawer.js"></script>
```

Theming via CSS variables:

```css
:root {
  --acc-accent: #eb4734;
  --acc-font-display: 'Playfair Display', serif;
}
```

---

## License

MIT — free to use, adapt and share.
