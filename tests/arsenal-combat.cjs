const assert=require('node:assert/strict'),path=require('node:path'),Module=require('node:module');
const {buildSync}=require('esbuild'),T=require('three');
function load(name){const file=path.resolve(__dirname,'../src/'+name+'.js'),m=new Module(file,module);m.paths=module.paths;m._compile(buildSync({entryPoints:[file],bundle:true,external:['three'],format:'cjs',write:false}).outputFiles[0].text,file);return m.exports;}
const {createArsenalCombat}=load('arsenal-combat'),{arsenalBuild}=load('arsenal-evolution');
const origin=new T.Vector3(0,1,0),direction=new T.Vector3(0,0,-1),muzzle=new T.Vector3(.3,.8,-.7);
function enemy(x,z,hp=100000){const e={hp,max:hp,r:.7,type:'chaser',mesh:new T.Group()};e.mesh.position.set(x,1,z);return e;}
function wall(x,z,w,d){const mesh=new T.Mesh(new T.BoxGeometry(w,8,d),new T.MeshBasicMaterial());mesh.position.set(x,2,z);mesh.updateMatrixWorld(true);return mesh;}
function setup(enemies,obstacles=[],move=false){
 const effects=[],pushes=[],rays=[],hits=[];
 const ray=new T.Raycaster();
 const combat=createArsenalCombat({getEnemies:()=>enemies,
  wallDistance:(o,d,length)=>{ray.set(o,d);return ray.intersectObjects(obstacles,false).find(h=>h.distance<=length)?.distance??Infinity;},
  damage:(e,n)=>{e.hp-=n;hits.push({e,n});},
  knockback:(e,o,n)=>{pushes.push({e,n});if(move)e.mesh.position.x+=100;},
  discharge:(weapon,from,to,options)=>effects.push({weapon,from,to,options}),
  onRay:(o,d)=>rays.push({o:o.clone(),d:d.clone()})});
 return{combat,effects,pushes,rays,hits,fire:(weapon,build,options={})=>combat.fire({weapon,build,origin,direction,muzzle,random:()=>0,...options})};
}
const evolved=(weapon,prefix,path,apex=true)=>arsenalBuild(weapon,{[prefix+'_core']:1,[prefix+'_'+path]:1,...(apex?{[prefix+'_apex']:1}:{})});
const vortex=evolved(1,'breach','vortex'),burst=evolved(1,'breach','burst'),prism=evolved(2,'rail','prism'),siege=evolved(2,'rail','siege'),echo=evolved(4,'lance','echo'),deadeye=evolved(4,'lance','deadeye');

// No hidden modification to unevolved weapons, invalid vectors or empty rays.
{
 const e=enemy(0,-5),f=setup([e]);
 assert.equal(f.fire(1,arsenalBuild(1)).fired,false);assert.equal(e.hp,e.max);
 assert.equal(f.fire(1,vortex,{direction:new T.Vector3()} ).fired,false);
 assert.equal(f.fire(1,vortex,{origin:new T.Vector3(NaN,1,0)}).fired,false);
 assert.equal(f.fire(0,vortex).fired,false);assert.equal(f.combat.stats().shots,0);
}

// A full cone resolves before knockback; its first pellet cannot knock an enemy
// out of the remaining pellets. The close-range identity remains meaningful.
{
 const close=enemy(0,-5),far=enemy(0,-25),core=arsenalBuild(1,{breach_core:1});
 const a=setup([close],[],true),b=setup([far]);a.fire(1,core);b.fire(1,core);
 const closeDamage=close.max-close.hp,farDamage=far.max-far.hp;
 assert(closeDamage>12.5*core.power*core.pellets*1.24);assert(closeDamage>farDamage*10);
 assert.equal(a.pushes.length,1);assert.equal(a.effects.length,1);assert.equal(a.rays.length,core.pellets);
 assert(a.effects[0].from.equals(muzzle),'tracers originate at the actual weapon muzzle');
}
{
 const main=enemy(0,-5),near=enemy(3,-5),f=setup([main,near]);f.fire(1,vortex);
 assert(near.hp<near.max,'vortex pressure wave reaches off-axis enemies');assert.equal(f.combat.stats().shocks,1);
 assert.equal(f.effects.length,1,'shotgun uses one primary effect rather than one impact ring per pellet');
 assert.equal(f.pushes.filter(p=>p.e===main).length,1);assert.equal(f.pushes.filter(p=>p.e===near).length,1);
 const blockedMain=enemy(0,-5),blockedNear=enemy(3,-5),blocked=setup([blockedMain,blockedNear],[wall(1.5,-5,.12,12)]);blocked.fire(1,vortex);
 assert.equal(blockedNear.hp,blockedNear.max,'radial shock respects side cover');
}
{
 const main=enemy(0,-5),near=enemy(2.8,-5),f=setup([main,near]);f.fire(1,burst);
 assert(near.hp<near.max,'focused slug route detonates around its direct hit');assert.equal(f.combat.stats().detonations,1);
 const miss=setup([]);miss.fire(1,burst);assert.equal(miss.combat.stats().detonations,0,'burst requires a direct hit');
 const protectedEnemy=enemy(0,-6),cover=setup([protectedEnemy],[wall(0,-3,12,.1)]);cover.fire(1,vortex);
 assert.equal(protectedEnemy.hp,protectedEnemy.max,'an empty pressure wave cannot originate behind shot-blocking cover');
}
{
 const closeMain=enemy(0,-5),closeSplash=enemy(2.8,-5),near=setup([closeMain,closeSplash]);near.fire(1,burst);
 const farMain=enemy(0,-30),farSplash=enemy(2.8,-30),far=setup([farMain,farSplash]);far.fire(1,burst);
 const nearRadial=closeSplash.max-closeSplash.hp,farRadial=farSplash.max-farSplash.hp;
 assert(farRadial>0&&nearRadial>farRadial*18,'burst radial damage shares the strong close-range versus chip long-range falloff');
 const distantMain=enemy(0,-30),distantPack=enemy(3,-30),frontEnemy=enemy(3,-6),pressure=setup([distantMain,distantPack,frontEnemy]);
 const shot=pressure.fire(1,vortex);
 assert(shot.end.distanceTo(origin)<=6.00001,'vortex impact and effect remain within six metres of the shooter');
 assert.equal(distantPack.hp,distantPack.max,'a long-range pellet cannot project a vortex blast onto the distant pack');
 assert(frontEnemy.hp<frontEnemy.max,'the pressure wave still acts locally in front of the shooter');
 assert(nearRadial>(frontEnemy.max-frontEnemy.hp)*18,'a long-range hit also scales local vortex radial power to chip damage');
 assert(pressure.effects[0].to.equals(shot.end),'the world effect uses the actual capped pressure center');
}

