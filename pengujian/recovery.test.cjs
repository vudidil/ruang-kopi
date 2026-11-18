const {setup}=require('./core.test.cjs');
const assert=require('node:assert/strict');
const key='ruang-kopi-v3';
function storage(entries=[],fail=()=>false){
 const data=new Map(entries),writes=[];
 return {data,writes,getItem(k){if(fail('read',k))throw Error('Blocked');return data.get(k)??null;},setItem(k,v){if(fail('write',k))throw Error('Quota');writes.push(k);data.set(k,v);}};
}
async function choose(t,value){t.context.file={size:100,text:async()=>JSON.stringify(value)};await t.run('prepareRecovery(file)');}
(async()=>{
 const normal=setup();normal.click(normal.doc.querySelector('[data-action="start-sample"]'));
 const backup=JSON.parse(normal.saved());
 for(const raw of ['{broken','null',JSON.stringify({version:3,plans:[]}),JSON.stringify({version:4,plans:backup.plans})]){
  const s=storage([[key,raw]]),t=setup(null,s);
  assert.equal(s.writes.length,0);assert.equal(s.data.get(key),raw);
  assert(t.doc.querySelector('#page').inert);assert(!t.doc.querySelector('#storage-recovery').hidden);
  t.go('menu');assert.equal(s.writes.length,0);
  t.click(t.doc.querySelector('[data-recovery="download-old"]'));assert.equal(await t.blob().text(),raw);
  await choose(t,{version:3,plans:[{}]});assert.equal(s.writes.length,0);assert(!t.doc.querySelector('[data-recovery="restore"]'));
  await choose(t,backup);assert.equal(s.writes.length,0); // Choosing is not consent to replace.
  t.click(t.doc.querySelector('[data-recovery="restore"]'));
  const archive=[...s.data].find(([k])=>k.startsWith('ruang-kopi-recovery-'));
  assert(archive);assert.equal(JSON.parse(archive[1]).raw,raw);
  assert.deepEqual(JSON.parse(s.data.get(key)).plans,backup.plans);
  assert(!t.doc.querySelector('#page').inert);assert(t.doc.querySelector('#storage-recovery').hidden);
 }
 const blocked=storage([],kind=>kind==='read'),b=setup(null,blocked);
 assert.equal(blocked.writes.length,0);b.run('save()');assert.equal(blocked.writes.length,0);
 for(const fail of [(kind,k)=>kind==='write'&&k.startsWith('ruang-kopi-recovery-'),(kind,k)=>kind==='write'&&k===key]){
  const s=storage([[key,'bad']],fail),t=setup(null,s);await choose(t,backup);t.run('restoreRecovery()');
  assert.equal(s.data.get(key),'bad');assert(t.doc.querySelector('#page').inert);
 }
 const legacy=storage([['ruang-kopi-v1','bad']]),l=setup(null,legacy);
 assert.equal(legacy.writes.length,0);await choose(l,backup);l.run('restoreRecovery()');
 assert.equal(legacy.data.get('ruang-kopi-v1'),'bad');assert.deepEqual(JSON.parse(legacy.data.get(key)).plans,backup.plans);
 const concurrent=storage([[key,'bad']]),c=setup(null,concurrent);await choose(c,backup);
 concurrent.data.set(key,JSON.stringify(backup));c.run('restoreRecovery()');assert.equal(concurrent.writes.length,0);
 let full=true;const quota=storage([[key,JSON.stringify(backup)]],kind=>kind==='write'&&full),q=setup(null,quota);
 assert(!q.doc.querySelector('#page').inert);q.run('plan().funds=123;save()');assert.equal(JSON.parse(quota.data.get(key)).plans[0].funds,backup.plans[0].funds);
 q.click(q.doc.querySelector('[data-recovery="download-current"]'));assert.equal(JSON.parse(await q.blob().text()).plans[0].funds,123);
 full=false;q.click(q.doc.querySelector('[data-recovery="retry-save"]'));assert.equal(JSON.parse(quota.data.get(key)).plans[0].funds,123);
 normal.go('hitung');normal.input(normal.doc.querySelector('#sales-slider'),100);
 normal.go('ringkasan');
 assert.equal(normal.doc.querySelector('[data-metric="profit"] strong').textContent,normal.run('money(calculate(plan()).profit)'));
 normal.run('exportCSV()');const csv=await normal.blob().text();
 assert(csv.includes('Target penjualan agar biaya bulanan tertutup'));assert(!/untung bersih|keuntungan bersih|\bBEP\b|\bHPP\b/i.test(csv));
 console.log('PASS: corrupted/invalid/blocked storage, raw export, recovery confirmation, archive-before-replace, quota, legacy and cross-tab preservation, dashboard updates and CSV wording.');
})().catch(e=>{console.error(e);process.exit(1);});
