import * as T from 'three';
import {traceEnemyRay,enemyAimPoint} from './enemy-hit-shapes.js';

export const SEEKER = Object.freeze({mag:6, reload:1.9, rate:.82, damage:84,
  freeDamage:32, range:42, lockTime:.22, memory:.7, speed:28, turn:4.8,
  lifetime:2.4, maxMissiles:6, maxLocks:3});

// Fixed missile, wake and impact pools. All movement/collisions use elapsed time;
// neither firing nor updating allocates geometries, materials or timers.
export function createSeekerSystem(scene, {wallDistance, onHit, onLock=()=>{}, onWallHit=()=>{}}) {
  const metal=new T.MeshStandardMaterial({color:0xb6d3da,metalness:.7,roughness:.3});
  const dark=new T.MeshStandardMaterial({color:0x18313b,metalness:.6,roughness:.4});
  const glow=new T.MeshBasicMaterial({color:0x91ffed});
  const wakeMat=new T.MeshBasicMaterial({color:0x67cfdf,transparent:true,opacity:.5,depthWrite:false});
  const hotMat=new T.MeshBasicMaterial({color:0xffd18b,transparent:true,opacity:.9,depthWrite:false});
  const bodyGeo=new T.CylinderGeometry(.045,.066,.38,8);
  const tipGeo=new T.ConeGeometry(.046,.13,8),finGeo=new T.BoxGeometry(.22,.035,.12);
  const flameGeo=new T.ConeGeometry(.055,.28,7),wakeGeo=new T.CylinderGeometry(1,1,1,5);
  const ringGeo=new T.TorusGeometry(1,.035,5,28),coreGeo=new T.IcosahedronGeometry(1,1);
  const forward=new T.Vector3(0,0,-1),axis=new T.Vector3(),desired=new T.Vector3();
  const old=new T.Vector3(),delta=new T.Vector3(),offset=new T.Vector3();
  const direction=new T.Vector3(),point=new T.Vector3(),projected=new T.Vector3();
  let locks=[],shots=0,hits=0,wallHits=0,time=0;
  const pool=Array.from({length:SEEKER.maxMissiles},()=>{
    const mesh=new T.Group();
    const body=new T.Mesh(bodyGeo,metal);body.rotation.x=Math.PI/2;mesh.add(body);
    const nose=new T.Mesh(tipGeo,dark);nose.rotation.x=-Math.PI/2;nose.position.z=-.25;mesh.add(nose);
    for(let i=0;i<2;i++){const fin=new T.Mesh(finGeo,dark);fin.rotation.z=i*Math.PI/2;fin.position.z=.12;mesh.add(fin);}
    const flame=new T.Mesh(flameGeo,hotMat);flame.rotation.x=-Math.PI/2;flame.position.z=.31;mesh.add(flame);
    const wake=new T.InstancedMesh(wakeGeo,wakeMat,12);wake.instanceMatrix.setUsage(T.DynamicDrawUsage);wake.frustumCulled=false;
    mesh.visible=wake.visible=false;scene.add(mesh,wake);
    return {mesh,wake,flame,dir:new T.Vector3(),life:0,age:0,target:null,guided:false,
      history:Array.from({length:13},()=>new T.Vector3()),clock:0,power:1,origin:new T.Vector3(),initialDirection:new T.Vector3()};
  });
  const impacts=Array.from({length:6},()=>{
    const g=new T.Group(),ring=new T.Mesh(ringGeo,hotMat.clone()),core=new T.Mesh(coreGeo,glow.clone());
    g.add(ring,core);g.visible=false;scene.add(g);return {mesh:g,ring,core,life:0};
  });
  const dummy=new T.Object3D(),vertical=new T.Vector3(0,1,0);
  function visible(from,to){delta.copy(to).sub(from);const length=delta.length();return length>.01&&wallDistance(from,delta.divideScalar(length),length)>=length-.08;}
  function updateLocks(dt,{active,camera,enemies,mobile=false,ammo=6,reloading=false,evolution=null}) {
    if(!active||reloading||ammo<=0){locks=[];return;}
    camera.getWorldDirection(direction);
    const minDot=Math.cos(T.MathUtils.degToRad(mobile?13:10));
    const candidates=[];
    for(const e of enemies){
      if(e.hp<=0)continue;
      offset.copy(enemyAimPoint(e)).sub(camera.position);const distance=offset.length();
      if(distance>SEEKER.range||distance<1)continue;
      const dot=offset.divideScalar(distance).dot(direction);
      if(dot<minDot||!visible(camera.position,enemyAimPoint(e)))continue;
      candidates.push({e,dot});
    }
    candidates.sort((a,b)=>b.dot-a.dot);
    locks=locks.filter(l=>l.e.hp>0&&enemyAimPoint(l.e).distanceTo(camera.position)<=SEEKER.range&&visible(camera.position,enemyAimPoint(l.e)));
    for(const l of locks){const tracking=candidates.some(c=>c.e===l.e);l.memory=tracking?SEEKER.memory:l.memory-dt;if(tracking){const was=l.progress>=1;l.progress=Math.min(1,l.progress+dt/(evolution?.lockTime??SEEKER.lockTime));if(!was&&l.progress===1)onLock();}}
    locks=locks.filter(l=>l.memory>0);
    for(const {e} of candidates){if(locks.length>=Math.min(3,ammo))break;if(!locks.some(l=>l.e===e))locks.push({e,progress:Math.min(1,dt/(evolution?.lockTime??SEEKER.lockTime)),memory:SEEKER.memory});}
    locks=locks.slice(0,Math.min(3,ammo));
  }
  function launch({origins,directions,ammo,power=1,evolution=null,attackId=-1}) {
    const targets=locks.filter(l=>l.progress>=1&&l.e.hp>0).map(l=>l.e);
    const count=Math.min(targets.length||1,ammo,pool.filter(m=>m.life<=0).length,3);
    if(!count)return [];
    const launched=[];
    for(let i=0;i<count;i++){
      const m=pool.find(m=>m.life<=0),cell=(shots+i)%3;
      m.mesh.position.copy(origins[cell]);m.origin.copy(origins[cell]);
      // Leave the actual launch tube straight; guidance starts after clearing it.
      m.dir.copy(directions[cell]).normalize();m.initialDirection.copy(m.dir);
      m.evolution=evolution;m.attackId=attackId;m.speed=evolution?.missileSpeed??SEEKER.speed;m.target=targets[i]||null;m.guided=!!m.target;m.power=power;m.life=SEEKER.lifetime;m.age=0;m.clock=0;
      m.mesh.quaternion.setFromUnitVectors(forward,m.dir);m.mesh.visible=m.wake.visible=true;
      m.history.forEach(p=>p.copy(m.mesh.position));launched.push(cell);
    }
    shots+=count;locks=[];return launched;
  }
  function impact(position,normal){
    const f=impacts.find(f=>f.life<=0)||impacts.reduce((a,b)=>a.life<b.life?a:b);
    f.life=.32;f.mesh.visible=true;f.mesh.position.copy(position);f.mesh.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),normal);
  }
  function retire(m){m.life=0;m.mesh.visible=m.wake.visible=false;m.target=null;}
  function update(dt,enemies,low=false) {
    time+=dt;
    for(const m of pool){
      if(m.life<=0)continue;
      m.life-=dt;m.age+=dt;old.copy(m.mesh.position);
      if(m.guided&&m.target?.hp<=0){impact(old,m.dir);retire(m);continue;}
      if(m.target&&m.age>.075){
        desired.copy(enemyAimPoint(m.target)).sub(old).normalize();
        const angle=m.dir.angleTo(desired);
        if(angle>.0001){axis.crossVectors(m.dir,desired);if(axis.lengthSq()>.000001)m.dir.applyAxisAngle(axis.normalize(),Math.min(angle,SEEKER.turn*dt));}
      }
      m.mesh.position.addScaledVector(m.dir,(m.speed||SEEKER.speed)*dt);
      delta.copy(m.mesh.position).sub(old);const length=delta.length();delta.divideScalar(length||1);
      let best=wallDistance(old,delta,length),victim=null;
      for(const e of enemies){
        if(e.hp<=0)continue;
        const hit=traceEnemyRay(e,old,delta,length,{padding:.07,sphereScale:1.12,surface:true});
        if(hit&&hit.distance<best){best=hit.distance;victim=e;}
      }
      if(best<=length){point.copy(old).addScaledVector(delta,best);impact(point,delta);if(victim){hits++;onHit(victim,(m.guided?SEEKER.damage:SEEKER.freeDamage)*m.power,m);}else{wallHits++;onWallHit({origin:old.clone(),direction:delta.clone(),point:point.clone(),damage:(m.guided?SEEKER.damage:SEEKER.freeDamage)*m.power,range:length+.05,missile:m});}retire(m);continue;}
      if(m.life<=0){retire(m);continue;}
      m.mesh.quaternion.setFromUnitVectors(forward,m.dir);
      m.flame.scale.setScalar(.85+Math.sin(time*80)*.15);
      m.clock+=dt;if(m.clock>=.024){m.clock%=.024;for(let i=12;i>0;i--)m.history[i].copy(m.history[i-1]);m.history[0].copy(m.mesh.position);}
      const segments=low?7:12;m.wake.count=segments;
      for(let i=0;i<segments;i++){
        const a=m.history[i],b=m.history[i+1];dummy.position.copy(a).add(b).multiplyScalar(.5);
        delta.copy(b).sub(a);dummy.quaternion.setFromUnitVectors(vertical,delta.clone().normalize());
        const radius=.025*(1-i/segments)+.006;dummy.scale.set(radius,Math.max(.001,delta.length()),radius);dummy.updateMatrix();m.wake.setMatrixAt(i,dummy.matrix);
      }
      m.wake.instanceMatrix.needsUpdate=true;
    }
    for(const f of impacts){if(f.life<=0)continue;f.life=Math.max(0,f.life-dt);const t=1-f.life/.32;f.mesh.visible=f.life>0;f.ring.scale.setScalar(.15+t*1.25);f.core.scale.setScalar(.22*(1-t));f.ring.material.opacity=(1-t)*.9;f.core.material.transparent=true;f.core.material.opacity=1-t;}
  }
  function hud(camera,width,height){return locks.map(l=>{projected.copy(enemyAimPoint(l.e)).project(camera);return {x:(projected.x*.5+.5)*width,y:(-.5*projected.y+.5)*height,progress:l.progress,onScreen:projected.z>-1&&projected.z<1&&Math.abs(projected.x)<.95&&Math.abs(projected.y)<.85};});}
  function clearLocks(){locks=[];}
  function clearFlight(){locks=[];pool.forEach(retire);impacts.forEach(f=>{f.life=0;f.mesh.visible=false;});}
  function reset(){clearFlight();shots=hits=wallHits=0;}
  return {updateLocks,launch,update,hud,clearLocks,clearFlight,reset,visible,
    metrics:()=>({shots,hits,wallHits,active:pool.filter(m=>m.life>0).length,locks:locks.length,ready:locks.filter(l=>l.progress>=1).length}),
    diagnostics:()=>pool.filter(m=>m.life>0).map(m=>({origin:m.origin.toArray(),position:m.mesh.position.toArray(),initialDirection:m.initialDirection.toArray(),target:m.target,guided:m.guided})),
  };
}
