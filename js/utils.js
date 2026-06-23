/**
 * UTILITÁRIOS COMPARTILHADOS - utils.js
 * Funções e classes compartilhadas entre todas as páginas
 * 
 * Uso: import { HeaderClock, validators, storage } from './js/utils.js';
 */

// ========================================================================
// RELÓGIO DO HEADER
// ========================================================================

export class HeaderClock {
  /**
   * @param {string} elementId - ID do elemento para mostrar o relógio
   * @param {string} locale - Locale para formatação (default: 'pt-BR')
   * @param {boolean} includeSeconds - Incluir segundos (default: true)
   */
  constructor(elementId, locale = 'pt-BR', includeSeconds = true) {
    this.element = document.getElementById(elementId);
    this.locale = locale;
    this.includeSeconds = includeSeconds;
    this.interval = null;
  }

  /**
   * Inicia o relógio atualizado a cada segundo
   */
  start() {
    if (this.interval) clearInterval(this.interval);

    const update = () => {
      if (this.element) {
        this.element.textContent = this.format();
      }
    };

    update(); // Atualização imediata
    this.interval = setInterval(update, 1000);
  }

  /**
   * Para o relógio
   */
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  /**
   * Retorna o horário formatado
   * @returns {string} Data e hora formatadas
   */
  format() {
    const now = new Date();
    const date = now.toLocaleDateString(this.locale);

    const timeOptions = {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      ...(this.includeSeconds && { second: '2-digit' })
    };

    const time = now.toLocaleTimeString(this.locale, timeOptions);
    return `${date} • ${time}`;
  }
}

// ========================================================================
// VALIDADORES
// ========================================================================

export const validators = {
  /**
   * Valida email
   */
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
  },

  /**
   * Valida senha
   */
  password: (password, minLength = 6) => {
    return String(password).length >= minLength;
  },

  /**
   * Valida CPF (Brasil)
   */
  cpf: (cpf) => {
    cpf = String(cpf).replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  },

  /**
   * Valida telefone (Brasil)
   */
  phone: (phone) => {
    const cleaned = String(phone).replace(/\D/g, '');
    return cleaned.length === 10 || cleaned.length === 11;
  },

  /**
   * Valida URL
   */
  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Valida data (DD/MM/YYYY ou YYYY-MM-DD)
   */
  date: (dateString) => {
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$|^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  },

  /**
   * Valida que um valor não está vazio
   */
  required: (value) => {
    return value !== null &&
           value !== undefined &&
           String(value).trim() !== '';
  },

  /**
   * Valida comprimento mínimo
   */
  minLength: (value, min) => {
    return String(value).length >= min;
  },

  /**
   * Valida comprimento máximo
   */
  maxLength: (value, max) => {
    return String(value).length <= max;
  },

  /**
   * Valida intervalo numérico
   */
  range: (value, min, max) => {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
  }
};

// ========================================================================
// ARMAZENAMENTO (LocalStorage com fallback)
// ========================================================================

export const storage = {
  /**
   * Salva um valor no localStorage
   */
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn('Storage quota exceeded:', error);
      return false;
    }
  },

  /**
   * Obtém um valor do localStorage
   */
  get: (key, defaultValue = null) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.warn('Failed to parse storage value:', error);
      return defaultValue;
    }
  },

  /**
   * Remove um valor do localStorage
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn('Failed to remove from storage:', error);
      return false;
    }
  },

  /**
   * Limpa todo o localStorage
   */
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Failed to clear storage:', error);
      return false;
    }
  },

  /**
   * Verifica se a chave existe
   */
  has: (key) => {
    return localStorage.getItem(key) !== null;
  }
};

// ========================================================================
// DEBOUNCE E THROTTLE
// ========================================================================

/**
 * Debounce - aguarda delay após última chamada
 */
export function debounce(func, delay = 300) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle - executa no máximo 1x a cada delay
 */
export function throttle(func, delay = 300) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      func(...args);
      lastCall = now;
    }
  };
}

// ========================================================================
// FORMATAÇÃO
// ========================================================================

export const format = {
  /**
   * Formata moeda (BRL)
   */
  currency: (value, locale = 'pt-BR') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(value));
  },

  /**
   * Formata número
   */
  number: (value, locale = 'pt-BR', options = {}) => {
    return new Intl.NumberFormat(locale, options).format(Number(value));
  },

  /**
   * Formata data
   */
  date: (date, locale = 'pt-BR') => {
    return new Intl.DateTimeFormat(locale).format(new Date(date));
  },

  /**
   * Formata data e hora
   */
  dateTime: (date, locale = 'pt-BR') => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date(date));
  },

  /**
   * Formata hora
   */
  time: (date, locale = 'pt-BR') => {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date(date));
  },

  /**
   * Formata percentual
   */
  percent: (value, decimals = 2) => {
    return (Number(value) * 100).toFixed(decimals) + '%';
  },

  /**
   * Formata CPF
   */
  cpf: (cpf) => {
    cpf = String(cpf).replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  /**
   * Formata telefone
   */
  phone: (phone) => {
    phone = String(phone).replace(/\D/g, '');
    if (phone.length === 11) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  },

  /**
   * Formata bytes para unidade legível (KB, MB, GB)
   */
  bytes: (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';

    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  },

  /**
   * Formata tempo decorrido em formato legível
   */
  timeAgo: (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      'ano': 31536000,
      'mês': 2592000,
      'semana': 604800,
      'dia': 86400,
      'hora': 3600,
      'minuto': 60
    };

    for (const [name, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);
      if (interval >= 1) {
        return `${interval} ${name}${interval > 1 ? 's' : ''} atrás`;
      }
    }
    return 'agora mesmo';
  }
};

