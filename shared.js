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
const el=document.createElement('style');el.textContent=css;document.head.appendChild(el);
})();
