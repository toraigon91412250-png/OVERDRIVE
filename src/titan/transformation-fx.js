// Lightning geometry and its timeline adapted from the supplied attack_titan_transformation_face_v9.html.
import * as THREE from 'three';
export function createTransformationFX(world){
 const scene=new THREE.Group();scene.name='player-transformation-fx';scene.visible=false;world.add(scene);
 const rnd=(a=0,b=1)=>a+Math.random()*(b-a),smooth=(a,b,t)=>{const f=Math.max(0,Math.min(1,(t-a)/(b-a)));return f*f*(3-2*f)},bell=(a,b,c,d,t)=>smooth(a,b,t)*(1-smooth(c,d,t));
const bolts=[];
for(let i=0;i<25;i++){const N=i<11?28:17,points=new Float32Array(N*3);let geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(points,3));let mat=new THREE.LineBasicMaterial({color:i%5===0?0xffffff:i%3===0?0xfff5cd:0xffb54e,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false});let o=new THREE.Line(geo,mat);o.frustumCulled=false;scene.add(o);bolts.push({o,N,seed:i*2.13,kind:i<11?0:1});}
let lastBoltTime=-1;function updateBolts(t){let phase=t<2.9?1:Math.max(0,1-(t-2.9)/3);for(const b of bolts){let op=phase*bell(1.32,1.56,4.2,5.7,t)*(b.kind===0?1:.72);b.o.material.opacity=op;if(op<.01)continue;
 if(Math.floor(t*24)!==lastBoltTime){const p=b.o.geometry.attributes.position;let a=b.seed*4.3+Math.floor(t*23)*.8;if(b.kind===0){let targetX=Math.sin(b.seed*2)*rnd(.2,3.9),targetZ=Math.cos(b.seed*2)*rnd(.2,3.6);for(let j=0;j<b.N;j++){let f=j/(b.N-1),w=Math.sin(f*Math.PI);p.setXYZ(j,targetX*f+(rnd(-2.8,2.8)*w),58*(1-f)+.6,targetZ*f+rnd(-2.4,2.4)*w)}}else{let y=4+(b.seed%6)*1.55,r=1.2+b.seed%4;for(let j=0;j<b.N;j++){let f=j/(b.N-1),angle=b.seed+f*Math.PI*2.5;let rr=r+Math.sin(f*9+b.seed)*.6;p.setXYZ(j,Math.cos(angle)*rr+rnd(-.4,.4),y+(f-.5)*3,Math.sin(angle)*rr+rnd(-.4,.4))}}p.needsUpdate=true;b.o.geometry.computeBoundingSphere();}}
 if(Math.floor(t*24)!==lastBoltTime)lastBoltTime=Math.floor(t*24);}

 const light=new THREE.PointLight(0xffcc75,0,65,1.4);scene.add(light);
 const rings=[];for(let i=0;i<3;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(1,.05,5,48),new THREE.MeshBasicMaterial({color:0xffd08b,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));ring.rotation.x=-Math.PI/2;ring.position.y=.15+i*.05;scene.add(ring);rings.push(ring);}
 return {begin:position=>{scene.position.copy(position);scene.visible=true;lastBoltTime=-1;},update:elapsed=>{if(!scene.visible)return;const t=elapsed*2;updateBolts(t);light.intensity=elapsed>.6&&elapsed<1.1?22:Math.max(0,1-(elapsed-1.1)/1.2)*5;for(const [i,ring] of rings.entries()){const f=Math.max(0,(elapsed-.7-i*.12)/1.4);ring.scale.setScalar(.2+f*14);ring.material.opacity=f>0&&f<1?(1-f)*.45:0;}if(elapsed>3.2){scene.visible=false;light.intensity=0;}},reset:()=>{scene.visible=false;light.intensity=0;}};
}
