const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const path2=require('path');const dir=path2.join(__dirname,'/');const out=path2.join(__dirname,'..','/');
(async()=>{
const app=fs.readFileSync(dir+'app.html','utf8');
const head=`<!doctype html>
<html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="라쿤 레벨업">
<meta name="theme-color" content="#EDEFF3">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="manifest" href="manifest.webmanifest">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}</style>
`;
const i=app.indexOf('<style>');
fs.writeFileSync(out+'index.html',head+app.slice(0,i).replace(/<meta name="claude[^>]*>\n/,'')+'</head><body>\n'+app.slice(i)+'\n</body></html>\n');
fs.writeFileSync(out+'manifest.webmanifest',JSON.stringify({name:'라쿤 레벨업',short_name:'라쿤 레벨업',start_url:'./',display:'standalone',background_color:'#EDEFF3',theme_color:'#EDEFF3',icons:[{src:'icon-192.png',sizes:'192x192',type:'image/png'},{src:'icon-512.png',sizes:'512x512',type:'image/png'}]},null,1));
fs.writeFileSync(out+'sw.js',`const C='raccoon-v2';const F=['./','index.html','manifest.webmanifest','icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
`);
const b=await chromium.launch();const p=await b.newPage();
// icon: extract raccoon svg markup
await p.goto('file://'+out+'index.html');
const svg=await p.evaluate(()=>{const s=document.getElementById('scene').cloneNode(true);s.querySelector('#bubble-g').remove();
 ['scarf'].forEach(id=>s.querySelector('#acc-'+id).removeAttribute('hidden'));s.querySelectorAll('[hidden]').forEach(n=>n.remove());
 s.querySelector('#racc').removeAttribute('id');return s.outerHTML});
for(const n of [180,192,512]){
 await p.setViewportSize({width:n,height:n});
 await p.setContent(`<body style="margin:0"><div style="width:${n}px;height:${n}px;overflow:hidden;background:#C7C1D9">${svg.replace('class="scene"',`style="width:${n*1.45}px;margin-left:${-n*0.225}px;margin-top:${-n*0.05}px;display:block"`).replace('viewBox="0 0 320 230"','viewBox="0 0 320 230"')}</div></body>`);
 await p.screenshot({path:out+`icon-${n}.png`});
}
await b.close();})();
