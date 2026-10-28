(function(){
const SBURL='https://rhkdzihvndbfanhodlex.supabase.co',SBKEY='sb_publishable_CRzNoKrPLp-G6o6P98Ua6w_-0VhGfpp';
window.SB=window.supabase.createClient(SBURL,SBKEY);
window.fetchAll=async mk=>{let o=[],f=0;for(;;){const r=await mk(f,f+999);if(r.error)throw r.error;o=o.concat(r.data);if(r.data.length<1000)return o;f+=1000}};
const CLD='c7lhcpcl',PRESET='terraviva-beneficiary-management-system-unsigned';
window.cldUpload=(file,onp)=>new Promise((res,rej)=>{const x=new XMLHttpRequest();x.open('POST','https://api.cloudinary.com/v1_1/'+CLD+'/auto/upload');
x.upload.onprogress=e=>{if(onp&&e.lengthComputable)onp(Math.round(e.loaded/e.total*100))};
x.onload=()=>{let j;try{j=JSON.parse(x.responseText)}catch(e){return rej(new Error('Upload failed'))}x.status<300?res(j):rej(new Error((j.error&&j.error.message)||'Upload failed'))};
x.onerror=()=>rej(new Error('Network error'));const f=new FormData();f.append('file',file);f.append('upload_preset',PRESET);x.send(f)});
window.cldImg=(u,t)=>u.replace('/upload/','/upload/'+(t||'f_auto,q_auto')+'/');
window.cldVideo=u=>u.replace('/upload/','/upload/q_auto/');
window.cldPoster=u=>u.replace('/upload/','/upload/so_1,w_600,h_400,c_fill,q_auto/').replace(/\.[a-z0-9]+$/i,'.jpg');
window.cldDownload=u=>u.replace('/upload/','/upload/fl_attachment/');
if('serviceWorker' in navigator&&location.protocol=='https:')addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
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

const E=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));let ses=false;
async function loadN(){const r=await SB.from('notifications').select('*').order('created_at',{ascending:false}).limit(20);const d=r.data||[],u=d.filter(x=>!x.read).length,b=document.getElementById('belln'),p=document.getElementById('bellp');if(!b)return;b.style.display=u?'inline-block':'none';b.textContent=u>9?'9+':u;
p.innerHTML='<div style="display:flex;justify-content:space-between;padding:10px 12px;border-bottom:1px solid var(--bd,#ddd)"><b>Notifications</b><a href="#" id="bellall" style="font-size:13px">Mark all read</a></div>'+(d.map(x=>'<div class="bi" data-id="'+x.id+'" data-l="'+E(x.link||'')+'" style="padding:10px 12px;border-bottom:1px solid var(--bd,#ddd);cursor:pointer;'+(x.read?'opacity:.65':'')+'"><div style="font-weight:'+(x.read?400:700)+'">'+E(x.title)+'</div>'+(x.body?'<div style="font-size:13px;opacity:.8">'+E(x.body)+'</div>':'')+'<div style="font-size:12px;opacity:.6">'+new Date(x.created_at).toLocaleString()+'</div></div>').join('')||'<div style="padding:14px;font-size:14px;opacity:.7">No notifications yet.</div>');
p.querySelectorAll('.bi').forEach(i=>i.onclick=async()=>{await SB.from('notifications').update({read:true}).eq('id',i.dataset.id);if(i.dataset.l)location.href=i.dataset.l;else loadN()});
const a=document.getElementById('bellall');if(a)a.onclick=async e=>{e.preventDefault();await SB.from('notifications').update({read:true}).eq('read',false);loadN()}}
function inject(){if(!ses)return;const h=document.querySelector('header');if(!h||h.querySelector('#tbms-bell'))return;const w=document.createElement('span');w.id='tbms-bell';w.style.cssText='position:relative;display:inline-flex;align-items:center;gap:8px';
w.innerHTML='<a href="/help.html" style="font-size:14px;color:#2e7d32">Help</a><button id="bellb" title="Notifications" style="background:none;border:0;cursor:pointer;font-size:20px;padding:4px 8px;position:relative;color:inherit">🔔<span id="belln" style="display:none;position:absolute;top:-2px;right:-2px;background:#c62828;color:#fff;border-radius:999px;font-size:11px;padding:1px 6px;font-weight:700"></span></button><div id="bellp" style="display:none;position:absolute;right:0;top:38px;width:min(340px,86vw);max-height:70vh;overflow:auto;background:var(--c,#fff);color:var(--tx,#111);border:1px solid var(--bd,#ddd);border-radius:12px;z-index:9000;box-shadow:0 8px 24px rgba(0,0,0,.2);text-align:left"></div>';
h.appendChild(w);document.getElementById('bellb').onclick=()=>{const p=document.getElementById('bellp');p.style.display=p.style.display=='none'?'block':'none'};loadN()}
async function chk(s){if(!s){ses=false;return}const p=(await SB.from('profiles').select('active,approval_status').eq('id',s.user.id).maybeSingle()).data;if(!p||!p.active||p.approval_status!='approved'){ses=false;const x=location.pathname;if(x!='/'&&x!='/index.html')location.replace('/');return}ses=true;inject()}
SB.auth.getSession().then(r=>chk(r.data.session));SB.auth.onAuthStateChange((e,s)=>{setTimeout(()=>chk(s),0)});
new MutationObserver(inject).observe(document.documentElement,{childList:true,subtree:true});setInterval(()=>{if(ses&&document.getElementById('bellb'))loadN()},60000);
const el=document.createElement('style');el.textContent=css;document.head.appendChild(el);
})();
