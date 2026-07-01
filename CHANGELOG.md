# CHANGELOG

## [1.1.1] - 2026-06-23

### Refino Visual

- Alinhamento das páginas principais com os tokens reais do design system.
- Correção do `PORTA-PORTA.html` com fechamento de `head` duplicado.
- Normalização de `Batimento de estoque.html` com aliases locais para tokens legados de espaçamento e cinza.
- Redução de cores fixas em `index.html` e `ferramenta_de_inventario_travada.html`.

## [1.1.0] - 2026-06-23

### 🎨 Design System Refactoring

**Summary:** Comprehensive normalization of styles across all dashboard pages to use the centralized `css/design-system.css` design system. Introduced runtime CSS normalization to map legacy colors to design-system variables.

### ✨ Added

- **`js/normalize-styles.js`** — New utility script that:
  - Runs at page load to normalize inline hex colors to design-system CSS variables
  - Maps common colors (`#e9f6ff`, `#d1dae3`, `#c8d2dd`, `#d8e1ea`, `#eef3f8`, `#cfd6de`, `#222`, `#666`) to design-system tokens
  - Adds `btn` class automatically to unstyled buttons
  - Preserves existing button classes (`primary`, `alt`) by promoting them to design-system helpers

### 🔄 Changed

**All 13 dashboard pages updated:**
- ✅ `index.html`
- ✅ `login.html`
- ✅ `Batimento de estoque.html`
- ✅ `PORTA-PORTA.html`
- ✅ `Dashboard de produção.html`
- ✅ `Contencão atualizada.html`
- ✅ `BACKLOG.html`
- ✅ `Indicador_SALA_COFRE_atualizado.html`
- ✅ `CICLICO ALM51.html`
- ✅ `CICLICO_PORTA_PORTA_SEM_BORDA2.html`
- ✅ `DEVOLUÇÃO V3.html`
- ✅ `RECE1 REC2.html`
- ✅ `login-novo.html`

**Structural changes:**
- Moved `css/design-system.css` link from `<body>` to `<head>` in all pages
- Added `<script src="js/normalize-styles.js" defer></script>` to all 13 pages after design-system CSS
- Removed duplicate stylesheet links from page bodies
- Added CSS `:root` aliases mapping legacy variables to design-system variables:
  - `--azul` → `var(--color-primary)`
  - `--azul-escuro` → `var(--color-primary-dark)`
  - `--borda` → `var(--color-border)`
  - `--bg` → `var(--color-bg)`
  - `--verde` → `var(--color-success)`
  - `--vermelho` → `var(--color-danger)`
  - And many more...

### 🐛 Fixed

- Duplicate stylesheet loading in page bodies (e.g., link appearing twice in same page)
- CSS variables inconsistency across different dashboards
- Inline hex colors not aligned with design-system color palette
- Buttons without standardized CSS classes now automatically receive `.btn` class

### 📊 Commit Information

**Commit:** `cc6ee9c`  
**Message:** "Refactor: Apply design-system normalization and consolidate styles"  
**Files Changed:** 17  
**Insertions:** 916  
**Deletions:** 302

---

## Recommendations for Next Release

1. **Accessibility Audit** — Run Axe DevTools and WCAG 2.1 checklist on all dashboard pages
2. **Visual Validation** — Test design on Chrome, Firefox, Safari, and mobile browsers
3. **Performance Check** — Verify CSS loading doesn't impact page load times
4. **Animation Testing** — Ensure all transitions and animations work smoothly with design-system classes
5. **Dark Mode Support** — Test pages in dark browser theme if design-system includes dark mode variables

---

## Related Documentation

- 📖 [ANALISE_COMPLETA.md](./ANALISE_COMPLETA.md) — Original analysis with design-system recommendations
- 🛠️ [GUIA_IMPLEMENTACAO.md](./GUIA_IMPLEMENTACAO.md) — Implementation guide
- 🎨 [css/design-system.css](./css/design-system.css) — Design system variables and components
- 🔧 [js/utils.js](./js/utils.js) — Shared utilities (HeaderClock, validators, storage, etc.)
- 🔧 [js/normalize-styles.js](./js/normalize-styles.js) — Runtime CSS normalizer
