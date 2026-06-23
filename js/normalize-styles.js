// Normaliza cores inline para variáveis do design system (execução conservadora)
(function(){
  'use strict';
  const MAP = {
    '#e9f6ff': 'var(--color-primary)',
    '#d1dae3': 'var(--color-border)',
    '#c8d2dd': 'var(--color-border)',
    '#d8e1ea': 'var(--color-border)',
    '#eef3f8': 'var(--color-bg)',
    '#cfd6de': 'var(--color-border)',
    '#222222': 'var(--color-foreground)',
    '#222': 'var(--color-foreground)',
    '#666666': 'var(--color-muted)',
    '#666': 'var(--color-muted)'
  };

  function expandShortHex(sh){
    if(sh.length===4){ // #abc -> #aabbcc
      return '#' + sh[1]+sh[1] + sh[2]+sh[2] + sh[3]+sh[3];
    }
    return sh.toLowerCase();
  }

  function replaceHexes(styleStr){
    return styleStr.replace(/#([0-9a-fA-F]{3,6})/g, (m)=>{
      const full = expandShortHex(m);
      const key = full.toLowerCase();
      return MAP[key] || m;
    });
  }

  function normalize(){
    document.querySelectorAll('[style]').forEach(el=>{
      try{
        const s = el.getAttribute('style');
        if(!s || s.indexOf('#')===-1) return;
        const ns = replaceHexes(s);
        if(ns!==s) el.setAttribute('style', ns);
      }catch(e){ /* continue silently */ }
    });

    // Normalize inline style attributes on <style> tags inside HTML (rare)
    document.querySelectorAll('style').forEach(st=>{
      try{
        const txt = st.textContent;
        if(!txt || txt.indexOf('#')===-1) return;
        const nt = replaceHexes(txt);
        if(nt!==txt) st.textContent = nt;
      }catch(e){}
    });

    // Add helper classes to buttons without standardized classes
    document.querySelectorAll('button').forEach(btn=>{
      if(!btn.classList.contains('btn')){
        btn.classList.add('btn');
        // promote existing 'primary' and 'alt' to design system classes
        if(btn.classList.contains('primary')) btn.classList.add('btn--primary');
        if(btn.classList.contains('alt')) btn.classList.add('btn--alt');
      }
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', normalize);
  else normalize();
})();
