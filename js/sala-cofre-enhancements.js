// Aprimoramentos exclusivos da Sala Cofre: exportação PNG e histórico visual.
(function(){
  'use strict';
  function isSalaCofrePage(){
    return !!(document.body && document.body.classList.contains('sala-cofre-polished'));
  }

  function ensureSalaEnhancementStyles(){
    if(document.getElementById('sala-cofre-enhancements')) return;
    const style = document.createElement('style');
    style.id = 'sala-cofre-enhancements';
    style.textContent = `
      body.sala-cofre-polished #btnExportarPNG{
        color:#fff !important;
        background:rgba(37,99,235,.34) !important;
        border-color:rgba(191,219,254,.34) !important;
      }
      body.sala-cofre-polished #btnExportarPNG:hover:not(:disabled){
        background:rgba(37,99,235,.52) !important;
      }
      body.sala-cofre-polished .grid{
        grid-template-columns:minmax(0,1.4fr) minmax(320px,.6fr);
      }
      body.sala-cofre-polished .grid > .box:first-child{
        position:relative;
      }
      body.sala-cofre-polished .grid > .box:first-child > div:has(#chartHistoricoInv){
        height:360px !important;
      }
      body.sala-cofre-polished .history-insights{
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:10px;
        margin:0 0 12px;
      }
      body.sala-cofre-polished .history-stat{
        min-width:0;
        padding:10px 12px;
        border:1px solid var(--sc-border,#e2e8f0);
        border-radius:10px;
        background:var(--sc-soft,#f8fafc);
      }
      body.sala-cofre-polished .history-stat-label{
        display:block;
        margin-bottom:4px;
        color:var(--sc-muted,#64748b);
        font-size:10px;
        font-weight:800;
        letter-spacing:.045em;
        text-transform:uppercase;
      }
      body.sala-cofre-polished .history-stat-value{
        display:block;
        color:var(--sc-text,#1e293b);
        font-size:18px;
        font-weight:800;
        line-height:1.1;
        font-variant-numeric:tabular-nums;
      }
      body.sala-cofre-polished .history-stat-sub{
        display:block;
        margin-top:3px;
        color:var(--sc-muted,#64748b);
        font-size:11px;
        line-height:1.25;
      }
      @media(max-width:1120px){
        body.sala-cofre-polished .grid{grid-template-columns:1fr !important;}
      }
      @media(max-width:640px){
        body.sala-cofre-polished .history-insights{grid-template-columns:1fr;}
        body.sala-cofre-polished .grid > .box:first-child > div:has(#chartHistoricoInv){height:320px !important;}
      }
    `;
    document.head.appendChild(style);
  }

  function loadHtml2Canvas(){
    return new Promise((resolve,reject)=>{
      if(typeof window.html2canvas === 'function'){ resolve(); return; }
      const current = document.querySelector('script[data-sala-html2canvas]');
      if(current){
        current.addEventListener('load',resolve,{once:true});
        current.addEventListener('error',()=>reject(new Error('Não foi possível carregar o gerador de PNG.')),{once:true});
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
      script.async = true;
      script.dataset.salaHtml2canvas = '1';
      script.onload = resolve;
      script.onerror = ()=>reject(new Error('Não foi possível carregar o gerador de PNG.'));
      document.head.appendChild(script);
    });
  }

  async function exportSalaCofrePNG(button){
    if(!isSalaCofrePage()) return;
    const oldText = button.textContent;
    const header = document.querySelector('.app-header');
    const oldHeaderPosition = header ? header.style.position : '';
    button.disabled = true;
    button.textContent = 'Gerando PNG...';
    try{
      await loadHtml2Canvas();
      button.style.visibility = 'hidden';
      if(header) header.style.position = 'relative';
      const canvas = await window.html2canvas(document.body,{
        backgroundColor:'#f8fafc',
        scale:Math.min(2,Math.max(1,window.devicePixelRatio || 1)),
        useCORS:true,
        logging:false,
        scrollX:0,
        scrollY:-window.scrollY,
        windowWidth:document.documentElement.scrollWidth,
        windowHeight:document.documentElement.scrollHeight
      });
      const blob = await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
      if(!blob) throw new Error('Não foi possível gerar o PNG.');
      const now = new Date();
      const fileName = `sala_cofre_${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}.png`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(()=>URL.revokeObjectURL(url),5000);
      if(typeof window.showToast === 'function') window.showToast('PNG da Sala Cofre gerado com sucesso.','success');
    }catch(error){
      console.error(error);
      if(typeof window.showToast === 'function') window.showToast(error.message || 'Falha ao gerar o PNG.','error');
    }finally{
      button.style.visibility = '';
      if(header) header.style.position = oldHeaderPosition;
      button.disabled = false;
      button.textContent = oldText;
    }
  }

  function installSalaPngButton(){
    if(!isSalaCofrePage() || document.getElementById('btnExportarPNG')) return;
    const actions = document.querySelector('.app-header .right');
    if(!actions) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'btnExportarPNG';
    button.className = 'btn-hdr';
    button.textContent = 'Exportar PNG';
    button.setAttribute('aria-label','Exportar painel da Sala Cofre em PNG');
    button.addEventListener('click',()=>exportSalaCofrePNG(button));
    const csvButton = document.getElementById('btnBaixarCSV');
    if(csvButton && csvButton.parentNode === actions) csvButton.insertAdjacentElement('afterend',button);
    else actions.appendChild(button);
  }

  function renderHistoryInsights(values,labels){
    const canvas = document.getElementById('chartHistoricoInv');
    const box = canvas && canvas.closest('.box');
    if(!box) return;
    let wrap = box.querySelector('.history-insights');
    if(!wrap){
      wrap = document.createElement('div');
      wrap.className = 'history-insights';
      const chartWrap = canvas.parentElement;
      box.insertBefore(wrap,chartWrap);
    }
    if(!values.length){
      wrap.innerHTML = `
        <div class="history-stat"><span class="history-stat-label">Última acuracidade</span><span class="history-stat-value">—</span><span class="history-stat-sub">Sem inventários salvos</span></div>
        <div class="history-stat"><span class="history-stat-label">Média do período</span><span class="history-stat-value">—</span><span class="history-stat-sub">Aguardando histórico</span></div>
        <div class="history-stat"><span class="history-stat-label">Variação</span><span class="history-stat-value">—</span><span class="history-stat-sub">Sem comparação anterior</span></div>`;
      return;
    }
    const last = values[values.length-1];
    const avg = values.reduce((a,b)=>a+b,0)/values.length;
    const previous = values.length > 1 ? values[values.length-2] : null;
    const delta = previous == null ? null : last - previous;
    const deltaText = delta == null ? '—' : `${delta >= 0 ? '+' : ''}${delta.toFixed(1)} p.p.`;
    const deltaSub = delta == null ? 'Primeiro registro do histórico' : `${labels[labels.length-2]} → ${labels[labels.length-1]}`;
    wrap.innerHTML = `
      <div class="history-stat"><span class="history-stat-label">Última acuracidade</span><span class="history-stat-value">${last.toFixed(1)}%</span><span class="history-stat-sub">${labels[labels.length-1]}</span></div>
      <div class="history-stat"><span class="history-stat-label">Média do período</span><span class="history-stat-value">${avg.toFixed(1)}%</span><span class="history-stat-sub">${values.length} inventário${values.length===1?'':'s'}</span></div>
      <div class="history-stat"><span class="history-stat-label">Variação</span><span class="history-stat-value">${deltaText}</span><span class="history-stat-sub">${deltaSub}</span></div>`;
  }

  function installEnhancedHistoryChart(){
    if(!isSalaCofrePage() || typeof window.Chart === 'undefined') return;
    const canvas = document.getElementById('chartHistoricoInv');
    if(!canvas) return;

    const draw = function(){
      const ctx = document.getElementById('chartHistoricoInv');
      if(!ctx || typeof window.Chart === 'undefined') return;
      try{
        const hist = JSON.parse(localStorage.getItem('historico_inventarios') || '[]');
        const ordered = Array.isArray(hist) ? [...hist].sort((a,b)=>String(a.data||'').localeCompare(String(b.data||''))) : [];
        const labels = ordered.map(h=>String(h.data||'').split('-').reverse().join('/'));
        const values = ordered.map(h=>Number(Number(h.acuracia||0).toFixed(2)));
        renderHistoryInsights(values,labels);
        ctx.setAttribute('role','img');
        ctx.setAttribute('aria-label',values.length
          ? `Histórico de acuracidade com ${values.length} registros. Última acuracidade ${values[values.length-1].toFixed(1)} por cento.`
          : 'Histórico de acuracidade sem registros.');

        try{
          const existing = window.Chart.getChart ? window.Chart.getChart(ctx) : null;
          if(existing) existing.destroy();
        }catch(e){}
        try{ if(typeof chartInv !== 'undefined' && chartInv) chartInv.destroy(); }catch(e){}

        const context = ctx.getContext('2d');
        const gradient = context.createLinearGradient(0,0,0,340);
        gradient.addColorStop(0,'rgba(37,99,235,.30)');
        gradient.addColorStop(1,'rgba(37,99,235,.02)');
        const avg = values.length ? values.reduce((a,b)=>a+b,0)/values.length : 0;
        const minValue = values.length ? Math.min(...values) : 0;
        const axisMin = values.length && minValue >= 70 ? Math.max(0,Math.floor(minValue-5)) : 0;
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const instance = new window.Chart(ctx,{
          type:'line',
          data:{
            labels,
            datasets:[
              {
                label:'Acuracidade (%)',
                data:values,
                borderColor:'#2563eb',
                backgroundColor:gradient,
                fill:true,
                borderWidth:3,
                tension:.32,
                pointRadius:c=>c.dataIndex===values.length-1?5:3.5,
                pointHoverRadius:7,
                pointBorderWidth:2,
                pointBorderColor:'#2563eb',
                pointBackgroundColor:c=>c.dataIndex===values.length-1?'#2563eb':'#ffffff'
              },
              {
                label:'Média do período',
                data:values.map(()=>Number(avg.toFixed(2))),
                borderColor:'#94a3b8',
                borderWidth:1.5,
                borderDash:[6,6],
                pointRadius:0,
                pointHoverRadius:0,
                fill:false,
                tension:0
              }
            ]
          },
          options:{
            responsive:true,
            maintainAspectRatio:false,
            interaction:{mode:'index',intersect:false},
            animation:{duration:reduceMotion?0:350},
            plugins:{
              legend:{
                position:'bottom',
                labels:{usePointStyle:true,boxWidth:8,boxHeight:8,padding:18,color:'#475569',font:{size:12,weight:'600'}}
              },
              tooltip:{
                backgroundColor:'#0f172a',
                titleColor:'#fff',
                bodyColor:'#e2e8f0',
                padding:12,
                displayColors:true,
                callbacks:{
                  label:function(context){
                    return `${context.dataset.label}: ${Number(context.parsed.y||0).toFixed(1)}%`;
                  },
                  afterBody:function(items){
                    if(!items || !items.length || items[0].datasetIndex !== 0) return '';
                    const idx = items[0].dataIndex;
                    if(idx <= 0) return 'Primeiro registro do histórico';
                    const delta = values[idx]-values[idx-1];
                    return `Variação vs. anterior: ${delta>=0?'+':''}${delta.toFixed(1)} p.p.`;
                  }
                }
              }
            },
            scales:{
              x:{
                grid:{display:false},
                ticks:{color:'#64748b',maxRotation:0,autoSkip:true,maxTicksLimit:9,font:{size:11}}
              },
              y:{
                min:axisMin,
                max:100,
                grid:{color:'#e8edf4',drawBorder:false},
                border:{display:false},
                ticks:{color:'#64748b',padding:8,callback:v=>`${v}%`,font:{size:11}}
              }
            }
          }
        });
        try{ chartInv = instance; }catch(e){}
      }catch(error){
        console.error('Erro ao desenhar histórico aprimorado:',error);
      }
    };

    window.desenharHistoricoInventarios = draw;
    draw();
  }

  function enhanceSalaCofre(){
    if(!isSalaCofrePage()) return;
    ensureSalaEnhancementStyles();
    installSalaPngButton();
    installEnhancedHistoryChart();
  }
  enhanceSalaCofre();
})();
