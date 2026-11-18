'use strict';
// Gerakan hanya mengubah tampilan angka. Nilai hitungan tetap berasal dari finance.js.
(function(){
 const running=new WeakMap();
 const page=document.querySelector('#page'),curtain=document.querySelector('#scene-curtain'),toggle=document.querySelector('#motion-toggle');
 const media=window.matchMedia('(prefers-reduced-motion: reduce)');
 let preference='full',context=null,observer=null,curtainTween=null,feedbackContext=null,pointerFrame=0,point=null,tilted=null;
 const totalFrames=118,sequenceImages=new Array(totalFrames).fill(null);
 let sequenceStarted=false,currentFrame=0;
 try{preference=localStorage.getItem('ruang-kopi-motion')==='light'?'light':'full';}catch(_){}
 const full=()=>preference==='full'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const capable=()=>full()&&!!window.gsap?.context;
 const smallScreen=()=>Boolean(window.matchMedia?.('(max-width: 720px)')?.matches);
 function syncPreference(){
  const enabled=full();document.body.dataset.motion=enabled?'full':'light';
  document.body.classList.toggle('motion-ready',capable());
  toggle.textContent=enabled?'Gerak penuh':'Gerak ringan';toggle.setAttribute('aria-pressed',String(enabled));
  toggle.disabled=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  toggle.title=toggle.disabled?'Mengikuti pengaturan gerak perangkat':'Ganti intensitas animasi';
 }
 function stopPage(){
  observer?.disconnect();observer=null;context?.revert();context=null;
  curtainTween?.revert();curtainTween=null;feedbackContext?.revert();feedbackContext=null;
  if(pointerFrame)window.cancelAnimationFrame(pointerFrame);pointerFrame=0;point=null;tilted=null;
  curtain.style.visibility='hidden';
 }
 function getCanvasCtx(canvas){
  if(!canvas||typeof canvas.getContext!=='function')return null;
  try{return canvas.getContext('2d',{alpha:false});}catch(_){return null;}
 }
 function paintCanvas(canvas,img){
  const ctx=getCanvasCtx(canvas);if(!ctx)return;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const rect=canvas.getBoundingClientRect();
  const w=Math.max(1,Math.floor((rect.width||1280)*dpr)),h=Math.max(1,Math.floor((rect.height||720)*dpr));
  if(!img||!img.complete||!img.naturalWidth)return;
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
  ctx.fillStyle='#0A0600';ctx.fillRect(0,0,w,h);
  const scale=Math.max(w/img.naturalWidth,h/img.naturalHeight);
  const dw=img.naturalWidth*scale,dh=img.naturalHeight*scale;
  ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  ctx.drawImage(img,(w-dw)/2,(h-dh)/2,dw,dh);
 }
 function resolveFrame(frameIdx){
  const clamped=Math.max(0,Math.min(totalFrames-1,frameIdx));
  let img=sequenceImages[clamped];
  if(!img||!img.complete||!img.naturalWidth){
   for(let offset=1;offset<totalFrames;offset++){
    const prev=sequenceImages[clamped-offset];if(prev&&prev.complete&&prev.naturalWidth){img=prev;break;}
    const next=sequenceImages[clamped+offset];if(next&&next.complete&&next.naturalWidth){img=next;break;}
   }
  }
  return img;
 }
 function drawIntroFrame(progress){
  preloadSequence();
  const p=Math.min(1,Math.max(0,Number(progress)||0));
  currentFrame=Math.round(p*(totalFrames-1));
  paintCanvas(document.querySelector('#intro-sequence-canvas'),resolveFrame(currentFrame));
 }
 function preloadSequence(){
  const canvas=document.querySelector('#intro-sequence-canvas');
  if(!canvas||typeof window.Image!=='function'||!getCanvasCtx(canvas))return;
  if(sequenceStarted){paintCanvas(canvas,resolveFrame(currentFrame));return;}
  sequenceStarted=true;
  const step=smallScreen()?2:1,queue=[];
  for(let i=1;i<=totalFrames;i+=step*4)queue.push(i);
  for(let i=1;i<=totalFrames;i+=step)if((i-1)%(step*4)!==0)queue.push(i);
  let active=0;
  function next(){
   while(active<6&&queue.length){
    const frameNum=queue.shift(),idx=frameNum-1;
    const img=new window.Image();
    img.decoding='async';
    active++;
    const done=()=>{active--;next();};
    img.onload=()=>{
     sequenceImages[idx]=img;
     if((idx===0||idx===currentFrame||!sequenceImages[currentFrame]?.complete)&&!document.querySelector('#intro-overlay')?.hidden){
      paintCanvas(canvas,resolveFrame(currentFrame));
     }
     done();
    };
    img.onerror=done;
    img.src='sequence/ezgif-frame-'+String(frameNum).padStart(3,'0')+'.webp';
   }
  }
  next();
 }
 function words(title){
  if(!title)return [];
  if(!title.querySelector('.motion-word')){
   const text=title.textContent;title.setAttribute('aria-label',text);title.textContent='';
   const line=document.createElement('span');line.className='motion-line';line.setAttribute('aria-hidden','true');
   text.split(/(\s+)/).forEach(word=>{if(/^\s+$/.test(word)){line.append(document.createTextNode(word));return;}
    const span=document.createElement('span');span.className='motion-word';span.textContent=word;line.append(span);
   });title.append(line);
  }
  return [...title.querySelectorAll('.motion-word')];
 }
 function wipe(direction,label,vertical,small){
  const g=window.gsap,bands=curtain.querySelectorAll('.scene-band'),title=curtain.querySelector('.scene-label');
  title.textContent=label;curtain.style.visibility='visible';
  curtainTween=g.timeline({onComplete:()=>{curtain.style.visibility='hidden';}});
  // Masuk lalu keluar pada sumbu berbeda agar pergantian adegan terbaca di layar kecil.
  curtainTween.fromTo(bands,{x:0,y:0,xPercent:vertical?0:-105*direction,yPercent:vertical?105*direction:0},{xPercent:0,yPercent:0,duration:.24,stagger:.025,ease:'power3.out'},0)
   .to(bands,{xPercent:vertical?105*direction:0,yPercent:vertical?0:-105*direction,duration:.36,stagger:.025,ease:'power3.inOut'},.3)
   .fromTo(title,{x:small?32*direction:80*direction,y:22,rotation:-5*direction,scale:.88,opacity:0},{x:0,y:0,rotation:0,scale:1,opacity:1,duration:.24,ease:'back.out(1.2)'},.12)
   .to(title,{x:-30*direction,y:-55,rotation:4*direction,opacity:0,duration:.2,ease:'power2.in'},.36);
 }
 function enter(root,{animate=true,group=document.body.dataset.page,direction=1,fromIntro=false}={}){
  stopPage();syncPreference();
  if(!capable()||root.inert||document.body.classList.contains('intro-active'))return;
  if(!animate){
   const sub=root.querySelector('.editor-grid,.lower-grid,.material-grid,.plan-grid');
   sub?.animate?.([{opacity:.55,transform:'translateY(8px) scale(.992)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:200,easing:'cubic-bezier(.22,1,.36,1)'});
   return;
  }
  const g=window.gsap,small=window.matchMedia('(max-width: 720px)').matches,distance=small?72:150;
  const profiles={ringkasan:[-distance,22,0],usaha:[0,small?80:115,0],menu:[distance,0,0],hitung:[0,small?-72:-105,0],catatan:[-distance,45,0],bantuan:[0,85,0]};
  const [x,y,rotation]=profiles[group]||profiles.ringkasan;
  const title=root.querySelector('h1'),parts=words(title);
  const candidates=[...root.querySelectorAll('.summary-primary .stat,.next-action,.workbook-chart,.stock-notebook,.editor-grid > .panel,.result-column,.lower-grid > .panel,.material-card,.scenario-card,.guide-card,.plan-card')];
  const cards=candidates.filter(el=>!candidates.some(parent=>parent!==el&&parent.contains(el)));
  const revealed=new WeakSet();
  function reveal(elements,delay=0){
   if(!context||!elements.length)return;
   context.add(()=>{
    g.fromTo(elements,{x:i=>(i%2?-x:x)*direction,y,rotation:i=>i%2?-rotation:rotation,scale:small?.93:.9,opacity:0},{x:0,y:0,rotation:0,scale:1,opacity:1,duration:small?.68:.82,delay,stagger:{amount:Math.min(small?.16:.28,elements.length*.065)},ease:'back.out(1.05)',clearProps:'transform,opacity'});
   });elements.forEach(el=>revealed.add(el));
  }
  context=g.context(()=>{
   const tl=g.timeline({defaults:{ease:'power3.out'}}),base=fromIntro?.04:.4;
   const toolbar=root.querySelector('.plan-toolbar');if(toolbar)tl.fromTo(toolbar,{y:-35,opacity:0},{y:0,opacity:1,duration:.45,clearProps:'transform,opacity'},base+.02);
   if(parts.length)tl.fromTo(parts,{x:small?0:-35*direction,yPercent:120,rotation:0,scale:.86,opacity:0},{x:0,yPercent:0,rotation:0,scale:1,opacity:1,duration:.68,stagger:.055,ease:'back.out(1.25)',clearProps:'transform,opacity'},base);
   const subtitle=root.querySelector('.title-row p');if(subtitle)tl.fromTo(subtitle,{x:small?-14*direction:-36*direction,opacity:0},{x:0,opacity:1,duration:.48,clearProps:'transform,opacity'},base+.12);
   const tabs=root.querySelectorAll('.section-tabs a');if(tabs.length)tl.fromTo(tabs,{y:28,scale:.93,opacity:0},{y:0,scale:1,opacity:1,duration:.42,stagger:.045,clearProps:'transform,opacity'},base+.08);
   const activeIcon=document.querySelector('.sidebar nav a.active svg');
   if(activeIcon)tl.fromTo(activeIcon,{y:8,rotation:-18*direction,scale:.65},{y:0,rotation:0,scale:1,duration:.5,ease:'back.out(2)',clearProps:'transform'},.12);
   const chartBars=root.querySelectorAll('.chart-track > span');
   if(chartBars.length)tl.fromTo(chartBars,{scaleX:0},{scaleX:(_,el)=>Number(el.style.getPropertyValue('--fill')),duration:.85,stagger:.09,clearProps:'transform'},base+.25);
  },root);
  // Konten tetap terlihat tanpa IntersectionObserver; gerak tidak menjadi syarat membuka halaman.
  if(window.IntersectionObserver){
   observer=new window.IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting&&!revealed.has(e.target)).map(e=>e.target);reveal(visible);visible.forEach(el=>observer?.unobserve(el));},{threshold:.08});
   const initial=cards.filter(el=>el.getBoundingClientRect().top<(window.innerHeight||800));
   reveal(initial,fromIntro?.06:.48);cards.filter(el=>!revealed.has(el)).forEach(el=>observer.observe(el));
  }else reveal(cards,fromIntro?.06:.48);
  if(!fromIntro){
   const labels={ringkasan:'Rencanamu.',usaha:'Mulai kedaimu.',menu:'Racik menumu.',hitung:'Cek angkanya.',catatan:'Catat harimu.',bantuan:'Satu langkah.'};
   wipe(direction,labels[group]||'Ruang kopi.',x===0,small);
  }
 }
 function feedback(element){
  if(!element||!capable()||document.body.classList.contains('intro-active'))return;
  feedbackContext?.revert();
  feedbackContext=window.gsap.context(()=>{
   // Toast memiliki translateX bawaan untuk pemusatan; gunakan skala agar tidak menggesernya.
   window.gsap.fromTo(element,{scale:.94,opacity:.6},{scale:1,opacity:1,duration:.45,ease:'back.out(1.8)',clearProps:'transform,opacity'});
  });
 }
 function number(element,next,format,previous){
  if(!element)return;
  const active=running.get(element);
  if(active)window.cancelAnimationFrame(active.frame);
  const from=active?.value??previous??Number(element.dataset.value??next);
  element.dataset.value=String(next);
  element.setAttribute('aria-label',format(next));
  const finish=()=>{element.textContent=format(next);running.delete(element);};
  if(from===next||!Number.isFinite(from)||!full()||!window.requestAnimationFrame){finish();return;}
  const state={value:from,frame:0,start:null};running.set(element,state);
  const tick=time=>{
   if(!element.isConnected){running.delete(element);return;}
   if(!full()){finish();return;}
   if(state.start===null)state.start=time;
   const progress=Math.min(1,(time-state.start)/320);
   state.value=from+(next-from)*(1-Math.pow(1-progress,3));element.textContent=format(state.value);
   if(progress<1)state.frame=window.requestAnimationFrame(tick);else finish();
  };
  state.frame=window.requestAnimationFrame(tick);
 }
 toggle.addEventListener('click',()=>{
  preference=preference==='full'?'light':'full';
  try{localStorage.setItem('ruang-kopi-motion',preference);}catch(_){}
  stopPage();syncPreference();if(capable())enter(page);
 });
 media.addEventListener?.('change',()=>{stopPage();syncPreference();});
 document.addEventListener('rk:intro-start',stopPage);
 document.addEventListener('rk:intro-end',()=>enter(page,{fromIntro:true}));
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stopPage();});
 document.addEventListener('focusin',event=>{
  if(event.target===page||!page.contains(event.target)||!context)return;
  // Keyboard tidak perlu menunggu kontrol yang sedang masuk dari luar layar.
  stopPage();
 });
 window.addEventListener?.('resize',()=>{
  const introCanvas=document.querySelector('#intro-sequence-canvas');
  if(introCanvas&&!document.querySelector('#intro-overlay')?.hidden)paintCanvas(introCanvas,resolveFrame(currentFrame));
 },{passive:true});
 page.addEventListener('pointermove',event=>{
  if(!capable()||!context||event.pointerType!=='mouse'||!window.matchMedia('(hover: hover) and (pointer: fine)').matches)return;
  const card=event.target.closest('.profit-feature,.guide-card,.plan-card,.advice');
  if(!card)return;
  point={card,x:event.clientX,y:event.clientY};if(pointerFrame)return;
  pointerFrame=window.requestAnimationFrame(()=>{
   pointerFrame=0;if(!point||!context)return;
   const {card,x,y}=point;
   if(card){
    const rect=card.getBoundingClientRect();if(rect.width&&rect.height){
     const rx=(x-rect.left)/rect.width,ry=(y-rect.top)/rect.height;
     card.style?.setProperty?.('--spot-x',Math.round(rx*100)+'%');card.style?.setProperty?.('--spot-y',Math.round(ry*100)+'%');
     tilted=card;
    }
   }
  });
 });
 page.addEventListener('pointerout',event=>{
  if(point){
   const leftCard=!point.card||!point.card.contains(event.relatedTarget);
   if(leftCard){if(pointerFrame)window.cancelAnimationFrame(pointerFrame);pointerFrame=0;point=null;}
  }
  if(tilted&&(!tilted.isConnected||!tilted.contains(event.relatedTarget)))tilted=null;
 });
 syncPreference();
 window.RKMotion={number,enter,stopPage,feedback,drawIntroFrame,preload:preloadSequence};
})();
