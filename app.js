'use strict';
// Tampilan dan interaksi. Rumus utama berada di finance.js.
const {uid,today,createPlan,recipeCost,menuChannel,calculate,validatePlan}=window.RK;
const money=n=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
const integer=n=>new Intl.NumberFormat('id-ID',{maximumFractionDigits:2}).format(n);
const formatMoneyInput=v=>{const s=String(v??'').trim();if(!s||s.startsWith('-'))return s;const [i='',d]=s.replace(/\./g,'').split(',');const n=i.replace(/\D/g,'').replace(/^0+(?=\d)/,'');if(!n&&d===undefined)return '';const g=(n||'0').replace(/\B(?=(\d{3})+(?!\d))/g,'.');return d!==undefined?g+','+d.replace(/\D/g,''):g;};
const parseMoneyInput=v=>{const s=String(v??'').trim();if(!s||!/^-?\d+(?:\.\d+)*(?:,\d+)?$/.test(s))return NaN;return Number(s.replace(/\./g,'').replace(',','.'));};
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reducedMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let storageOK=true,firstVisit=false,undoAction=null,toastTimer;
let store,storageIssue='',originalRaw=null,originalKey='ruang-kopi-v3',pendingRecovery=null;
const validPlans=value=>value&&value.version===3&&Array.isArray(value.plans)&&value.plans.length>0&&value.plans.length<=20&&value.plans.every(validatePlan)&&new Set(value.plans.map(p=>p.id)).size===value.plans.length;
try {
 originalRaw=localStorage.getItem(originalKey);
 if(originalRaw!==null){
   const saved=JSON.parse(originalRaw);
   if(!validPlans(saved))throw Error('Invalid stored data');
   store=saved;
 }else{
   originalKey='ruang-kopi-v1';originalRaw=localStorage.getItem(originalKey);
   if(originalRaw!==null){
     const old=JSON.parse(originalRaw);
     if(!old||!Array.isArray(old.capital)||!Array.isArray(old.ingredients))throw Error('Invalid legacy data');
     const migrated=window.RK.migrate(old);
     if(!validatePlan(migrated))throw Error('Invalid migrated data');
     store={version:3,activeId:migrated.id,plans:[migrated]};
   }
 }
} catch(_){storageOK=false;storageIssue=originalRaw!==null?'corrupt':'unavailable';}
if(!store){const p=createPlan(false);store={version:3,activeId:p.id,plans:[p]};firstVisit=true;}
if(!store.plans.some(p=>p.id===store.activeId))store.activeId=store.plans[0].id;
const plan=()=>store.plans.find(p=>p.id===store.activeId);
let selectedMenu='',opsMonth=today().slice(0,7),selectedChannel='dinein';
const iconPaths = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  wallet:'<path d="M20 8V5a2 2 0 0 0-2-2L5 6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h15V8H5"/><path d="M20 12h-5v5h5"/><path d="M16 14.5h.1"/>',
  coffee:'<path d="M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm13 1h2a3 3 0 0 1 0 6h-2M7 3v2m4-2v2m4-2v2M3 22h16"/>',
  chart:'<path d="M4 3v17h17M8 15v-4m5 4V7m5 8V4"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
  back:'<path d="M19 12H5m5-5-5 5 5 5"/>',
  diagonal:'<path d="M6 18 18 6M7 6h11v11"/>',
  download:'<path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4"/>',
  spark:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  trash:'<path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
  leaf:'<path d="M5 19C-1 6 12 3 21 3c0 12-5 18-13 15M4 21 16 9"/>'
};
function icon(name) { return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">'+(iconPaths[name] || iconPaths.spark)+'</svg>'; }
document.querySelectorAll('[data-icon]').forEach(el => el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)));

const titles={
 ringkasan:['Kedaimu, selangkah lebih dekat.','Cek angkanya, rapikan rencananya. Mulai dari satu langkah hari ini.','Ringkasan','grid'],
 profil:['Tentang kedaimu','Nama, konsep, kebutuhan uang, dan rencana tersimpan ada di sini.','Tentang kedai','leaf'],
 modal:['Kebutuhan modal','Catat kebutuhan pembukaan dan uang cadanganmu.','Uang awal','wallet'],
 hpp:['Menu & resep','Isi bahan dan takarannya. Biaya setiap minuman dihitung otomatis.','Resep & harga jual','coffee'],
 bahan:['Harga & persediaan bahan','Atur harga beli, satuan, dan jumlah bahan yang masih tersedia.','Harga & sisa bahan','coffee'],
 omzet:['Hitung keuntungan','Atur jumlah penjualan dan pengeluaran. Hasilnya langsung terlihat.','Hitung Keuntungan','chart'],
 operasional:['Catatan harian','Simpan penjualan, belanja bahan, dan pengeluaran yang benar-benar terjadi.','Catatan Harian','check'],
 rencana:['Rencana tersimpan','Buat beberapa pilihan usaha dan simpan salinannya sebagai file.','Simpan rencana','wallet'],
 panduan:['Baru mulai? Ikuti langkah ini.','Tidak perlu paham istilah bisnis untuk memakai Ruang Kopi.','Cara menggunakan','info']
};
const page=document.querySelector('#page'),channelNames={dinein:'Minum di kedai',takeaway:'Dibawa pulang',delivery:'Pesan lewat aplikasi'};
const paths={ringkasan:'ringkasan',profil:'usaha',modal:'usaha/modal',rencana:'usaha/simpan',hpp:'menu',bahan:'menu/bahan',omzet:'hitung',operasional:'catatan',panduan:'bantuan'};
const groups={ringkasan:'ringkasan',profil:'usaha',modal:'usaha',rencana:'usaha',hpp:'menu',bahan:'menu',omzet:'hitung',operasional:'catatan',panduan:'bantuan'};
function route(){
 const raw=location.hash.slice(1),aliases={usaha:'profil','usaha/modal':'modal','usaha/simpan':'rencana',menu:'hpp','menu/bahan':'bahan',hitung:'omzet',catatan:'operasional',bantuan:'panduan',laba:'omzet'};
 return aliases[raw]||(Object.hasOwn(titles,raw)?raw:'ringkasan');
}
function subnav(){
 const r=route(),group=groups[r],tabs=group==='usaha'?['profil','modal','rencana']:group==='menu'?['hpp','bahan']:[];
 return tabs.length?'<nav class="section-tabs" aria-label="Bagian '+(group==='usaha'?'Usaha Saya':'Menu dan Bahan')+'">'+tabs.map((key,i)=>'<a href="#'+paths[key]+'" '+(r===key?'aria-current="page"':'')+'><span>'+String(i+1).padStart(2,'0')+'</span>'+titles[key][2]+'</a>').join('')+'</nav>':'';
}
const unitName=u=>({g:'gram',ml:'mililiter',pcs:'buah'}[u]||u);
function stockState(item){
 if(item.stock<0)return ['Periksa catatannya','Jumlah yang terpakai lebih banyak dari bahan yang tercatat. Periksa pembelian dan jumlah awal.','warning'];
 if(item.stock===0)return ['Belum ada bahan','Isi jumlah bahan yang ada, atau catat pembelian baru.','warning'];
 if(item.minStock>0&&item.stock<=item.minStock)return ['Hampir habis','Jumlah bahan sudah mencapai batas pengingat belanja.','warning'];
 return ['Masih tersedia',item.minStock===0?'Isi batas pengingat agar tahu kapan perlu belanja lagi.':'Jumlah bahan masih di atas batas pengingat belanja.',''];
}

