# 📋 ANÁLISE COMPLETA DE FRONT-END - FERRAMENTA LOGÍSTICA

**Especialista:** Front-end Sênior  
**Data:** 2026-06-23  
**Versão do Projeto:** v1.0  

---

## 🎯 RESUMO EXECUTIVO

Seu projeto possui **6 dashboards + 1 login + 1 navegador central** com:
- ❌ **Inconsistência visual severa** (5 paletas de cores diferentes)
- ❌ **Problemas críticos de acessibilidade** (sem labels, contraste baixo)
- ❌ **Código duplicado e não modularizado**
- ❌ **Responsividade inadequada em mobile**
- ❌ **Login outdated** (sem validação, sem feedback visual)

**Impacto:** Aplicação parece amadora e não é acessível para usuários com deficiências.

---

# 📊 PROBLEMAS DETALHADOS

## 1. 🎨 INCONSISTÊNCIA VISUAL E CORES

### Problema Identificado

**Login.html**
```css
background: linear-gradient(135deg, #0f172a, #1e3a8a);
.login { background: #2563eb; }
```

**Batimento de estoque.html**
```css
--azul: #003366;
--verde: #22c55e;
--vermelho: #ef4444;
```

**Dashbord de produção.html**
```css
--neon-blue: #2b8aff;
--neon-cyan: #00eaff;
--neon-green: #00ffbf;
```

**Indicador SALA COFRE.html**
```css
--azul: #003366;
--azul-botao: #0a4aa6;
--bg: #f4f6f8;
```

**BACKLOG.html**
```css
--bg: #f4f6f8;
--ink: #1f2937;
button { background: var(--ink); }
.chart-box { background: #3b82f6; }
```

### Impacto
- ❌ Usuário fica confuso ao navegar entre páginas
- ❌ Marca visual fraca
- ❌ Não parece um sistema profissional
- ❌ Dificuldade manutenção

---

## 2. 📱 RESPONSIVIDADE INADEQUADA

### Problema Identificado

**Index.html**
- Sidebar: collapsa sem breakpoint responsivo
- Iframe: não ajusta em mobile
- Sem touch-friendly spacing

**Batimento de estoque.html**
- Charts: `max-width: 420px` hardcoded
- Tabela: sem horizontal scroll
- Botões: pequenos demais em mobile

**Dashbord de produção.html**
```css
@media (max-width: 980px){
  .chart-row { flex-direction: column; }
  .legend-vert { height: auto; min-width: unset; }
}
```
- Único breakpoint (980px)
- Falta breakpoints para tablet e mobile

### Sem Breakpoints
- Mobile: 320px, 480px
- Tablet: 768px, 820px
- Desktop: 1024px, 1440px

---

## 3. 🔐 ACESSIBILIDADE CRÍTICA

### Problema: Labels Desvinculados

**Login.html**
```html
<label>Email</label>
<input id="email" placeholder="seu@email.com">
```
❌ `<label>` não tem `for` atributo

**Correto:**
```html
<label for="email">Email</label>
<input id="email" placeholder="seu@email.com">
```

### Problema: Contraste Baixo

**Batimento de estoque.html**
```css
.subtitle { 
  color: var(--hdr-accent); /* #8ab4ff - azul claro */
  opacity: .95;
}
/* WCAG falha: razão de contraste < 3:1 */
```

### Problema: Botões sem Feedback

**Index.html**
```html
<button class="btnLogout" onclick="logout()">Sair</button>
```
❌ Sem `aria-label`  
❌ Sem indicador visual de focus  
❌ Sem feedback de loading

### Problema: Navegação por Teclado

Nenhuma página implementa:
- ❌ Skip links
- ❌ Tab order lógico
- ❌ Focus visible
- ❌ Keyboard shortcuts

### Problema: Sem ARIA Labels

```javascript
// Indicador SALA COFRE.html - Modal sem role apropriado
<div class="modal-overlay">
  <div class="modal">
```

