/* ============================================================================
 * Toast — notificação não-bloqueante, substituta do alert().
 * Script clássico (não-módulo): expõe window.showToast para uso direto nas
 * ferramentas, inclusive em handlers inline (onclick="...").
 *
 * Uso: showToast('Mensagem')                  // tipo inferido da mensagem
 *      showToast('Mensagem', 'success')        // tipo explícito
 *      showToast('Mensagem', 'error', 6000)    // tipo + duração (ms)
 * ==========================================================================*/
(function () {
  'use strict';

  if (window.showToast) return;

  var COLORS = {
    success: { bg: '#d1fae5', text: '#065f46', border: '#a7f3d0' },
    error:   { bg: '#fee2e2', text: '#7f1d1d', border: '#fecaca' },
    info:    { bg: '#dbeafe', text: '#082f49', border: '#bfdbfe' },
    warning: { bg: '#fef3c7', text: '#78350f', border: '#fde68a' }
  };

  var DEFAULT_DURATION = { success: 3500, info: 3500, warning: 4000, error: 5000 };

  function ensureAnimations() {
    if (document.getElementById('toast-animations')) return;
    var style = document.createElement('style');
    style.id = 'toast-animations';
    style.textContent =
      '@keyframes toastIn{from{opacity:0;transform:translateX(100px)}to{opacity:1;transform:translateX(0)}}' +
      '@keyframes toastOut{to{opacity:0;transform:translateX(100px)}}';
    document.head.appendChild(style);
  }

  function ensureContainer() {
    var existing = document.getElementById('toast-container');
    if (existing) return existing;
    var div = document.createElement('div');
    div.id = 'toast-container';
    div.setAttribute('role', 'region');
    div.setAttribute('aria-live', 'polite');
    div.setAttribute('aria-atomic', 'true');
    Object.assign(div.style, {
      position: 'fixed', top: '20px', right: '20px', zIndex: '99999',
      display: 'flex', flexDirection: 'column', gap: '10px', pointerEvents: 'none'
    });
    document.body.appendChild(div);
    return div;
  }

  /* Infere o tipo a partir do texto (ordem: erro > aviso > sucesso > info). */
  function inferType(message) {
    var m = String(message == null ? '' : message);
    if (/erro|falha|inválid|não suportad|não foi poss|não carreg|não está carregad|não encontrad|❌/i.test(m)) return 'error';
    if (/cancelad|nenhum|não há|preencha|primeiro|já existe|bloquead|selecione|defina|sem dias|sem iten|digite|não há alteração|vazia/i.test(m)) return 'warning';
    if (/salvo|salvos|carregad|adicionad|removid|renomead|atualizado para|lido e salvo|sucesso|✅/i.test(m)) return 'success';
    return 'info';
  }

  window.showToast = function (message, type, duration) {
    var msg = String(message == null ? '' : message);
    var t = type || inferType(msg);
    var color = COLORS[t] || COLORS.info;
    var ms = (typeof duration === 'number') ? duration : (DEFAULT_DURATION[t] || 3500);

    ensureAnimations();
    var container = ensureContainer();

    var toast = document.createElement('div');
    toast.setAttribute('role', 'alert');
    toast.className = 'toast toast-' + t;
    Object.assign(toast.style, {
      padding: '12px 16px', borderRadius: '8px', fontSize: '14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)', backgroundColor: color.bg,
      color: color.text, border: '1px solid ' + color.border,
      pointerEvents: 'auto', cursor: 'pointer', animation: 'toastIn 0.3s ease-out',
      minWidth: '250px', maxWidth: '380px', whiteSpace: 'pre-line', wordBreak: 'break-word'
    });
    toast.textContent = msg;

    function dismiss() {
      toast.style.animation = 'toastOut 0.3s ease-in';
      setTimeout(function () { toast.remove(); }, 300);
    }
    toast.addEventListener('click', dismiss);

    container.appendChild(toast);
    if (ms > 0) setTimeout(dismiss, ms);
    return toast;
  };
})();
