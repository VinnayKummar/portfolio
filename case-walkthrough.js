(() => {
 document.querySelectorAll('[data-walkthrough]').forEach(root=>{
  const steps=[...root.querySelectorAll('[data-walkthrough-step]')],links=[...root.querySelectorAll('.step-link')],controls=root.querySelector('.walkthrough-controls'),prev=root.querySelector('[data-step-prev]'),next=root.querySelector('[data-step-next]'),status=root.querySelector('[data-step-progress]');let current=0;
  function show(index,focus=false){current=Math.max(0,Math.min(steps.length-1,index));steps.forEach((step,i)=>{step.hidden=i!==current});links.forEach((link,i)=>{if(i===current)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current')});prev.disabled=current===0;next.disabled=current===steps.length-1;status.textContent=`Step ${current+1} of ${steps.length}`;if(focus){const heading=steps[current].querySelector('h2');heading.tabIndex=-1;heading.focus({preventScroll:true});} }
  links.forEach((link,i)=>{link.addEventListener('click',e=>{e.preventDefault();show(i);history.replaceState(null,'',`#step-${i+1}`)});link.addEventListener('keydown',e=>{let target=null;if(e.key==='ArrowRight')target=(i+1)%links.length;if(e.key==='ArrowLeft')target=(i-1+links.length)%links.length;if(e.key==='Home')target=0;if(e.key==='End')target=links.length-1;if(target!==null){e.preventDefault();show(target);links[target].focus();}})});
  prev.addEventListener('click',()=>show(current-1,true));next.addEventListener('click',()=>show(current+1,true));root.classList.add('walkthrough-enhanced');controls.hidden=false;const initial=steps.findIndex(step=>'#'+step.id===location.hash);show(initial<0?0:initial);addEventListener('hashchange',()=>{const i=steps.findIndex(step=>'#'+step.id===location.hash);if(i>=0)show(i)});
 });
 const images=[...document.querySelectorAll('[data-image-zoom]')];if(!images.length)return;const dialog=document.createElement('dialog');dialog.className='image-viewer';dialog.setAttribute('aria-label','Project screenshot');dialog.innerHTML='<button type="button">Close screenshot</button><img alt=""/><p></p>';document.body.append(dialog);let opener;const close=()=>{dialog.close();opener?.focus()};dialog.querySelector('button').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog)close()});images.forEach(link=>link.addEventListener('click',e=>{e.preventDefault();opener=link;const img=link.querySelector('img');dialog.querySelector('img').src=img.src;dialog.querySelector('img').alt=img.alt;dialog.querySelector('p').textContent=img.alt;dialog.showModal()}));
})();
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('[data-explanation-scene]').forEach(scene=>{
  const frames=[...scene.querySelectorAll('[data-scene-frame]')],dots=[...scene.querySelectorAll('[data-scene-dot]')],play=scene.querySelector('[data-scene-play]');let current=0,timer=null,visible=false,playing=!reduced.matches,manual=false;
  const globallyPaused=()=>document.documentElement.classList.contains('motion-paused');
  function stop(){clearTimeout(timer);timer=null;}
  function update(){frames.forEach((frame,i)=>{frame.hidden=i!==current});dots.forEach((dot,i)=>dot.setAttribute('aria-current',String(i===current)));play.textContent=playing&&!globallyPaused()?'Pause explanation':'Play explanation';play.setAttribute('aria-pressed',String(playing&&!globallyPaused()));}
  function schedule(){stop();if(visible&&playing&&!reduced.matches&&!globallyPaused()&&!document.hidden)timer=setTimeout(()=>{current=(current+1)%frames.length;update();schedule()},4800);}
  function go(index){current=(index+frames.length)%frames.length;playing=false;manual=true;update();schedule();}
  scene.classList.add('scene-enhanced');play.hidden=false;scene.querySelector('.scene-controls').hidden=false;update();
  play.addEventListener('click',()=>{manual=true;playing=!(playing&&!globallyPaused());if(globallyPaused()&&playing){document.querySelector('.cinema-toggle')?.click();}update();schedule()});dots.forEach((dot,i)=>dot.addEventListener('click',()=>go(i)));scene.querySelector('[data-scene-prev]').addEventListener('click',()=>go(current-1));scene.querySelector('[data-scene-next]').addEventListener('click',()=>go(current+1));
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();schedule()},{threshold:.25}).observe(scene);
  new MutationObserver(()=>{update();schedule()}).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  reduced.addEventListener('change',()=>{if(!manual)playing=!reduced.matches;update();schedule()});document.addEventListener('visibilitychange',schedule);
 });
})();