---

## 4. 💻 PROBLEMAS DE CÓDIGO

### Problema: CSS Duplicado

**Relógio (3 arquivos diferentes)**

Login.html:
```javascript
// Sem relógio
```

Dashbord de produção.html:
```javascript
setInterval(()=>{
  const el = document.getElementById('clock');
  if(el) el.textContent = new Date().toLocaleTimeString('pt-BR', {hour12:false});
}, 1000);
```

Indicador SALA COFRE.html:
```javascript
function formatHeaderClock(dateObj){
  const data = dateObj.toLocaleDateString(LOCALE);
  const hora = dateObj.toLocaleTimeString(LOCALE, { hour12:false });
  return `${data} • ${hora}`;
}
function startHeaderClock(){ ... }
```

✅ **Solução: Criar arquivo compartilhado `utils.js`**

### Problema: Nomes de Classes Inconsistentes

```css
/* Batimento de estoque */
.dif-green { }
.dif-red { }

/* Dashbord */
.btn { }
.btn-primary { }
.btn-danger { }

/* BACKLOG */
.btn { }

/* Index */
.btnLogout { }
```

❌ Sem padrão BEM ou SMACSS

### Problema: Variáveis CSS Duplicadas

Cada arquivo define suas próprias cores em `:root`

```css
/* Arquivo A */
:root { --azul: #003366; }

/* Arquivo B */
:root { --azul: #0a4aa6; }

/* Arquivo C */
:root { --azul-botao: #0a4aa6; }
```

---

## 5. 🔑 LOGIN - DEFICIÊNCIAS GRAVES

### Visual Outdated

Atual:
- ❌ Design muito simples (2020)
- ❌ Sem indicação de loading
- ❌ Sem validação visual
- ❌ Sem toggle password
- ❌ Sem "Esqueci a senha"
- ❌ Sem separação clara entre Login e Cadastro

### Problemas de UX

```html
<input id="email" placeholder="seu@email.com">
<input id="senha" type="password" placeholder="********">
```

❌ Placeholder não substitui label  
❌ Sem validação em tempo real  
❌ Sem feedback de erro inline  
❌ Sem indicador de força de senha (cadastro)

### Sem Accessibility

❌ Sem labels vinculados  
❌ Sem aria-describedby para mensagens de erro  
❌ Sem role="alert" para erros  
❌ Sem focus visível

---

## 6. 📈 PERFORMANCE

### Problema: Múltiplas Instâncias de Chart.js

Cada página instancia Chart.js:
```javascript
// Batimento
let chartStatus = null;
let chartObs = null;

// Dashbord
let CHARTS = {};
```

❌ Sem lazy loading  
❌ Sem cache de instâncias

### Problema: Canvas Redraw sem Otimização

```javascript
function drawCharts(panel){
  drawChartItensEmb(panel);
  drawChartPecas(panel);
}

window.addEventListener('resize', ()=>{
  drawCharts('FAB2');
  drawCharts('FAB1');
});
```

❌ Sem debounce  
❌ Redesenha durante scroll

---

# ✅ SOLUÇÕES RECOMENDADAS

## 📐 DESIGN SYSTEM (Novo Arquivo: `design-system.css`)

### Paleta de Cores Profissional

