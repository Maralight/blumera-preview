(function(){
  "use strict";
  const cfg=window.BLUMERA_CONFIG||{};
  document.querySelectorAll("[data-current-year]").forEach(el=>el.textContent=new Date().getFullYear());
  document.querySelectorAll("[data-company-email]").forEach(el=>{el.textContent=cfg.email||el.textContent;el.href=`mailto:${cfg.email}`});
  document.querySelectorAll("[data-company-phone]").forEach(el=>{el.textContent=cfg.phoneDisplay||el.textContent;el.href=`tel:${cfg.phoneLink}`});
  document.querySelectorAll("[data-office-lagos]").forEach(el=>el.textContent=cfg.officeLagos||el.textContent);
  document.querySelectorAll("[data-office-ph]").forEach(el=>el.textContent=cfg.officePortHarcourt||el.textContent);
  document.querySelectorAll("[data-maralight-link]").forEach(el=>el.href=cfg.maralightUrl||el.href);

  if(cfg.whatsappEnabled&&cfg.whatsappLink){
    const wa=document.createElement("a");
    wa.className="whatsapp-float";
    wa.href=`https://wa.me/${String(cfg.whatsappLink).replace(/\D/g,"")}?text=${encodeURIComponent(cfg.whatsappMessage||"Hello Blumera, I would like to make an enquiry.")}`;
    wa.target="_blank";wa.rel="noopener";wa.setAttribute("aria-label",`Chat with Blumera on WhatsApp at ${cfg.whatsappDisplay||cfg.whatsappLink}`);
    wa.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M27.3 4.7A15.5 15.5 0 0 0 2.9 23.4L.7 31.5l8.3-2.2A15.5 15.5 0 0 0 27.3 4.7Zm-11 23.7c-2.3 0-4.5-.6-6.4-1.8l-.5-.3-4.9 1.3 1.3-4.8-.3-.5a12.8 12.8 0 1 1 10.8 6.1Zm7-9.6c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.6-.2-.9.2-.3.4-1.1 1.3-1.3 1.6-.2.3-.5.3-.9.1-2.3-1.1-3.8-2-5.4-4.6-.4-.7.4-.7 1.1-2.2.1-.3 0-.6-.1-.8-.1-.2-.9-2.1-1.2-2.9-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.8.1-1.1.5-.4.4-1.5 1.5-1.5 3.7 0 2.2 1.6 4.3 1.8 4.6.2.3 3.1 4.8 7.7 6.7 2.9 1.2 4 1.3 5.4 1.1 1-.1 2.4-1 2.7-1.9.3-.9.3-1.7.2-1.9-.2-.2-.5-.3-.9-.5Z"/></svg><span>WhatsApp</span>';
    document.body.appendChild(wa);
  }

  const header=document.querySelector("[data-header]");
  if(header){const update=()=>header.classList.toggle("is-scrolled",window.scrollY>24);update();addEventListener("scroll",update,{passive:true})}

  const toggle=document.querySelector("[data-menu-toggle]"),menu=document.querySelector("[data-menu]"),backdrop=document.querySelector("[data-menu-backdrop]");
  let lastFocused=null;
  function setMenu(open){
    if(!toggle||!menu)return;
    toggle.setAttribute("aria-expanded",String(open));
    toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
    menu.classList.toggle("is-open",open);
    toggle.classList.toggle("is-open",open);
    document.body.classList.toggle("menu-open",open);
    if(backdrop){backdrop.hidden=!open;backdrop.classList.toggle("is-open",open)}
    if(open){lastFocused=document.activeElement;requestAnimationFrame(()=>menu.querySelector("a")?.focus())}
    else if(lastFocused instanceof HTMLElement&&document.contains(lastFocused)){lastFocused.focus({preventScroll:true})}
  }
  if(toggle&&menu){
    toggle.addEventListener("click",()=>setMenu(toggle.getAttribute("aria-expanded")!=="true"));
    backdrop?.addEventListener("click",()=>setMenu(false));
    // Let the link activate first, then close the moving drawer. Deferring the
    // transform avoids retargeting the same pointer release onto the toggle.
    menu.addEventListener("click",e=>{if(e.target.closest("a"))setTimeout(()=>setMenu(false),0)});
    document.addEventListener("keydown",e=>{
      if(e.key==="Escape"&&toggle.getAttribute("aria-expanded")==="true")setMenu(false);
      if(e.key==="Tab"&&toggle.getAttribute("aria-expanded")==="true"&&matchMedia("(max-width:760px)").matches){
        const focusable=[toggle,...menu.querySelectorAll("a,button")].filter(el=>!el.hasAttribute("disabled"));
        const first=focusable[0],last=focusable[focusable.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
      }
    });
    addEventListener("resize",()=>{if(innerWidth>760&&toggle.getAttribute("aria-expanded")==="true")setMenu(false)},{passive:true});
  }

  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals=document.querySelectorAll(".reveal");
  if(reduced||!("IntersectionObserver" in window)){reveals.forEach(el=>el.classList.add("is-visible"))}
  else{const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");io.unobserve(entry.target)}}),{threshold:.1,rootMargin:"0px 0px -4%"});reveals.forEach(el=>io.observe(el))}

  if(!reduced&&matchMedia("(pointer:fine)").matches){document.querySelectorAll(".magnetic").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.07}px,${(e.clientY-r.top-r.height/2)*.07}px)`});el.addEventListener("pointerleave",()=>el.style.transform="")})}

  const coverflow=document.querySelector("[data-coverflow]");
  if(coverflow){
    const stage=coverflow.querySelector("[data-coverflow-stage]");
    const cards=[...coverflow.querySelectorAll("[data-coverflow-card]")];
    const current=coverflow.querySelector("[data-coverflow-current]");
    let active=0;
    function offsetFor(i){let d=i-active;const half=Math.floor(cards.length/2);if(d>half)d-=cards.length;if(d<-half)d+=cards.length;return d}
    function render(){
      cards.forEach((card,i)=>{const off=offsetFor(i);card.style.setProperty("--offset",off);card.style.setProperty("--abs-offset",Math.min(Math.abs(off),3));card.dataset.offset=String(off);card.classList.toggle("is-active",off===0);card.setAttribute("aria-current",off===0?"true":"false");card.tabIndex=Math.abs(off)<=1?0:-1});
      if(current)current.textContent=String(active+1).padStart(2,"0");
    }
    function move(delta){active=(active+delta+cards.length)%cards.length;render()}
    coverflow.querySelector("[data-coverflow-prev]")?.addEventListener("click",()=>move(-1));
    coverflow.querySelector("[data-coverflow-next]")?.addEventListener("click",()=>move(1));
    stage?.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){e.preventDefault();move(1)}if(e.key==="ArrowLeft"){e.preventDefault();move(-1)}});
    render();
  }
})();
