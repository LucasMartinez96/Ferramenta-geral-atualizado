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

/* Exportação PNG + compartilhamento por e-mail, exclusiva do Dashboard de Perecíveis. */
(function () {
  'use strict';

  function isPereciveisPage() {
    var path = '';
    try { path = decodeURIComponent(window.location.pathname || '').toLowerCase(); } catch (_) { path = String(window.location.pathname || '').toLowerCase(); }
    return path.indexOf('indicador perecivel.html') !== -1 ||
      (document.title === 'Dashboard de Perecíveis' && document.getElementById('chart') && document.getElementById('summaryTable') === null);
  }

  function loadHtml2Canvas() {
    return new Promise(function (resolve, reject) {
      if (typeof window.html2canvas === 'function') { resolve(); return; }
      var current = document.querySelector('script[data-perecivel-html2canvas]');
      if (current) {
        current.addEventListener('load', resolve, { once: true });
        current.addEventListener('error', function () { reject(new Error('Não foi possível carregar o gerador de PNG.')); }, { once: true });
        return;
      }
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
      script.async = true;
      script.dataset.perecivelHtml2canvas = '1';
      script.onload = resolve;
      script.onerror = function () { reject(new Error('Não foi possível carregar o gerador de PNG.')); };
      document.head.appendChild(script);
    });
  }

  function createExportBoard() {
    var kpis = document.querySelector('.kpis');
    var summary = document.querySelector('.summary');
    var table = document.querySelector('#tablewrap table');
    var chartCanvas = document.getElementById('chart');
    var count = document.getElementById('count');
    if (!kpis || !summary || !table || !chartCanvas) throw new Error('O dashboard ainda não terminou de carregar.');

    var board = document.createElement('div');
    board.setAttribute('aria-hidden', 'true');
    Object.assign(board.style, {
      position: 'fixed', left: '-20000px', top: '0', width: '1400px',
      background: '#ffffff', color: '#172033', padding: '32px',
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif', zIndex: '-1'
    });

    var header = document.createElement('div');
    header.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:24px;margin-bottom:22px">' +
      '<div><div style="font-size:30px;font-weight:900;color:#172554;line-height:1.1">Dashboard de Perecíveis</div>' +
      '<div style="margin-top:6px;font-size:14px;color:#475569">Gráfico e tabela para compartilhamento</div>' +
      '<div style="margin-top:8px;font-size:13px;color:#64748b">Gerado em ' + new Date().toLocaleString('pt-BR') + '</div></div>' +
      '<div style="padding:10px 14px;border-radius:12px;background:#172554;color:#fff;font-size:12px;font-weight:800">SESÉ</div></div>';
    board.appendChild(header);

    var kpisClone = kpis.cloneNode(true);
    Object.assign(kpisClone.style, { gridTemplateColumns: 'repeat(5,1fr)', margin: '0 0 18px 0' });
    board.appendChild(kpisClone);

    var grid = document.createElement('div');
    Object.assign(grid.style, { display: 'grid', gridTemplateColumns: '1.25fr .75fr', gap: '14px', marginBottom: '18px' });

    var chartCard = document.createElement('div');
    Object.assign(chartCard.style, { border: '1px solid #dbe3ef', borderRadius: '14px', padding: '18px', background: '#fff' });
    var chartTitle = document.createElement('div');
    chartTitle.innerHTML = '<div style="font-size:18px;font-weight:800;color:#172033">Distribuição por faixa de validade</div><div style="font-size:13px;color:#64748b;margin-top:4px;margin-bottom:12px">Materiais únicos pelo vencimento mais próximo.</div>';
    chartCard.appendChild(chartTitle);
    var chartImg = document.createElement('img');
    chartImg.src = chartCanvas.toDataURL('image/png', 1);
    chartImg.alt = '';
    Object.assign(chartImg.style, { width: '100%', height: 'auto', display: 'block' });
    chartCard.appendChild(chartImg);
    grid.appendChild(chartCard);

    var summaryCard = document.createElement('div');
    Object.assign(summaryCard.style, { border: '1px solid #dbe3ef', borderRadius: '14px', padding: '18px', background: '#fff' });
    var summaryTitle = document.createElement('div');
    summaryTitle.innerHTML = '<div style="font-size:18px;font-weight:800;color:#172033">Resumo da base</div><div style="font-size:13px;color:#64748b;margin-top:4px;margin-bottom:12px">Consolidado do arquivo carregado.</div>';
    summaryCard.appendChild(summaryTitle);
    var summaryClone = summary.cloneNode(true);
    Object.assign(summaryClone.style, { padding: '0', gridTemplateColumns: 'repeat(2,1fr)' });
    summaryCard.appendChild(summaryClone);
    grid.appendChild(summaryCard);
    board.appendChild(grid);

    var tableCard = document.createElement('div');
    Object.assign(tableCard.style, { border: '1px solid #dbe3ef', borderRadius: '14px', overflow: 'hidden', background: '#fff' });
    var tableTitle = document.createElement('div');
    tableTitle.innerHTML = '<div style="padding:16px 18px;border-bottom:1px solid #dbe3ef"><div style="font-size:18px;font-weight:800;color:#172033">Tabela de materiais perecíveis</div><div style="font-size:13px;color:#64748b;margin-top:4px">' + (count ? count.textContent : '') + '</div></div>';
    tableCard.appendChild(tableTitle);
    var tableClone = table.cloneNode(true);
    tableClone.style.width = '100%';
    tableClone.style.minWidth = '0';
    tableClone.style.fontSize = '12px';
    Array.prototype.forEach.call(tableClone.querySelectorAll('th'), function (th) { th.style.position = 'static'; });
    Array.prototype.forEach.call(tableClone.querySelectorAll('td,th'), function (cell) { cell.style.padding = '9px 10px'; });
    tableCard.appendChild(tableClone);
    board.appendChild(tableCard);

    var footer = document.createElement('div');
    footer.textContent = 'Desenvolvido por Lucas Martinez';
    Object.assign(footer.style, { marginTop: '14px', fontSize: '11px', color: '#94a3b8', textAlign: 'right' });
    board.appendChild(footer);
    return board;
  }

  async function exportPngEmail(button) {
    var tableBody = document.getElementById('body');
    if (!tableBody || !tableBody.children.length) {
      if (window.showToast) window.showToast('Não há dados para exportar no momento.', 'warning');
      return;
    }

    var oldText = button.textContent;
    var board = null;
    button.disabled = true;
    button.textContent = 'Gerando PNG...';
    try {
      await loadHtml2Canvas();
      board = createExportBoard();
      document.body.appendChild(board);
      var canvas = await window.html2canvas(board, { backgroundColor: '#ffffff', scale: 2, useCORS: true, logging: false });
      var blob = await new Promise(function (resolve) { canvas.toBlob(resolve, 'image/png'); });
      if (!blob) throw new Error('Não foi possível gerar o PNG.');

      var now = new Date();
      var fileName = 'dashboard_pereciveis_' + now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + '.png';
      var file = new File([blob], fileName, { type: 'image/png' });
      var shared = false;

      if (navigator.share && navigator.canShare) {
        try {
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: 'Dashboard de Perecíveis', text: 'Segue o dashboard de perecíveis em PNG com gráfico e tabela.' });
            shared = true;
            if (window.showToast) window.showToast('PNG pronto para compartilhamento.', 'success');
          }
        } catch (shareError) {
          if (shareError && shareError.name !== 'AbortError') console.warn(shareError);
        }
      }

      if (!shared) {
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
        var subject = encodeURIComponent('Dashboard de Perecíveis');
        var body = encodeURIComponent('Segue o dashboard de perecíveis em PNG com gráfico e tabela.\n\nAnexe ao e-mail o arquivo PNG que foi baixado automaticamente.');
        setTimeout(function () { window.location.href = 'mailto:?subject=' + subject + '&body=' + body; }, 350);
        if (window.showToast) window.showToast('PNG gerado. O download foi iniciado e o e-mail foi aberto para anexar a imagem.', 'success');
      }
    } catch (error) {
      console.error(error);
      if (window.showToast) window.showToast(error.message || 'Falha ao gerar o PNG do dashboard.', 'error');
    } finally {
      if (board && board.parentNode) board.remove();
      button.textContent = oldText;
      button.disabled = false;
    }
  }

  function installPereciveisExport() {
    if (!isPereciveisPage()) return;
    var actions = document.querySelector('.actions');
    var uploadButton = document.getElementById('uploadBtn');
    if (!actions || !uploadButton || document.getElementById('exportPngEmailBtn')) return;
    var button = document.createElement('button');
    button.id = 'exportPngEmailBtn';
    button.type = 'button';
    button.className = 'upload';
    button.textContent = 'PNG / E-mail';
    button.setAttribute('aria-label', 'Exportar gráfico e tabela em PNG para compartilhar por e-mail');
    Object.assign(button.style, { background: '#dbeafe', color: '#172554' });
    button.addEventListener('click', function () { exportPngEmail(button); });
    actions.insertBefore(button, uploadButton.nextSibling);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installPereciveisExport, { once: true });
  else installPereciveisExport();
})();
