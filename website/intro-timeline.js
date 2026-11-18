'use strict';
// Komposisi pembuka 118 frame kopi. Pemutaran diatur oleh intro-controller.js.
(function(){
 if(!window.gsap)return;
 const tl=gsap.timeline({paused:true});
 window.__timelines=window.__timelines||{};
 window.__timelines['coffee-intro']=tl;
 tl.to({p:0},{p:1,duration:6.2,ease:'none'});
})();
