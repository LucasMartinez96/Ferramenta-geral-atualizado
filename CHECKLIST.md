# ✅ CHECKLIST DE IMPLEMENTAÇÃO INTERATIVO

**Versão:** 1.0  
**Data Início:** 2026-06-23  
**Meta:** Implementar tudo em 2 semanas

---

## 📋 FASE 1: SETUP (Dia 1 - 30 minutos)

- [ ] **Criar pastas**
  - [ ] Criar `css/` folder
  - [ ] Criar `js/` folder
  
- [ ] **Copiar arquivos base**
  - [ ] Copiar `css/design-system.css`
  - [ ] Copiar `js/utils.js`
  - [ ] Copiar `login-novo.html`

- [ ] **Verificar instalação**
  - [ ] Abrir DevTools (F12)
  - [ ] Verificar Console (sem erros)
  - [ ] CSS carregando corretamente

**Tempo:** 30 min | **Status:** ⏳ Não iniciado

---

## 🔑 FASE 2: LOGIN (Dia 2 - 2 horas)

### Backup
- [ ] Fazer backup do `login.html` atual
  - [ ] Renomear para `login-backup.html`

### Implementar novo login
- [ ] Copiar `login-novo.html` para `login.html`
- [ ] Atualizar URL base no código (se necessário)

### Testar funcionalidades
- [ ] [ ] Testar envio de email válido
  - [ ] [ ] Mensagem de sucesso aparece
  - [ ] [ ] Página redireciona corretamente
  
- [ ] [ ] Testar email inválido
  - [ ] [ ] Erro inline aparece
  - [ ] [ ] Campo fica vermelho
  
- [ ] [ ] Testar senha vazia
  - [ ] [ ] Erro "Senha obrigatória"
  - [ ] [ ] Campo focado

- [ ] [ ] Testar toggle de senha
  - [ ] [ ] Icon muda 👁️ → 🙈
  - [ ] [ ] Senha fica visível
  - [ ] [ ] Senha fica oculta novamente

- [ ] [ ] Testar "Lembrar-me"
  - [ ] [ ] Checkbox funciona
  - [ ] [ ] Email persiste ao fechar abas
  
- [ ] [ ] Testar "Criar Conta"
  - [ ] [ ] Botão muda text
  - [ ] [ ] Campo de "Recuperar senha" desaparece
  - [ ] [ ] Volta ao login corretamente

- [ ] [ ] Testar "Esqueci Senha"
  - [ ] [ ] Clique abre modal/alerta
  - [ ] [ ] Email válido envia
  - [ ] [ ] Mensagem de sucesso

- [ ] [ ] Testar responsividade
  - [ ] [ ] Mobile 320px (DevTools)
  - [ ] [ ] Tablet 768px
  - [ ] [ ] Desktop 1440px

- [ ] [ ] Testar acessibilidade
  - [ ] [ ] Tab order funciona
  - [ ] [ ] Labels vinculadas (inspecionar)
  - [ ] [ ] Focus visível em botões

**Tempo:** 2h | **Status:** ⏳ Não iniciado

---

## 🎨 FASE 3: DESIGN SYSTEM (Dias 3-5 - 4 horas)

### Adicionar design-system em 3 dashboards principais

#### Dashboard 1: Batimento de estoque.html
- [ ] **Adicionar CSS**
  - [ ] Adicionar link: `<link rel="stylesheet" href="css/design-system.css" />`
  - [ ] Remover CSS inline conflitante

- [ ] **Refatorar componentes**
  - [ ] Adicionar classe `.card` aos boxes
  - [ ] Substituir `.btn` por `.btn .btn-primary`
  - [ ] Adicionar `.table` às tabelas
  - [ ] Adicionar `.form-control` aos inputs

- [ ] **Testar**
  - [ ] Verificar cores corretas
  - [ ] Botões estão funcionais
  - [ ] Sem erros de console
  - [ ] Responsivo em mobile

#### Dashboard 2: Dashbord de produção.html
- [ ] **Adicionar CSS**
  - [ ] Adicionar link design-system
  - [ ] Remover CSS conflitante

- [ ] **Refatorar componentes**
  - [ ] Converter estilos para classes
  - [ ] Verificar paleta de cores

- [ ] **Testar**
  - [ ] Gráficos funcionam
  - [ ] Botões funcionam
  - [ ] Sem erros

#### Dashboard 3: BACKLOG.html
- [ ] **Adicionar CSS**
  - [ ] Adicionar link design-system

- [ ] **Refatorar componentes**
  - [ ] Converter estilos

- [ ] **Testar**
  - [ ] Tabela responsiva
  - [ ] Gráficos funcionam

**Tempo:** 4h | **Status:** ⏳ Não iniciado

---

## ♿ FASE 4: ACESSIBILIDADE (Dias 6-7 - 3 horas)

