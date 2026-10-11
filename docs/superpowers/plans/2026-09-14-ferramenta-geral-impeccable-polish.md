# Ferramenta Geral — Impeccable Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unificar visualmente a Ferramenta Geral sem alterar lógica operacional, cálculos, importações, persistência, autenticação ou regras de negócio.

**Architecture:** O trabalho parte do design system e do shell já existentes, expandindo a camada compartilhada de tokens e normalização visual antes de aplicar refinamentos locais nos módulos. As páginas continuam independentes dentro do iframe; a unificação acontece por CSS compartilhado e por ajustes pontuais de markup/classes, evitando reestruturações funcionais.

**Tech Stack:** HTML5, CSS3, JavaScript vanilla, Firebase Web SDK existente, Chart.js/XLSX existentes, GitHub Pages/hosting atual.

**Spec:** `docs/superpowers/specs/2026-09-14-ferramenta-geral-impeccable-polish-design.md`

## Global Constraints

- Não alterar `CICLICO_PORTA_PORTA_SEM_BORDA2.html`.
- Não alterar `CICLICO ALM51.html`.
- Não alterar regras de negócio, cálculos, parser de arquivos, filtros, persistência, Firebase, Firestore, autenticação ou permissões.
- Não adicionar dependências externas de UI.
- Preservar nomes de campos e textos que expressem lógica operacional.
- Manter compatibilidade com desktop, tablet e celular.
- Priorizar consistência, legibilidade, escaneabilidade e estados de interação.
- Cada tarefa deve ser validada contra o comportamento anterior antes do commit.

---

### Task 1: Consolidar tokens e camada compartilhada

**Files:**
- Modify: `css/design-system.css`
- Modify: `css/tool-standard.css`

**Interfaces:**
- Consumes: tokens e aliases legados já usados pelas páginas.
- Produces: tokens visuais compartilhados e classes de normalização usadas pelos módulos polidos.

- [ ] **Step 1: Registrar baseline antes da edição**

Capturar por leitura estática os tokens atuais de cor, radius, sombra, tipografia, foco e breakpoints. Confirmar que os aliases legados continuam necessários.

- [ ] **Step 2: Adicionar tokens de produto sem quebrar aliases**

Adicionar apenas tokens reutilizáveis para superfície elevada, toolbar, KPI, tabela, foco, estados semânticos, densidade compacta e larguras de conteúdo. Não remover tokens existentes.

- [ ] **Step 3: Expandir `tool-standard.css`**

Padronizar visualmente, apenas em `@media screen`, tipografia, seleção de texto, scrollbar, campos, botões, tabelas, toolbar, cartões, foco, disabled e comportamento responsivo. Evitar `!important` quando não for necessário; manter impressão inalterada.

- [ ] **Step 4: Verificar regressão estrutural**

Confirmar por inspeção de código que seletores compartilhados não afetam `@media print`, não escondem elementos e não alteram dimensões usadas por cálculos JavaScript.

- [ ] **Step 5: Commit**

Commit esperado: `style: strengthen shared visual system`

---

### Task 2: Polir shell e Dashboard central

**Files:**
- Modify: `css/app-shell.css`
- Modify: `index.html`

**Interfaces:**
- Consumes: tokens definidos na Task 1.
- Produces: shell visual oficial que serve como referência aos módulos.

- [ ] **Step 1: Preservar fluxo de navegação e autenticação**

Antes de editar, localizar e congelar mentalmente as funções `abrir`, `mostrarInicio`, `abrirPainel`, `logout`, `criarUsuario` e os listeners do iframe. Nenhuma delas deve ter lógica alterada nesta tarefa.

- [ ] **Step 2: Refinar hierarquia do shell**

Ajustar espaçamento, tipografia, contraste, estados ativos e densidade da sidebar/topbar sem trocar IA, rótulos ou destino dos módulos.

- [ ] **Step 3: Refinar Dashboard home**

Melhorar composição do hero, cards de ferramentas e responsividade, mantendo os mesmos oito acessos atuais e o mesmo comportamento de teclado.

- [ ] **Step 4: Refinar Gestão de Usuários apenas visualmente**

Padronizar formulário, tabela, estados de foco, botões e layout responsivo. Não alterar Firebase/Auth/Firestore nem regras de criação/exclusão.

- [ ] **Step 5: Validar shell**

Confirmar que os `data-page`, `onclick`, IDs e funções permanecem idênticos e que Inventário Cíclico/Cíclico ALM51 continuam acessíveis porém intocados internamente.

- [ ] **Step 6: Commit**

Commit esperado: `style: polish application shell and dashboard`

---

### Task 3: Polir Divergência

**Files:**
- Modify: `PORTA-PORTA.html`

