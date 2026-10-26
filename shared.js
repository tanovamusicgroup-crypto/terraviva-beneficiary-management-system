(function(){
const css='.b{display:inline-block;padding:2px 10px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap}.b-planned{background:#e3f2fd;color:#0d47a1}.b-progress,.b-active{background:#fff3e0;color:#e65100}.b-completed{background:#e8f5e9;color:#1b5e20}.b-cancelled{background:#ffebee;color:#b71c1c}.b-hold{background:#f3e5f5;color:#6a1b9a}.b-draft{background:#eceff1;color:#455a64}.b-approved{background:#e0f2f1;color:#00695c}';
const D=s=>Date.UTC(+s.slice(0,4),+s.slice(5,7)-1,+s.slice(8,10)),diff=(a,b)=>Math.round((D(b)-D(a))/864e5);
window.todayEAT=()=>new Date().toLocaleDateString('en-CA',{timeZone:'Africa/Dar_es_Salaam'});
window.calcEvent=x=>{const t=todayEAT();return x.status=='Cancelled'?'Cancelled':x.end_date<t?'Completed':x.start_date<=t?'In Progress':'Planned'};
window.calcProject=x=>{const t=todayEAT(),s=x.status;if(['Draft','On Hold','Cancelled'].includes(s))return s;if(x.end_date&&x.end_date<t)return 'Completed';if(x.start_date&&x.start_date<=t)return 'Active';if(x.start_date&&x.start_date>t)return s=='Approved'?'Approved':'Planned';return s};
const cls={Planned:'planned','In Progress':'progress',Active:'active',Completed:'completed',Cancelled:'cancelled','On Hold':'hold',Draft:'draft',Approved:'approved'};
window.badge=s=>`<span class="b b-${cls[s]||'draft'}">${s}</span>`;
window.when=(x,st)=>{const t=todayEAT();if(['Cancelled','On Hold','Draft'].includes(st)||!x.start_date||!x.end_date)return '';const n=diff(x.start_date,x.end_date)+1;
if(t<x.start_date){const d=diff(t,x.start_date);return d==1?'Starts tomorrow':'Starts in '+d+' days'}
if(t<=x.end_date){const i=diff(x.start_date,t)+1;return n==1?'Today':'Day '+i+' of '+n+(i==n?' · last day':'')}
const d=diff(x.end_date,t);return d==1?'Ended yesterday':'Ended '+d+' days ago'};
window.statusCell=(x,st)=>badge(st)+'<div class="mu">'+when(x,st)+'</div>';
window.tm=s=>s?String(s).slice(0,5):'';

const SBU='https://rhkdzihvndbfanhodlex.supabase.co';
window.avatarHTML=(p,name,sz)=>{sz=sz||32;let c=String(name||'?').trim()[0]||'?';c=/[A-Za-z0-9]/.test(c)?c.toUpperCase():'?';
return p?`<img src="${SBU}/storage/v1/object/public/avatars/${p}" alt="" style="width:${sz}px;height:${sz}px;border-radius:50%;object-fit:cover;vertical-align:middle;flex:none">`:`<span style="display:inline-flex;align-items:center;justify-content:center;width:${sz}px;height:${sz}px;border-radius:50%;background:#2e7d32;color:#fff;font-weight:700;font-size:${Math.round(sz*.45)}px;vertical-align:middle;flex:none">${c}</span>`};
window.openMedia=(kind,url,title,pdf)=>{const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px';
const bar=document.createElement('div');bar.style.cssText='color:#fff;width:100%;max-width:1100px;display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;font:15px system-ui,sans-serif';
const t=document.createElement('span');t.textContent=title||'';const x=document.createElement('button');x.textContent='✕ Close';x.style.cssText='background:#fff;color:#111;border:0;border-radius:8px;padding:8px 14px;cursor:pointer;font:inherit';bar.append(t,x);
let el;if(kind=='video'){el=document.createElement('video');el.src=url;el.controls=true;el.autoplay=true;el.playsInline=true;el.style.cssText='max-width:94vw;max-height:80vh;background:#000'}
else if(pdf){el=document.createElement('iframe');el.src=url;el.style.cssText='width:min(1100px,94vw);height:80vh;background:#fff;border:0'}
else{el=document.createElement('img');el.src=url;el.alt=title||'';el.style.cssText='max-width:94vw;max-height:80vh;background:#fff'}
const k=e=>{if(e.key=='Escape')close()};const close=()=>{if(el.pause)el.pause();o.remove();document.removeEventListener('keydown',k)};document.addEventListener('keydown',k);
o.onclick=e=>{if(e.target===o)close()};x.onclick=close;o.append(bar,el);document.body.appendChild(o)};
const el=document.createElement('style');el.textContent=css;document.head.appendChild(el);
})();