### Audit Axe DevTools

- [ ] **Instalar Axe DevTools**
  - [ ] Abrir Chrome Web Store
  - [ ] Instalar extensão Axe DevTools
  - [ ] Verificar instalação

- [ ] **Rodar audits (para cada página)**
  - [ ] [ ] Login
    - [ ] Score inicial: ____%
    - [ ] Erros críticos: ____
    - [ ] Corrigir todos os erros críticos
    - [ ] Score final: ____%
    
  - [ ] [ ] Index
    - [ ] Score inicial: ____%
    - [ ] Erros críticos: ____
    - [ ] Corrigir
    - [ ] Score final: ____%
    
  - [ ] [ ] Batimento
    - [ ] Score inicial: ____%
    - [ ] Erros críticos: ____
    - [ ] Corrigir
    - [ ] Score final: ____%

### Fixes Manuais

- [ ] **Labels**
  - [ ] [ ] Verificar todos inputs têm labels
  - [ ] [ ] Labels têm atributo `for`
  - [ ] [ ] IDs dos inputs correspondem

- [ ] **Contraste**
  - [ ] [ ] Testar com Contrast Ratio Tool
  - [ ] [ ] Todo texto ≥ 4.5:1 (WCAG AA)
  - [ ] [ ] Botões ≥ 3:1

- [ ] **Focus**
  - [ ] [ ] Todos botões têm `:focus-visible`
  - [ ] [ ] Tab order lógico
  - [ ] [ ] Sem navegação por teclado travada

- [ ] **ARIA**
  - [ ] [ ] Botões com icon têm `aria-label`
  - [ ] [ ] Alertas têm `role="alert"`
  - [ ] [ ] Modais têm `role="dialog"`

**Tempo:** 3h | **Status:** ⏳ Não iniciado

---

## 📱 FASE 5: RESPONSIVIDADE (Dias 8-10 - 4 horas)

### Testar em breakpoints

#### 320px (Mobile pequeno)
- [ ] [ ] Login
  - [ ] [ ] Cards cabem
  - [ ] [ ] Botões clicáveis
  - [ ] [ ] Texto legível
  
- [ ] [ ] Batimento
  - [ ] [ ] Gráficos adaptativos
  - [ ] [ ] Tabela scrollável
  - [ ] [ ] Botões espaçados
  
- [ ] [ ] Dashbord
  - [ ] [ ] Gráficos responsivos
  - [ ] [ ] Sem overflow

#### 480px (Mobile grande)
- [ ] [ ] Todos layouts OK
- [ ] [ ] Grid collapsa para 1 coluna
- [ ] [ ] Inputs com min-width

#### 768px (Tablet)
- [ ] [ ] Grid em 2 colunas
- [ ] [ ] Tabelas com scroll
- [ ] [ ] Sidebar funciona

#### 1024px (Desktop pequeno)
- [ ] [ ] Grid em 3 colunas
- [ ] [ ] Layout normal

#### 1440px (Desktop grande)
- [ ] [ ] Max-width respeitado
- [ ] [ ] Sem esticar demais

### Testes específicos
- [ ] [ ] Touch targets ≥ 48px (mobile)
- [ ] [ ] Hover states funcionam
- [ ] [ ] Sem layout shifts
- [ ] [ ] Sem scroll horizontal (exceto tabelas)

**Tempo:** 4h | **Status:** ⏳ Não iniciado

---

## ⚡ FASE 6: PERFORMANCE (Dias 11-12 - 2 horas)

### Lighthouse Audit

- [ ] **Rodar Lighthouse**
  - [ ] DevTools → Lighthouse
  - [ ] Gerar report
  
- [ ] **Resultados esperados**
  - [ ] [ ] Performance ≥ 90
  - [ ] [ ] Accessibility ≥ 95
  - [ ] [ ] Best Practices ≥ 90
  - [ ] [ ] SEO ≥ 90

### Performance specifics

- [ ] **Assets**
  - [ ] [ ] CSS minificado
  - [ ] [ ] JS minificado
  - [ ] [ ] Imagens otimizadas

- [ ] **Runtime**
  - [ ] [ ] Sem layout shifts
  - [ ] [ ] FCP < 1s
  - [ ] [ ] LCP < 2.5s
  - [ ] [ ] CLS < 0.1

**Tempo:** 2h | **Status:** ⏳ Não iniciado

---

## 📊 FASE 7: TESTES FINAIS (Dias 13-14 - 3 horas)

### Testes funcionais
- [ ] [ ] Login/Logout funciona
- [ ] [ ] Navegação entre páginas OK
- [ ] [ ] Dados persistem corretamente
- [ ] [ ] Storage funciona
- [ ] [ ] Firebase integrado

### Testes de compatibilidade
- [ ] [ ] Chrome latest
- [ ] [ ] Firefox latest
- [ ] [ ] Safari latest
- [ ] [ ] Edge latest

