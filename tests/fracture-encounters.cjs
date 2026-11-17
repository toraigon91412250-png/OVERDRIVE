const assert=require('node:assert/strict'),vm=require('node:vm'),{buildSync}=require('esbuild');
const moduleRef={exports:{}};
vm.runInNewContext(buildSync({entryPoints:['src/omega-encounters.js'],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text,{module:moduleRef,exports:moduleRef.exports});
const {composeFractureEncounter,remixFractureQueue,composeOmegaEncounter}=moduleRef.exports;
function randomFrom(seed){let s=seed>>>0;return()=>((s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296)}
const ranged=type=>type==='shooter'||type==='strafer';
for(let seed=1;seed<=500;seed++){
 const first=composeFractureEncounter(6,randomFrom(seed));
 assert.equal(first.length,6);assert.equal(first.filter(ranged).length,1,'Σ opening wave has exactly one ranged enemy');
 assert.equal(first.filter(type=>type==='shooter').length,1);assert.equal(first.filter(type=>type==='strafer').length,0);
 assert(first.every(type=>['chaser','charger','shooter'].includes(type)));
 const refill=composeFractureEncounter(3,randomFrom(seed),false);
 assert.equal(refill.length,3);assert(refill.every(type=>type==='chaser'||type==='charger'),'Σ reinforcements stay melee-only');
 const mixed=remixFractureQueue(['boss','chaser','shooter','charger','strafer','charger'],randomFrom(seed));
 assert.equal(mixed.filter(type=>type==='boss').length,1);assert.equal(mixed.filter(ranged).length,1);assert(mixed.every(type=>['boss','chaser','charger','shooter'].includes(type)));
}
const omega=composeOmegaEncounter('SNIPER',6,randomFrom(73));
assert(omega.includes('shooter')&&omega.includes('strafer'),'Ω retains its original ranged encounter profile');
console.log('Σ ENCOUNTERS: one readable shooter per opening roster, melee-only reinforcements, no strafers, preserved boss queue, and unchanged Ω ranged profiles passed');
