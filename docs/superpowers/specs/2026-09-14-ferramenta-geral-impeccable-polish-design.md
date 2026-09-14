# Ferramenta Geral — Impeccable Polish Design

**Data:** 2026-09-14  
**Repositório:** `LucasMartinez96/Ferramenta-geral-atualizado`  
**Modo Impeccable:** Operate / Polish  

## Objetivo

Unificar visualmente a Ferramenta Geral para que Dashboard, Divergência, Inventário Travado, Ocupação de Estoque, Devoluções, Perecíveis, Sala Cofre e Gestão de Usuários pareçam partes do mesmo produto corporativo, preservando integralmente a lógica operacional, cálculos, importações, regras de negócio e comportamento funcional existente.

## Escopo aprovado

Incluído no polish:

- `index.html`
- `css/design-system.css`
- `css/app-shell.css`
- `css/tool-standard.css`
- `PORTA-PORTA.html`
- `ferramenta_de_inventario_travada.html`
- `Ocupacao_Estoque_por_Familia-10.html`
- `DEVOLUÇÃO V3.html`
- `iNDICADOR PERECIVEL.html`
- `Indicador_SALA_COFRE_atualizado.html`
- `login.html` apenas para alinhamento visual com o sistema atual, sem alterar autenticação ou fluxo funcional.

Fora do escopo e não devem ser alterados:

- `CICLICO_PORTA_PORTA_SEM_BORDA2.html`
- `CICLICO ALM51.html`
- Regras, cálculos, filtros, parser de arquivos, persistência, autenticação, Firestore, Firebase, permissões e demais lógicas de negócio.
- Correções de segurança identificadas na critique anterior. Elas continuam como backlog separado porque este trabalho foi aprovado como polish visual com lógica preservada.

## Direção visual

A identidade-base será a do shell atual, que já possui linguagem corporativa consistente: azul profundo, superfícies claras, navegação lateral escura, tipografia limpa, bordas discretas e hierarquia visual orientada à operação.

A intenção não é tornar todos os módulos visualmente idênticos, mas fazê-los compartilhar a mesma gramática:

1. mesma família tipográfica;
2. mesmos níveis de superfície e borda;
3. mesma escala de espaçamento e radius;
4. mesma lógica de botão primário, secundário, destrutivo e neutro;
5. mesma linguagem de KPIs;
6. mesma lógica de header interno quando necessário;
7. mesma aparência para campos, filtros, tabelas e estados vazios;
8. mesmos estados de foco, hover, disabled, loading, erro e sucesso;
9. mesmos breakpoints e comportamento responsivo básico;
10. mesma linguagem de densidade visual para uso operacional.

## Princípios de refinamento

- Preservar estrutura e comportamento sempre que possível.
- Evitar redesign estrutural escondido dentro do polish.
- Remover inconsistências visuais antes de adicionar efeitos.
- Não adicionar animações decorativas.
- Não introduzir novas dependências externas de UI.
- Priorizar legibilidade e escaneabilidade em uso de desktop corporativo, mantendo adaptação para tablet e celular.
- Não alterar nomes de campos, regras, cálculos ou textos que expressem lógica do negócio sem necessidade de clareza visual.

## Design system compartilhado

### Cores

Usar como fonte principal os tokens existentes em `css/design-system.css`.

Semântica esperada:

- azul: ação primária, seleção, navegação e informação;
- verde: sucesso, conformidade e condição positiva;
- amarelo/âmbar: atenção;
- laranja: alerta intermediário;
- vermelho: erro, condição crítica ou ação destrutiva;
- neutros: estrutura, borda, fundo e texto secundário.

Módulos dark podem permanecer dark quando isso já fizer parte da identidade da tela, mas devem herdar tipografia, radius, spacing, controles e estados do sistema compartilhado.

### Tipografia

- Fonte-base única através do design system.
- Títulos de módulo: peso forte e sem excesso de escala.
- KPIs: numerais tabulares quando aplicável.
- Tabelas e labels: hierarquia consistente.
- Evitar mistura gratuita de Arial, Segoe UI, Inter, monospace decorativo e fontes externas distintas em telas equivalentes.

### Radius e elevação

- Cards e painéis: 12–16 px.
- Inputs, selects e botões: 8–10 px.
- Pills apenas em chips pequenos e estados curtos.
- Elevação discreta; evitar borda forte somada a sombra pesada no mesmo componente.

### Espaçamento

- Basear agrupamento em escala de 4/8 px.
- Mais espaço entre seções do que dentro de grupos relacionados.
- Cabeçalhos e filtros devem ocupar menos altura que conteúdo analítico.

## Shell principal

### Sidebar

Preservar a arquitetura atual e sua divisão por finalidade.

Melhorias de polish:

- substituir aparência inconsistente de ícones/emoji por um tratamento visual uniforme sem introduzir biblioteca pesada;
- revisar alinhamento, altura e densidade dos itens;
- reforçar estado ativo sem aumentar ruído;
- manter comportamento mobile já existente.

### Topbar

- Preservar título/subtítulo contextual.
- Uniformizar botões de Início e Sair.
- Garantir truncamento correto de usuário e títulos longos.
- Manter loading da ferramenta como parte do shell.

### Home / Dashboard

Neste polish, a home continua sendo uma central de ferramentas; não será convertida em dashboard de indicadores porque isso exigiria nova lógica e integração entre módulos.

Refinar:

- hierarquia do hero;
- coerência dos cards;
- estados hover/focus;
- densidade do grid;
- responsividade;
- linguagem visual dos ícones.

## Módulos

### Divergência — `PORTA-PORTA.html`

