(() => {
 const root=document.documentElement, reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let paused=reduced.matches;
 const toggle=document.createElement('button');toggle.type='button';toggle.className='cinema-toggle';
 const update=()=>{root.classList.toggle('motion-paused',paused);toggle.textContent=paused?'Play motion':'Pause motion';toggle.setAttribute('aria-pressed',String(paused));toggle.setAttribute('aria-label',paused?'Play animation':'Pause animation');};
 toggle.addEventListener('click',()=>{paused=!paused;update()});document.querySelector('nav')?.append(toggle);reduced.addEventListener('change',()=>{paused=reduced.matches;update()});update();
 document.querySelectorAll('.project-flow li').forEach((node,i)=>{node.style.setProperty('--flow-index',i)});
})();(() => {
 const canvas=document.querySelector('.needle-canvas');if(!canvas)return;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const stage=canvas.parentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let w=0,h=0,needles=[],frame=0,visible=true,last=0;
 const pointer={x:-2000,y:-2000};
 let seed=17;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
 function resize(){const r=stage.getBoundingClientRect();w=r.width;h=r.height;const d=Math.min(devicePixelRatio||1,2.5);canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);seed=17;needles=[];
  for(let i=0;i<560;i++){const angle=Math.PI+rand()*Math.PI,length=(.32+rand()*.66)*Math.min(w*.45,h*.75);const x=w*.5+Math.cos(angle)*length,y=h*.82+Math.sin(angle)*length;needles.push({x,y,dx:0,dy:0,vx:0,vy:0,phase:rand()*6.28,hue:268+rand()*65,alpha:.4+rand()*.55,depth:rand()});}draw(0);}
 function draw(t){ctx.clearRect(0,0,w,h);const cx=w*.5,cy=h*.82;

  for(const n of needles){const px=n.x+n.dx,py=n.y+n.dy;const diffX=px-pointer.x,diffY=py-pointer.y,distance=Math.hypot(diffX,diffY),radius=Math.min(140,w*.28);let fx=0,fy=0;
   if(distance<radius&&distance>0){const push=(1-distance/radius)*5;fx=diffX/distance*push;fy=diffY/distance*push;}
   const moving=!reduce.matches&&!document.documentElement.classList.contains('motion-paused');
   if(moving){n.vx=(n.vx+fx-n.dx*.018)*.89;n.vy=(n.vy+fy-n.dy*.018)*.89;n.dx+=n.vx;n.dy+=n.vy;}
   const sway=moving?Math.sin(t*.0005+n.phase)*2:0,ex=n.x+n.dx+sway,ey=n.y+n.dy;
   const gradient=ctx.createLinearGradient(cx,cy,ex,ey);gradient.addColorStop(0,'rgba(239,160,255,.55)');gradient.addColorStop(.35,`hsla(${n.hue-8},95%,72%,${n.alpha})`);gradient.addColorStop(1,`hsla(${n.hue},95%,58%,${n.alpha})`);
   ctx.beginPath();ctx.moveTo(cx,cy);ctx.quadraticCurveTo(cx+(ex-cx)*.58+n.dx*.22,cy+(ey-cy)*.58+n.dy*.22,ex,ey);ctx.strokeStyle=gradient;ctx.lineWidth=.7+n.depth*.65;ctx.stroke();
   // A fine specular strand follows the colored glass filament.
   ctx.beginPath();ctx.moveTo(cx,cy);ctx.quadraticCurveTo(cx+(ex-cx)*.58+n.dx*.22+.45,cy+(ey-cy)*.58+n.dy*.22,ex+.45,ey);ctx.strokeStyle=`rgba(255,231,255,${.09+n.depth*.23})`;ctx.lineWidth=.3;ctx.stroke();
   ctx.beginPath();ctx.arc(ex,ey,.8+n.depth*.8,0,Math.PI*2);ctx.fillStyle=`hsla(${n.hue},100%,78%,${n.alpha})`;ctx.fill();
   if(n.depth>.8){ctx.beginPath();ctx.arc(ex-.3,ey-.3,.48,0,Math.PI*2);ctx.fillStyle='rgba(255,245,255,.85)';ctx.fill();}
  }
 }
 function tick(t){frame=0;if(!visible||document.hidden)return;if(t-last>25){draw(t);last=t;}if(!reduce.matches&&!document.documentElement.classList.contains('motion-paused'))frame=requestAnimationFrame(tick);}
 function start(){if(!frame&&visible&&!document.hidden)frame=requestAnimationFrame(tick);}
 stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;start()},{passive:true});
 const leave=()=>{pointer.x=pointer.y=-2000;start()};stage.addEventListener('pointerleave',leave);stage.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')leave()});stage.addEventListener('pointercancel',leave);
 new ResizeObserver(()=>{resize();start()}).observe(stage);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(frame);frame=0;}}).observe(stage);
 new MutationObserver(()=>{draw(performance.now());start()}).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 reduce.addEventListener('change',()=>{draw(performance.now());start()});document.addEventListener('visibilitychange',start);resize();start();
})();
(() => {
 const group=document.querySelector('.fabric-strands');if(!group)return;
 const colors=['fabric-teal','fabric-lavender','fabric-rose','fabric-warm'];
 for(let i=0;i<170;i++){const n=i/169,path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',`M ${-120+n*760} -140 C ${-90+n*520} ${90+n*160},${700+n*80} ${130+n*330},${860+n*180} 860`);path.setAttribute('class',colors[Math.min(3,Math.floor(n*4))]);group.append(path);}
})();
