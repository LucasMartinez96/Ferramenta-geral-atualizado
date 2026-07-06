import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// O módulo inicializa utilitários no navegador; o mock evita dependência de DOM no Node.js.
globalThis.document = {
  readyState: 'loading',
  addEventListener: () => {}
};

const source = await readFile(new URL('../js/utils.js', import.meta.url), 'utf8');
const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const { validators } = await import(moduleUrl);

assert.equal(validators.date('31/12/2025'), true, 'aceita data brasileira válida');
assert.equal(validators.date('2025-12-31'), true, 'aceita data ISO válida');
assert.equal(validators.date('31/02/2025'), false, 'rejeita data brasileira impossível');
assert.equal(validators.date(''), false, 'rejeita string vazia');
assert.equal(validators.date('2025-02-31'), false, 'rejeita data ISO impossível');