Problema atual: visual antigo, controles simples e grid pouco adaptável.

Polish:

- aplicar layout de painel operacional;
- melhorar hierarquia do formulário;
- uniformizar botões e estados;
- modernizar cards/grupos sem alterar estrutura de dados;
- responsividade do grid;
- tabela com cabeçalho e estados consistentes;
- preservar localStorage, cálculos e exportação PNG.

### Inventário Travado — `ferramenta_de_inventario_travada.html`

Polish:

- reorganização apenas visual das áreas de upload, busca, resumo e detalhe;
- KPIs com hierarquia mais clara;
- tabelas e pills padronizadas;
- grids adaptáveis;
- preservar todas as regras de cálculo, agrupamento e persistência.

### Ocupação de Estoque — `Ocupacao_Estoque_por_Familia-10.html`

É o módulo visualmente mais maduro e servirá de referência de densidade operacional.

Polish:

- alinhar tokens ao design system compartilhado;
- simplificar duplicações locais de cor/radius onde seguro;
- manter ribbon, famílias, badges e escala de ocupação;
- harmonizar botões, inputs, tabelas, estados e responsividade com o shell.

### Devoluções — `DEVOLUÇÃO V3.html`

Já possui boa qualidade visual.

Polish:

- alinhar tipografia e controles ao sistema;
- preservar dark mode atual;
- melhorar integração visual dentro do iframe;
- revisar densidade dos KPIs e comportamento em telas estreitas;
- preservar importação, gráficos e exportação PNG.

### Perecíveis — `iNDICADOR PERECIVEL.html`

Polish:

- reduzir sensação de produto separado;
- uniformizar header, ações e cards;
- preservar a codificação semântica de vencidos, 30 dias, 60 dias, OK e falta;
- melhorar responsividade dos cinco KPIs;
- harmonizar tabela e resumo com design system.

### Sala Cofre — `Indicador_SALA_COFRE_atualizado.html`

Polish:

- alinhar header, ações e KPIs com padrão da Ferramenta Geral;
- organizar visualmente ações de exportação/histórico por prioridade;
- melhorar densidade e responsividade;
- uniformizar tabelas, filtros e modal;
- preservar cálculos, histórico, snapshots e importação.

### Gestão de Usuários — `index.html`

Polish apenas visual:

- labels visíveis para campos;
- melhor hierarquia entre criação e listagem;
- feedback visual consistente;
- tabela responsiva;
- não alterar Firebase/Auth/Firestore neste trabalho.

### Login — `login.html`

Polish apenas visual:

- manter fluxo atual;
- alinhar superfície, radius, tipografia e botões ao shell;
- preservar mensagens, recuperação de senha, cadastro e autenticação.

## Responsividade

Breakpoints de referência:

- amplo: acima de 1120 px;
- intermediário/tablet: 768–1120 px;
- celular: abaixo de 768 px;
- compacto: abaixo de 480 px.

Regras:

- grids de 3+ colunas devem reduzir progressivamente;
- toolbar deve quebrar linha sem cortar ações;
- tabelas podem usar scroll horizontal quando inevitável;
- inputs e botões devem manter alvos mínimos adequados;
- evitar overflow horizontal da página inteira;
- módulo dentro de iframe deve reagir à largura do próprio iframe, não assumir viewport cheia.

## Acessibilidade

Preservar ou melhorar:

- foco visível;
- labels de campos;
- `aria-live` em feedbacks existentes;
- contraste AA em texto comum;
- estados não comunicados apenas por cor quando houver texto disponível;
- navegação por teclado em cards e controles existentes;
- `prefers-reduced-motion` onde houver animação.

## Estados

Cada superfície tocada deve manter linguagem coerente para:

- normal;
- hover;
- focus-visible;
- active;
- disabled;
- loading quando já existir operação assíncrona;
- error;
- success;
- empty quando aplicável.

Não criar estados fictícios onde a ferramenta não possui aquele fluxo.

## Estratégia de implementação

1. Fortalecer tokens e camada compartilhada em `design-system.css`, `app-shell.css` e `tool-standard.css`.
2. Refinar `index.html` e `login.html` para consolidar a identidade.
3. Refinar os módulos mais antigos: Divergência e Inventário Travado.
4. Harmonizar Ocupação, Devoluções, Perecíveis e Sala Cofre sem descaracterizá-los.
5. Fazer uma passagem responsiva e de estados em todo o escopo.
6. Verificar que os dois módulos de Inventário Cíclico não tiveram alteração.

## Critérios de aceitação

O polish será considerado concluído quando:

- todos os módulos incluídos parecerem partes reconhecíveis do mesmo produto;
- Inventário Cíclico e Cíclico ALM51 permanecerem byte-a-byte não alterados por este trabalho;
- não houver alteração intencional de regras, cálculos, autenticação, importação, persistência ou lógica de negócio;
- os módulos funcionarem em desktop, tablet e celular sem overflow estrutural evidente;
- botões, inputs, selects, tabelas, KPIs e estados apresentarem coerência visual;
- foco de teclado permanecer visível;
- nenhuma dependência visual nova pesada for adicionada;
- o diff final mostrar principalmente mudanças de HTML estrutural leve e CSS, sem reescrita da lógica JavaScript.

## Risco conhecido fora do escopo

A critique anterior identificou riscos de autenticação/permissão no fluxo de criação de usuários e atribuição de perfil administrativo. Esses riscos não são corrigidos neste polish porque o escopo aprovado preserva lógica. O sistema não deve ser declarado "production-ready" em segurança até que esse backlog seja tratado em um hardening separado.
