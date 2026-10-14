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
    if (typeof window.html2canvas === 'function') return Promise.resolve();
    // Usa CDN alternativo se o primeiro estiver indisponível.
    var sources = [
      'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
    ];
    return new Promise(function (resolve, reject) {
      var pending = document.querySelector('script[data-perecivel-html2canvas]');
      if (pending) pending.remove();
      function tryNext(i) {
        if (i === sources.length) {
          reject(new Error('Não foi possível carregar o gerador de PNG. Verifique sua conexão.'));
          return;
        }
        var script = document.createElement('script');
        script.src = sources[i];
        script.async = true;
        script.dataset.perecivelHtml2canvas = '1';
        script.onload = function () {
          if (typeof window.html2canvas === 'function') resolve();
          else { script.remove(); tryNext(i + 1); }
        };
        script.onerror = function () { script.remove(); tryNext(i + 1); };
        document.head.appendChild(script);
      }
      tryNext(0);
    });
  }

  function createExportBoard(page, size, totalPages, totalRows) {
    var kpis = document.querySelector('.kpis');
    var summary = document.querySelector('.summary');
    var table = document.querySelector('#tablewrap table');
    var chartCanvas = document.getElementById('chart');
    var count = document.getElementById('count');
    if (!kpis || !summary || !table || !chartCanvas) throw new Error('O dashboard ainda não terminou de carregar.');

    var board = document.createElement('div');
    board.setAttribute('aria-hidden', 'true');
    Object.assign(board.style, {
      position: 'absolute', left: '0', top: '0', width: '1400px', pointerEvents: 'none',
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
    if (totalPages > 1) {
      tableTitle.querySelector('div > div:last-child').textContent =
        'Registros ' + (firstRow + 1) + ' a ' + lastRow + ' de ' + totalRows +
        ' · Parte ' + (page + 1) + '/' + totalPages;
    }
    tableCard.appendChild(tableTitle);
    var tableClone = table.cloneNode(true);
    var firstRow = page * size;
    var lastRow = Math.min((page + 1) * size, totalRows);
    var tableBody = tableClone.tBodies[0];
    var selectedRows = Array.prototype.slice.call(tableBody.rows, firstRow, lastRow);
    tableBody.replaceChildren.apply(tableBody, selectedRows);
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

  // Agrupa as imagens em um único ZIP quando a lista ultrapassa uma página.
  async function zipPngParts(parts) {
    function wr16(buffer, i, value) {
      buffer[i] = value & 255; buffer[i+1] = (value >>> 8) & 255;
    }
    function wr32(buffer, i, value) {
      wr16(buffer, i, value & 65535); wr16(buffer, i+2, value >>> 16);
    }
    function crc32(data) {
      var crc = 0xffffffff;
      for (var i = 0; i < data.length; i++) {
        crc ^= data[i];
        for (var j = 0; j < 8; j++)
          crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
      }
      return (crc ^ 0xffffffff) >>> 0;
    }
    var files = [], catalog = [], offset = 0, catalogSize = 0;
    for (var part of parts) {
      var name = new TextEncoder().encode(part.name);
      var data = new Uint8Array(await part.blob.arrayBuffer());
      var crc = crc32(data);
      var header = new Uint8Array(30 + name.length);
      wr32(header, 0, 0x04034b50);
      wr16(header, 4, 20);
      wr32(header, 14, crc);
      wr32(header, 18, data.length);
      wr32(header, 22, data.length);
      wr16(header, 26, name.length);
      header.set(name, 30);
      files.push(header, data);
      var entry = new Uint8Array(46 + name.length);
      wr32(entry, 0, 0x02014b50);
      wr16(entry, 4, 20);
      wr16(entry, 6, 20);
      wr32(entry, 16, crc);
      wr32(entry, 20, data.length);
      wr32(entry, 24, data.length);
      wr16(entry, 28, name.length);
      wr32(entry, 42, offset);
      entry.set(name, 46);
      catalog.push(entry);
      offset += header.length + data.length;
      catalogSize += entry.length;
    }
    var end = new Uint8Array(22);
    wr32(end, 0, 0x06054b50);
    wr16(end, 8, parts.length); wr16(end, 10, parts.length);
    wr32(end, 12, catalogSize); wr32(end, 16, offset);
    return new Blob(files.concat(catalog, [end]), { type: 'application/zip' });
  }

  function downloadPngExport(file) {
    var url = URL.createObjectURL(file);
    var link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
  }

  async function exportPngEmail(button) {
    var tableBody = document.getElementById('body');
    if (!tableBody || !tableBody.rows.length) {
      if (window.showToast) window.showToast('Não há dados para exportar no momento.', 'warning');
      return;
    }
    var oldLabel = button.textContent;
    var board = null;
    button.disabled = true;
    try {
      await loadHtml2Canvas();
      var total = tableBody.rows.length;
      var pageSize = 35;
      var totalPages = Math.ceil(total / pageSize);
      var today = new Date();
      var stem = 'dashboard_pereciveis_' + today.getFullYear() + '-' +
        String(today.getMonth() + 1).padStart(2, '0') + '-' +
        String(today.getDate()).padStart(2, '0');
      var pages = [];
      for (var page = 0; page < totalPages; page++) {
        button.textContent = 'Gerando PNG ' + (page + 1) + '/' + totalPages + '...';
        board = createExportBoard(page, pageSize, totalPages, total);
        document.body.appendChild(board);
        var canvas = await window.html2canvas(board, {
          backgroundColor: '#fff', scale: 1.25, useCORS: true, logging: false,
          scrollX: 0, scrollY: 0, windowWidth: 1480
        });
        var blob = await new Promise(function (done) { canvas.toBlob(done, 'image/png'); });
        canvas.width = 0; canvas.height = 0;
        board.remove(); board = null;
        if (!blob) throw new Error('Falha ao gerar PNG, parte ' + (page + 1) + '.');
        var suffix = totalPages === 1 ? '' : '_parte_' + String(page + 1).padStart(2, '0');
        pages.push({ name: stem + suffix + '.png', blob: blob });
      }
      var file;
      if (pages.length === 1) {
        file = new File([pages[0].blob], pages[0].name, { type: 'image/png' });
      } else {
        var zip = await zipPngParts(pages);
        file = new File([zip], stem + '_PNGs.zip', { type: 'application/zip' });
      }
      var shared = false;
      if (navigator.share && navigator.canShare) {
        try {
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file], title: 'Dashboard de Perecíveis',
              text: pages.length > 1 ? 'Relatório completo em imagens PNG (ZIP).' : 'Dashboard de Perecíveis em PNG.'
            });
            shared = true;
          }
        } catch (error) {
          if (error && error.name === 'AbortError') return;
          console.warn('Compartilhamento indisponível:', error);
        }
      }
      if (shared) {
        if (window.showToast) window.showToast('Relatório compartilhado.', 'success');
        return;
      }
      downloadPngExport(file);
      if (window.showToast) window.showToast(
        pages.length === 1
          ? 'PNG salvo. Anexe o arquivo ao e-mail.'
          : 'ZIP com ' + pages.length + ' imagens PNG e todos os ' + total + ' registros salvo. Anexe ao e-mail.',
        'success'
      );
      var subject = encodeURIComponent('Dashboard de Perecíveis');
      var message = encodeURIComponent('Segue o dashboard de perecíveis.\n\nAnexe o arquivo baixado: ' + file.name);
      setTimeout(function () {
        window.location.href = 'mailto:?subject=' + subject + '&body=' + message;
      }, 350);
    } catch (error) {
      console.error('Falha na exportação de Perecíveis:', error);
      if (window.showToast) window.showToast(error.message || 'Não foi possível exportar o PNG.', 'error');
    } finally {
      if (board) board.remove();
      button.textContent = oldLabel;
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