function getPath(obj,path){return path.split('.').reduce((v,k)=>v?.[k],obj);}
function setPath(obj,path,value){const parts=path.split('.'),key=parts.pop();parts.reduce((v,k)=>v[k],obj)[key]=value;}
function save(){
 if(!['corrupt','unavailable'].includes(storageIssue)){
  try{localStorage.setItem('ruang-kopi-v3',JSON.stringify(store));storageOK=true;storageIssue='';}
  catch(_){storageOK=false;storageIssue='write';}
 }
 document.querySelector('#save-status').innerHTML='<span class="live-dot"></span>'+(storageOK?'Tersimpan di perangkat':storageIssue==='corrupt'?'Data lama perlu dipulihkan':'Belum tersimpan · periksa pemberitahuan');
 document.querySelector('#save-status').dataset.saved=String(storageOK);
 showStorageNotice();
}
function showStorageNotice(){
 const notice=document.querySelector('#storage-recovery');notice.hidden=!storageIssue;
 page.inert=['corrupt','unavailable'].includes(storageIssue);
 if(!storageIssue){notice.innerHTML='';return;}
 const heading=storageIssue==='corrupt'?'Data lama belum bisa dibuka':storageIssue==='write'?'Perubahan belum tersimpan':'Penyimpanan browser tidak bisa diakses';
 const message=storageIssue==='corrupt'?'Data lama tetap disimpan. Unduh salinannya dahulu, lalu pilih file cadangan yang pernah kamu simpan.':storageIssue==='write'?'Perubahan masih ada di halaman ini. Unduh salinan sebelum menutup halaman atau mencoba menyimpan lagi.':'Izinkan penyimpanan untuk website ini melalui pengaturan browser, lalu muat ulang halaman.';
 notice.innerHTML='<h2>'+heading+'</h2><p>'+message+'</p><div class="button-group">'+(storageIssue==='corrupt'?'<button data-recovery="download-old">Unduh data lama</button><label class="button file-label">Pilih file cadangan<input type="file" id="recovery-file" accept=".json,application/json"></label>':storageIssue==='write'?'<button data-recovery="download-current">Unduh perubahan sekarang</button><button data-recovery="retry-save">Coba simpan lagi</button>':'')+'<button data-recovery="reload">Muat ulang halaman</button></div><div id="recovery-preview" role="status"></div>';
 if(pendingRecovery){
  const preview=notice.querySelector('#recovery-preview');
  preview.innerHTML='<p>File berisi <b>'+pendingRecovery.plans.length+' rencana</b>. Pemulihan akan memakai rencana dari file ini. Salinan data lama disimpan terlebih dahulu.</p><button class="primary" data-recovery="restore">Pulihkan rencana dari file ini</button>';
 }
}
async function prepareRecovery(file){
 pendingRecovery=null;
 try{
  if(!file||file.size>2*1024*1024)throw Error('Pilih file cadangan JSON maksimal 2 MB.');
  const candidate=JSON.parse(await file.text());
  if(!validPlans(candidate))throw Error('File ini bukan cadangan Ruang Kopi yang valid. Pilih file lain.');
  pendingRecovery={version:3,activeId:candidate.plans[0].id,plans:candidate.plans};showStorageNotice();
 }catch(_){showStorageNotice();document.querySelector('#recovery-preview').textContent='File tidak dapat dipulihkan. Pilih cadangan Ruang Kopi yang valid, maksimal 2 MB.';}
}
function restoreRecovery(){
 if(!pendingRecovery||storageIssue!=='corrupt')return;
 try{
  if(localStorage.getItem(originalKey)!==originalRaw||(originalKey!=='ruang-kopi-v3'&&localStorage.getItem('ruang-kopi-v3')!==null))throw Error('Data berubah di tab lain. Muat ulang halaman dahulu.');
  // Archive must succeed before replacing unreadable data.
  localStorage.setItem('ruang-kopi-recovery-'+uid(),JSON.stringify({key:originalKey,raw:originalRaw,savedAt:new Date().toISOString()}));
  localStorage.setItem('ruang-kopi-v3',JSON.stringify(pendingRecovery));
  store=pendingRecovery;pendingRecovery=null;storageIssue='';storageOK=true;firstVisit=false;selectedMenu='';render();
  page.focus({preventScroll:true});notify('Rencana dipulihkan. Salinan data lama tetap tersimpan.');
 }catch(err){document.querySelector('#recovery-preview').textContent='Pemulihan belum berhasil. Data lama tetap disimpan. '+(err.message.startsWith('Data berubah')?err.message:'Periksa ruang penyimpanan browser lalu pilih file kembali.');pendingRecovery=null;}
}
document.querySelector('#storage-recovery').addEventListener('change',event=>{if(event.target.id==='recovery-file')prepareRecovery(event.target.files?.[0]);});
document.querySelector('#storage-recovery').addEventListener('click',event=>{
 const action=event.target.closest('[data-recovery]')?.dataset.recovery;
 if(action==='download-old'&&originalRaw!==null)download(originalRaw,'application/json','ruang-kopi-data-lama-'+today()+'.json');
 if(action==='download-current')download(JSON.stringify({version:3,plans:store.plans},null,2),'application/json','backup-ruang-kopi-'+today()+'.json');
 if(action==='retry-save')save();
 if(action==='reload')location.reload();
 if(action==='restore')restoreRecovery();
});
function notify(message,undo=null){
 clearTimeout(toastTimer);undoAction=undo;
 const el=document.querySelector('#toast');el.innerHTML=icon('check')+'<span>'+esc(message)+'</span>'+(undo?'<button id="undo">Urungkan</button>':'');
 el.classList.add('show');toastTimer=setTimeout(()=>{el.classList.remove('show');undoAction=null;},undo?9000:4000);
 window.RKMotion?.feedback(el);
}
function field(path,label,opts={}){
 const val=getPath(plan(),path),type=opts.type||'number',step=opts.step??(path.endsWith('days')||path.endsWith('cups')||path.endsWith('baristas')?1:'any');
 const id=path.replaceAll('.','-'),unit=label.match(/\((Rp|%|gram|mililiter|buah)\)/)?.[1]||({ 'assumptions.cups':'gelas','assumptions.days':'hari','assumptions.hours':'jam' }[path]||'');
 const moneyField=type==='number'&&unit==='Rp',shown=moneyField&&Number.isFinite(val)?integer(val):val;
 const hint=({'funds':'Jumlah uang yang siap kamu gunakan untuk membuka kedai.','reserve':'Dana berjaga-jaga, misalnya untuk biaya sewa saat kedai masih sepi.','assumptions.cups':'Contoh: 30 gelas sehari. Angka ini boleh kamu ubah kapan saja.','assumptions.days':'Contoh: 26 hari jika tutup sekitar satu hari setiap minggu.'})[path];
 return '<label class="field"><span>'+label+'</span><span class="field-input"><input class="input" type="'+(moneyField?'text':type)+'" data-path="'+path+'" value="'+esc(shown)+'" '+(moneyField?'inputmode="numeric" data-format="idr" min="'+(opts.min??0)+'" max="'+(opts.max??1e12)+'" step="'+step+'"':type==='number'?'min="'+(opts.min??0)+'" max="'+(opts.max??1e12)+'" step="'+step+'" inputmode="decimal"':'maxlength="'+(opts.maxlength||100)+'"')+' aria-describedby="err-'+id+(hint?' hint-'+id:'')+'">'+(unit?'<span class="input-unit" aria-hidden="true">'+unit+'</span>':'')+'</span>'+(hint?'<small class="field-hint" id="hint-'+id+'">'+hint+'</small>':'')+'<span class="error-text" id="err-'+id+'"></span></label>';
}
function listField(type,i,key,label,opts={}){
 return field(type+'.'+i+'.'+key,label,opts);
}
const head=(label)=>'<div class="result-label">'+label+'<span class="live-pill">OTOMATIS</span></div>';
const row=(label,value)=>'<div class="breakdown"><span>'+label+'</span><b>'+value+'</b></div>';
const big=value=>'<strong class="big" data-value="'+value+'">'+money(value)+'</strong>';
const helper=text=>'<p class="helper">'+icon('info')+text+'</p>';
function distribution(){
 const p=plan(),c=calculate(p),list=[...p.capital,{name:'Uang cadangan',cost:p.reserve}],colors=['#D4943A','#F4D092','#B87844','#8C6239','#E0A96D','#6E4720'];
 if(c.capital===0)return '<p>Tambahkan kebutuhan pembukaan untuk melihat komposisi modal.</p>';
 return '<div class="distribution">'+list.map((x,i)=>'<span style="flex:'+x.cost+';background:'+colors[i%colors.length]+'"></span>').join('')+'</div>'+list.map((x,i)=>'<div class="legend"><span class="legend-label"><span class="swatch" style="background:'+colors[i%colors.length]+'"></span>'+esc(x.name)+'</span><b>'+integer(x.cost/c.capital*100)+'%</b></div>').join('');
}
function advice(c=calculate(plan())){
 const p=plan(),messages=[];
 if(p.menus.some(m=>m.mix>0&&(!m.recipe.some(r=>r.qty>0)||m.recipe.some(r=>p.ingredients.find(i=>i.id===r.ingredientId)?.packPrice===0))))messages.push({tone:'warn',title:'Ada resep yang belum lengkap',text:'Isi takaran dan harga beli bahan untuk semua menu aktif. Biaya nol yang belum diisi bisa membuat perkiraan untung terlihat terlalu tinggi.',href:'#hpp'});
 if(!c.valid)messages.push({tone:'warn',title:'Isi menu dan cara penjualan dahulu',text:'Pilih menu yang akan dijual dan isi perkiraan jumlah pesanannya.',href:'#hpp'});
 else if(c.bepDaily===null)messages.push({tone:'warn',title:'Biaya belum tertutup',text:'Uang yang diterima per gelas belum cukup untuk bahan, kemasan, dan potongan layanan. Coba periksa harga jualmu.',href:'#hpp'});
 else if(c.profit<0)messages.push({tone:'warn',title:'Penjualan belum cukup menutup biaya',text:'Targetmu '+integer(p.assumptions.cups)+' gelas/hari. Perlu sekitar '+integer(c.bepDaily)+' gelas/hari agar biaya yang dimasukkan tertutup.',href:'#hitung'});
 else messages.push({tone:'good',title:'Penjualan diperkirakan cukup menutup biaya',text:'Dengan angka yang kamu isi, perkiraan untung '+money(c.profit)+'/bulan. Pajak dan penurunan nilai alat belum dihitung.',href:'#hitung'});
 if(c.shortfall>0)messages.push({tone:'warn',title:'Dana pembukaan masih kurang',text:'Tambahan '+money(c.shortfall)+' dibutuhkan agar biaya pembukaan dan target cadangan terpenuhi.',href:'#modal'});
 if(c.capacity>0&&p.assumptions.cups>c.capacity)messages.push({tone:'warn',title:'Target lebih banyak dari kemampuan tim',text:'Tim diperkirakan mampu membuat '+integer(c.capacity)+' gelas/hari. Periksa jumlah barista, jam kerja, dan peralatannya.',href:'#hitung'});
 if(p.assumptions.days===0)messages.push({tone:'warn',title:'Hari buka belum diisi',text:'Isi jumlah hari kedai buka agar perkiraan bulanan bisa dihitung.',href:'#hitung'});
 return messages;
}
function adviceCards(){return advice().map(a=>'<a class="advice '+a.tone+'" href="'+a.href+'"><span class="advice-symbol">'+icon(a.tone==='good'?'check':'info')+'</span><div><strong>'+a.title+'</strong><p>'+a.text+'</p></div></a>').join('');}
function stat(label,value,note,href,ico){return '<a class="stat" href="'+href+'"><div class="stat-top"><span class="stat-icon">'+icon(ico)+'</span><span class="stat-arrow">'+icon('diagonal')+'</span></div><span class="stat-label">'+label+'</span><strong data-value="'+value+'">'+money(value)+'</strong><small>'+note+'</small></a>';}
function capitalMeter(){
 const p=plan(),c=calculate(p),ratio=c.capital>0?Math.min(1,p.funds/c.capital):0;
 return '<div class="capital-meter"><div class="meter-caption"><span>Uang tersedia</span><b>'+money(p.funds)+'</b></div><div class="meter-track" aria-hidden="true"><span style="--fill:'+ratio+'"></span></div><p>'+(c.capital===0?'Isi kebutuhan modal untuk melihat kecukupan danamu.':c.shortfall>0?'Masih perlu '+money(c.shortfall)+'.':'Kebutuhan modal yang kamu isi sudah tercukupi.')+'</p></div>';
}
function financeChart(){
 const p=plan(),c=calculate(p),items=[['Penjualan',c.revenue,'sales'],['Bahan & layanan',c.cost,'materials'],['Biaya bulanan',c.fixed,'monthly']],max=Math.max(c.revenue,c.cost,c.fixed,1);
 return '<div class="chart-heading"><div><span class="eyebrow">Peta uang sebulan</span><h2>Uangmu ke mana?</h2></div><span class="chart-subnote">Ringkasan bulanan</span></div><div class="money-chart">'+items.map(([label,value,tone])=>'<div class="chart-row"><div><span>'+label+'</span><b>'+money(value)+'</b></div><div class="chart-track" aria-hidden="true"><span class="'+tone+'" style="--fill:'+value/max+'"></span></div></div>').join('')+'</div><div class="breakeven-strip"><span>Target tutup biaya bulanan</span><strong>'+(c.bepDaily===null?'Belum terhitung':integer(c.bepDaily)+' gelas/hari · '+integer(c.bep)+' gelas/bln')+'</strong></div><p class="chart-note">Perkiraan dari rencana. Penjualan dikurangi kedua biaya di atas menghasilkan perkiraan untung.</p>';
}
function stockOverview(){
 const items=plan().ingredients.slice().sort((a,b)=>(a.stock>a.minStock)-(b.stock>b.minStock)).slice(0,4);
 return '<div class="chart-heading"><div><span class="eyebrow">Di rak kedai</span><h2>Bahan untuk besok</h2></div>'+icon('coffee')+'</div>'+(items.length?'<ul class="stock-preview">'+items.map(item=>{const state=stockState(item);return '<li><div class="stock-row"><span><b>'+esc(item.name)+'</b><small>'+state[0]+'</small></span><span class="stock-amount '+state[2]+'">'+integer(item.stock)+' <small>'+unitName(item.unit)+'</small></span></div></li>';}).join('')+'</ul><p class="chart-note">Kelola semua bahan melalui bagian Harga &amp; sisa bahan.</p>':'<div class="empty-state"><p>Belum ada bahan di rak. Mulai dari kopi atau susu yang kamu pakai di menu Harga &amp; sisa bahan.</p></div>');
}
function stockMeter(item){
 if(item.minStock<=0)return '<small class="field-hint">Batas pengingat belanja belum diisi.</small>';
 const ratio=Math.max(0,item.stock)/Math.max(item.minStock,item.stock,1);
 return '<div class="stock-meter"><div class="meter-track" aria-hidden="true"><span style="--fill:'+ratio+'"></span></div><small>Batas pengingat: '+integer(item.minStock)+' '+unitName(item.unit)+'</small></div>';
}
function slider(){const a=plan().assumptions,max=Math.max(200,a.cups);return '<input id="sales-slider" class="range" aria-label="Target penjualan gelas per hari" type="range" min="0" max="'+max+'" step="1" data-path="assumptions.cups" value="'+a.cups+'" style="--range:'+(a.cups/max*100)+'%"><div class="range-labels"><span>0 gelas</span><span>'+integer(max)+' gelas/hari</span></div>';}
function welcome(){return '<section class="panel welcome"><div><div class="eyebrow">MULAI DARI SINI</div><h2>Pilih cara memulai rencanamu.</h2><p>Contoh membantu belajar. Rencana kosong siap diisi dengan angka milikmu sendiri.</p></div><div class="button-group"><button class="primary" data-action="start-sample">Pakai contoh kedai</button><button data-action="start-blank">Mulai dari kosong</button></div></section>';}
function summaryAdvice(){
 const items=advice(),item=items.find(a=>a.tone==='warn')||items[0];
 const rawKey=item.href.slice(1),targetKey=({usaha:'profil','usaha/modal':'modal','usaha/simpan':'rencana',menu:'hpp','menu/bahan':'bahan',hitung:'omzet',catatan:'operasional',bantuan:'panduan'}[rawKey]||rawKey);
 const targetLabel=titles[targetKey]?.[2]||'Hitung Keuntungan';
 return '<div class="summary-next"><span class="eyebrow">LANGKAH BERIKUTNYA</span><h2>'+item.title+'</h2><p>'+item.text+'</p><div class="summary-next-actions"><a class="button" href="#'+rawKey+'">Buka '+targetLabel+'</a><p class="summary-next-plain">Bagian terkait: '+targetLabel+'</p></div></div>';
}
function overview(){
 const p=plan(),c=calculate(p);
 const capitalCard=stat('Uang untuk mulai buka',c.capital,'Termasuk biaya pembukaan dan cadangan','#usaha/modal','wallet').replace('class="stat"','class="stat" data-metric="capital"').replace('</a>',capitalMeter()+'</a>');
 const profitCard=stat('Perkiraan untung sebulan',c.profit,'Sebelum pajak dan penurunan nilai alat','#hitung','target').replace('class="stat"','class="stat profit-feature" data-metric="profit"').replace('</a>','<div class="profit-footnote"><span class="profit-caption">'+(c.valid?'Dari '+integer(p.assumptions.cups)+' gelas sehari':'Isi resep dan target untuk mulai menghitung')+'</span><span class="profit-mark" aria-hidden="true">rk.</span></div></a>');
 return (firstVisit?welcome():'')+
 '<div id="ringkasan-kerja">'+
 '<div class="summary-primary"><div class="summary-numbers">'+profitCard+capitalCard+'</div><section class="panel next-action" id="next-action">'+summaryAdvice()+'</section></div>'+
 '<div class="workbook-grid"><section class="workbook-chart" id="finance-chart">'+financeChart()+'</section><section class="stock-notebook">'+stockOverview()+'</section></div>'+
 '<p class="summary-help">Baru mulai? Panduan mengisi rencana tersedia di menu Cara menggunakan.</p></div>';
}
function profilePage(){
 return '<div class="editor-grid"><section class="panel"><div class="editor-heading"><span class="stat-icon">'+icon('leaf')+'</span><div><h2>Identitas kedaimu</h2><p>Rencana lebih personal, tujuan lebih jelas.</p></div></div>'+field('profile.name','Nama kedai kopi',{type:'text'})+field('profile.concept','Seperti apa kedaimu?',{type:'text',maxlength:300})+field('profile.opening','Rencana tanggal buka',{type:'date'})+helper('Tanggal ini adalah target pribadi, bukan jadwal pengingat otomatis.')+'</section><section class="panel tip"><div class="eyebrow">IDE UNTUK KONSEPMU</div><h3>Kedai kecil.<br>Cerita yang besar.</h3><p>Contoh konsep: gerai untuk pesanan dibawa pulang dekat sekolah, kedai tenang untuk belajar, atau coffee shop kecil di lingkungan rumah.</p><a href="#modal">Lanjut hitung kebutuhan modal</a></section></div>';
}
function capitalPage(){
 const p=plan();return '<div class="editor-grid"><section class="panel"><div class="editor-heading"><span class="stat-icon">'+icon('wallet')+'</span><div><h2>Kebutuhan sebelum buka</h2><p>Contohnya mesin kopi, perbaikan tempat, kursi, dan bahan pertama.</p></div></div><div class="capital-rows">'+p.capital.map((x,i)=>'<div class="capital-row">'+listField('capital',i,'name','Kebutuhan '+(i+1),{type:'text'})+listField('capital',i,'cost','Biaya (Rp)')+'<button class="delete-button" data-action="remove-capital" data-index="'+i+'" aria-label="Hapus '+esc(x.name)+'">'+icon('trash')+'</button></div>').join('')+(!p.capital.length?'<p class="empty-state">Belum ada kebutuhan. Mulai dengan menambah komponen.</p>':'')+'</div><button class="add-button" data-action="add-capital">'+icon('plus')+' Tambah kebutuhan</button><div class="divider"></div><div class="field-grid">'+field('funds','Uang yang kamu miliki (Rp)')+field('reserve','Uang yang ingin disimpan untuk berjaga-jaga (Rp)')+'</div>'+helper('Isi uang cadangan di kolom ini saja. Tidak perlu ditambahkan lagi ke daftar kebutuhan.')+'</section><div class="result-column"><section class="panel result" id="result">'+capitalResult()+'</section><p class="result-note">Uang tersisa setelah kedai dibuka = uang tersedia − biaya pembukaan. Perhitungan daya tahan di sini mengasumsikan tidak ada penjualan dan hanya membayar biaya tetap.</p><a class="button" href="#hitung">Isi pengeluaran bulanan</a></div></div>';
}
function capitalResult(){
 const c=calculate(plan());
 return head('Uang untuk mulai buka')+big(c.capital)+row('Biaya pembukaan',money(c.setup))+row('Uang cadangan',money(plan().reserve))+'<div class="divider"></div>'+capitalMeter()+row(c.shortfall>0?'Kekurangan dana':'Uang lebih setelah semua kebutuhan',money(c.shortfall>0?c.shortfall:plan().funds-c.capital))+distribution()+'<div class="result-bottom"><b>Uang tersisa setelah kedai dibuka: '+money(c.cash)+'.</b><br>'+(plan().funds<c.setup?'Dana belum cukup untuk biaya pembukaan.':c.runway===null?'Isi pengeluaran bulanan agar tahu berapa lama uangmu cukup.':'Tanpa penjualan, cukup sekitar '+integer(c.runway)+' bulan untuk pengeluaran rutin yang diisi.')+'</div>';
}
function menuPage(){
 const p=plan();if(!p.menus.some(m=>m.id===selectedMenu))selectedMenu=p.menus[0]?.id||'';
 const mi=p.menus.findIndex(m=>m.id===selectedMenu),m=p.menus[mi];
 let content='<div class="panel-heading"><div><h2>Daftar menu</h2><p>Pilih minuman untuk mengatur resep dan harga jualnya.</p></div><button data-action="add-menu">'+icon('plus')+' Menu baru</button></div>';
 content+='<div class="menu-tabs">'+p.menus.map(x=>'<button data-action="select-menu" data-id="'+x.id+'" aria-pressed="'+(x.id===selectedMenu)+'">'+esc(x.name||'Menu baru')+'</button>').join('')+'</div>';
 if(m){
   content+='<div class="field-grid">'+listField('menus',mi,'name','Nama menu',{type:'text'})+listField('menus',mi,'mix','Perkiraan jumlah pesanan menu ini',{max:10000})+'</div><div class="explain-box">Contoh: kopi susu 6 dan americano 4 berarti sekitar 6 dari 10 gelas adalah kopi susu. Tidak harus berjumlah 100.</div><div class="field-grid three">'+['dinein','takeaway','delivery'].map(k=>listField('menus',mi,'prices.'+k,'Harga '+channelNames[k]+' (Rp)')).join('')+'</div><div class="divider"></div><h2>Bahan untuk satu gelas</h2><div class="recipe-rows">'+m.recipe.map((r,i)=>{const ingredient=p.ingredients.find(x=>x.id===r.ingredientId);return '<div class="recipe-row"><label class="field"><span>Bahan</span><select class="input" data-path="menus.'+mi+'.recipe.'+i+'.ingredientId">'+p.ingredients.map(x=>'<option value="'+x.id+'" '+(r.ingredientId===x.id?'selected':'')+'>'+esc(x.name)+' ('+unitName(x.unit)+')</option>').join('')+'</select></label>'+field('menus.'+mi+'.recipe.'+i+'.qty','Jumlah yang dipakai ('+(ingredient?unitName(ingredient.unit):'')+')')+'<button class="delete-button" data-action="remove-recipe" data-index="'+i+'" aria-label="Hapus bahan dari resep">'+icon('trash')+'</button></div>';}).join('')+'</div><button class="add-button" data-action="add-recipe">'+icon('plus')+' Tambah bahan ke resep</button>'+helper('Contoh: susu Rp20.000 per 1.000 ml, dipakai 125 ml (biaya susu Rp2.500 per gelas). Biaya di kanan juga memperhitungkan bahan yang diperkirakan terbuang.')+'<button class="danger-text" data-action="remove-menu">Hapus menu ini</button>';
 }else content+='<p class="empty-state">Tambahkan menu pertama untuk mulai menyusun resep.</p>';
 return '<div class="editor-grid"><section class="panel">'+content+'</section><div class="result-column"><section class="panel result" id="result">'+menuResult()+'</section><p class="result-note">Biaya bahan dan sisa bahan ada di tab Harga & sisa bahan. Biaya kemasan, potongan harga, dan biaya aplikasi bisa diatur di Hitung Keuntungan.</p></div></div><div class="next-step">'+icon('coffee')+'<p>Ingin mengubah harga beli atau melihat sisa bahan?</p><a class="button" href="#menu/bahan">Buka Harga & sisa bahan</a></div>';
}
function materialsPage(){
 const p=plan();
 return '<section class="panel"><div class="panel-heading"><div><h2>Harga beli dan sisa bahan</h2><p>Satu kartu untuk satu bahan. Semua perubahan tersimpan otomatis.</p></div><button class="primary" data-action="add-ingredient">'+icon('plus')+' Tambah bahan</button></div>'+
 '<div class="explain-box">'+icon('info')+'<p><b>Contoh susu:</b> beli 1 kotak seharga Rp20.000, isinya 1.000 mililiter. Jika resep memakai 125 mililiter, biaya susunya Rp2.500 per gelas.</p></div>'+
 '<div class="materials-grid">'+p.ingredients.map((x,i)=>{const state=stockState(x);return '<article class="ingredient-card material-card" data-material="'+x.id+'"><div class="material-heading"><span class="material-symbol">'+icon('coffee')+'</span><div><h3 class="material-name">'+esc(x.name)+'</h3><span class="stock-label '+state[2]+'">'+state[0]+'</span></div></div>'+listField('ingredients',i,'name','Nama bahan',{type:'text'})+
 '<div class="unit-line"><span>Dihitung dalam <b>'+unitName(x.unit)+'</b></span><button data-action="change-unit" data-index="'+i+'">Ubah satuan</button></div>'+
 '<div class="field-grid">'+listField('ingredients',i,'packPrice','Harga beli satu kemasan (Rp)')+listField('ingredients',i,'packQty','Isi satu kemasan ('+unitName(x.unit)+')',{min:.001})+'</div>'+
 '<div class="divider"></div><div class="field-grid">'+listField('ingredients',i,'stock','Bahan yang masih ada ('+unitName(x.unit)+')',{min:-1e12})+listField('ingredients',i,'minStock','Ingatkan belanja jika tersisa ('+unitName(x.unit)+')')+'</div>'+
 '<p class="stock-explanation">'+state[1]+'</p><div class="material-meter">'+stockMeter(x)+'</div><div class="material-actions"><a href="#catatan" class="button">Catat beli bahan</a><button class="delete-button" data-action="remove-ingredient" data-index="'+i+'" aria-label="Hapus bahan '+esc(x.name)+'">'+icon('trash')+'</button></div></article>';}).join('')+'</div>'+
 (!p.ingredients.length?'<div class="empty-state"><h3>Bahan pertama belum ditambahkan.</h3><p>Mulai dari kopi, susu, atau gula yang kamu gunakan.</p></div>':'')+
 helper('Saat baru mulai, isi jumlah bahan yang benar-benar ada. Setelah itu, gunakan Catatan Harian untuk pembelian dan bahan terbuang. Penjualan otomatis mengurangi bahan sesuai resep.')+'</section>';
}
function menuResult(){
 const p=plan(),m=p.menus.find(x=>x.id===selectedMenu);
 if(!m)return head('BIAYA BAHAN PER GELAS')+'<p>Tambahkan menu dan resep untuk mulai menghitung.</p>';
 const base=recipeCost(p,m),food=base/(1-p.assumptions.waste/100);
 return head('BIAYA BAHAN PER GELAS · '+esc(m.name))+big(food)+row('Bahan sesuai takaran',money(base))+row('Perkiraan biaya bahan terbuang',money(food-base))+'<div class="divider"></div>'+Object.keys(channelNames).map(k=>{const v=menuChannel(p,m,k);return '<div class="mini-result"><strong>'+channelNames[k]+'</strong>'+row('Biaya untuk menjual satu gelas',money(v.variable))+row('Sisa uang per gelas',money(v.contribution))+'</div>';}).join('')+'<div class="result-bottom">Sisa uang per gelas masih perlu dipakai untuk membayar sewa, gaji, dan pengeluaran bulanan.</div>';
}
function scenarioTable(){
 const p=plan(),normal=p.assumptions.cups,counts=[Math.round(normal*.5),normal,Math.round(normal*1.5)];
 const results=counts.map(cups=>calculate(p,cups)),max=Math.max(1,...results.map(c=>Math.abs(c.profit)));
 return '<div class="scenario-grid">'+counts.map((cups,i)=>{const c=results[i],bar='<span style="--fill:'+Math.abs(c.profit)/max+'"></span>';return '<div class="scenario-card '+(i===1?'current':'')+'"><span class="eyebrow">'+['Lebih sepi · 50%','Targetmu · 100%','Lebih ramai · 150%'][i]+'</span><h3>'+integer(cups)+' <small>gelas/hari</small></h3><p>Uang penjualan / bulan</p><strong>'+money(c.revenue)+'</strong><div class="scenario-plot '+(c.profit<0?'loss':'gain')+'" aria-hidden="true"><div>'+(c.profit<0?bar:'')+'</div><div>'+(c.profit>=0?bar:'')+'</div></div><div class="scenario-scale" aria-hidden="true"><span>Rugi</span><span>0</span><span>Untung</span></div><p>Perkiraan '+(c.profit<0?'rugi':'untung')+' / bulan</p><strong class="'+(c.profit<0?'negative':'positive')+'">'+money(Math.abs(c.profit))+'</strong>'+((c.capacity>0&&cups>c.capacity)?'<small class="capacity-warn">Tim mungkin belum sanggup melayani sebanyak ini</small>':'')+'</div>';}).join('')+'</div><p class="helper">Panjang batang memakai skala yang sama. Menu, harga, hari buka, dan biaya tetap sama. Pajak serta penurunan nilai alat belum dihitung.</p>';
}
function salesPage(){
 return '<div class="editor-grid"><section class="panel"><div class="editor-heading"><span class="stat-icon">'+icon('chart')+'</span><div><h2>1. Tentukan target penjualan</h2><p>Mulai dengan jumlah gelas dan hari buka.</p></div></div><div class="field-grid">'+field('assumptions.cups','Ingin menjual berapa gelas per hari?',{step:1})+field('assumptions.days','Buka berapa hari dalam sebulan?',{max:31,step:1})+'</div>'+slider()+
 '<div class="divider"></div><div class="editor-heading"><span class="stat-icon">'+icon('wallet')+'</span><div><h2>2. Isi pengeluaran bulanan</h2><p>Pengeluaran yang tetap perlu dibayar meskipun kedai sepi.</p></div></div><div class="field-grid">'+field('fixed.rent','Sewa tempat per bulan (Rp)')+field('fixed.salary','Gaji pegawai per bulan (Rp)')+field('fixed.utilities','Listrik, air & internet (Rp)')+field('fixed.other','Pengeluaran rutin lainnya (Rp)')+'</div>'+
 '<details class="advanced"><summary>'+icon('plus')+' Sesuaikan cara jual & biaya tambahan <span>Jika diperlukan</span></summary><p>Isi bagian yang sesuai dengan kedaimu. Masukkan 0 jika tidak ada.</p><div class="field-grid spaced">'+field('assumptions.waste','Bahan yang diperkirakan terbuang (%)',{max:95})+field('assumptions.discount','Potongan harga rata-rata (%)',{max:100})+field('assumptions.paymentFee','Potongan dari pembayaran digital (%)',{max:100})+'</div>'+helper('Misalnya: dari 100 ml susu, 5 ml terbuang. Isi 5%. Potongan pembayaran digital adalah biaya dari penyedia pembayaran, bila ada.')+
 '<h3>Cara pelanggan membeli</h3><p>Isi perbandingannya. Contoh: 4 minum di kedai, 4 dibawa pulang, dan 2 lewat aplikasi.</p><div class="channel-grid spaced">'+Object.keys(channelNames).map(k=>'<div class="ingredient-card"><h3>'+channelNames[k]+'</h3>'+field('channels.'+k+'.share','Perkiraan jumlah pesanan',{max:100})+field('channels.'+k+'.packaging','Biaya kemasan tiap gelas (Rp)')+field('channels.'+k+'.fee','Potongan penyedia layanan (%)',{max:100})+'</div>').join('')+'</div><div id="channel-summary" class="explain-box">'+channelSummary()+'</div></details>'+
 '<details class="advanced"><summary>'+icon('plus')+' Apakah tim sanggup melayani target ini? <span>Opsional</span></summary><div class="field-grid spaced">'+field('assumptions.hours','Jam buka setiap hari',{max:24})+field('assumptions.baristas','Pegawai yang membuat minuman bersamaan',{step:1})+field('assumptions.cupsPerBarista','Gelas yang dibuat satu orang per jam')+'</div>'+helper('Contoh: 1 orang × 8 jam × 20 gelas = sekitar 160 gelas sehari. Waktu istirahat dan kemampuan mesin juga perlu diperhatikan.')+'</details></section>'+
 '<div class="result-column"><section class="panel result" id="result">'+profitResult()+'</section><div id="profit-advice" class="spaced">'+adviceCards()+'</div><details class="formula"><summary>Apa saja yang dihitung?</summary><p>Perkiraan untung = uang penjualan setelah diskon − biaya bahan, kemasan, potongan layanan − pengeluaran bulanan. Pajak, penurunan nilai alat, cicilan, dan biaya yang belum diisi belum masuk perhitungan.</p></details></div></div>'+
 '<section class="panel spaced"><div class="panel-heading"><div><h2>Bagaimana kalau kedai sepi atau ramai?</h2><p>Bandingkan setengah target, targetmu, dan satu setengah kali targetmu.</p></div></div><div id="scenario-table">'+scenarioTable()+'</div></section>';
}
function channelSummary(){
 const p=plan(),total=Object.values(p.channels).reduce((s,c)=>s+c.share,0);
 if(!total)return 'Isi setidaknya satu cara penjualan agar hasil dapat dihitung.';
 return 'Dari setiap 100 pesanan, kira-kira: '+Object.keys(channelNames).map(k=>integer(p.channels[k].share/total*100)+' '+channelNames[k].toLowerCase()).join(' · ')+'.';
}

