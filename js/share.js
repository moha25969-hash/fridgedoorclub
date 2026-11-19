(function(){
  var form=document.getElementById('share'),input=document.getElementById('photo'),prev=document.getElementById('preview'),msg=document.getElementById('msg'),btn=document.getElementById('send'),small=null;
  function shrink(file){return new Promise(function(res,rej){
    var img=new Image(),url=URL.createObjectURL(file);
    img.onload=function(){var m=1600,w=img.width,h=img.height,s=Math.min(1,m/Math.max(w,h));
      var c=document.createElement('canvas');c.width=Math.round(w*s);c.height=Math.round(h*s);
      c.getContext('2d').drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);
      c.toBlob(function(b){b?res(b):rej()},'image/jpeg',0.82)};
    img.onerror=function(){rej()};img.src=url;})}
  input.addEventListener('change',function(){
    small=null;var f=input.files&&input.files[0];if(!f)return;
    prev.src=URL.createObjectURL(f);prev.classList.remove('hidden');
    shrink(f).then(function(b){small=b}).catch(function(){small=null});
  });
  form.addEventListener('submit',function(e){
    e.preventDefault();msg.classList.add('hidden');
    if(!form.checkValidity()){form.reportValidity();return}
    if(!small){msg.textContent='Please choose a photo, honey.';msg.classList.remove('hidden');return}
    btn.disabled=true;btn.textContent='Pinning it to the fridge…';
    var d={};new FormData(form).forEach(function(v,k){if(k!=='photo')d[k]=v});
    new Promise(function(res){var r=new FileReader();r.onload=function(){res(r.result)};r.readAsDataURL(small)}).then(function(u){d.photo=u;
    return fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})}).then(function(r){
      if(r.ok){location.href='/thanks'}else{throw 0}
    }).catch(function(){
      btn.disabled=false;btn.textContent='Pin it to the fridge';
      msg.textContent='Sorry, honey, something went wrong. Please try again in a minute.';msg.classList.remove('hidden');
    });
  });
})();
