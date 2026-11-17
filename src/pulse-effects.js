import * as T from 'three';

// Four instanced draws for tracers, electric links, rings and sky lightning.
// Fixed geometry/instance pools keep a final-form burst cheap on mobile.
export function createPulseEffects(scene) {
 const root=new T.Group();scene.add(root);const units=[],buckets={},pending=[];let thunderCooldown=0,strikes=0,cannonShots=0;
 const box=new T.BoxGeometry(1,1,1),ring=new T.TorusGeometry(.12,.008,4,20);
 const zero=new T.Matrix4().makeScale(0,0,0),color=new T.Color();
 for(const [kind,count] of Object.entries({arc:48,shot:20,ring:20,bolt:80})){
  const material=new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.88,depthWrite:false,blending:T.AdditiveBlending});
  const mesh=new T.InstancedMesh(kind==='ring'?ring:box,material,count);mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);root.add(mesh);buckets[kind]=[];
  for(let i=0;i<count;i++){mesh.setMatrixAt(i,zero);mesh.setColorAt(i,color.setHex(0));const u={kind,mesh,index:i,pose:new T.Object3D(),color:new T.Color(),life:0,max:1,ring:kind==='ring'};units.push(u);buckets[kind].push(u);}
 }
 function write(u){
  if(u.life<=0)u.mesh.setMatrixAt(u.index,zero);
  else{u.pose.updateMatrix();u.mesh.setMatrixAt(u.index,u.pose.matrix);color.copy(u.color).multiplyScalar(Math.min(1,u.life/u.max));u.mesh.setColorAt(u.index,color);}
  u.mesh.instanceMatrix.needsUpdate=true;u.mesh.instanceColor.needsUpdate=true;
 }
 function take(kind,life,hex){const pool=buckets[kind],u=pool.find(u=>u.life<=0)||pool.reduce((a,b)=>a.life<b.life?a:b);root.visible=true;u.life=u.max=life;u.color.setHex(hex);return u;}
 function line(a,b,hex,width,life,kind='shot'){const u=take(kind,life,hex),delta=b.clone().sub(a);u.pose.position.copy(a).add(b).multiplyScalar(.5);u.pose.scale.set(width,width,Math.max(.001,delta.length()));u.pose.lookAt(b);write(u);return u;}
 function circle(at,direction,hex,scale,life){const u=take('ring',life,hex);u.pose.position.copy(at);u.pose.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),direction);u.scale=scale;u.pose.scale.setScalar(scale);write(u);}
 function discharge(from,to,{path='arc',apex=false,charged=false,low=false,reduced=false}={}){
  const direction=to.clone().sub(from).normalize(),hex=path==='lance'?0xffba73:0x74edff;
  line(from,to,hex,charged?(apex?.16:.11):apex?.027:.021,charged?.18:.075);
  if(charged){
   cannonShots++;line(from,to,0xfff9e3,.035,reduced?.13:.26);
   const side=new T.Vector3().crossVectors(direction,new T.Vector3(0,1,0)).normalize(),up=new T.Vector3().crossVectors(side,direction).normalize();
   // Two braided field lines make the shot read as an accelerator discharge.
   if(!low&&!reduced)for(const sign of [-1,1]){let previous=from.clone();for(let i=1;i<=6;i++){const t=i/6,at=from.clone().lerp(to,Math.min(.7,t*.7)).addScaledVector(side,Math.cos(t*Math.PI*3)*.12*sign).addScaledVector(up,Math.sin(t*Math.PI*3)*.12*sign);line(previous,at,0xffa457,.014,.16,'bolt');previous=at;}}
   for(let i=0;i<(low||reduced?2:5);i++)circle(from.clone().addScaledVector(direction,.25+i*.72),direction,hex,(apex?2.3:1.5)+i*.55,reduced?.14:.22+i*.015);
   circle(from,direction,0xffefc6,apex?2.2:1.4,.16);circle(to,direction,0xffe3ae,apex?9:5,reduced?.16:.35);
   if(!low&&!reduced){circle(to,direction,0xffac61,apex?5:3,.45);for(const sign of [-1,1])line(to.clone().addScaledVector(side,sign*.7),to.clone().addScaledVector(side,sign*1.4),0xffdd99,.025,.20,'bolt');}
  }
  else if(apex&&!low)line(from,to,0xeaffff,.008,.11);
 }
 function drawArc(from,to,{apex=false,kill=false,low=false}={}){
  const direction=to.clone().sub(from),side=new T.Vector3(-direction.z,.7,direction.x).normalize(),parts=low?3:5;let previous=from;
  for(let i=1;i<=parts;i++){const at=from.clone().lerp(to,i/parts);if(i<parts)at.addScaledVector(side,(i%2?1:-1)*Math.min(.42,direction.length()*.055));line(previous,at,i%2?0x9ffcff:0xae9bff,apex?.035:.024,kill?.19:.12,'arc');previous=at;}
  if(apex&&kill)circle(to,direction.normalize(),0xb8a4ff,1.8,.2);
 }
 function arc(from,to,options={}){
  if(options.delay>0){if(pending.length<32)pending.push({kind:'arc',from:from.clone(),to:to.clone(),options:{...options,delay:0},wait:options.delay});}
  else drawArc(from,to,options);
 }
 function thunder(at,{apex=false,low=false,reduced=false,ground=0}={}){
  if(thunderCooldown>0)return false;thunderCooldown=.22;
  const to=at.clone(),from=to.clone().add(new T.Vector3(.4,apex?26:18,-.3));
  // The thin leader precedes the return stroke. Damage never waits on visuals.
  line(from,to,0x9c96f5,.016,reduced?.04:.075,'bolt');
  pending.push({kind:'thunder',from,to,options:{apex,low,reduced,ground},wait:reduced?0:.065});return true;
 }
 function strike(from,to,{apex,low,reduced,ground}){
  strikes++;const parts=low||reduced?5:9,life=reduced?.13:.26;let previous=from;
  for(let i=1;i<=parts;i++){
   const t=i/parts,at=from.clone().lerp(to,t);
   if(i<parts){at.x+=Math.sin(i*4.7)*(1-t)*.9;at.z+=Math.cos(i*3.1)*(1-t)*.6;}
   line(previous,at,0x977bff,apex?.15:.095,life,'bolt');line(previous,at,0xefffff,apex?.048:.028,life*.8,'bolt');
   if(!low&&!reduced&&i%3===0){const branch=at.clone().add(new T.Vector3(i%2?1.3:-1.3,-1.5,.45));line(at,branch,0x9beaff,.025,.16,'bolt');}
   previous=at;
  }
  const floor=to.clone().setY(ground+.065),up=new T.Vector3(0,1,0);
  circle(floor,up,0xab8fff,apex?12:8,reduced?.15:.38);circle(floor.clone().setY(ground+.08),up,0xd2ffff,apex?5:3,.22);
  if(!reduced)for(let i=0;i<(low?4:7);i++){const angle=i*Math.PI*2/(low?4:7),tip=floor.clone().add(new T.Vector3(Math.cos(angle)*1.25,.02,Math.sin(angle)*1.25));line(floor,tip,0xa6ddff,.022,.2,'bolt');}
 }
 function update(dt,playing){
  root.visible=playing;if(!playing)return;thunderCooldown=Math.max(0,thunderCooldown-dt);
  for(let i=pending.length-1;i>=0;i--){const job=pending[i];job.wait-=dt;if(job.wait>0)continue;pending.splice(i,1);if(job.kind==='arc')drawArc(job.from,job.to,job.options);else strike(job.from,job.to,job.options);}
  for(const u of units){if(u.life<=0)continue;u.life=Math.max(0,u.life-dt);if(u.ring)u.pose.scale.setScalar(u.scale*(1+(1-u.life/u.max)*1.4));write(u);}
 }
 function reset(){pending.length=0;thunderCooldown=strikes=cannonShots=0;for(const u of units){u.life=0;write(u);}root.visible=false;}
 return {discharge,arc,thunder,update,reset,stats:()=>({active:units.filter(u=>u.life>0).length,capacity:units.length,drawObjects:4,pending:pending.length,strikes,cannonShots}),diagnostics:()=>units.filter(u=>u.life>0).map(u=>({kind:u.kind,matrix:u.pose.matrix.toArray(),life:u.life}))};
}
