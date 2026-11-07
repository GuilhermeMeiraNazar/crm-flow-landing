import fs from 'node:fs';
const p = '../verificacao/RESULTADOS.md';
let t = fs.readFileSync(p, 'utf8');
// O arquivo foi escrito em ASCII; qualquer outro caractere e mojibake da saida do console do Windows.
t = t.replace(/[^\x00-\x7F]+/g, ' ').replace(/ok: ?/g, '').replace(/ +\|/g, ' |');
t = t.replace(/^\s*built in/gm, 'built in').replace(/\n{3,}/g, '\n\n');
fs.writeFileSync(p, t);
console.log(t.split('\n').filter((l) => /built in|\| home|style-/.test(l)).join('\n'));
