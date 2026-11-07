const V='cf2-shell-v2',SM='cf2-samples';
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon.svg'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!==SM).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.hostname==='gleitz.github.io'||u.hostname==='cdn.jsdelivr.net'){e.respondWith(caches.open(SM).then(async c=>{const h=await c.match(r);if(h)return h;const n=await fetch(r);if(n.ok)c.put(r,n.clone());return n}));return}
 if(u.origin!==location.origin)return;
 e.respondWith(caches.open(V).then(async c=>{const h=await c.match(r);const net=fetch(r).then(n=>{if(n.ok)c.put(r,n.clone());return n}).catch(()=>h);return h||net}))});