function profitResult(){
 const c=calculate(plan());
 return head(c.profit<0?'PERKIRAAN RUGI SEBULAN':'PERKIRAAN UNTUNG SEBULAN')+big(Math.abs(c.profit))+row('Uang dari penjualan',money(c.revenue))+row('Bahan, kemasan & potongan layanan','− '+money(c.cost))+row('Pengeluaran rutin bulanan','− '+money(c.fixed))+'<div class="divider"></div>'+
 '<p class="result-question">Agar biaya tertutup, perlu menjual:</p><strong class="target-number">'+(c.bepDaily===null?'Belum bisa dihitung':integer(c.bepDaily)+' <small>gelas per hari</small>')+'</strong>'+
 '<p>'+(c.bep===null?'Periksa harga jual dan modal bahan per gelas.':integer(c.bep)+' gelas dalam sebulan agar biaya bulanan tertutup (belum termasuk modal awal).')+'</p>'+
 '<div class="result-bottom">'+(c.profit<0?'Dengan perkiraan kerugian ini, uang tersisa '+money(c.cash)+' cukup sekitar <b>'+integer(c.lossRunway)+' bulan</b>.':'Hasil ini adalah perkiraan berdasarkan angka yang kamu isi. Untuk uang masuk dan keluar yang benar-benar terjadi, gunakan Catatan Harian.')+'</div>';
}

