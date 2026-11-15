'use strict';
const dialog=document.getElementById('menu-dialog');
const closeButton=document.getElementById('dialog-close');
const search=document.getElementById('menu-search');
const categoryNav=document.getElementById('categories');
const results=document.getElementById('menu-results');
const dialogContent=document.querySelector('.dialog-content');
const categories=Object.keys(raw);
let current='Doručak',lastFocus=null;
const safe=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=value=>String(value).toLocaleLowerCase('sr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'dj');
const priceFormat=new Intl.NumberFormat('sr-RS');
const itemLabel=n=>n%10===1&&n%100!==11?'STAVKA':n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'STAVKE':'STAVKI';
function renderMenu(){
 const query=normalize(search.value.trim());
 categoryNav.innerHTML=categories.map(category=>`<button type="button" data-cat="${safe(category)}" class="${current===category&&!query?'active':''}" aria-pressed="${current===category&&!query}">${safe(category)}<span>${raw[category].length}</span></button>`).join('');
 let count=0;
 const sections=(query?categories:[current]).map(category=>{
  const items=raw[category].filter(item=>!query||normalize(category+' '+item.join(' ')).includes(query));
  count+=items.length;
  if(!items.length)return '';
  return `<section><div class="category-heading"><h3>${safe(category)}</h3><span>${items.length} ${itemLabel(items.length)}</span></div><div class="menu-items">${items.map(([name,price,description],index)=>`<article class="menu-item" style="--item-index:${Math.min(index,7)}"><div><h4>${safe(name)}</h4><strong>${priceFormat.format(price)} RSD</strong></div>${description?`<p>${safe(description)}</p>`:''}</article>`).join('')}</div></section>`;
 }).join('');
 results.innerHTML=(query&&count?`<p class="result-count">Pronađeno stavki: ${count}</p>`:'')+(sections||'<p class="empty-result">Nema rezultata. Pokušajte sa drugim nazivom jela ili sastojka.</p>');
}
function closeNavigation(){document.getElementById('mobile-nav').hidden=true;document.querySelector('.hamb').setAttribute('aria-expanded','false')}
function openMenu(category){
 lastFocus=document.activeElement.closest('#mobile-nav')?document.querySelector('.hamb'):document.activeElement;
 current=categories.includes(category)?category:'Doručak';search.value='';renderMenu();closeNavigation();
 document.getElementById('vagon-film').pause();document.getElementById('hero-loop').pause();dialog.showModal();document.body.classList.add('dialog-open');dialogContent.scrollTop=0;closeButton.focus();
 const active=categoryNav.querySelector('.active');if(active)active.scrollIntoView({block:'nearest',inline:'center'});
}
document.querySelectorAll('[data-menu]').forEach(button=>button.addEventListener('click',()=>openMenu()));
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>openMenu(button.dataset.category)));
categoryNav.addEventListener('click',event=>{const button=event.target.closest('button[data-cat]');if(!button)return;current=button.dataset.cat;search.value='';renderMenu();dialogContent.scrollTop=0;const active=categoryNav.querySelector('.active');active.focus({preventScroll:true});active.scrollIntoView({block:'nearest',inline:'nearest'})});
search.addEventListener('input',renderMenu);
closeButton.addEventListener('click',()=>dialog.close());
dialog.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();dialog.close()}});
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');lastFocus?.focus({preventScroll:true});syncLoop()});
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close()});
const hamburger=document.querySelector('.hamb');const mobileNav=document.getElementById('mobile-nav');
hamburger.addEventListener('click',()=>{const open=mobileNav.hidden;mobileNav.hidden=!open;hamburger.setAttribute('aria-expanded',String(open))});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeNavigation));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){closeNavigation();hamburger.focus()}});
document.addEventListener('click',event=>{if(!mobileNav.hidden&&!event.target.closest('.nav'))closeNavigation()});
window.matchMedia('(min-width:761px)').addEventListener('change',event=>{if(event.matches)closeNavigation()});
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
if(!reduced.matches&&'IntersectionObserver' in window){
 document.body.classList.add('motion-ready');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});
 document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
 reduced.addEventListener('change',event=>{if(event.matches){document.body.classList.remove('motion-ready');observer.disconnect()}});
}
const progress=document.querySelector('.scroll-progress');let ticking=false;
function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform=`scaleX(${max>0?window.scrollY/max:0})`;if(!reduced.matches&&!document.body.classList.contains('motion-paused')){document.querySelectorAll('.photo-crop').forEach(frame=>{const rect=frame.getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight){const shift=Math.max(-18,Math.min(18,(innerHeight/2-rect.top)*.035));frame.style.setProperty('--photo-shift',shift+'px')}})}ticking=false}
window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateProgress)}},{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
const video=document.getElementById('vagon-film');const play=document.getElementById('film-play');
play.addEventListener('click',async()=>{try{await video.play();play.hidden=true;video.focus({preventScroll:true})}catch{play.querySelector('span').textContent='POKUŠAJTE PONOVO'}});
video.addEventListener('play',()=>{play.hidden=true});video.addEventListener('ended',()=>{play.hidden=false});
const videoObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting&&!video.paused)video.pause()})},{threshold:.05});videoObserver.observe(video);
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause()});
renderMenu();

const heroLoop=document.getElementById('hero-loop');
const motionToggle=document.getElementById('motion-toggle');
let loopVisible=true,motionPaused=false;
function syncLoop(){if(!loopVisible||reduced.matches||motionPaused||document.hidden||dialog.open){heroLoop.pause()}else{heroLoop.play().catch(()=>{})}}
const loopObserver=new IntersectionObserver(entries=>{loopVisible=entries[0].isIntersecting;syncLoop()},{threshold:.15});loopObserver.observe(heroLoop);
reduced.addEventListener('change',syncLoop);
document.addEventListener('visibilitychange',syncLoop);
motionToggle.addEventListener('click',()=>{motionPaused=!motionPaused;document.body.classList.toggle('motion-paused',motionPaused);motionToggle.setAttribute('aria-pressed',String(motionPaused));motionToggle.setAttribute('aria-label',motionPaused?'Nastavi animacije i video isečak':'Pauziraj animacije i video isečak');motionToggle.innerHTML=motionPaused?'<span class="motion-symbol is-play" aria-hidden="true"></span> NASTAVI':'<span class="motion-symbol" aria-hidden="true"></span> PAUZIRAJ';syncLoop()});
syncLoop();
