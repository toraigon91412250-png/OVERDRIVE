const assert=require('node:assert/strict'),vm=require('node:vm'),e=require('esbuild');
const out=e.buildSync({entryPoints:['src/titan/combat-rules.js'],bundle:true,platform:'node',format:'cjs',write:false});
const m={exports:{}};vm.runInThisContext('(function(module,exports){'+out.outputFiles[0].text+'})')(m,m.exports);
const {resolveTitanPunch:punch}=m.exports;
assert.equal(punch({kind:'attack',hp:100}).damage,60,'The normal punch keeps its established damage');
assert(punch({kind:'attack',counter:true,hp:100}).damage>60,'A successful defensive timing rewards the next punch');
const armored={kind:'armored',armor:true,hp:134};
const front=punch({...armored,facing:1}),side=punch({...armored,facing:0}),back=punch({...armored,facing:-1}),opening=punch({...armored,facing:1,phase:'recovery'}),counter=punch({...armored,facing:1,counter:true});
assert(front.damage>0&&front.damage<side.damage,'Frontal armor reduces damage but is not invulnerable');
assert.equal(front.stagger,false,'Jabbing frontal armor cannot repeatedly stop its attack');
assert.equal(front.source,'punch-guarded');
assert.equal(side.damage,back.damage,'Flanking and rear attacks both bypass frontal resistance');
assert(opening.damage>side.damage,'The armored titan has a useful recovery opening');
for(const hit of [front,side,back,opening])assert.equal(hit.breakArmor,false,'Ordinary punches do not instantly peel off armor');
assert(counter.breakArmor&&counter.stagger,'A counter explicitly breaks one armor plate');
assert.equal(counter.source,'punch-counter');
assert.equal(punch({...armored,armor:false}).damage,60,'Breaking armor returns the target to normal vulnerability');
const jaw=punch({kind:'jaw',hp:100}),jawOpening=punch({kind:'jaw',phase:'recovery',hp:100}),jawCounter=punch({kind:'jaw',counter:true,hp:100});
assert(jaw.damage>0&&jawOpening.damage>jaw.damage&&jawCounter.damage>jawOpening.damage,'The jaw rewards its attack recovery and defensive counter');
assert(jawOpening.damage>=68,'A correctly timed opening can defeat a raid jaw');
for(const counter of [false,true])for(const hp of [204,100,12,2,1,0]){
 const hit=punch({kind:'colossal',counter,hp});assert(hit.damage>=0&&hit.damage<=Math.max(0,hp-1),'A giant punch cannot finish a colossal titan');assert.equal(hit.stagger,false,'Punches do not permanently stun the colossal');assert.equal(hit.breakArmor,false);
}
for(const kind of ['attack','armored','jaw','colossal']){
 const dead=punch({kind,armor:true,counter:true,hp:0});assert.equal(dead.damage,0);assert.equal(dead.stagger,false);assert.equal(dead.breakArmor,false);
}
assert.equal(punch({hp:NaN}).damage,0,'Invalid health cannot inject invalid damage');
console.log('PASS titan combat roles: normal impact, armored flanks/openings/counter break, jaw recovery, colossal nonlethal limit');

const hardened=punch({...armored,facing:1,hardened:true});
assert(hardened.breakArmor&&hardened.damage>front.damage&&hardened.stagger,'Hardening can break frontal armor on a real contact');
assert(punch({hardened:true,hp:100}).damage>punch({hp:100}).damage,'Hardened ordinary contact gains power');
for(const hp of [100,1,0])assert(punch({kind:'colossal',hardened:true,hp}).damage<=Math.max(0,hp-1),'Hardening preserves the colossal nape finish');
