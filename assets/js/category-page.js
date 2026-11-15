(function(){
  "use strict";
  const key=document.body.dataset.category;
  const item=(window.BLUMERA_CATEGORIES||{})[key];
  if(!item)return;
  const set=(selector,value)=>document.querySelectorAll(selector).forEach(el=>el.textContent=value);
  set("[data-category-number]",item.number);
  set("[data-category-title]",item.title);
  set("[data-category-eyebrow]",item.eyebrow);
  set("[data-category-summary]",item.summary);
  set("[data-category-overview]",item.overview);
  set("[data-category-specification]",item.specification);
  document.title=`${item.title} | Blumera Global Services Ltd`;
  document.querySelectorAll("[data-category-image]").forEach(img=>{img.src=item.image;img.alt=`${item.title} supplied to client requirements`});
  const equipment=document.querySelector("[data-equipment-list]");
  if(equipment)equipment.innerHTML=item.equipment.map(x=>`<li>${x}</li>`).join("");
  const industries=document.querySelector("[data-industries-list]");
  if(industries)industries.innerHTML=item.industries.map(x=>`<span>${x}</span>`).join("");
  const keys=Object.keys(window.BLUMERA_CATEGORIES),index=keys.indexOf(key);
  const prev=window.BLUMERA_CATEGORIES[keys[(index-1+keys.length)%keys.length]],next=window.BLUMERA_CATEGORIES[keys[(index+1)%keys.length]];
  const slug=k=>`supply-${k}.html`;
  const prevLink=document.querySelector("[data-category-prev]"),nextLink=document.querySelector("[data-category-next]");
  if(prevLink){prevLink.href=slug(keys[(index-1+keys.length)%keys.length]);prevLink.textContent=`← ${prev.title}`}
  if(nextLink){nextLink.href=slug(keys[(index+1)%keys.length]);nextLink.textContent=`${next.title} →`}
  document.querySelectorAll("[data-category-rfq]").forEach(a=>a.href=`request-quote.html?category=${encodeURIComponent(item.title)}`);
})();
