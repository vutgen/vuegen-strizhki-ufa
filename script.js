(function(){
  var WA="79273047625";
  var time=document.getElementById('time'),date=document.getElementById('date');
  // Демо: «занятые» часы зависят от даты. В рабочей версии берутся из графика мастера (Google-таблица / CRM).
  function busyFor(iso){
    var n=0;for(var i=0;i<iso.length;i++)n=(n*31+iso.charCodeAt(i))%9973;
    var b={};for(var k=0;k<4;k++){b[11+((n+k*5)%9)]=1;}return b;
  }
  function fillTimes(){
    var b=busyFor(date.value||'x');time.innerHTML='';
    var free=0;
    for(var h=11;h<20;h++){
      if(b[h])continue;
      var o=document.createElement('option');o.textContent=(h<10?'0':'')+h+':00';time.appendChild(o);free++;
    }
    if(!free){var o2=document.createElement('option');o2.textContent='Нет свободных часов — выберите другой день';o2.disabled=true;time.appendChild(o2);}
  }
  var t=new Date(),iso=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
  date.min=iso;date.value=iso;fillTimes();date.addEventListener('change',fillTimes);
  document.getElementById('bookingForm').addEventListener('submit',function(e){
    e.preventDefault();
    var f=e.target,err=document.getElementById('err');
    if(!f.name.value.trim()||!f.date.value||!f.time.value){err.textContent='Укажите имя, дату и свободное время.';err.hidden=false;return;}
    err.hidden=true;
    var d=f.date.value.split('-').reverse().join('.');
    var msg='Здравствуйте! Хочу записаться в «Стрижки».\nУслуга: '+f.service.value+'\nДата: '+d+', '+f.time.value+'\nИмя: '+f.name.value.trim()+(f.comment.value.trim()?'\nКомментарий: '+f.comment.value.trim():'');
    window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank','noopener');
  });
})();