**Interfaces:**
- Consumes: `css/design-system.css`, `css/tool-standard.css`.
- Produces: layout de formulário/tabelas coerente com o shell.

- [ ] **Step 1: Registrar invariantes funcionais**

Preservar `KEY`, `getGrupos`, `setGrupos`, `adicionar`, `novoGrupoManual`, `baixarPNG`, `limparTudo`, IDs dos inputs e estrutura de armazenamento local.

- [ ] **Step 2: Modernizar estrutura visual**

Substituir aparência antiga por header de conteúdo discreto, formulário em painel, toolbar consistente e tabelas com hierarquia clara. Manter a mesma ordem operacional.

- [ ] **Step 3: Adaptar para mobile**

Fazer grids de duas colunas colapsarem, botões ganharem área de toque adequada e tabelas usarem overflow horizontal sem quebrar captura PNG.

- [ ] **Step 4: Validar PNG e persistência**

Confirmar que `capture_*`, conteúdo exportado e `localStorage` não foram alterados.

- [ ] **Step 5: Commit**

Commit esperado: `style: polish divergence module`

---

### Task 4: Polir Inventário Travado

**Files:**
- Modify: `ferramenta_de_inventario_travada.html`

**Interfaces:**
- Consumes: sistema visual compartilhado.
- Produces: experiência de importação, busca e detalhe coerente com o produto.

- [ ] **Step 1: Registrar invariantes de dados**

Preservar leitura XLSX/CSV, `toNumberFlexible`, `isContado`, `isSistema`, `GROUPS`, persistência local, IDs e cálculos de diferença.

- [ ] **Step 2: Refinar upload e busca**

Reorganizar visualmente upload, seletor de aba, busca e ações para destacar tarefa primária e estado do arquivo, sem alterar handlers.

- [ ] **Step 3: Refinar cards e tabela de detalhe**

Aplicar linguagem de KPI/painel do sistema, melhor contraste e densidade, mantendo todos os valores e IDs existentes.

- [ ] **Step 4: Responsividade**

Fazer `.row`, `.row-3` e `.grid-2` colapsarem de forma previsível em iframe estreito.

- [ ] **Step 5: Commit**

Commit esperado: `style: polish locked inventory module`

---

### Task 5: Harmonizar Ocupação de Estoque

**Files:**
- Modify: `Ocupacao_Estoque_por_Familia-10.html`

**Interfaces:**
- Consumes: identidade visual já forte do próprio módulo + tokens compartilhados.
- Produces: módulo preservado em personalidade, mas alinhado ao shell.

- [ ] **Step 1: Preservar lógica e visualizações**

Não alterar classificação de ocupação, cálculos, agrupamentos, filtros, exportações, gráficos ou dados.

- [ ] **Step 2: Reduzir drift visual**

Alinhar tipografia, radius, sombras, botões, campos e superfícies ao design system, sem desmontar ribbon, badges, KPIs ou estrutura própria.

- [ ] **Step 3: Harmonizar topbar interna**

Reduzir competição visual com a topbar externa do shell, mantendo contexto e ações do módulo.

- [ ] **Step 4: Verificar densidade**

Garantir legibilidade de tabela e KPIs em 1366px, 1024px e largura de iframe móvel.

- [ ] **Step 5: Commit**

Commit esperado: `style: harmonize stock occupancy module`

---

### Task 6: Harmonizar Devoluções

**Files:**
- Modify: `DEVOLUÇÃO V3.html`

**Interfaces:**
- Consumes: tokens compartilhados e visual dark existente.
- Produces: módulo dark com gramática compatível com o produto.

- [ ] **Step 1: Preservar parser, gráficos e PNG**

Não alterar `parseQty`, `processRows`, dados dos gráficos, eventos de seleção de dia, html2canvas, nomes de arquivo ou cálculo de KPIs nesta tarefa.

- [ ] **Step 2: Refinar hierarquia**

Alinhar spacing, toolbar, cards, estados vazios, status e detalhes ao padrão de produto mantendo o tema escuro aprovado.

- [ ] **Step 3: Refinar responsividade**

Garantir comportamento estável de KPIs, controles, canvases e overflow em celular/tablet.

- [ ] **Step 4: Validar acessibilidade visual**

Checar foco visível, disabled/loading, contraste de texto secundário e labels dos canvases existentes.

- [ ] **Step 5: Commit**

Commit esperado: `style: polish returns dashboard`

---

### Task 7: Harmonizar Perecíveis

**Files:**
- Modify: `iNDICADOR PERECIVEL.html`

**Interfaces:**
- Consumes: design system compartilhado.
- Produces: dashboard de risco/vencimento com identidade coerente.

- [ ] **Step 1: Congelar comportamento**

