const assert=require('node:assert/strict'),vm=require('node:vm'),{buildSync}=require('esbuild');
const moduleRef={exports:{}};
vm.runInNewContext(buildSync({entryPoints:['src/arsenal-evolution.js'],bundle:true,format:'cjs',write:false}).outputFiles[0].text,{module:moduleRef,exports:moduleRef.exports});
const {arsenalBuild,arsenalCards,isArsenalCard,canInstallArsenal,arsenalCardWeapon}=moduleRef.exports;
const rows=[
 [1,'breach',['vortex','burst'],10,.7,1.65],
 [2,'rail',['prism','siege'],6,.95,1.9],
 [3,'astra',['nova','reactor'],24,.16,0],
 [4,'lance',['echo','deadeye'],1,.65,2.4],
 [5,'seeker',['swarm','hunter'],6,.82,1.9]
];
const close=(a,b)=>assert(Math.abs(a-b)<1e-9,`${a} != ${b}`);
const ids=new Set();
for(const [weapon,prefix,routes,mag,rate,reload] of rows){
 const base=arsenalBuild(weapon);assert.equal(base.tier,0);assert.equal(base.path,null);assert.equal(base.mag,mag);close(base.rate,rate);close(base.reload,reload);close(base.power,1);
 assert.equal(arsenalBuild(weapon,{[`${prefix}_apex`]:1}).tier,0,'orphan apex never grants progression');
 assert.equal(arsenalBuild(weapon,{[`${prefix}_${routes[0]}`]:1}).tier,0,'orphan route never grants progression');
 for(const route of routes){
  const up={},other=routes.find(r=>r!==route),snap=JSON.stringify(up);
  assert.equal(canInstallArsenal(up,`${prefix}_${route}`),false);assert.equal(canInstallArsenal(up,`${prefix}_apex`),false);
  assert.equal(arsenalCards(weapon,up).length,1);assert.equal(canInstallArsenal(up,`${prefix}_core`),true);
  assert.equal(JSON.stringify(up),snap,'querying cards never mutates a run');
  up[`${prefix}_core`]=1;assert.equal(arsenalBuild(weapon,up).tier,1);assert.equal(canInstallArsenal(up,`${prefix}_core`),false);
  assert.equal(arsenalCards(weapon,up).length,2);assert(canInstallArsenal(up,`${prefix}_${route}`));assert(canInstallArsenal(up,`${prefix}_${other}`));
  up[`${prefix}_${route}`]=1;assert.equal(arsenalBuild(weapon,up).path,route);assert.equal(canInstallArsenal(up,`${prefix}_${other}`),false,'routes are exclusive');
  assert.equal(arsenalCards(weapon,up).length,1);assert(canInstallArsenal(up,`${prefix}_apex`));
  for(const card of arsenalCards(weapon,up)){assert.equal(card.length,4);assert(card.every(value=>typeof value==='string'&&value.length>0));}
  up[`${prefix}_apex`]=1;const apex=arsenalBuild(weapon,up);assert.equal(apex.tier,3);assert.equal(arsenalCards(weapon,up).length,0);assert.equal(canInstallArsenal(up,`${prefix}_apex`),false);
  assert(apex.power>base.power);assert(apex.mag>=base.mag);assert(apex.reload<=base.reload);
  for(const value of Object.values(apex))if(typeof value==='number')assert(Number.isFinite(value)&&value>=0);
 }
 for(const part of ['core',...routes,'apex']){const id=`${prefix}_${part}`;assert(!ids.has(id));ids.add(id);assert(isArsenalCard(id));assert.equal(arsenalCardWeapon(id),weapon);}
}
assert.equal(ids.size,20);assert.equal(isArsenalCard('pulse_core'),false);assert.equal(isArsenalCard('no_such_card'),false);assert.equal(canInstallArsenal({},'no_such_card'),false);assert.equal(arsenalCardWeapon('no_such_card'),null);
assert.equal(arsenalBuild(0),null);assert.equal(arsenalCards(0).length,0);
// Resource-limited weapons retain their identities at every stage.
for(const route of ['nova','reactor']){
 const up={astra_core:1,[`astra_${route}`]:1,astra_apex:1},b=arsenalBuild(3,up);
 assert.equal(b.mag,24,'EXPLOSION capacity remains 24 cells');assert.equal(b.phaseChargeScale,.65);
 assert.equal(b.phaseRefill,route==='reactor'?18:12);assert.equal(b.explosionMultiplier,1.3);
}
// EXPLOSION carries the weapon and NOVA evolution multipliers, then adds its
// own bonus. Spending the final cell must beat a 23-cell NOVA direct hit.
const baselineExplosionDirect=45*24*1.6*1.35;
for(const [up,total] of [
 [{},1],
 [{astra_core:1},1.43],
 [{astra_core:1,astra_nova:1},2.4],
 [{astra_core:1,astra_nova:1,astra_apex:1},4.29],
 [{astra_core:1,astra_reactor:1},1.92],
 [{astra_core:1,astra_reactor:1,astra_apex:1},2.6]
]){
 const b=arsenalBuild(3,up),explosionScale=b.power*b.novaMultiplier*b.explosionMultiplier;
 close(explosionScale,total);close(b.mag,24);
 const nova23Direct=45*23*1.6*b.power*b.novaMultiplier;
 assert(baselineExplosionDirect*explosionScale>nova23Direct*1.4,'the 24th cell produces a stronger direct ultimate');
 if(b.tier<3){
  for(const card of arsenalCards(3,up))assert(card[3].includes('24発を全消費'),'phase cards disclose the fixed ultimate cost');
 }
}
for(const route of ['echo','deadeye'])assert.equal(arsenalBuild(4,{lance_core:1,[`lance_${route}`]:1,lance_apex:1}).mag,1);
// Definitions return independent build records; callers cannot alter later runs.
const mutable=arsenalBuild(1,{breach_core:1});mutable.mag=999;assert.equal(arsenalBuild(1,{breach_core:1}).mag,14);
console.log('ARSENAL BUILDS: five exact baselines, 20 cards, 10 exclusive three-pick routes, progression gating, resource limits, EXPLOSION total scaling and finite independent builds passed');
