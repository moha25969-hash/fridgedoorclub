document.querySelectorAll('.approve[aria-pressed]').forEach(function(b,i){
  var k='fdc-approve-'+location.pathname+'-'+i;
  try{if(localStorage.getItem(k)==='1')b.setAttribute('aria-pressed','true')}catch(e){}
  b.addEventListener('click',function(){
    var on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on?'true':'false');
    try{localStorage.setItem(k,on?'1':'0')}catch(e){}
  });
});