function plansPage(){
 return '<section class="panel"><div class="panel-heading"><div><h2>Semua rencana usaha</h2><p>Maksimal 20 rencana. Setiap rencana memiliki resep, stok, dan catatannya sendiri.</p></div><div class="button-group"><button data-action="new-blank">'+icon('plus')+' Rencana kosong</button><button data-action="new-sample">Tambah contoh</button></div></div><div class="plan-grid">'+store.plans.map(p=>{const c=calculate(p);return '<article class="plan-card '+(p.id===store.activeId?'selected':'')+'"><span class="chip">'+(p.example?'DATA CONTOH':p.id===store.activeId?'SEDANG DIBUKA':'RENCANA TERSIMPAN')+'</span><h3>'+esc(p.name)+'</h3><p>'+esc(p.profile.name||'Nama kedai belum diisi')+'</p><div class="plan-metrics"><span>Modal <b>'+money(c.capital)+'</b></span><span>Untung/bulan <b>'+money(c.profit)+'</b></span></div><div class="button-group"><button data-action="open-plan" data-id="'+p.id+'">Buka</button><button data-action="duplicate-plan" data-id="'+p.id+'">Salin</button><button class="danger-text" data-action="delete-plan" data-id="'+p.id+'" '+(store.plans.length===1?'disabled':'')+'>Hapus</button></div></article>';}).join('')+'</div></section><section class="panel spaced"><h2>Nama rencana yang sedang dibuka</h2><div class="spaced">'+field('name','Nama rencana',{type:'text'})+'</div>'+helper('Nama rencana bisa berbeda dari nama kedai. Contoh: “Booth dekat sekolah” dan “Kedai dengan tempat duduk”.')+'</section><section class="panel spaced"><div class="panel-heading"><div><h2>Simpan salinan & pindah perangkat</h2><p>Simpan file salinan semua rencana dan catatanmu. File ini bisa dibuka kembali di sini, termasuk dari perangkat lain.</p></div></div><div class="button-group"><button class="primary" data-action="backup">'+icon('download')+' Simpan salinan ke perangkat</button><label class="button file-label">Buka file salinan<input id="import-file" type="file" accept=".json,application/json"></label></div>'+helper('File yang dibuka akan ditambahkan sebagai rencana baru. Rencana lama tetap ada. Simpan salinan secara berkala agar data bisa dikembalikan jika data browser terhapus.')+'</section>';
}
function guidePage(){
 return '<section class="panel"><h2>Mulai dari sini, pelan-pelan saja.</h2><div class="guide-grid">'+[
 ['01','Kenalkan usahamu','Buka Usaha Saya. Isi nama kedai, kebutuhan uang modal awal, dan modal yang kamu punya.','#usaha'],
 ['02','Tambahkan bahan minuman','Buka Menu & Bahan bagian Harga & sisa bahan. Isi harga satu kemasan, isinya, dan persediaan yang ada.','#menu/bahan'],
 ['03','Buat resep minuman','Buka Resep & harga jual. Pilih bahan dan takaran yang dipakai untuk satu porsi minuman. Biaya modal bahan dihitung otomatis.','#menu'],
 ['04','Coba hitung keuntungan','Isi target penjualan gelas dan biaya bulanan (sewa, gaji, listrik). Lihat apakah hasil penjualan sudah menutup seluruh biaya.','#hitung'],
 ['05','Catat saat kedai berjalan','Gunakan Catatan Harian untuk mencatat penjualan kas, belanja bahan, dan bahan tumpah. Sisa persediaan bahan akan menyesuaikan otomatis.','#catatan'],
 ['06','Simpan salinan datamu','Buka Usaha Saya bagian Simpan rencana, lalu unduh salinan ke perangkat agar rencana usahamu tidak hilang.','#usaha/simpan']
 ].map(x=>'<a class="guide-card" href="'+x[3]+'"><span class="step-number">'+x[0]+'</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p></a>').join('')+'</div></section><section class="panel spaced"><h2>Arti angka dan istilah yang kamu lihat</h2><div class="glossary">'+[
 ['Biaya bahan per gelas','Uang yang dibutuhkan untuk bahan baku satu minuman. Contoh: susu Rp20.000 per 1.000 mililiter, dipakai 125 mililiter (biaya susunya Rp2.500 per gelas).'],
 ['Target penjualan agar biaya bulanan tertutup','Jumlah gelas agar biaya bahan, kemasan, potongan layanan, dan biaya rutin yang kamu isi tertutup. Ini belum berarti modal awal sudah kembali. Pajak dan penurunan nilai alat belum dihitung.'],
 ['Bahan terbuang','Perkiraan bahan yang terbuang karena tumpah, tersisa di cangkir pengukur, atau gagal racik. Dimasukkan ke hitungan agar modal bahan per gelas tidak terlihat terlalu murah dari kenyataan.'],
 ['Bedanya catatan uang dan perkiraan untung','Catatan uang menjumlahkan uang masuk dan keluar yang kamu masukkan. Perkiraan untung mengurangi penjualan dengan biaya bahan terpakai dan biaya rutin. Pembelian bahan bisa belum habis terpakai, sehingga kedua angka ini berbeda. Pajak dan penurunan nilai alat belum dihitung.'],
 ['Sisa uang per gelas','Harga setelah diskon dikurangi bahan, kemasan, dan potongan layanan. Sisanya masih dipakai membayar sewa, gaji, dan biaya bulanan.'],
 ['Bahan yang masih ada','Jumlah fisik bahan baku yang tersedia di kedai saat ini. Gunakan gram untuk kopi/bubuk, mililiter untuk susu/sirup, dan buah untuk gelas plastik.'],
 ['Kapan diingatkan belanja?','Batas pengingat belanja. Contoh: batas susu 500 ml. Saat sisa susu mencapai angka itu atau kurang, muncul tanda “Hampir habis” agar kamu tidak kehabisan bahan di tengah jualan.'],
 ['Perkiraan rencana vs Catatan harian','Hitung Keuntungan menunjukkan rencana atau simulasi masa depan. Catatan Harian mencatat peristiwa transaksi nyata yang sudah terjadi. Keduanya tidak saling mengaburkan.'],
 ['Di mana data tersimpan?','Data tersimpan di browser perangkat ini. Data dapat hilang jika penyimpanan browser dihapus. Gunakan menu Simpan rencana untuk mengunduh file cadangan ke HP/laptopmu agar bisa dibuka kapan saja.']
 ].map(x=>'<details class="formula"><summary>'+x[0]+'</summary><p>'+x[1]+'</p></details>').join('')+'</div></section>';
}