// ========================================================================
// REQUISIÇÕES (Fetch com tratamento)
// ========================================================================

/**
 * Wrapper para fetch com tratamento de erro
 */
export async function fetchAPI(url, options = {}) {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return await response.text();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// ========================================================================
// NOTIFICAÇÕES (Toast)
// ========================================================================

export class Toast {
  constructor() {
    this.container = this.createContainer();
  }

  createContainer() {
    const existing = document.getElementById('toast-container');
    if (existing) return existing;

    const div = document.createElement('div');
    div.id = 'toast-container';
    div.setAttribute('role', 'region');
    div.setAttribute('aria-live', 'polite');
    div.setAttribute('aria-atomic', 'true');

    Object.assign(div.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: '9999',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      pointerEvents: 'none'
    });

    document.body.appendChild(div);
    return div;
  }

  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.setAttribute('role', 'alert');
    toast.className = `toast toast-${type}`;

    const colors = {
      success: { bg: '#d1fae5', text: '#065f46', border: '#a7f3d0' },
      error: { bg: '#fee2e2', text: '#7f1d1d', border: '#fecaca' },
      info: { bg: '#dbeafe', text: '#082f49', border: '#bfdbfe' },
      warning: { bg: '#fef3c7', text: '#78350f', border: '#fde68a' }
    };

    const color = colors[type] || colors.info;

    Object.assign(toast.style, {
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      backgroundColor: color.bg,
      color: color.text,
      border: `1px solid ${color.border}`,
      pointerEvents: 'auto',
      animation: 'slideInRight 0.3s ease-out',
      minWidth: '250px'
    });

    toast.textContent = message;

    this.container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }

    return toast;
  }

  success(message, duration = 3000) {
    return this.show(message, 'success', duration);
  }

  error(message, duration = 5000) {
    return this.show(message, 'error', duration);
  }

  info(message, duration = 3000) {
    return this.show(message, 'info', duration);
  }

  warning(message, duration = 4000) {
    return this.show(message, 'warning', duration);
  }
}

// Adiciona animações ao document.head se não existirem
export function ensureAnimations() {
  const style = document.getElementById('toast-animations');
  if (!style) {
    const styleEl = document.createElement('style');
    styleEl.id = 'toast-animations';
    styleEl.textContent = `
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes slideOutRight {
        to {
          opacity: 0;
          transform: translateX(100px);
        }
      }
    `;
    document.head.appendChild(styleEl);
  }
}

// ========================================================================
// MODAIS
// ========================================================================

export class Modal {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.overlay = this.element?.closest('[data-modal-overlay]');
    this.isOpen = false;
  }

  open() {
    if (!this.element) return;

    this.element.style.display = 'flex';
    this.element.setAttribute('aria-hidden', 'false');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.element) return;

    this.element.style.display = 'none';
    this.element.setAttribute('aria-hidden', 'true');
    this.isOpen = false;
    document.body.style.overflow = 'auto';
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

// ========================================================================
// RESIZE OBSERVER
// ========================================================================

export function createResizeObserver(callback, delay = 300) {
  const debouncedCallback = debounce(callback, delay);

  return new ResizeObserver(() => {
    debouncedCallback();
  });
}

// ========================================================================
// INTERSECTION OBSERVER (Lazy loading)
// ========================================================================

export function observeLazyLoad(selector = '[data-lazy]') {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        if (element.tagName === 'IMG' && element.dataset.src) {
          element.src = element.dataset.src;
          element.removeAttribute('data-src');
        } else if (element.dataset.src) {
          element.style.backgroundImage = `url(${element.dataset.src})`;
          element.removeAttribute('data-src');
        }
        observer.unobserve(element);
      }
    });
  });

  document.querySelectorAll(selector).forEach((el) => {
    observer.observe(el);
  });

  return observer;
}

// ========================================================================
// UTILITÁRIOS DIVERSOS
// ========================================================================

/**
 * Gera um ID único
 */
export function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Copia texto para a área de transferência
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}

/**
 * Verifica se o dispositivo é mobile
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Verifica suporte a localStorage
 */
export function hasLocalStorage() {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Espera por um tempo (async sleep)
 */
export function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Normaliza texto (remove acentos, converte para minúsculas)
 */
export function normalize(text) {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Capitaliza primeira letra de cada palavra
 */
export function capitalize(text) {
  return String(text)
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// ========================================================================
// INICIALIZAÇÃO GLOBAL
// ========================================================================

export function initializeUtils() {
  // Adiciona animações CSS
  ensureAnimations();

  // Log de inicialização (opcional)
  console.log('[Utils] Utilitários carregados com sucesso');
}

// Auto-inicializa ao carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeUtils);
} else {
  initializeUtils();
}
