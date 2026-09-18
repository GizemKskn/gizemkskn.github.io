/* shared behaviour: language toggle, current nav link, detection overlay */
(function(){
  var root=document.documentElement;
  var btns=document.querySelectorAll('.lang button');
  function meta(n){var m=document.querySelector('meta[name="'+n+'"]');return m?m.getAttribute('content'):null}
  var titles={tr:meta('title-tr')||'Gizem Keskin — Yapay zekâ ve yazılım mühendisi',en:meta('title-en')||'Gizem Keskin — AI & software engineer'};
  function set(l,save){
    root.setAttribute('data-lang',l); root.setAttribute('lang',l);
    document.title=titles[l]||'Gizem Keskin';
    btns.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-lang')===l?'true':'false')});
    if(save){try{localStorage.setItem('lang',l)}catch(e){}}
    document.dispatchEvent(new CustomEvent('langchange',{detail:l}));
  }
  set(root.getAttribute('data-lang')||'tr',false);
  btns.forEach(function(b){b.addEventListener('click',function(){set(b.getAttribute('data-lang'),true)})});
  var y=document.getElementById('yr'); if(y) y.textContent=String(new Date().getFullYear());

  /* mark the current section of the site in the nav */
  var path=location.pathname;
  document.querySelectorAll('.bar .links a').forEach(function(a){
    var key=a.getAttribute('data-nav');
    if(key&&path.indexOf('/'+key+'/')>=0) a.setAttribute('aria-current','page');
  });
})();

(function(){
  var det=document.getElementById('det'); if(!det) return;
  var lab=det.querySelector('b');
  var fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var cur=null, raf=0;
  function place(el,instant){
    if(!el){det.classList.remove('on');cur=null;return}
    cur=el;
    var r=el.getBoundingClientRect(), pad=10;
    det.classList.toggle('instant',!!instant);
    det.style.transform='translate('+(r.left-pad)+'px,'+(r.top-pad)+'px)';
    det.style.width=(r.width+pad*2)+'px';
    det.style.height=(r.height+pad*2)+'px';
    lab.textContent=el.getAttribute('data-det')+' '+(el.getAttribute('data-conf')||'0.98');
    det.classList.add('on');
  }
  function follow(){ if(cur){cancelAnimationFrame(raf);raf=requestAnimationFrame(function(){place(cur,true)})} }
  if(fine){
    document.addEventListener('pointermove',function(e){
      var t=e.target, el=(t&&t.closest)?t.closest('[data-det]'):null;
      if(el!==cur) place(el,false);
    });
    document.documentElement.addEventListener('pointerleave',function(){place(null)});
  }else{
    var secs=document.querySelectorAll('section[data-det]');
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(entries){
        var best=null;
        entries.forEach(function(en){ if(en.isIntersecting&&(!best||en.intersectionRatio>best.intersectionRatio)) best=en });
        if(best&&best.target!==cur) place(best.target,false);
      },{threshold:[.2,.4,.6,.8]});
      Array.prototype.forEach.call(secs,function(s){io.observe(s)});
    }
  }
  window.addEventListener('scroll',follow,{passive:true});
  window.addEventListener('resize',follow);
})();
