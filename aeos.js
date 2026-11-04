(() => {
  const root=document.documentElement;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  root.classList.add('aeos-ui');
  const opener=document.getElementById('hamburger');
  const menu=document.getElementById('mobileMenu');
  const closer=menu.querySelector('.menu-close');
  let previousFocus;
  let inertSiblings=[];
  const close=()=>{
    menu.hidden=true;menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    opener.setAttribute('aria-expanded','false');
    inertSiblings.forEach(([node,wasInert])=>{node.inert=wasInert;});inertSiblings=[];
    if(previousFocus)previousFocus.focus({preventScroll:true});
  };
  opener.addEventListener('click',()=>{
    previousFocus=document.activeElement;menu.hidden=false;menu.classList.add('open');
    inertSiblings=[...document.body.children].filter(node=>node!==menu&&!['SCRIPT','STYLE'].includes(node.tagName)).map(node=>[node,node.inert]);
    inertSiblings.forEach(([node])=>{node.inert=true;});
    document.body.classList.add('menu-open');opener.setAttribute('aria-expanded','true');closer.focus();
  });
  closer.addEventListener('click',close);
  menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
  menu.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();close();}
    if(event.key!=='Tab')return;
    const items=[...menu.querySelectorAll('a,button')];
    const first=items[0],last=items.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
})();