```css
:root {
  /* Primary: Azul profissional */
  --color-primary: #0a66c2;
  --color-primary-light: #4a90e2;
  --color-primary-dark: #054a94;
  
  /* Secondary: Verde sucesso */
  --color-success: #16a34a;
  --color-success-light: #86efac;
  --color-success-dark: #15803d;
  
  /* Alerts */
  --color-danger: #dc2626;
  --color-danger-light: #fecaca;
  --color-warning: #f59e0b;
  --color-warning-light: #fcd34d;
  --color-info: #0ea5e9;
  
  /* Neutral */
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-400: #9ca3af;
  --color-neutral-500: #6b7280;
  --color-neutral-600: #4b5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1f2937;
  --color-neutral-900: #111827;
  
  /* Semantic */
  --color-bg: var(--color-neutral-50);
  --color-surface: #ffffff;
  --color-text: var(--color-neutral-900);
  --color-text-muted: var(--color-neutral-600);
  --color-border: var(--color-neutral-200);
  
  /* Spacing (8px base) */
  --space-xs: 0.25rem;      /* 4px */
  --space-sm: 0.5rem;       /* 8px */
  --space-md: 1rem;         /* 16px */
  --space-lg: 1.5rem;       /* 24px */
  --space-xl: 2rem;         /* 32px */
  --space-2xl: 3rem;        /* 48px */
  
  /* Typography */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: 'Monaco', 'Courier New', monospace;
  
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 2rem;      /* 32px */
  
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Shadow */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Border Radius */
  --radius-sm: 0.375rem;   /* 6px */
  --radius-md: 0.5rem;     /* 8px */
  --radius-lg: 0.75rem;    /* 12px */
  --radius-xl: 1rem;       /* 16px */
  
  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
  
  /* Breakpoints */
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1440px;
}

/* Reset Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-bg);
}

/* Utility: Espaçamento */
.p-sm { padding: var(--space-sm); }
.p-md { padding: var(--space-md); }
.p-lg { padding: var(--space-lg); }

.m-sm { margin: var(--space-sm); }
.m-md { margin: var(--space-md); }
.m-lg { margin: var(--space-lg); }

.gap-sm { gap: var(--space-sm); }
.gap-md { gap: var(--space-md); }
.gap-lg { gap: var(--space-lg); }

/* Utility: Texto */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-lg { font-size: var(--font-size-lg); }
.text-muted { color: var(--color-text-muted); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }

/* Utility: Responsivo */
@media (max-width: 767px) {
  .hide-mobile { display: none !important; }
}
@media (min-width: 768px) {
  .hide-desktop { display: none !important; }
}
```

---

## 🔘 COMPONENTES REUTILIZÁVEIS

### Botões Padronizados

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-base);
  text-decoration: none;
  
  /* Remove default button styling */
  -webkit-appearance: none;
  appearance: none;
}

