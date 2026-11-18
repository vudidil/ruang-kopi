'use strict';
/* Model dan rumus dipisah dari tampilan agar mudah dipelajari. */
(function (root) {
  const uid=()=>{
    if(typeof crypto!=='undefined'){
      if(crypto.randomUUID)return crypto.randomUUID();
      if(crypto.getRandomValues){
        const b=new Uint8Array(16);crypto.getRandomValues(b);b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;
        const h=[...b].map(x=>x.toString(16).padStart(2,'0')).join('');
        return h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20);
      }
    }
    return 'id-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);
  };
  const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Jakarta',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  function createPlan(sample=false) {
    const ingredient=(name,packPrice,packQty,unit,stock=0,minStock=0)=>({id:uid(),name,packPrice,packQty,unit,stock,minStock});
    const ingredients=sample?[
      ingredient('Biji kopi',150000,1000,'g',3000,500),
      ingredient('Susu',20000,1000,'ml',6000,2000),
      ingredient('Sirup gula',50000,1000,'ml',1000,200),
      ingredient('Air & es',1000,1000,'ml',20000,5000)
    ]:[];
    const menu=(name,prices,mix,recipe)=>({id:uid(),name,prices,mix,recipe});
    return {
      id:uid(),name:sample?'Contoh kedai kecil':'Rencana baru',example:sample,createdAt:new Date().toISOString(),
      profile:{name:sample?'Kedai Cerita':'',concept:sample?'Kedai kecil dengan takeaway':'',opening:''},
      capital:sample?[{id:uid(),name:'Mesin espresso',cost:18000000},{id:uid(),name:'Grinder',cost:5000000},{id:uid(),name:'Renovasi & furnitur',cost:19000000},{id:uid(),name:'Stok awal',cost:3000000}]:[],
      funds:sample?50000000:0,reserve:sample?5000000:0,
      ingredients,
      menus:sample?[
        menu('Kopi susu',{dinein:22000,takeaway:23000,delivery:28000},60,[{ingredientId:ingredients[0].id,qty:18},{ingredientId:ingredients[1].id,qty:125},{ingredientId:ingredients[2].id,qty:20},{ingredientId:ingredients[3].id,qty:150}]),
        menu('Americano',{dinein:18000,takeaway:19000,delivery:24000},40,[{ingredientId:ingredients[0].id,qty:18},{ingredientId:ingredients[3].id,qty:250}])
      ]:[],
      channels:{dinein:{share:40,packaging:0,fee:0},takeaway:{share:40,packaging:1200,fee:0},delivery:{share:20,packaging:1500,fee:20}},
      assumptions:{days:sample?26:0,cups:sample?60:0,waste:sample?5:0,discount:0,paymentFee:0,hours:sample?8:0,baristas:sample?1:0,cupsPerBarista:sample?20:0},
      fixed:{rent:sample?2500000:0,salary:sample?4000000:0,utilities:sample?1000000:0,other:sample?500000:0},
      ledger:[]
    };
  }
  function recipeCost(p,m) {
    return m.recipe.reduce((sum,line)=>{const i=p.ingredients.find(x=>x.id===line.ingredientId);return sum+(i&&i.packQty>0?i.packPrice/i.packQty*line.qty:0);},0);
  }
  function menuChannel(p,m,key) {
    const ch=p.channels[key],base=recipeCost(p,m),food=base/(1-p.assumptions.waste/100);
    const net=m.prices[key]*(1-p.assumptions.discount/100);
    const fees=net*(ch.fee+p.assumptions.paymentFee)/100;
    const variable=food+ch.packaging+fees;
    return {base,food,net,fees,variable,contribution:net-variable};
  }
  function calculate(p,cups=p.assumptions.cups) {
    const menuWeight=p.menus.reduce((s,m)=>s+m.mix,0),channelWeight=Object.values(p.channels).reduce((s,c)=>s+c.share,0);
    let net=0,variable=0,food=0,price=0;
    if(menuWeight>0&&channelWeight>0) for(const m of p.menus) for(const key of Object.keys(p.channels)){
      const w=m.mix/menuWeight*p.channels[key].share/channelWeight,v=menuChannel(p,m,key);
      net+=v.net*w;variable+=v.variable*w;food+=v.food*w;price+=m.prices[key]*w;
    }
    const fixed=Object.values(p.fixed).reduce((s,x)=>s+x,0),setup=p.capital.reduce((s,i)=>s+i.cost,0);
    const capital=setup+p.reserve,units=cups*p.assumptions.days,revenue=units*net,cost=units*variable;
    const contribution=net-variable,profit=revenue-cost-fixed;
    const valid=menuWeight>0&&channelWeight>0;
    const bep=valid&&contribution>0?Math.ceil(fixed/contribution):null;
    const cash=Math.max(0,p.funds-setup);
    return {valid,menuWeight,channelWeight,net,variable,food,price,fixed,setup,capital,units,revenue,cost,contribution,profit,bep,
      bepDaily:bep!==null&&p.assumptions.days>0?Math.ceil(bep/p.assumptions.days):null,
      shortfall:Math.max(0,capital-p.funds),cash,
      runway:fixed>0?cash/fixed:null,lossRunway:profit<0?cash/-profit:null,
      capacity:p.assumptions.hours*p.assumptions.baristas*p.assumptions.cupsPerBarista,
      breakevenRevenue:bep===null?null:bep*net};
  }
  function migrate(old) {
    const p=createPlan(false);p.name='Rencana versi sebelumnya';
    const reserveRows=old.capital.filter(i=>/cadangan/i.test(i.name));
    p.reserve=reserveRows.reduce((s,i)=>s+i.cost,0);
    p.capital=old.capital.filter(i=>!/cadangan/i.test(i.name)).map(i=>({id:uid(),name:i.name,cost:i.cost}));
    p.funds=p.capital.reduce((s,i)=>s+i.cost,0)+p.reserve;
    p.ingredients=old.ingredients.map(i=>({id:uid(),name:i.name,packPrice:i.cost,packQty:1,unit:'pcs',stock:0,minStock:0}));
    p.menus=[{id:uid(),name:'Menu dari versi sebelumnya',prices:{dinein:old.price,takeaway:old.price,delivery:old.price},mix:100,recipe:p.ingredients.map(i=>({ingredientId:i.id,qty:1}))}];
    p.channels={dinein:{share:100,fee:0,packaging:0},takeaway:{share:0,fee:0,packaging:0},delivery:{share:0,fee:0,packaging:0}};
    p.assumptions.days=old.days;p.assumptions.cups=old.cups;
    for(const key of Object.keys(p.fixed))p.fixed[key]=old[key];
    return p;
  }
  // Validasi backup sebelum data masuk ke aplikasi.
  function validatePlan(p) {
    const text=(v,n=100)=>typeof v==='string'&&v.length<=n;
    const num=(v,max=1e12)=>Number.isFinite(v)&&v>=0&&v<=max;
    const date=v=>/^\d{4}-\d{2}-\d{2}$/.test(v)&&!Number.isNaN(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v;
    if(!p||!text(p.id)||!text(p.name)||!p.profile||!text(p.profile.name)||!text(p.profile.concept,300)||!(p.profile.opening===''||date(p.profile.opening)))return false;
    if(!Array.isArray(p.capital)||p.capital.length>200||!p.capital.every(x=>x&&text(x.id)&&text(x.name)&&num(x.cost))||!num(p.funds)||!num(p.reserve))return false;
    if(!Array.isArray(p.ingredients)||p.ingredients.length>200||!p.ingredients.every(i=>i&&text(i.id)&&text(i.name)&&num(i.packPrice)&&num(i.packQty)&&i.packQty>0&&['g','ml','pcs'].includes(i.unit)&&Number.isFinite(i.stock)&&Math.abs(i.stock)<=1e12&&num(i.minStock)))return false;
    if(new Set(p.ingredients.map(i=>i.id)).size!==p.ingredients.length)return false;
    if(!Array.isArray(p.menus)||p.menus.length>100||!p.menus.every(m=>m&&text(m.id)&&text(m.name)&&num(m.mix)&&m.prices&&['dinein','takeaway','delivery'].every(k=>num(m.prices[k]))&&Array.isArray(m.recipe)&&m.recipe.length<=100&&m.recipe.every(r=>r&&p.ingredients.some(i=>i.id===r.ingredientId)&&num(r.qty))))return false;
    if(new Set(p.menus.map(m=>m.id)).size!==p.menus.length)return false;
    if(!p.channels||!['dinein','takeaway','delivery'].every(k=>p.channels[k]&&num(p.channels[k].share,100)&&num(p.channels[k].packaging)&&num(p.channels[k].fee,100)))return false;
    if(!p.assumptions||!['days','cups','waste','discount','paymentFee','hours','baristas','cupsPerBarista'].every(k=>num(p.assumptions[k])))return false;
    if(p.assumptions.days>31||!Number.isInteger(p.assumptions.days)||p.assumptions.waste>95||p.assumptions.discount>100||p.assumptions.paymentFee>100||p.assumptions.hours>24||!Number.isInteger(p.assumptions.cups)||!Number.isInteger(p.assumptions.baristas))return false;
    if(!p.fixed||!['rent','salary','utilities','other'].every(k=>num(p.fixed[k])))return false;
    if(!Array.isArray(p.ledger)||p.ledger.length>5000||!p.ledger.every(e=>e&&text(e.id)&&date(e.date)&&['sale','expense','purchase','waste'].includes(e.type)&&text(e.note,300)&&Number.isFinite(e.revenue)&&e.revenue>=0&&num(e.cost)&&num(e.cogs??0)&&Array.isArray(e.movements)&&e.movements.length<=200&&e.movements.every(m=>m&&p.ingredients.some(i=>i.id===m.id)&&Number.isFinite(m.qty)&&Math.abs(m.qty)<=1e12)))return false;
    if(new Set(p.ledger.map(e=>e.id)).size!==p.ledger.length)return false;
    return true;
  }
  // Konversi satuan harus menyesuaikan semua jumlah; nilai uang tetap.
  function convertUnit(p,id,newUnit,factor){
    if(!['g','ml','pcs'].includes(newUnit)||!Number.isFinite(factor)||factor<=0||factor>1e6)throw Error('Isi jumlah konversi yang benar.');
    const copy=structuredClone(p),item=copy.ingredients.find(i=>i.id===id);
    if(!item)throw Error('Bahan tidak ditemukan.');
    item.unit=newUnit;item.packQty*=factor;item.stock*=factor;item.minStock*=factor;
    copy.menus.forEach(m=>m.recipe.forEach(r=>{if(r.ingredientId===id)r.qty*=factor;}));
    copy.ledger.forEach(e=>e.movements.forEach(m=>{if(m.id===id)m.qty*=factor;}));
    if(!validatePlan(copy))throw Error('Angka hasil konversi terlalu besar atau kecil. Periksa kembali.');
    return copy;
  }
  root.RK={uid,today,createPlan,recipeCost,menuChannel,calculate,migrate,validatePlan,convertUnit};
})(typeof window!=='undefined'?window:globalThis);
