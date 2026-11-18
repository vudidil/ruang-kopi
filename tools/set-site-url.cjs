// Ganti alamat metadata pada salinan website yang akan dipublikasikan.
const fs = require('node:fs');
function setSiteUrl(html, address) {
  const url = new URL(address);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error('Gunakan alamat HTTPS tanpa kata sandi, parameter, atau tanda #.');
  }
  url.pathname = url.pathname.replace(/\/+$/, '') + '/';
  const previous = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  if (!previous) throw new Error('Alamat canonical tidak ditemukan.');
  return html.replaceAll(previous, url.href);
}
module.exports = {setSiteUrl};
if (require.main === module) {
  const [file, address] = process.argv.slice(2);
  if (!file || !address) throw new Error('Contoh: node tools/set-site-url.cjs _site/index.html https://nama.github.io/ruang-kopi/');
  fs.writeFileSync(file, setSiteUrl(fs.readFileSync(file, 'utf8'), address));
}