/* Variantes de Botão */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
}
.btn-primary:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
.btn-primary:active {
  transform: translateY(0);
}
.btn-primary:disabled {
  background-color: var(--color-neutral-300);
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-secondary {
  background-color: var(--color-neutral-100);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
.btn-secondary:hover {
  background-color: var(--color-neutral-200);
}

.btn-danger {
  background-color: var(--color-danger);
  color: white;
}
.btn-danger:hover {
  background-color: #b91c1c;
  box-shadow: var(--shadow-md);
}

.btn-success {
  background-color: var(--color-success);
  color: white;
}
.btn-success:hover {
  background-color: var(--color-success-dark);
}

/* Tamanhos */
.btn-sm {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
}

.btn-lg {
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-lg);
}

/* Estado de Loading */
.btn-loading {
  pointer-events: none;
  opacity: 0.7;
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
}

.btn-loading::after {
  content: '';
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Focus Visible (Acessibilidade) */
.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

button:focus:not(:focus-visible) {
  outline: none;
}
```

### Inputs com Label Vinculada

```html
<div class="form-group">
  <label for="email" class="form-label">Email</label>
  <input 
    id="email" 
    type="email" 
    class="form-control"
    placeholder="seu@email.com"
    aria-describedby="email-error"
    required
  />
  <span id="email-error" class="form-error" role="alert"></span>
</div>
```

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.form-control {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-base);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  color: var(--color-text);
  transition: var(--transition-base);
}

.form-control:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(10, 102, 194, 0.1);
}

.form-control:invalid:not(:placeholder-shown) {
  border-color: var(--color-danger);
  background-color: rgba(220, 38, 38, 0.02);
}

.form-error {
  font-size: var(--font-size-xs);
  color: var(--color-danger);
  min-height: 1.25rem;
}

.form-control:invalid ~ .form-error::after {
  content: 'Campo obrigatório ou inválido';
}
```

### Cards e Containers

```css
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--space-md);
}

.card-header h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin: 0;
}

.card-body {
  padding: var(--space-md) 0;
}

.card-footer {
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: var(--space-md);
  justify-content: flex-end;
}
```

---

## 🔑 NOVO LOGIN - DESIGN COMPLETO

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Sistema Logístico - Acesso</title>
  
  <link rel="stylesheet" href="design-system.css" />
  <style>
    /* Layout */
    body {
      display: grid;
      grid-template-columns: 1fr;
      place-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #0a66c2 0%, #054a94 100%);
      padding: var(--space-md);
    }

    .login-container {
      width: 100%;
      max-width: 420px;
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    /* Card de Login */
    .login-card {
      background-color: var(--color-surface);
      border-radius: var(--radius-xl);
      padding: var(--space-2xl);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.4s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Header */
    .login-header {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      text-align: center;
      margin-bottom: var(--space-lg);
    }

    .login-logo {
      width: 60px;
      height: 60px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0a66c2, #054a94);
      border-radius: var(--radius-xl);
      color: white;
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-2xl);
    }

    .login-header h1 {
      font-size: var(--font-size-2xl);
      color: var(--color-text);
      margin: 0;
    }

    .login-header p {
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
      margin: 0;
    }

    /* Formulário */
    .login-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    /* Campo de Senha com Toggle */
    .password-group {
      position: relative;
    }

    .password-group input {
      padding-right: 40px;
    }

    .password-toggle {
      position: absolute;
      right: var(--space-md);
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-muted);
      transition: var(--transition-base);
    }

    .password-toggle:hover {
      color: var(--color-text);
    }

    /* Botões */
    .form-actions {
      display: flex;
      gap: var(--space-md);
      margin-top: var(--space-md);
    }

    .btn-login {
      flex: 1;
    }

    .btn-register {
      flex: 1;
    }

    /* Mensagens */
    .alert {
      padding: var(--space-md);
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
      margin-bottom: var(--space-md);
      animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .alert-success {
      background-color: #d1fae5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }

    .alert-error {
      background-color: #fee2e2;
      color: #7f1d1d;
      border: 1px solid #fecaca;
    }

    .alert-info {
      background-color: #dbeafe;
      color: #082f49;
      border: 1px solid #bfdbfe;
    }

    /* Links */
    .login-footer {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      text-align: center;
      margin-top: var(--space-lg);
      font-size: var(--font-size-sm);
    }

    .login-footer a {
      color: var(--color-primary);
      text-decoration: none;
      transition: var(--transition-base);
    }

    .login-footer a:hover {
      text-decoration: underline;
      color: var(--color-primary-dark);
    }

    /* Mobile */
    @media (max-width: 480px) {
      body {
        padding: var(--space-md);
      }

      .login-card {
        padding: var(--space-lg);
      }

      .form-actions {
        flex-direction: column;
      }

      .login-header h1 {
        font-size: var(--font-size-xl);
      }
    }
  </style>
</head>

<body>
  <div class="login-container">
    <div class="login-card">
      <!-- Header -->
      <div class="login-header">
        <div class="login-logo">📦</div>
        <h1>Sistema Logístico</h1>
        <p>Acesse sua conta para continuar</p>
      </div>

      <!-- Alertas -->
      <div id="alertContainer"></div>

      <!-- Formulário -->
      <form class="login-form" id="loginForm" novalidate>
        <!-- Email -->
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input 
            id="email" 
            type="email" 
            class="form-control"
            placeholder="seu@email.com"
            required
            aria-describedby="email-hint"
            aria-invalid="false"
          />
          <span id="email-hint" class="form-error"></span>
        </div>

        <!-- Senha -->
        <div class="form-group">
          <label for="password" class="form-label">Senha</label>
          <div class="password-group">
            <input 
              id="password" 
              type="password" 
              class="form-control"
              placeholder="••••••••"
              required
              aria-describedby="password-hint"
              aria-invalid="false"
            />
            <button 
              type="button" 
              class="password-toggle" 
              id="passwordToggle"
              aria-label="Mostrar ou ocultar senha"
              aria-pressed="false"
            >
              👁️
            </button>
          </div>
          <span id="password-hint" class="form-error"></span>
        </div>

        <!-- Lembrar-me -->
        <div class="form-group">
          <label for="remember" style="display: flex; align-items: center; gap: var(--space-sm); font-weight: normal; cursor: pointer;">
            <input 
              id="remember" 
              type="checkbox" 
              aria-label="Lembrar-me nesta máquina"
            />
            <span>Lembrar-me nesta máquina</span>
          </label>
        </div>

        <!-- Ações -->
        <div class="form-actions" role="group" aria-label="Ações de autenticação">
          <button 
            type="submit" 
            class="btn btn-primary btn-login"
            id="submitBtn"
          >
            Entrar
          </button>
          <button 
            type="button" 
            class="btn btn-secondary btn-register"
            id="switchToRegister"
          >
            Criar Conta
          </button>
        </div>
      </form>

      <!-- Esqueci Senha -->
      <div class="login-footer">
        <a href="#" id="forgotPassword">Esqueci minha senha</a>
      </div>
    </div>
  </div>

  <script type="module">
    // [JavaScript completo será adicionado a seguir]
  </script>
</body>
</html>
```

### JavaScript do Login Melhorado

```javascript
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

// ==================== Configuração ====================

const config = {
  firebaseConfig: {
    apiKey: 'AIzaSyA88k9VQ3rjNt7OWTVwLYenrA0R4wwtPGs',
    authDomain: 'meu-sistema-f83ab.firebaseapp.com',
    projectId: 'meu-sistema-f83ab',
    storageBucket: 'meu-sistema-f83ab.firebasestorage.app',
    messagingSenderId: '33394533141',
    appId: '1:33394533141:web:785b4b4e0f139589bdbf1c'
  },
  baseUrl: window.location.pathname.includes('Ferramenta-geral-atualizado') 
    ? '/Ferramenta-geral-atualizado/' 
    : '/'
};

// ==================== Estado ====================

const state = {
  isLoading: false,
  isRegistering: false,
  currentMode: 'login' // 'login' ou 'register'
};

// ==================== Inicialização ====================

const app = initializeApp(config.firebaseConfig);
const auth = getAuth(app);

// Elements
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const submitBtn = document.getElementById('submitBtn');
const switchToRegister = document.getElementById('switchToRegister');
const alertContainer = document.getElementById('alertContainer');
const rememberCheckbox = document.getElementById('remember');
const forgotPasswordLink = document.getElementById('forgotPassword');

// ==================== Password Toggle ====================

passwordToggle.addEventListener('click', (e) => {
  e.preventDefault();
  
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  passwordToggle.textContent = isPassword ? '🙈' : '👁️';
  passwordToggle.setAttribute('aria-pressed', !isPassword);
});

// ==================== Validação ====================

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function setFieldError(input, errorId, message) {
  input.setAttribute('aria-invalid', !!message);
  const errorEl = document.getElementById(errorId);
  if (message) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  } else {
    errorEl.textContent = '';
    errorEl.style.display = 'none';
  }
}

// ==================== Alertas ====================

function showAlert(message, type = 'info') {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.setAttribute('role', 'alert');
  alert.textContent = message;
  
  alertContainer.innerHTML = '';
  alertContainer.appendChild(alert);
  
  // Auto-hide após 5 segundos
  setTimeout(() => {
    if (type !== 'error') {
      alert.remove();
    }
  }, 5000);
}

function clearAlerts() {
  alertContainer.innerHTML = '';
}

// ==================== Loading State ====================

function setLoading(loading) {
  state.isLoading = loading;
  submitBtn.disabled = loading;
  
  if (loading) {
    submitBtn.classList.add('btn-loading');
    submitBtn.innerHTML = '<span>Processando...</span>';
  } else {
    submitBtn.classList.remove('btn-loading');
    submitBtn.textContent = state.isRegistering ? 'Criar Conta' : 'Entrar';
  }
}

// ==================== Armazenar Preferência ====================

function savePreferences() {
  try {
    localStorage.setItem('loginPreferences', JSON.stringify({
      email: rememberCheckbox.checked ? emailInput.value : '',
      remember: rememberCheckbox.checked
    }));
  } catch (e) {
    console.warn('Falha ao salvar preferências:', e);
  }
}

function loadPreferences() {
  try {
    const prefs = JSON.parse(localStorage.getItem('loginPreferences')) || {};
    if (prefs.email) {
      emailInput.value = prefs.email;
      rememberCheckbox.checked = true;
    }
  } catch (e) {
    console.warn('Falha ao carregar preferências:', e);
  }
}

// ==================== Login ====================

async function handleLogin(e) {
  e.preventDefault();
  clearAlerts();
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  // Validação
  let hasError = false;
  
  if (!email) {
    setFieldError(emailInput, 'email-hint', 'Email obrigatório');
    hasError = true;
  } else if (!validateEmail(email)) {
    setFieldError(emailInput, 'email-hint', 'Email inválido');
    hasError = true;
  } else {
    setFieldError(emailInput, 'email-hint', '');
  }
  
  if (!password) {
    setFieldError(passwordInput, 'password-hint', 'Senha obrigatória');
    hasError = true;
  } else if (!validatePassword(password)) {
    setFieldError(passwordInput, 'password-hint', 'Mínimo 6 caracteres');
    hasError = true;
  } else {
    setFieldError(passwordInput, 'password-hint', '');
  }
  
  if (hasError) return;
  
  // Login
  setLoading(true);
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    
    savePreferences();
    showAlert('✅ Login realizado com sucesso!', 'success');
    
    // Redirect após 1.5 segundos
    setTimeout(() => {
      window.location.href = config.baseUrl + 'index.html';
    }, 1500);
    
  } catch (error) {
    setLoading(false);
    
    // Tratamento de erros específicos
    const errors = {
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Usuário desativado',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.'
    };
    
    const message = errors[error.code] || error.message;
    showAlert(message, 'error');
  }
}

// ==================== Cadastro ====================

async function handleRegister(e) {
  e.preventDefault();
  clearAlerts();
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  // Validação
  let hasError = false;
  
  if (!email) {
    setFieldError(emailInput, 'email-hint', 'Email obrigatório');
    hasError = true;
  } else if (!validateEmail(email)) {
    setFieldError(emailInput, 'email-hint', 'Email inválido');
    hasError = true;
  } else {
    setFieldError(emailInput, 'email-hint', '');
  }
  
  if (!password) {
    setFieldError(passwordInput, 'password-hint', 'Senha obrigatória');
    hasError = true;
  } else if (!validatePassword(password)) {
    setFieldError(passwordInput, 'password-hint', 'Mínimo 6 caracteres');
    hasError = true;
  } else {
    setFieldError(passwordInput, 'password-hint', '');
  }
  
  if (hasError) return;
  
  // Registro
  setLoading(true);
  
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    savePreferences();
    showAlert('✅ Conta criada com sucesso! Redirecionando...', 'success');
    
    setTimeout(() => {
      window.location.href = config.baseUrl + 'index.html';
    }, 1500);
    
  } catch (error) {
    setLoading(false);
    
    const errors = {
      'auth/email-already-in-use': 'Este email já está registrado',
      'auth/weak-password': 'Senha muito fraca',
      'auth/invalid-email': 'Email inválido',
      'auth/operation-not-allowed': 'Operação não permitida'
    };
    
    const message = errors[error.code] || error.message;
    showAlert(message, 'error');
  }
}

// ==================== Esqueci Senha ====================

forgotPasswordLink.addEventListener('click', async (e) => {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  
  if (!email || !validateEmail(email)) {
    showAlert('Digite um email válido no campo acima', 'info');
    emailInput.focus();
    return;
  }
  
  try {
    await sendPasswordResetEmail(auth, email);
    showAlert('✅ Email de recuperação enviado! Verifique sua caixa de entrada.', 'success');
  } catch (error) {
    showAlert('Erro ao enviar email de recuperação. Verifique se o email está correto.', 'error');
  }
});

// ==================== Switch entre Login/Registro ====================

switchToRegister.addEventListener('click', () => {
  state.isRegistering = !state.isRegistering;
  
  if (state.isRegistering) {
    document.querySelector('.login-header h1').textContent = 'Criar Conta';
    document.querySelector('.login-header p').textContent = 'Preencha os dados abaixo';
    submitBtn.textContent = 'Criar Conta';
    switchToRegister.textContent = 'Voltar para Login';
    form.onsubmit = handleRegister;
    forgotPasswordLink.style.display = 'none';
  } else {
    document.querySelector('.login-header h1').textContent = 'Sistema Logístico';
    document.querySelector('.login-header p').textContent = 'Acesse sua conta para continuar';
    submitBtn.textContent = 'Entrar';
    switchToRegister.textContent = 'Criar Conta';
    form.onsubmit = handleLogin;
    forgotPasswordLink.style.display = 'block';
  }
  
  clearAlerts();
  form.reset();
});

// ==================== Inicialização ====================

form.addEventListener('submit', handleLogin);
loadPreferences();
```

---

## 📱 RESPONSIVIDADE - BREAKPOINTS RECOMENDADOS

```css
/* Mobile First */

/* 480px - Tablets pequenos */
@media (min-width: 480px) {
  .container { max-width: 440px; }
}

/* 768px - Tablets */
@media (min-width: 768px) {
  .container { max-width: 740px; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* 1024px - Desktop */
@media (min-width: 1024px) {
  .container { max-width: 1000px; }
  .grid { grid-template-columns: repeat(3, 1fr); }
}

/* 1440px - Desktop Grande */
@media (min-width: 1440px) {
  .container { max-width: 1400px; }
}
```

---

## 🧮 TABELA RESPONSIVA MELHORADA

```html
<div class="table-responsive">
  <table class="table table-striped">
    <!-- conteúdo -->
  </table>
</div>
```

```css
.table-responsive {
  overflow-x: auto;
  margin-bottom: var(--space-lg);
}

@media (max-width: 768px) {
  .table-responsive {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
  }
  
  .table {
    font-size: var(--font-size-sm);
  }
  
  .table th,
  .table td {
    padding: var(--space-sm);
  }
}
```

---

## 📁 ARQUIVO COMPARTILHADO: `utils.js`

```javascript
/**
 * Utilitários compartilhados entre todas as páginas
 */

// ==================== Relógio ====================

export class HeaderClock {
  constructor(elementId, locale = 'pt-BR') {
    this.element = document.getElementById(elementId);
    this.locale = locale;
    this.interval = null;
  }

  start() {
    if (this.interval) clearInterval(this.interval);
    const update = () => this.element && (this.element.textContent = this.format());
    update();
    this.interval = setInterval(update, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  format() {
    const now = new Date();
    const date = now.toLocaleDateString(this.locale);
    const time = now.toLocaleTimeString(this.locale, { hour12: false });
    return `${date} • ${time}`;
  }
}

// ==================== Validação ====================

export const validators = {
  email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  password: (pwd, minLength = 6) => pwd.length >= minLength,
  cpf: (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    return cpf.length === 11;
  },
  phone: (phone) => /^(\d{10}|\d{11})$/.test(phone.replace(/\D/g, ''))
};

// ==================== Storage ====================

export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('Storage quota exceeded:', e);
      return false;
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.warn('Failed to parse storage value:', e);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn('Failed to remove from storage:', e);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.warn('Failed to clear storage:', e);
      return false;
    }
  }
};

// ==================== Debounce ====================

export function debounce(func, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// ==================== Format ====================

export const format = {
  currency: (value, locale = 'pt-BR') =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'BRL'
    }).format(value),

  number: (value, locale = 'pt-BR') =>
    new Intl.NumberFormat(locale).format(value),

  date: (date, locale = 'pt-BR') =>
    new Intl.DateTimeFormat(locale).format(date),

  dateTime: (date, locale = 'pt-BR') =>
    new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date)
};