function entryField(name,label,type='number',value='',extra=''){
 const moneyField=type==='number'&&/\(Rp\)/.test(label),shown=moneyField&&value!==''?integer(Number(value)):value;
 return '<label class="field"><span>'+label+'</span><input class="input" name="'+name+'" type="'+(moneyField?'text':type)+'" value="'+esc(shown)+'" '+(moneyField?'inputmode="numeric" data-format="idr" min="0" max="1000000000000"':type==='number'?'min="0" max="1000000000000" step="any"':'maxlength="300"')+' '+extra+' required></label>';
}
function operationsPage(){
 const p=plan(),entries=p.ledger.filter(e=>e.date.startsWith(opsMonth)),revenue=entries.reduce((s,e)=>s+e.revenue,0),cost=entries.reduce((s,e)=>s+e.cost,0);
 return '<div class="notice">'+icon('info')+'<p><b>Catatan harian sederhana.</b> Catat uang dan bahan setelah ada transaksi. Fitur ini belum mencakup kasir lengkap atau laporan akuntansi. Data tersimpan di browser perangkat ini.</p></div>'+
 '<section class="panel"><div class="panel-heading"><div><h2>Catatan Uang Masuk & Keluar (Arus Kas)</h2><p>Angka di sini berasal dari catatan nyata yang kamu masukkan, bukan perkiraan.</p></div><label class="field month-field"><span>Periode</span><input class="input" type="month" id="ops-month" value="'+opsMonth+'"></label></div>'+
 '<details class="explain-box"><summary>Mengapa selisih uang berbeda dengan untung?</summary><p>Membeli 10 kg kopi mengeluarkan uang sekarang. Biaya bahan untuk minuman dihitung saat kopi dipakai. Kopi yang masih tersimpan tetap menjadi persediaan.</p><p>Perkiraan untung mengurangi penjualan dengan bahan terpakai dan biaya rutin. Pajak serta penurunan nilai alat belum dihitung.</p></details>'+
 '<div class="ops-summary"><div><span>Uang masuk dari penjualan</span><strong>'+money(revenue)+'</strong></div><div><span>Uang keluar yang dicatat</span><strong>'+money(cost)+'</strong></div><div><span>Selisih uang masuk dan keluar</span><strong>'+money(revenue-cost)+'</strong></div></div>'+
 helper('Selisih ini hanya berasal dari catatan yang kamu masukkan. Saldo awal, transaksi yang belum dicatat, dan bahan yang belum terpakai membuatnya berbeda dari saldo rekening atau keuntungan. Perkiraan untung ada di Hitung Keuntungan; pajak dan penurunan nilai alat belum dihitung.')+'</section>'+
 '<div class="lower-grid"><section class="panel"><h2>Catat penjualan</h2><form id="sale-form" class="spaced"><label class="field"><span>Menu</span><select class="input" name="menuId" required>'+p.menus.map(m=>'<option value="'+m.id+'">'+esc(m.name)+'</option>').join('')+'</select></label><div class="field-grid">'+entryField('date','Tanggal','date',today())+entryField('qty','Jumlah gelas','number',1)+'</div><label class="field"><span>Cara penjualan</span><select class="input" name="channel">'+Object.keys(channelNames).map(k=>'<option value="'+k+'">'+channelNames[k]+'</option>').join('')+'</select></label><button class="primary" '+(!p.menus.length?'disabled':'')+'>Simpan penjualan</button>'+helper('Harga mengikuti menu dan potongan harga yang kamu atur. Bahan otomatis berkurang sesuai resep. Catat bahan terbuang secara terpisah.')+'</form></section>'+
 '<section class="panel"><h2>Catat belanja & pengeluaran</h2><form id="expense-form" class="spaced"><label class="field"><span>Jenis catatan</span><select class="input" name="type" id="entry-type"><option value="expense">Pengeluaran kedai (sewa, listrik, gaji, dll.)</option><option value="purchase">Pembelian bahan baru</option><option value="waste">Bahan sisa, terbuang atau rusak</option></select></label>'+entryField('date','Tanggal','date',today())+entryField('note','Keterangan','text')+'<div id="material-entry" hidden><label class="field"><span>Bahan</span><select class="input" name="ingredientId">'+p.ingredients.map(i=>'<option value="'+i.id+'">'+esc(i.name)+' ('+unitName(i.unit)+')</option>').join('')+'</select></label>'+entryField('qty','Jumlah bahan (ikuti satuan yang dipilih)','number',1)+'</div>'+entryField('amount','Uang dibayar (Rp)','number',0)+'<button class="primary">Simpan catatan</button>'+helper('Belanja bahan menambah persediaan. Bahan terbuang mengurangi persediaan tanpa mencatat pembayaran lagi.')+'</form></section></div>'+
 '<div class="next-step">'+icon('coffee')+'<p>Pembelian dan pemakaian di sini otomatis mengubah sisa bahan.</p><a class="button" href="#menu/bahan">Lihat sisa bahan</a></div>'+
 '<section class="panel spaced"><h2>Riwayat transaksi '+esc(opsMonth)+'</h2><div class="table-scroll"><table><thead><tr><th>Tanggal</th><th>Keterangan</th><th>Uang masuk</th><th>Uang keluar</th><th>Nilai bahan terpakai</th><th></th></tr></thead><tbody>'+entries.slice().reverse().map(e=>'<tr><td>'+esc(e.date)+'</td><td>'+esc(e.note)+'</td><td>'+money(e.revenue)+'</td><td>'+money(e.cost)+'</td><td>'+money(e.cogs||0)+'</td><td><button class="delete-button" data-action="delete-entry" data-id="'+e.id+'" aria-label="Hapus catatan '+esc(e.note)+'">'+icon('trash')+'</button></td></tr>').join('')+'</tbody></table></div>'+(!entries.length?'<p class="empty-state">Belum ada transaksi pada periode ini.</p>':'')+'</section>';
}
function render(animate=true){
 window.RKMotion?.stopPage();
 const r=route(),p=plan();document.body.dataset.page=groups[r];document.title=titles[r][2]+' · Ruang Kopi';
 document.querySelectorAll('.sidebar nav a').forEach(a=>{const active=a.dataset.group===groups[r];a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 document.querySelector('#breadcrumb-page').textContent=({usaha:'Usaha Saya',menu:'Menu & Bahan',hitung:'Hitung Keuntungan',catatan:'Catatan Harian',ringkasan:'Ringkasan',bantuan:'Cara menggunakan'}[groups[r]]);
 document.querySelector('.workspace>span:nth-child(2)').innerHTML=esc(p.profile.name||'Kedai impianmu')+'<small>'+esc(p.profile.concept||'Rencana bisnis pertamaku')+'</small>';
 page.innerHTML='<div class="plan-toolbar"><label>RENCANA AKTIF <select id="active-plan" class="input" aria-label="Pilih rencana">'+store.plans.map(x=>'<option value="'+x.id+'" '+(x.id===p.id?'selected':'')+'>'+esc(x.name)+'</option>').join('')+'</select></label><span class="chip">'+(p.example?'DATA CONTOH · BISA DIEDIT':'RENCANA PRIBADI')+'</span><a href="#rencana">Kelola rencana</a></div><div class="title-row"><div><h1>'+titles[r][0]+'</h1><p>'+titles[r][1]+'</p></div><button id="export" class="button" aria-label="Unduh ringkasan untuk Excel">'+icon('download')+'<span class="export-label">Unduh ringkasan</span></button></div>'+
 subnav()+({ringkasan:overview,profil:profilePage,modal:capitalPage,hpp:menuPage,bahan:materialsPage,omzet:salesPage,operasional:operationsPage,rencana:plansPage,panduan:guidePage}[r])();
 document.querySelectorAll('#page a[href^="#"]').forEach(a=>{const old=a.getAttribute('href').slice(1);if(old==='laba')a.href='#hitung';else if(paths[old])a.href='#'+paths[old];});
 if(animate){
  const cssAnim=!document.body.classList.contains('motion-ready');
  page.classList.remove('page-enter');if(cssAnim)void page.offsetWidth;page.classList.add('page-enter');
  document.body.classList.remove('background-shift');if(cssAnim)void document.body.offsetWidth;document.body.classList.add('background-shift');
 }
 save();
 window.RKMotion?.enter(page,{animate,group:groups[r],direction:page.style.getPropertyValue('--page-offset').startsWith('-')?-1:1});
}
function refresh(){
 const r=route(),c=calculate(plan()),out=document.querySelector('#result');
 if(out){
  const previous=Number(out.querySelector('.big')?.dataset.value);
  out.innerHTML=({modal:capitalResult,hpp:menuResult,omzet:profitResult}[r])();
  const amount=out.querySelector('.big');if(amount)updateMoney(amount,Number(amount.dataset.value),previous);
  window.RKMotion?.feedback(out.querySelector('.big'));
 }
 for(const id of ['advice-list','sales-advice','profit-advice']){const el=document.getElementById(id);if(el)el.innerHTML=adviceCards();}
 const scenarios=document.querySelector('#scenario-table');if(scenarios)scenarios.innerHTML=scenarioTable();
 const revenue=document.querySelector('#sim-revenue');if(revenue)updateMoney(revenue,c.revenue);
 const cups=document.querySelector('#cup-output');if(cups)cups.textContent=integer(plan().assumptions.cups);
 document.querySelectorAll('[data-path="assumptions.cups"]').forEach(el=>{if(el!==document.activeElement)el.value=plan().assumptions.cups;if(el.type==='range'){el.max=Math.max(200,plan().assumptions.cups);el.style.setProperty('--range',(plan().assumptions.cups/el.max*100)+'%');el.nextElementSibling.lastElementChild.textContent=integer(el.max)+' gelas/hari';}});
 const channelNote=document.querySelector('#channel-summary');if(channelNote)channelNote.textContent=channelSummary();
 if(r==='bahan')document.querySelectorAll('.material-card').forEach((card,i)=>{
  const material=plan().ingredients[i],state=stockState(material),label=card.querySelector('.stock-label');
  label.className='stock-label '+state[2];label.textContent=state[0];
  card.querySelector('.stock-explanation').textContent=state[1];
  card.querySelector('.material-name').textContent=material.name;
  card.querySelector('.material-meter').innerHTML=stockMeter(material);
 });
 if(r==='ringkasan'){
  document.querySelectorAll('[data-metric]').forEach(el=>updateMoney(el.querySelector('strong'),c[el.dataset.metric]));
  document.querySelector('#next-action').innerHTML=summaryAdvice();
  document.querySelector('#finance-chart').innerHTML=financeChart();
  document.querySelector('.profit-caption').textContent=c.valid?'Dari '+integer(plan().assumptions.cups)+' gelas sehari':'Isi resep dan target untuk mulai menghitung';
 }
}
function updateMoney(element,next,previous){
 if(window.RKMotion)window.RKMotion.number(element,next,money,previous);
 else {element.textContent=money(next);element.dataset.value=String(next);}
}
function error(el,message){
 el.setAttribute('aria-invalid',message?'true':'false');
 const target=el.getAttribute('aria-describedby')?.split(' ')[0];if(target){const holder=document.getElementById(target);if(holder)holder.textContent=message;}
}
page.addEventListener('input',e=>{
 const el=e.target,isIdr=el.dataset.format==='idr';
 if(isIdr){
  const pos=typeof el.selectionStart==='number'&&document.activeElement===el?el.selectionStart:null;
  const before=pos===null?0:el.value.slice(0,pos).replace(/[^\d,]/g,'').length;
  const next=formatMoneyInput(el.value);
  if(next!==el.value){
   el.value=next;
   if(pos!==null&&typeof el.setSelectionRange==='function'){
    let caret=next.length,seen=0;
    for(let i=0;i<next.length;i++){if(seen>=before){caret=i;break;}if(/[\d,]/.test(next[i]))seen++;}
    el.setSelectionRange(caret,caret);
   }
  }
 }
 if(!el.dataset.path||el.tagName==='SELECT')return;
 let value=el.value;
 if(isIdr||el.type==='number'||el.type==='range'){
  value=isIdr?parseMoneyInput(value):Number(value);
  const min=Number(el.getAttribute('min')??0),max=Number(el.getAttribute('max')||1e12),step=el.getAttribute('step');
  if(el.value===''||!Number.isFinite(value)||value<min||value>max||(step==='1'&&!Number.isInteger(value))){error(el,el.value===''?'Isi angka agar hasil diperbarui.':!Number.isFinite(value)?'Gunakan angka yang benar.':value<min?'Angka tidak boleh lebih kecil dari '+integer(min)+'.':value>max?'Angka maksimal '+integer(max)+'.':'Gunakan angka utuh, tanpa koma.');return;}
 }
 if(el.type==='date'&&value&&!/^\d{4}-\d{2}-\d{2}$/.test(value)){error(el,'Isi tanggal yang valid.');return;}
 error(el,'');setPath(plan(),el.dataset.path,value);save();refresh();
 if(storageOK&&!reducedMotion()&&el.animate&&el.type!=='range')el.animate([{transform:'scale(1)'},{transform:'scale(1.012)'},{transform:'scale(1)'}],{duration:220,easing:'cubic-bezier(.22,1,.36,1)'});
 if(el.dataset.path==='name'){const selected=document.querySelector('#active-plan option:checked');if(selected)selected.textContent=plan().name;}
 if(el.dataset.path.startsWith('menus.')&&el.dataset.path.endsWith('.name'))document.querySelectorAll('[data-action="select-menu"]').forEach(b=>b.textContent=plan().menus.find(m=>m.id===b.dataset.id)?.name||'Menu baru');
 if(el.dataset.path.startsWith('profile.'))document.querySelector('.workspace>span:nth-child(2)').innerHTML=esc(plan().profile.name||'Kedai impianmu')+'<small>'+esc(plan().profile.concept||'Rencana bisnis pertamaku')+'</small>';
});
page.addEventListener('change',e=>{
 const el=e.target;
 if(el.id==='active-plan'){store.activeId=el.value;selectedMenu='';firstVisit=false;render();return;}
 if(el.id==='ops-month'){if(/^\d{4}-\d{2}$/.test(el.value)){opsMonth=el.value;render(false);}return;}
 if(el.id==='entry-type'){
  const material=el.value!=='expense';document.querySelector('#material-entry').hidden=!material;
  const amount=page.querySelector('[name="amount"]');amount.disabled=el.value==='waste';if(amount.disabled)amount.value=0;
  page.querySelector('#material-entry [name="qty"]').required=material;return;
 }
 if(el.id==='import-file'){importBackup(el.files?.[0]).finally(()=>{el.value='';});return;}
 if(el.tagName==='SELECT'&&el.dataset.path){setPath(plan(),el.dataset.path,el.value);save();render(false);}

});
function download(content,type,name){
 const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function exportCSV(){
 const p=plan(),c=calculate(p);
 const quote=value=>'"'+String(typeof value==='string'&&/^[=+@\-\t\r]/.test(value)?"'"+value:value).replace(/"/g,'""')+'"';
 const rows=[['RUANG KOPI - SIMULASI',p.name],['Nama kedai',p.profile.name],['Modal pembukaan',c.setup],['Uang cadangan',p.reserve],['Total dana dibutuhkan',c.capital],['Dana tersedia',p.funds],['Kekurangan',c.shortfall],['Biaya bahan, kemasan & potongan layanan per gelas',c.variable],['Uang penjualan setelah diskon/bulan',c.revenue],['Perkiraan untung sebelum pajak dan penurunan nilai alat/bulan',c.profit],['Target penjualan agar biaya bulanan tertutup (gelas/bulan)',c.bep??'Belum tercapai'],[],['Menu','Biaya bahan per gelas (termasuk perkiraan bahan terbuang)','Harga minum di tempat','Harga bungkus bawa pulang','Harga pesan antar online','Perkiraan jumlah pesanan'],...p.menus.map(m=>[m.name,recipeCost(p,m)/(1-p.assumptions.waste/100),m.prices.dinein,m.prices.takeaway,m.prices.delivery,m.mix]),[],['CATATAN HARIAN AKTUAL','Tanggal','Keterangan','Uang kas masuk','Uang kas keluar','Nilai bahan terpakai/terbuang'],...p.ledger.map(e=>[({sale:'Penjualan',purchase:'Pembelian bahan',expense:'Pengeluaran kedai',waste:'Bahan terbuang'}[e.type]),e.date,e.note,e.revenue,e.cost,e.cogs||0])];
 download('\uFEFF'+rows.map(x=>x.map(quote).join(',')).join('\r\n'),'text/csv;charset=utf-8','ringkasan-ruang-kopi.csv');notify('Ringkasan rencana berhasil diunduh.');
}
function addPlan(sample,replace=false){
 if(!replace&&store.plans.length>=20){notify('Maksimal 20 rencana. Simpan salinan lalu hapus yang tidak diperlukan.');return;}
 const p=createPlan(sample);
 if(replace)store.plans=store.plans.filter(x=>x.id!==store.activeId);
 store.plans.push(p);store.activeId=p.id;selectedMenu='';firstVisit=false;render();notify(sample?'Contoh kedai siap dipelajari. Semua angka bisa diedit.':'Rencana kosong siap kamu isi.');
}
async function importBackup(file){
 if(!file)return;
 if(file.size>2*1024*1024){notify('File terlalu besar. Maksimal 2 MB.');return;}
 try{
  const backup=JSON.parse(await file.text());
  if(backup.version!==3||!Array.isArray(backup.plans)||backup.plans.length===0||backup.plans.length>20||!backup.plans.every(validatePlan))throw Error('Format file salinan tidak sesuai.');
  if(backup.plans.length+store.plans.length>20){notify('Jumlah rencana setelah impor melebihi 20. Tidak ada data yang diubah.');return;}
  const incoming=structuredClone(backup.plans).map(p=>({...p,id:uid(),name:(p.name+' (dipulihkan)').slice(0,100)}));
  store.plans.push(...incoming);store.activeId=incoming[0].id;firstVisit=false;selectedMenu='';save();render();notify(incoming.length+' rencana dipulihkan sebagai salinan.');
 }catch(_){notify('File salinan tidak terbaca. Data yang ada tetap aman.');}
}
page.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 const p=plan(),action=b.dataset.action,i=Number(b.dataset.index);
 if(b.id==='export'){exportCSV();return;}
 switch(action){
  case 'start-sample':addPlan(true,true);break;
  case 'start-blank':firstVisit=false;save();render();location.hash='usaha';notify('Mulai dari nama kedai dan uang untuk membuka usaha.');break;
  case 'new-blank':addPlan(false);break;
  case 'new-sample':addPlan(true);break;
  case 'open-plan':store.activeId=b.dataset.id;selectedMenu='';firstVisit=false;render();break;
  case 'duplicate-plan':{
   if(store.plans.length>=20){notify('Maksimal 20 rencana.');break;}
   const copy=structuredClone(store.plans.find(x=>x.id===b.dataset.id));copy.id=uid();copy.name=(copy.name+' (salinan)').slice(0,100);store.plans.push(copy);store.activeId=copy.id;selectedMenu='';render();notify('Rencana beserta catatannya disalin.');break;
  }
  case 'delete-plan':{
   if(store.plans.length<=1)break;
   const index=store.plans.findIndex(x=>x.id===b.dataset.id),removed=store.plans.splice(index,1)[0];
   if(store.activeId===removed.id)store.activeId=store.plans[0].id;
   selectedMenu='';render();notify('Rencana dihapus.',()=>{if(store.plans.length>=20)return;store.plans.splice(index,0,removed);store.activeId=removed.id;render();});break;
  }
  case 'backup':download(JSON.stringify({version:3,exportedAt:new Date().toISOString(),plans:store.plans},null,2),'application/json','backup-ruang-kopi-'+today()+'.json');notify('File salinan semua rencanamu sudah diunduh.');break;
  case 'change-unit':openUnitDialog(i);break;
 case 'add-capital':if(p.capital.length>=200){notify('Maksimal 200 komponen.');break;}p.capital.push({id:uid(),name:'Kebutuhan baru',cost:0});render(false);break;
  case 'remove-capital':{const removed=p.capital.splice(i,1)[0];render(false);notify('Kebutuhan dihapus.',()=>{p.capital.splice(i,0,removed);render(false);});break;}
  case 'add-menu':{
   if(p.menus.length>=100){notify('Maksimal 100 menu.');break;}
   const m={id:uid(),name:'Menu baru',mix:1,prices:{dinein:0,takeaway:0,delivery:0},recipe:[]};p.menus.push(m);selectedMenu=m.id;render(false);notify('Menu baru ditambahkan. Isi harga dan resepnya.');break;
  }
  case 'select-menu':selectedMenu=b.dataset.id;render(false);break;
  case 'remove-menu':{
   const index=p.menus.findIndex(m=>m.id===selectedMenu),removed=p.menus.splice(index,1)[0];selectedMenu='';render(false);notify('Menu dihapus. Riwayat transaksi tetap tersimpan.',()=>{p.menus.splice(index,0,removed);selectedMenu=removed.id;render(false);});break;
  }
  case 'add-recipe':{
   const m=p.menus.find(x=>x.id===selectedMenu);
   if(!p.ingredients.length){notify('Tambahkan bahan dahulu, lalu kembali ke resep.');location.hash='menu/bahan';break;}
   if(m.recipe.length>=100){notify('Maksimal 100 baris bahan per resep.');break;}
   m.recipe.push({ingredientId:p.ingredients[0].id,qty:0});render(false);break;
  }
  case 'remove-recipe':{
   const m=p.menus.find(x=>x.id===selectedMenu),removed=m.recipe.splice(i,1)[0];render(false);notify('Bahan dikeluarkan dari resep.',()=>{m.recipe.splice(i,0,removed);render(false);});break;
  }
  case 'add-ingredient':{
   if(p.ingredients.length>=200){notify('Maksimal 200 bahan.');break;}
   p.ingredients.push({id:uid(),name:'Bahan baru',packPrice:0,packQty:1000,unit:'g',stock:0,minStock:0});render(false);
   const cards=page.querySelectorAll('.material-card');cards[cards.length-1]?.scrollIntoView({behavior:reducedMotion()?'auto':'smooth',block:'center'});notify('Bahan ditambahkan. Isi harga beli, satuan, dan jumlah yang tersedia.');break;
  }
  case 'remove-ingredient':{
   const item=p.ingredients[i];
   if(p.menus.some(m=>m.recipe.some(r=>r.ingredientId===item.id))||p.ledger.some(e=>e.movements.some(m=>m.id===item.id))){notify('Bahan masih dipakai dalam resep atau riwayat stok. Lepaskan dari resep terlebih dahulu; bahan bersejarah perlu dipertahankan.');break;}
   p.ingredients.splice(i,1);render(false);notify('Bahan dihapus.',()=>{p.ingredients.splice(i,0,item);render(false);});break;
  }
  case 'delete-entry':{
   const index=p.ledger.findIndex(e=>e.id===b.dataset.id),entry=p.ledger.splice(index,1)[0];
   entry.movements.forEach(m=>{p.ingredients.find(i=>i.id===m.id).stock-=m.qty;});
   render(false);notify('Catatan dihapus dan perubahan stok dibalik.',()=>{p.ledger.splice(index,0,entry);entry.movements.forEach(m=>{p.ingredients.find(i=>i.id===m.id).stock+=m.qty;});render(false);});break;
  }
 }
});
page.addEventListener('submit',event=>{
 event.preventDefault();const form=event.target,p=plan();
 if(!['sale-form','expense-form'].includes(form.id))return;
 if(!form.reportValidity())return;
 if(p.ledger.length>=5000){notify('Maksimal 5.000 catatan per rencana. Backup lalu buat rencana baru.');return;}
 const value=name=>form.elements.namedItem(name)?.value;
 const date=value('date');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date){notify('Tanggal tidak valid.');return;}
 let entry={id:uid(),date,type:'expense',note:'',revenue:0,cost:0,cogs:0,movements:[]};
 if(form.id==='sale-form'){
  const m=p.menus.find(m=>m.id===value('menuId')),qty=Number(value('qty')),channel=value('channel');
  if(!m||!Number.isInteger(qty)||qty<=0||qty>1e6||!Object.hasOwn(channelNames,channel)){notify('Pilih menu dan jumlah gelas yang valid.');return;}
  const v=menuChannel(p,m,channel);
  entry={...entry,type:'sale',note:m.name+' · '+qty+' gelas · '+channelNames[channel],revenue:(v.net-v.fees)*qty,cogs:(v.base+p.channels[channel].packaging)*qty};
  // Aktual memakai takaran resep, bukan tambahan waste simulasi. Waste aktual dicatat tersendiri.
  const changes=new Map();
  m.recipe.forEach(r=>changes.set(r.ingredientId,(changes.get(r.ingredientId)||0)-r.qty*qty));
  entry.movements=[...changes].map(([id,qty])=>({id,qty}));
  if(entry.revenue<0){notify('Potongan layanan dan aplikasi melebihi harga jual. Perbaiki pengaturan harga atau potongan.');return;}
 }else{
  const type=value('type'),amount=parseMoneyInput(value('amount')),note=value('note').trim();
  if(!note||note.length>300||!Number.isFinite(amount)||amount<0||amount>1e12){notify('Isi keterangan dan uang dibayar yang valid.');return;}
  entry={...entry,type,note,cost:type==='waste'?0:amount};
  if(type==='purchase'||type==='waste'){
   const material=p.ingredients.find(i=>i.id===value('ingredientId')),qty=Number(value('qty'));
   if(!material||!Number.isFinite(qty)||qty<=0||qty>1e12){notify('Pilih bahan dan jumlah lebih dari nol.');return;}
   entry.movements=[{id:material.id,qty:type==='purchase'?qty:-qty}];
   entry.note=(note+' · '+material.name).slice(0,300);
   if(type==='waste')entry.cogs=material.packPrice/material.packQty*qty;
  }
 }
 if(!Number.isFinite(entry.revenue)||entry.revenue>1e12||!Number.isFinite(entry.cogs)||entry.cogs>1e12||entry.movements.some(m=>Math.abs(p.ingredients.find(i=>i.id===m.id).stock+m.qty)>1e12)){notify('Nilai transaksi terlalu besar. Periksa harga dan jumlah.');return;}
 entry.movements.forEach(m=>{p.ingredients.find(i=>i.id===m.id).stock+=m.qty;});
 p.ledger.push(entry);opsMonth=date.slice(0,7);save();render(false);
 notify(p.ingredients.some(i=>i.stock<0)?'Catatan tersimpan. Jumlah bahan terpakai melebihi persediaan tercatat. Periksa jumlah awal dan belanja bahan.':'Catatan hari ini tersimpan.');
});
let unitTarget=null;
const unitDialog=document.querySelector('#unit-dialog');
function openUnitDialog(index){
 const p=plan(),item=p.ingredients[index];unitTarget={planId:p.id,ingredientId:item.id,oldUnit:item.unit};
 unitDialog.innerHTML='<form id="unit-form"><div class="panel-heading"><div><span class="eyebrow">SATUAN BAHAN</span><h2 id="unit-title">Ubah satuan '+esc(item.name)+'</h2></div><button type="button" id="close-unit" aria-label="Tutup">'+icon('plus')+'</button></div><p>Semua jumlah bahan ini akan disesuaikan bersama, termasuk isi kemasan, resep, persediaan, dan catatan pemakaian.</p><label class="field spaced"><span>Ingin dihitung dalam apa?</span><select class="input" id="unit-choice" name="unit">'+['g','ml','pcs'].map(u=>'<option value="'+u+'" '+(u===item.unit?'selected':'')+'>'+unitName(u)+'</option>').join('')+'</select></label><label class="field"><span id="unit-factor-label"></span><input class="input" name="factor" type="number" min="0.000001" max="1000000" step="any" required placeholder="Isi jumlah yang setara"></label><div class="explain-box"><p>Contoh: jika angka 1 pada catatan lama berarti satu takaran susu berisi 125 mililiter, pilih mililiter dan isi 125. Harga dan biaya transaksi lama tidak diubah.</p></div><p id="unit-error" class="error-text" role="alert"></p><div class="button-group spaced"><button class="primary" type="submit">Simpan satuan</button><button type="button" id="cancel-unit">Batal</button></div></form>';
 updateUnitLabel();
 if(typeof unitDialog.showModal==='function')unitDialog.showModal();else unitDialog.setAttribute('open','');
}
function updateUnitLabel(){
 const unit=unitDialog.querySelector('[name="unit"]').value;
 unitDialog.querySelector('#unit-factor-label').textContent='1 '+unitName(unitTarget.oldUnit)+' pada catatan lama sama dengan berapa '+unitName(unit)+'?';
 const field=unitDialog.querySelector('[name="factor"]');field.value=unit===unitTarget.oldUnit?'1':'';
}
function closeUnitDialog(){if(typeof unitDialog.close==='function')unitDialog.close();else unitDialog.removeAttribute('open');unitTarget=null;}
unitDialog.addEventListener('click',e=>{if(e.target.closest('#close-unit,#cancel-unit'))closeUnitDialog();});
unitDialog.addEventListener('change',e=>{if(e.target.id==='unit-choice')updateUnitLabel();});
unitDialog.addEventListener('submit',e=>{
 e.preventDefault();if(!unitTarget||!e.target.reportValidity())return;
 try{
  const owner=store.plans.find(p=>p.id===unitTarget.planId),unit=unitDialog.querySelector('[name="unit"]').value,factor=Number(unitDialog.querySelector('[name="factor"]').value);
  if(unit===unitTarget.oldUnit&&factor!==1)throw Error('Satuan masih sama. Isi 1 atau pilih satuan yang berbeda.');
  const converted=window.RK.convertUnit(owner,unitTarget.ingredientId,unit,factor);
  store.plans[store.plans.findIndex(p=>p.id===owner.id)]=converted;
  // Undo lama tidak boleh memakai angka dari satuan sebelum konversi.
  undoAction=null;closeUnitDialog();save();render(false);notify('Satuan diperbarui. Biaya resep tetap sama.');
 }catch(err){unitDialog.querySelector('#unit-error').textContent=err.message;}
});
document.querySelector('#toast').addEventListener('click',e=>{if(e.target.closest('#undo')&&undoAction){undoAction();notify('Perubahan diurungkan.');}});
document.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();page.focus({preventScroll:true});page.scrollIntoView({behavior:reducedMotion()?'auto':'smooth'});});
const navToggle=document.querySelector('#sidebar-toggle');
function setSidebar(collapsed){
 document.body.classList.toggle('nav-collapsed',collapsed);
 navToggle.setAttribute('aria-expanded',String(!collapsed));
 navToggle.setAttribute('aria-label',collapsed?'Perluas menu atas':'Ringkas menu atas');
 navToggle.title=collapsed?'Perluas menu':'Ringkas menu';
}
try{setSidebar(localStorage.getItem('ruang-kopi-ui-sidebar')==='collapsed');}catch(_){}
navToggle.addEventListener('click',()=>{
 const collapsed=!document.body.classList.contains('nav-collapsed');setSidebar(collapsed);
 try{localStorage.setItem('ruang-kopi-ui-sidebar',collapsed?'collapsed':'expanded');}catch(_){}
});
document.querySelectorAll('.sidebar nav a').forEach(a=>{a.title=a.textContent.trim();});
let navigationToken=0,lastGroup=groups[route()];
function navigate(){
 ++navigationToken;
 const order=['ringkasan','usaha','menu','hitung','catatan','bantuan'],group=groups[route()];
 page.style.setProperty('--page-offset',order.indexOf(group)<order.indexOf(lastGroup)?'-18px':'18px');lastGroup=group;
 render(true);
 (page.inert?document.querySelector('#storage-recovery'):page).focus({preventScroll:true});
 window.scrollTo({top:0,behavior:'auto'});
}
window.addEventListener('hashchange',navigate);
render();
