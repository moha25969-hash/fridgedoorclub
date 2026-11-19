(function(){
  var tabs=document.querySelectorAll('.tabs button'),pins=document.querySelectorAll('#pins .pin'),empty=document.getElementById('empty');
  tabs.forEach(function(t){t.addEventListener('click',function(){
    var f=t.getAttribute('data-f'),n=0;
    tabs.forEach(function(x){x.setAttribute('aria-pressed',x===t?'true':'false')});
    pins.forEach(function(p){var show=f==='all'||p.getAttribute('data-k')===f;p.style.display=show?'':'none';if(show)n++});
    empty.classList.toggle('hidden',n>0);
  })});
})();