// ==================== API ====================

export async function fetchAPI(url, options = {}) {
  const defaultOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    ...options
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// ==================== Toast Notifications ====================

export class Toast {
  constructor() {
    this.container = document.getElementById('toast-container') || 
                    this.createContainer();
  }

  createContainer() {
    const div = document.createElement('div');
    div.id = 'toast-container';
    div.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(div);
    return div;
  }

  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease-out;
    `;

    const bgColor = {
      success: '#d1fae5',
      error: '#fee2e2',
      info: '#dbeafe',
      warning: '#fef3c7'
    }[type] || '#dbeafe';

    toast.style.backgroundColor = bgColor;

    this.container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => toast.remove(), duration);
    }

    return toast;
  }
}

// ==================== Async Debounce (para eventos resize, scroll) ====================

export function createResizeObserver(callback, delay = 300) {
  const debouncedCallback = debounce(callback, delay);
  
  return new ResizeObserver(() => {
    debouncedCallback();
  });
}
```

---

## 📋 ESTRUTURA DE PASTAS RECOMENDADA

```
/projeto
├── index.html
├── login.html
├── /css
│   ├── design-system.css      (Novo)
│   ├── components.css         (Novo)
│   └── [outros estilos por página]
├── /js
│   ├── utils.js               (Novo - compartilhado)
│   ├── app.js                 (Novo - navegação principal)
│   └── [outros scripts por página]
├── /img
│   └── Imagem1.png
├── /pages
│   ├── batimento.html
│   ├── backlog.html
│   ├── dashboard-producao.html
│   └── [outros dashboards]
└── README.md
```

---

# 🎬 PRÓXIMAS AÇÕES

## ✅ Implementação Fase 1 (Urgente)

1. ✏️ Criar `design-system.css` (arquivo único de referência)
2. 🔑 Redesenhar login.html com novo código
3. 🧹 Atualizar `index.html` com novo design system
4. 📦 Criar `utils.js` com funções compartilhadas

## ✅ Implementação Fase 2 (1-2 semanas)

5. 📊 Refatorar cada dashboard para usar design system
6. ♿ Adicionar labels e ARIA attributes
7. 📱 Testar responsividade em todos breakpoints
8. ⚡ Otimizar performance (debounce, lazy loading)

## ✅ Implementação Fase 3 (2-4 semanas)

9. 🧪 Testes de acessibilidade (Axe DevTools)
10. 📈 Testar com usuários reais
11. 🔒 Auditoria de segurança
12. 📚 Documentação final

---

# 📚 REFERÊNCIAS E MELHORES PRÁTICAS

## Acessibilidade
- WCAG 2.1 Level AA: https://www.w3.org/WAI/WCAG21/quickref/
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/

## Design System
- Material Design 3: https://m3.material.io/
- Tailwind CSS: https://tailwindcss.com/docs
- Pico CSS: https://picocss.com/

## Performance
- Web Vitals: https://web.dev/vitals/
- Chrome DevTools: https://developer.chrome.com/docs/devtools/

## Segurança
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Firebase Security: https://firebase.google.com/docs/security/

---

**Desenvolvido por:** Especialista Front-end Sênior  
**Versão:** 1.0  
**Data:** 2026-06-23
