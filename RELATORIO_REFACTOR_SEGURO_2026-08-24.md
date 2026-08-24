# Relatório — Refatoração visual segura

**Data:** 24/08/2026  
**Branch:** `refactor/visual-system-safe`  
**Base:** `main` em `815e86ef8a231164d41cc62754eefb43510c5371`

## 1. Escopo executado

O trabalho foi conduzido com prioridade absoluta para preservar o comportamento funcional das ferramentas mantidas. Não houve migração de framework, troca de banco, alteração de API, mudança de fórmulas ou reescrita das rotinas internas dos módulos ativos.

A arquitetura continua sendo HTML/CSS/JavaScript client-side, com Firebase no shell autenticado e bibliotecas já existentes nas ferramentas, incluindo XLSX/SheetJS, Chart.js, PapaParse e html2canvas onde já eram utilizadas.

## 2. Removido

Foram removidos da branch:

- `Batimento de estoque.html`
- `BACKLOG.html`
- `Contencão atualizada.html`
- `Dashboard de produção.html`
- `RECE1 REC2.html`

Também foram retirados do dashboard, menu e mapa de navegação todos os acessos a esses módulos.

O arquivo de amostra `Backlog.csv` permaneceu no repositório porque a exclusão foi recusada pela camada de segurança do conector. Ele não é referenciado pelo novo dashboard e não participa da execução das ferramentas ativas.

## 3. Ferramentas mantidas

O dashboard principal passa a apresentar 8 ferramentas:

1. Inventário Cíclico — `CICLICO_PORTA_PORTA_SEM_BORDA2.html`
2. Divergência — `PORTA-PORTA.html`
3. Inventário Travado — `ferramenta_de_inventario_travada.html`
4. Cíclico ALM51 — `CICLICO ALM51.html`
5. Ocupação de Estoque — `Ocupacao_Estoque_por_Familia-10.html`
6. Devoluções — `DEVOLUÇÃO V3.html`
7. Perecíveis — `iNDICADOR PERECIVEL.html`
8. Sala Cofre — `Indicador_SALA_COFRE_atualizado.html`

A área de Gestão de Usuários e a autenticação Firebase também foram preservadas.

## 4. Visual atualizado

### Shell principal

Foi criado `css/app-shell.css` com:

- sidebar corporativa e navegação consistente;
- dashboard inicial em cards;
- cabeçalho compartilhado com título/subtítulo da ferramenta ativa;
- botão de início e logout;
- painel de usuários padronizado;
- loading visual;
- menu off-canvas para tablet/celular;
- grid responsivo para os cards;
- estados hover, active, focus e disabled onde aplicável;
- tipografia, espaçamento, bordas, sombras e hierarquia visual consistentes.

### Ferramentas existentes

Foi criado `css/tool-standard.css`, aplicado somente em `@media screen`, para uma normalização conservadora de:

- tipografia;
- foco acessível;
- raio de botões e campos;
- comportamento de hover/active;
- números tabulares em tabelas;
- limites responsivos de imagens/canvas;
- altura mínima de controles em telas menores.

Essa camada não é aplicada na mídia de impressão, evitando interferência em PDF, impressão A4 e layouts de inventário.

O `index.html` também injeta a camada visual no iframe após o carregamento, inclusive para ferramentas que não carregam o normalizador compartilhado diretamente.

## 5. Código modificado

- `index.html`
- `js/normalize-styles.js`
- `css/app-shell.css` (novo)
- `css/tool-standard.css` (novo)
- `RELATORIO_REFACTOR_SEGURO_2026-08-24.md` (novo)

Além das remoções listadas na seção 2.

## 6. Funcionalidades preservadas por estratégia de regressão

O comparativo `main` × branch confirma que nenhum dos HTMLs das 8 ferramentas mantidas foi alterado. Portanto, seus scripts internos permanecem byte a byte iguais à versão base, incluindo as rotinas existentes de:

- importação Excel/CSV;
- importação e processamento de arquivos onde já existia;
- filtros e pesquisas;
- cálculos e totais;
- acuracidade e divergências;
- regras de inventário;
- capacidade e ocupação;
- datas e históricos;
- localStorage;
- gráficos;
- exportação PNG/Excel/CSV;
- impressão/PDF;
- formulários e eventos internos.

A única camada compartilhada alterada é `js/normalize-styles.js`, restrita a comportamento visual e sem alteração de dados, fórmulas ou eventos de negócio.

## 7. Verificações realizadas

### Estrutura e dependências

- Mapeamento da raiz, `css/`, `js/`, `styles/`, `tests/` e `docs/`.
- Inspeção dos módulos ativos e dos módulos removidos.
- Conferência das bibliotecas externas e integrações existentes.
- Conferência da autenticação Firebase e painel de usuários no `index.html`.
- Conferência das chaves de localStorage e rotinas principais nos módulos relevantes.

### Regressão por diff

- Branch criada diretamente a partir do `main` atual.
- Comparação final confirma que os HTMLs mantidos não sofreram alteração de código interno.
- O diff fica restrito ao shell, normalização visual, novos CSS e remoções solicitadas.

### Navegação

- Confirmados no `index.html` os 8 caminhos das ferramentas mantidas.
- Confirmada ausência de referências visuais/menu para Batimento, Backlog, Contenção, Produção e Recebimento.
- Estado antigo salvo em `localStorage['pagina']` que não pertença mais ao mapa de ferramentas é descartado e retorna ao dashboard, evitando iframe quebrado.

### Responsividade

- Shell com breakpoints para desktop, tablet e celular.
- Sidebar transforma-se em menu lateral móvel abaixo de 900 px.
- Cards passam de 3 para 2 e depois 1 coluna.
- Ações do topo se compactam em telas pequenas.
- Camada visual das ferramentas é `screen-only`, preservando impressão.

## 8. Limitações dos testes neste ambiente

O conector GitHub permite auditoria de código, comparação de commits e alterações no repositório, mas não fornece um navegador/headless browser para executar uploads reais, clicar em todos os botões, gerar PDFs/PNGs ou validar visualmente gráficos em runtime.

Por isso, não foi declarado como executado nenhum teste de navegador que não pôde ser realmente realizado. A principal proteção contra regressão funcional foi manter os 8 HTMLs ativos sem alterações internas e limitar as mudanças ao shell/CSS.

Antes do merge definitivo, recomenda-se um smoke test manual no navegador com um arquivo real de cada ferramenta, especialmente para impressão/PDF e gráficos em telas pequenas.

## 9. Riscos residuais

- O `Backlog.csv` continua presente como arquivo órfão de amostra, sem acesso pelo sistema.
- A aparência interna das ferramentas ainda mantém características próprias quando necessárias; a padronização foi propositalmente conservadora para não comprometer layouts sensíveis.
- Firebase depende de conectividade e configuração externa já existente.
- Bibliotecas CDN continuam dependentes de rede, exatamente como antes.

## 10. Resultado

A branch entrega um sistema com dashboard e navegação visualmente unificados, responsivos e profissionais, enquanto mantém intacta a lógica interna das ferramentas que permaneceram. As remoções foram isoladas dos módulos ativos e não houve alteração de fórmulas, regras de negócio, estruturas de dados ou integrações das ferramentas preservadas.
