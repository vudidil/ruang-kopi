'use strict';
// Seekable HyperFrames composition. Playback belongs to the website controller.
(function(){
 if(!window.gsap)return;
 const tl=gsap.timeline({paused:true});
 window.__timelines=window.__timelines||{};
 window.__timelines['coffee-intro']=tl;
 tl.from('.intro-brand',{y:14,opacity:0,duration:.55,ease:'power3.out'},.12)
   .from('.intro-tagline',{y:9,opacity:0,duration:.5,ease:'power2.out'},.3)
   .from('.scene-decor',{opacity:0,scale:.94,transformOrigin:'450px 270px',duration:.7,ease:'sine.out'},.15)
   .from('.scene-table',{y:40,opacity:0,duration:.6,ease:'power3.out'},.15)
   .from('.scene-shadow',{opacity:0,duration:.5},.35)
   .from('.scene-saucer',{y:22,opacity:0,duration:.5,ease:'back.out(1.1)'},.3)
   .from('.scene-cup',{y:25,opacity:0,duration:.6,ease:'back.out(1.15)'},.35)
   .from('.scene-pitcher',{y:-180,x:25,rotation:18,opacity:0,transformOrigin:'540px 120px',duration:.65,ease:'power2.out'},.52)
   .from('.pour-stream',{scaleY:0,transformOrigin:'478px 134px',duration:.16,ease:'power1.in'},1.12)
   .from('.pour-highlight',{scaleY:0,transformOrigin:'475px 137px',duration:.15,ease:'power1.in'},1.15)
   .from('.coffee-liquid',{scaleX:.35,scaleY:.25,y:12,opacity:0,svgOrigin:'446 294',duration:1.85,ease:'power1.out'},1.22)
   .from('.coffee-foam',{opacity:0,scale:.12,y:20,svgOrigin:'446 294',duration:1.65,ease:'sine.out'},1.4)
   .from('.coffee-ripple',{opacity:0,scale:.2,svgOrigin:'456 290',duration:.24},1.24)
   .to('.coffee-ripple',{scale:1.8,opacity:.1,svgOrigin:'456 290',duration:.28,repeat:5,yoyo:true,ease:'sine.inOut'},1.5)
   .to('.scene-cup',{rotation:-3,svgOrigin:'450 420',duration:.08,ease:'sine.inOut'},1.23)
   .to('.scene-cup',{rotation:3,duration:.14,repeat:11,yoyo:true,ease:'sine.inOut'},1.31)
   .to('.scene-cup',{rotation:0,duration:.65,ease:'elastic.out(1,.35)'},2.99)
   .to('.pour-stream',{scaleY:0,transformOrigin:'453px 294px',duration:.2,ease:'power1.in'},2.95)
   .to('.pour-highlight',{scaleY:0,transformOrigin:'455px 290px',duration:.18,ease:'power1.in'},2.95)
   .to('.scene-pitcher',{y:-180,x:55,rotation:16,opacity:0,duration:.6,ease:'power2.in'},3.05)
   .from('.table-splashes',{opacity:0,scaleX:.2,transformOrigin:'450px 438px',duration:.15},1.72)
   .from('.scene-steam',{y:14,opacity:0,duration:.75,ease:'sine.out'},3.4)
   .to('.scene-steam',{y:-9,duration:2.05,ease:'sine.inOut'},4.15)
   .from('.intro-ready',{y:8,opacity:0,duration:.55,ease:'power2.out'},3.85);
 const paths=[[-74,-74,-122,139],[61,-83,126,133],[-45,-58,-81,125],[43,-61,88,128],[-57,-87,-105,139],[50,-65,111,131]];
 paths.forEach((p,i)=>{
  const selector='.drop-'+(i+1),start=1.35+i*.14;
  tl.from(selector,{opacity:0,scale:0,duration:.06,transformOrigin:'center'},start)
    .to(selector,{x:p[0],y:p[1],rotation:(i%2?24:-27),duration:.25,ease:'power2.out'},start)
    .to(selector,{x:p[2],y:p[3],scale:.45,opacity:0,duration:.4,ease:'power2.in'},start+.25);
 });
})();
