const frameworkLinks=[...document.querySelectorAll('.framework-bar a')];
const frameworkSections=[...document.querySelectorAll('[data-framework-step]')];
const setFramework=index=>frameworkLinks.forEach((link,i)=>link.classList.toggle('is-active',i===index));

const industry=document.querySelector('.industry-stage');
const industryArticles=[...document.querySelectorAll('.industry-copy .reveal')];
let ticking=false;
function updateScrollStory(){
  if(!industry)return;
  const rect=industry.getBoundingClientRect();
  const travel=Math.max(1,industry.offsetHeight-window.innerHeight);
  const progress=Math.min(1,Math.max(0,-rect.top/travel));
  industry.style.setProperty('--industry-progress',progress.toFixed(3));
  const step=Math.min(industryArticles.length-1,Math.floor(progress*industryArticles.length));
  industryArticles.forEach((article,i)=>article.classList.toggle('is-visible',i===step));
  ticking=false;
}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScrollStory);ticking=true}},{passive:true});
updateScrollStory();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)setFramework(Number(entry.target.dataset.frameworkStep))});
},{rootMargin:'-35% 0px -50% 0px',threshold:0});
frameworkSections.forEach(section=>observer.observe(section));

document.querySelectorAll('[data-scroll]').forEach(button=>{
  button.addEventListener('click',()=>{
    const rail=document.getElementById(button.dataset.scroll);
    const direction=Number(button.dataset.dir);
    rail?.scrollBy({left:direction*rail.clientWidth*.82,behavior:'smooth'});
  });
});

const dialog=document.querySelector('.lightbox');
const dialogImage=dialog?.querySelector('img');
document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{
  if(!dialog||!dialogImage)return;
  dialogImage.src=button.dataset.lightbox;
  dialogImage.alt=button.querySelector('img')?.alt||'分析报告放大预览';
  dialog.showModal();
}));
dialog?.querySelector('.lightbox-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&dialog?.open)dialog.close()});
