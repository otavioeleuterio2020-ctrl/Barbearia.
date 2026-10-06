/* ===== CONFIGURAÇÃO (edite aqui) ===== */
const CONFIG = {
  whatsapp: "5500000000000",   // DDI+DDD+número, só dígitos
  mensagem: "Olá! Gostaria de agendar um horário."
};
/* ===================================== */
const $=(s,c=document)=>[...c.querySelectorAll(s)];
const wa=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.mensagem)}`;
$('[data-wa]').forEach(a=>{a.href=wa;a.target="_blank";a.rel="noopener"});
$('#y').textContent=new Date().getFullYear();
// imagens (usa fallback em gradiente se o arquivo não existir)
$('[data-img]').forEach(el=>{const u=el.dataset.img,i=new Image();i.onload=()=>{el.style.backgroundImage=`url(${u})`;el.dataset.ok=1};i.src=u});
// text reveal por palavra
$('.split').forEach(h=>{const walk=n=>[...n.childNodes].forEach(c=>{
  if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(t=>{if(!t.trim())return f.append(t);const w=document.createElement('span');w.className='w';w.innerHTML=`<span>${t}</span>`;f.append(w)});c.replaceWith(f)}
  else if(c.nodeType===1&&c.tagName!=='BR')walk(c)});walk(h);
  $('.w>span',h).forEach((s,i)=>s.style.transitionDelay=i*60+'ms')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$('.reveal,.split').forEach(el=>io.observe(el));
// nav
const nav=$('#nav')[0],menu=$('#menu')[0],bg=$('#burger')[0];
const par=$('[data-speed]'),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
addEventListener('scroll',()=>{nav.classList.toggle('solid',scrollY>40);
  if(!reduce)par.forEach(p=>{const r=p.parentElement.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)p.style.transform=`translateY(${-r.top*p.dataset.speed}px)`})},{passive:true});
const close=()=>{menu.classList.remove('open');bg.setAttribute('aria-expanded','false');document.body.style.overflow=''};
bg.onclick=()=>{const o=menu.classList.toggle('open');bg.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
$('a',menu).forEach(a=>a.onclick=close);
// lightbox
const lb=$('#lb')[0],li=$('img',lb)[0];
$('.g').forEach(g=>g.onclick=()=>{li.src=g.dataset.img;lb.hidden=false;$('#lbx')[0].focus()});
const lclose=()=>{lb.hidden=true;li.src=''};
lb.onclick=e=>{if(e.target!==li)lclose()};
addEventListener('keydown',e=>{if(e.key==='Escape'){lclose();close()}});
