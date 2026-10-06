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
// imagens (Unsplash, licença livre). Para usar fotos próprias, troque o ID por um caminho: ex. hero:"images/hero.jpg"
const IMGS={hero:"1599351431202-1e0f0137899a",sobre:"1702865272115-5afdbae975af",
 barbeiro1:"1647140655214-e4a2d914971f",barbeiro2:"1657105052497-f996284ffff8",barbeiro3:"1605497788044-5a32c7078486",
 experiencia:"1585747860715-2ba37e788b70",cta:"1621645582931-d1d3e6564943",
 g1:"1635273051937-a0ddef9573b6",g2:"1635273051839-003bf06a8751",g3:"1593702275687-f8b402bf1fb5",
 g4:"1621605815971-fbc98d665033",g5:"1611313151697-d626e818dddf",g6:"1621645582931-d1d3e6564943"};
const img=(k,w)=>/\//.test(IMGS[k])?IMGS[k]:`https://images.unsplash.com/photo-${IMGS[k]}?auto=format&fit=crop&q=75&w=${w}`;
$('[data-img]').forEach(el=>{const k=el.dataset.img,w=el.classList.contains('bg')?1920:900,u=img(k,w),i=new Image();
  i.onload=()=>{el.style.backgroundImage=`url(${u})`;el.dataset.ok=1};i.src=u});
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
$('.g').forEach(g=>g.onclick=()=>{li.src=img(g.dataset.img,1800);li.alt=g.getAttribute('aria-label');lb.hidden=false;$('#lbx')[0].focus()});
const lclose=()=>{lb.hidden=true;li.src=''};
lb.onclick=e=>{if(e.target!==li)lclose()};
addEventListener('keydown',e=>{if(e.key==='Escape'){lclose();close()}});