Preservar FileReader, XLSX, Chart.js, regras de faixas, contagens, relógio, KPIs e tabela.

- [ ] **Step 2: Harmonizar header, KPI e resumo**

Manter semântica de cores de vencimento, mas alinhar superfícies, bordas, radius, tipografia e ações ao shell.

- [ ] **Step 3: Reduzir excesso visual**

Remover apenas efeitos decorativos redundantes que não carreguem informação, sem mudar conteúdo ou lógica.

- [ ] **Step 4: Responsividade**

Garantir quebra dos cinco KPIs, header e blocos de resumo em larguras menores.

- [ ] **Step 5: Commit**

Commit esperado: `style: harmonize perishables dashboard`

---

### Task 8: Harmonizar Sala Cofre

**Files:**
- Modify: `Indicador_SALA_COFRE_atualizado.html`

**Interfaces:**
- Consumes: design system compartilhado.
- Produces: módulo de estoque/acuracidade consistente com os demais.

- [ ] **Step 1: Preservar indicadores e histórico**

Não alterar cálculo de acuracidade, snapshots, histórico, filtros, exportações, gráficos, modal ou chaves de localStorage.

- [ ] **Step 2: Harmonizar cabeçalho e ações**

Ajustar densidade da topbar interna, agrupamento de ações e hierarquia sem remover funções.

- [ ] **Step 3: Harmonizar KPIs, boxes e tabelas**

Aplicar tokens de superfície, tipografia e espaçamento compartilhados.

- [ ] **Step 4: Responsividade**

Reorganizar apenas por CSS grids, wrapping e overflow; não alterar DOM necessário aos scripts.

- [ ] **Step 5: Commit**

Commit esperado: `style: harmonize vault inventory dashboard`

---

### Task 9: Alinhar Login ao produto

**Files:**
- Modify: `login.html`

**Interfaces:**
- Consumes: design system compartilhado.
- Produces: entrada visual coerente com o shell.

- [ ] **Step 1: Preservar autenticação**

Não alterar imports Firebase, `handleLogin`, `handleRegister`, recuperação de senha, preferências, redirects ou mapeamento de erros.

- [ ] **Step 2: Refinar composição visual**

Ajustar fundo, card, logo, tipografia, inputs, botões, alertas e responsividade para a mesma identidade do shell.

- [ ] **Step 3: Validar estados**

Confirmar foco, erro, loading, registro, senha visível/oculta e mobile sem mudar JS.

- [ ] **Step 4: Commit**

Commit esperado: `style: align login with application shell`

---

### Task 10: Regressão global e acabamento

**Files:**
- Verify: todos os arquivos modificados nas Tasks 1–9
- Verify untouched: `CICLICO_PORTA_PORTA_SEM_BORDA2.html`, `CICLICO ALM51.html`

**Interfaces:**
- Consumes: resultado completo das tarefas anteriores.
- Produces: versão polida pronta para uso.

- [ ] **Step 1: Verificação de escopo**

Comparar os dois arquivos de Inventário Cíclico com seus SHAs anteriores e confirmar que não mudaram.

- [ ] **Step 2: Verificação estática de contratos**

Confirmar que IDs, handlers inline, nomes de funções críticas, chaves de localStorage, imports de bibliotecas e `data-page` usados por JavaScript permanecem presentes.

- [ ] **Step 3: Inspeção responsiva em lote**

Revisar desktop largo, 1366px, 1024px, 820px e 390px para shell e módulos, priorizando overflow, truncamento, áreas de toque, grids e tabelas.

- [ ] **Step 4: Inspeção de estados**

Revisar visualmente default, hover, focus, disabled, loading, empty, success e error onde já existirem.

- [ ] **Step 5: Limpeza de diff**

Remover CSS duplicado criado pelo polish, comentários temporários e qualquer alteração de lógica acidental.

- [ ] **Step 6: Verificação final no GitHub**

Reabrir os arquivos atualizados e confirmar que os commits publicados correspondem ao plano.

- [ ] **Step 7: Commit final se necessário**

Commit esperado somente se houver correções de QA: `style: finish general interface polish`

## Acceptance Criteria

- A Ferramenta Geral apresenta linguagem visual coerente entre shell e módulos incluídos.
- Nenhum cálculo, regra de negócio, importação, persistência ou autenticação foi alterado.
- Inventário Cíclico e Cíclico ALM51 permanecem byte-for-byte inalterados durante este trabalho.
- Todos os módulos incluídos continuam acessíveis pelo shell.
- Layouts permanecem utilizáveis em desktop, tablet e celular.
- Estados de foco, hover e disabled são consistentes.
- Tabelas e painéis mantêm legibilidade em iframe.
- Não há dependência nova de UI nem redesign estrutural escondido.
