---
name: testing-inventario-tools
description: Test the standalone inventory/logistics HTML tools in this repo end-to-end (CSV/XLSX upload, table generation, XSS-escape behavior). Use when verifying UI or data-rendering changes in any of the *.html tool pages.
---

# Testing the inventory tools

These tools are **static client-side HTML pages** (no backend). Each tool (e.g.
`CICLICO_PORTA_PORTA_SEM_BORDA2.html`, `CICLICO ALM51.html`, `PORTA-PORTA.html`,
`Batimento de estoque.html`, `iNDICADOR PERECIVEL.html`,
`ferramenta_de_inventario_travada.html`, `RECE1 REC2.html`) reads a spreadsheet
(CSV/XLSX) and renders tables. `index.html` and the login pages require **Firebase
auth** and are NOT testable without credentials.

## Run locally
```bash
cd <repo>
python3 -m http.server 8099
# open http://localhost:8099/<FILE>.html  (filenames may contain spaces/accents)
```
- Many tools load SheetJS/PapaParse from **cdnjs**. As of this writing the pinned
  `xlsx` cdnjs URL (`.../xlsx/0.20.2/xlsx.full.min.js`) returns **404** in some
  tools, so the `.xlsx` path may be broken — prefer uploading a **`.csv`** (PapaParse
  CDN works) to exercise the data path. If CSV also fails, check CDN reachability.
- File upload uses the native GTK "Open File" dialog. Put your test file in `~`
  (Home) so it shows at the dialog root; double-click it to select.

## Typical flow (CICLICO_PORTA_PORTA / CICLICO ALM51)
1. Click **Choose File**, pick the CSV (alert "Arquivo carregado! Linhas: N").
2. Click **Buscar** with the search box **empty** → returns all rows (the preview
   uses `textContent`, so it's always safe — not where bugs show).
3. Click **Cíclico QTD** (or **Imprimir/Embalagem** etc.) → this writes the print
   sheet via `innerHTML` (`tabelaHTML`/`tabelaEmbalagemHTML`), which is the path
   that actually exercises HTML-injection / escaping.

CSV columns expected by CICLICO_PORTA_PORTA: `Ubicacion,Pieza,Descripcion1,label,labelorigin,CantidadTotal`.

## Testing XSS-escape (escHtml) changes — adversarial
Put a malicious cell in a text column, e.g. Descripcion1:
```
<img src=x onerror="document.title='XSS_FIRED'"><b style="color:red;font-size:22px">INJECTED</b>
```
- **Broken/old behavior:** browser tab title changes to `XSS_FIRED` (onerror fired)
  and "INJECTED" renders as red/bold (HTML interpreted). Real `<img>`/`<b>` nodes
  appear in the generated sheet's DOM.
- **Fixed behavior:** the payload shows as **literal text**, tab title is unchanged,
  and the DOM contains escaped entities (`&lt;img ...&gt;`).
- Strong before/after: run the flow on `main` (before) vs the PR branch (after) with
  the SAME CSV; `git checkout` between runs and reload — `python -m http.server`
  serves files live from disk.
- Verify the **tab title** and read the DOM (computer tool `read_dom`) — the title
  flip is the clearest pass/fail signal that a broken impl would produce differently.

## Regression
Include one normal row (e.g. `PARAFUSO SEXTAVADO M8`) and confirm it renders
identically before/after — escaping must not alter legitimate data.

## Devin Secrets Needed
- None for the standalone tool pages.
- `index.html` / login pages need Firebase project credentials (not currently
  available) — mark those flows as untested unless creds are provided.
