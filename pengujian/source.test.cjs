// Memeriksa paket yang dipindahkan: sintaks, CSS, serta berkas referensi lokal.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const css = require('css-tree');
const root = path.resolve(__dirname, '../website');
for (const name of ['finance.js','motion.js','app.js','intro-timeline.js','intro-controller.js','vendor/gsap.min.js']) {
  new vm.Script(fs.readFileSync(path.join(root, name), 'utf8'), {filename:name});
}
for (const name of ['style.css','workbook.css','motion.css','intro.css']) css.parse(fs.readFileSync(path.join(root,name),'utf8'));
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const target = match[1];
  if (!target || /^(?:https?:|#|data:)/.test(target)) continue;
  assert(fs.existsSync(path.join(root,target)), 'Berkas hilang: '+target);
}
const {parseHTML}=require('linkedom');
const {setSiteUrl}=require('../tools/set-site-url.cjs');
for (const address of ['https://contoh.github.io/ruang-kopi', 'https://kopi.example/']) {
  const updated=setSiteUrl(html,address),{document}=parseHTML(updated);
  const base=address.replace(/\/+$/,'')+'/';
  assert.equal(document.querySelector('link[rel="canonical"]').href,base);
  assert.equal(document.querySelector('meta[property="og:url"]').content,base);
  assert.equal(document.querySelector('meta[property="og:image"]').content,base+'social-card.png');
  assert.equal(document.querySelector('meta[name="twitter:image"]').content,base+'social-card.png');
  const schema=JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
  assert.equal(schema.url,base);assert.equal(schema['@type'],'WebApplication');
  assert(!schema.aggregateRating);
}
for (const bad of ['http://kopi.example', 'javascript:alert(1)', 'https://user:password@kopi.example', 'https://kopi.example/?x=1', 'https://kopi.example/#menu']) {
  assert.throws(()=>setSiteUrl(html,bad));
}
const png=fs.readFileSync(path.join(root,'social-card.png'));
assert.equal(png.subarray(1,4).toString(),'PNG');
assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
for(let i=1;i<=118;i++){
  const frame=path.join(root,'sequence','ezgif-frame-'+String(i).padStart(3,'0')+'.webp');
  assert(fs.existsSync(frame),'Frame hilang: '+frame);
}
assert(fs.existsSync(path.join(__dirname,'../DESIGN.md')),'DESIGN.md harus tersedia.');
const styleCss=fs.readFileSync(path.join(root,'style.css'),'utf8');
const workbookCss=fs.readFileSync(path.join(root,'workbook.css'),'utf8');
assert(!/html\s*\{[^}]*overflow-x:\s*hidden/.test(styleCss),'html tidak boleh memakai overflow-x:hidden.');
assert(!workbookCss.includes('==='),'workbook.css tidak boleh memakai pemisah dekoratif ===.');
assert(workbookCss.includes('.notice .icon'),'Ikon pemberitahuan catatan harus selaras dengan tema.');
console.log('PASS: JavaScript syntax, CSS parsing, local assets, social image, SEO metadata and publication URL validation.');
