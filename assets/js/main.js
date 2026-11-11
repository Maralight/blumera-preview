(function(){
  "use strict";
  const cfg=window.BLUMERA_CONFIG||{};
  document.querySelectorAll("[data-current-year]").forEach(el=>el.textContent=new Date().getFullYear());
  document.querySelectorAll("[data-company-email]").forEach(el=>{el.textContent=cfg.email||el.textContent;el.href=`mailto:${cfg.email}`});
  document.querySelectorAll("[data-company-phone]").forEach(el=>{el.textContent=cfg.phoneDisplay||el.textContent;el.href=`tel:${cfg.phoneLink}`});
  document.querySelectorAll("[data-office-lagos]").forEach(el=>el.textContent=cfg.officeLagos||el.textContent);
  document.querySelectorAll("[data-office-ph]").forEach(el=>el.textContent=cfg.officePortHarcourt||el.textContent);

  const header=document.querySelector("[data-header]");
  if(header){const update=()=>header.classList.toggle("is-scrolled",window.scrollY>24);update();addEventListener("scroll",update,{passive:true})}

  const toggle=document.querySelector("[data-menu-toggle]"),menu=document.querySelector("[data-menu]");
  function closeMenu(){if(!toggle||!menu)return;toggle.setAttribute("aria-expanded","false");menu.classList.remove("is-open");document.body.classList.remove("menu-open");toggle.focus()}
  if(toggle&&menu){toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")==="true";toggle.setAttribute("aria-expanded",String(!open));menu.classList.toggle("is-open",!open);document.body.classList.toggle("menu-open",!open);if(!open){const first=menu.querySelector("a");first&&first.focus()}});menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{toggle.setAttribute("aria-expanded","false");menu.classList.remove("is-open");document.body.classList.remove("menu-open")}));document.addEventListener("keydown",e=>{if(e.key==="Escape"&&menu.classList.contains("is-open"))closeMenu()})}

  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals=document.querySelectorAll(".reveal");
  if(reduced||!("IntersectionObserver" in window)){reveals.forEach(el=>el.classList.add("is-visible"))}else{const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");io.unobserve(entry.target)}}),{threshold:.12,rootMargin:"0px 0px -5%"});reveals.forEach(el=>io.observe(el))}

  if(!reduced&&matchMedia("(pointer:fine)").matches){document.querySelectorAll(".magnetic").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.08,y=(e.clientY-r.top-r.height/2)*.08;el.style.transform=`translate(${x}px,${y}px)`});el.addEventListener("pointerleave",()=>el.style.transform="")})}
})();
