(function(){var f=document.getElementById('letterform');if(!f)return;
f.addEventListener('submit',function(e){e.preventDefault();if(!f.checkValidity()){f.reportValidity();return}
var b=f.querySelector('button');b.disabled=true;var d={};new FormData(f).forEach(function(v,k){d[k]=v});
fetch('/api/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)}).then(function(r){if(!r.ok)throw 0;location.href='/thanks-letter'}).catch(function(){b.disabled=false;b.textContent='Please try again'})})})();