// Penetration is through enemies only. Prism links share one per-shot budget,
// never re-hit direct victims, and cannot cross architecture.
{
 const direct=[enemy(0,-10),enemy(0,-20),enemy(0,-30)],links=[enemy(4,-10),enemy(7,-12),enemy(10,-10),enemy(12,-12),enemy(14,-10)];
 const f=setup([...direct,...links]);f.fire(2,prism);
 assert(direct.every(e=>e.hp<e.max));assert.equal(f.combat.stats().prismLinks,prism.prismTargets);assert.equal(links.filter(e=>e.hp<e.max).length,prism.prismTargets);
 assert.equal(f.hits.filter(h=>h.e===direct[0]).length,1,'reflections never re-hit direct targets');
 const a=enemy(0,-20),b=enemy(0,-20),plain=setup([a]),focused=setup([b]);plain.fire(2,prism);focused.fire(2,siege);
 assert(b.max-b.hp>(a.max-a.hp)*1.7,'siege uses the direct-damage route multiplier');
 const front=enemy(0,-5),behind=enemy(0,-10),cover=setup([front,behind],[wall(0,-7,30,.1)]);cover.fire(2,prism);
 assert(front.hp<front.max);assert.equal(behind.hp,behind.max,'both rail penetration and refraction stop at walls');
}

// The precision gun remains one direct target. Echo only begins after its
// direct kill; deadeye rewards an actual head/core trace via the game modifier.
{
 const target=enemy(0,-8),secondary=enemy(3,-8),f=setup([target,secondary]);f.fire(4,echo);
 assert.equal(secondary.hp,secondary.max);assert.equal(f.combat.stats().echoes,0,'surviving direct target creates no ricochet');
 const victim=enemy(0,-8,1),crowd=[enemy(3,-8),enemy(6,-8),enemy(9,-8),enemy(12,-8),enemy(15,-8)],chain=setup([victim,...crowd]);
 chain.fire(4,echo);assert(victim.hp<=0);assert.equal(chain.combat.stats().echoes,echo.echoTargets);assert.equal(crowd.filter(e=>e.hp<e.max).length,echo.echoTargets);
 const core=enemy(0,-10),focus=setup([core]);focus.fire(4,deadeye,{origin:new T.Vector3(0,1.6,0),multiplier:(e,head)=>head?2.2*deadeye.weakpointMultiplier:1});
 assert(Math.abs(core.max-core.hp-120*deadeye.power*2.2*deadeye.weakpointMultiplier)<1e-6,'weakpoint multiplier receives true head/core hit metadata');
 const front=enemy(0,-8,1),shielded=enemy(3,-8),cover=setup([front,shielded],[wall(1.5,-8,.1,20)]);cover.fire(4,echo);
 assert.equal(shielded.hp,shielded.max,'echo cannot ricochet through a side wall');
}
{
 const f=setup([enemy(0,-10)]);f.fire(2,siege);assert(f.combat.stats().shots===1);
 for(const e of f.effects)for(const v of [e.from,e.to])assert(v.toArray().every(Number.isFinite));
 f.combat.reset();assert(Object.values(f.combat.stats()).every(n=>n===0));
}
console.log('ARSENAL COMBAT: shotgun cone/knockback/radial routes, rail penetration/refraction/siege, sniper kill ricochets/core metadata, architecture occlusion, finite traces and reset passed.');