### Testes mobile
- [ ] [ ] iPhone 12
- [ ] [ ] iPhone SE
- [ ] [ ] Samsung Galaxy S21
- [ ] [ ] Tablet (iPad)

### Testes acessibilidade
- [ ] [ ] Screen reader (NVDA/JAWS)
- [ ] [ ] Navegação apenas teclado
- [ ] [ ] Zoom 200% OK
- [ ] [ ] Modo alto contraste

### Documentação
- [ ] [ ] README.md atualizado
- [ ] [ ] Mudanças documentadas
- [ ] [ ] Exemplos de uso fornecidos

**Tempo:** 3h | **Status:** ⏳ Não iniciado

---

## 🎉 FASE 8: DEPLOY (Dia 15)

- [ ] [ ] Todos os testes passando
- [ ] [ ] Backup dos antigos arquivos
- [ ] [ ] Commit no Git
- [ ] [ ] Deploy para produção
- [ ] [ ] Monitorar erros
- [ ] [ ] Coletar feedback

**Tempo:** 1h | **Status:** ⏳ Não iniciado

---

## 📈 RESUMO DO TEMPO

| Fase | Descrição | Horas | Dias |
|------|-----------|-------|------|
| 1 | Setup | 0.5h | 1 |
| 2 | Login | 2h | 1 |
| 3 | Design System | 4h | 3 |
| 4 | Acessibilidade | 3h | 2 |
| 5 | Responsividade | 4h | 3 |
| 6 | Performance | 2h | 2 |
| 7 | Testes | 3h | 2 |
| 8 | Deploy | 1h | 1 |
| **TOTAL** | | **19.5h** | **15 dias** |

---

## 🎯 MÉTRICAS DE SUCESSO

### Antes vs Depois

| Métrica | Antes | Alvo | Status |
|---------|-------|------|--------|
| Paletas de cores | 5 | 1 ✅ | ⏳ |
| Código duplicado | Muito | Nenhum | ⏳ |
| Score Axe | <50% | >95% | ⏳ |
| Responsivo | Não | Sim ✅ | ⏳ |
| Performance | ? | >90 | ⏳ |
| Tempo de setup novo dev | > 1h | < 15min | ⏳ |

---

## 📝 NOTAS PESSOAIS

### Dia-a-dia

**Dia 1:**
- [ ] Começado
- Tarefas concluídas: ____/____
- Notas: _______________________________

**Dias 2-7:**
- [ ] Começado
- Progresso: _____%
- Bloqueadores: _______________________________

**Dias 8-14:**
- [ ] Começado
- Progresso: _____%
- Bloqueadores: _______________________________

**Dia 15:**
- [ ] Deploy completo
- Feedback: _______________________________

---

## 🆘 PROBLEMAS COMUNS

### Se CSS não carregar
```
✓ Verificar console (F12)
✓ Verificar path: css/design-system.css
✓ Verificar permissões do arquivo
✓ Hard refresh (Ctrl+Shift+R)
```

### Se JavaScript der erro
```
✓ Verificar console para erro específico
✓ Verificar import statements
✓ Verificar se utils.js existe em js/
✓ Verificar sintaxe module
```

### Se responsividade falhar
```
✓ Verificar viewport meta tag
✓ Verificar media queries
✓ Testar com DevTools device toolbar
✓ Verificar max-width dos containers
```

### Se acessibilidade falhar
```
✓ Rodar Axe DevTools
✓ Verificar labels
✓ Verificar contraste
✓ Verificar ARIA attributes
```

---

## 🎓 RECURSOS IMPORTANTES

### Documentação
- ✅ `ANALISE_COMPLETA.md` - Análise detalhada
- ✅ `GUIA_IMPLEMENTACAO.md` - Passo-a-passo
- ✅ `RESUMO_EXECUTIVO.md` - Overview rápido
- ✅ `CHECKLIST.md` - Este arquivo

### Código
- ✅ `css/design-system.css` - Sistema de design
- ✅ `js/utils.js` - Utilitários
- ✅ `login-novo.html` - Template login

### Ferramentas
- **Axe DevTools** - Acessibilidade
- **Lighthouse** - Performance
- **DevTools** - Debug
- **Can I Use** - Compatibilidade

---

## ✨ DICAS PRO

1. **Use timeboxing** - Dedique 1-2h por dia, não maratone
2. **Commit frequente** - Commit após cada fase completada
3. **Teste localmente** - Use DevTools antes de push
4. **Documente bloqueadores** - Escreva qual problema enfrentou
5. **Peça feedback** - Mostre para stakeholders no meio

---

**Boa sorte! Você consegue! 🚀**

Comece HOJE com a Fase 1 (30 minutos).

---

**Última atualização:** 2026-06-23  
**Versão:** 1.0
