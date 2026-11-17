import * as T from 'three';

// A reusable, bounded effect. All geometry, materials and particle storage are allocated once.
export function createExplosionVisuals(scene) {
 const duration=3.4,root=new T.Group(),charging=new T.Group();scene.add(root,charging);root.visible=charging.visible=false;
 let active=false,age=duration,low=false;
 const torusGeo=new T.TorusGeometry(1,.014,5,80),sphereGeo=new T.SphereGeometry(1,28,18),columnGeo=new T.CylinderGeometry(.5,1,1,18,1,true),shardGeo=new T.ConeGeometry(.06,1,3);
 const materials=[],geometries=[torusGeo,sphereGeo,columnGeo,shardGeo];
 function basic(color,opacity=1){const m=new T.MeshBasicMaterial({color,transparent:true,opacity,depthWrite:false,fog:false,blending:T.AdditiveBlending,side:T.DoubleSide});m.forceSinglePass=true;materials.push(m);return m;}
 function mesh(geo,material,parent=root){const m=new T.Mesh(geo,material);m.frustumCulled=false;parent.add(m);return m;}
 const coreMat=basic(0xfff5d1),core=mesh(sphereGeo,coreMat);
 const fireMat=new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending,
  uniforms:{uTime:{value:0},uOpacity:{value:0},uHeat:{value:1}},
  vertexShader:'uniform float uTime;varying vec3 vP;varying vec3 vN;void main(){vP=position;vN=normal;float n=sin(position.x*8.0+uTime*9.0)*sin(position.y*9.0-uTime*6.0)*sin(position.z*7.0+uTime*4.0);vec3 p=position*(1.0+n*.045);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}',
  fragmentShader:'uniform float uTime;uniform float uOpacity;uniform float uHeat;varying vec3 vP;varying vec3 vN;void main(){float ribbon=sin(vP.x*12.0+vP.z*9.0+sin(vP.y*15.0+uTime*8.0)*2.0-uTime*5.0);float ridges=smoothstep(-.35,.8,ribbon);vec3 ember=vec3(1.0,.045,.008);vec3 flame=vec3(1.0,.43,.035);vec3 white=vec3(1.0,.95,.67);vec3 color=mix(ember,flame,ridges);color=mix(color,white,uHeat*(.45+ridges*.45));gl_FragColor=vec4(color,uOpacity*(.5+ridges*.5));}'
 });fireMat.forceSinglePass=true;materials.push(fireMat);
 const fireball=mesh(sphereGeo,fireMat),innerMat=basic(0xffab37,.8),inner=mesh(sphereGeo,innerMat);
 const rings=[];
 for(let i=0;i<4;i++){const material=basic([0xfff0ae,0xff6d32,0xffc259,0xe7efff][i],.8),m=mesh(torusGeo,material);m.rotation.x=Math.PI/2;rings.push(m);}
 const columnMat=basic(0xff9e2d,.45),column=mesh(columnGeo,columnMat);column.scale.set(2,1,2);
 const crownMat=basic(0xff7d25,.4),crown=mesh(torusGeo,crownMat);crown.rotation.x=Math.PI/2;
 const highCrownMat=basic(0xffddb0,.25),highCrown=mesh(torusGeo,highCrownMat);highCrown.rotation.set(1.2,0,.25);
 // One line mesh supplies the sigil's runic ticks, spokes and concentric polygons.
 const runeVertices=[];
 const segment=(ax,az,bx,bz)=>runeVertices.push(ax,0,az,bx,0,bz);
 for(let i=0;i<48;i++){const a=i/48*Math.PI*2,b=(i+1)/48*Math.PI*2;for(const r of [1,.85,.62])segment(Math.cos(a)*r,Math.sin(a)*r,Math.cos(b)*r,Math.sin(b)*r);if(i%2===0){segment(Math.cos(a)*.88,Math.sin(a)*.88,Math.cos(a)*.98,Math.sin(a)*.98);const d=.035;segment(Math.cos(a-d)*.74,Math.sin(a-d)*.74,Math.cos(a+d)*.81,Math.sin(a+d)*.81);}}
 for(let i=0;i<6;i++){const a=i/6*Math.PI*2,b=a+Math.PI*2/3;segment(Math.cos(a)*.6,Math.sin(a)*.6,Math.cos(b)*.6,Math.sin(b)*.6);}
 const runeGeo=new T.BufferGeometry();runeGeo.setAttribute('position',new T.Float32BufferAttribute(runeVertices,3));geometries.push(runeGeo);
 const runeMat=new T.LineBasicMaterial({color:0xffb85c,transparent:true,opacity:.8,depthWrite:false,fog:false,blending:T.AdditiveBlending});materials.push(runeMat);
 const sigil=new T.LineSegments(runeGeo,runeMat);root.add(sigil);sigil.frustumCulled=false;
 const shards=[];
 for(let i=0;i<12;i++){const material=basic(i%3===0?0xfff3bd:0xff7634,.7),m=mesh(shardGeo,material);shards.push(m);}
 const particleCount=256,particlePositions=new Float32Array(particleCount*3),particleColors=new Float32Array(particleCount*3),directions=new Float32Array(particleCount*3),speeds=new Float32Array(particleCount);
 let seed=98271;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<particleCount;i++){const a=rand()*Math.PI*2,y=.12+rand()*.86,radial=Math.sqrt(1-y*y);directions[i*3]=Math.cos(a)*radial;directions[i*3+1]=y;directions[i*3+2]=Math.sin(a)*radial;speeds[i]=8+rand()*25;particleColors[i*3]=1;particleColors[i*3+1]=.23+rand()*.6;particleColors[i*3+2]=.025+rand()*.14;}
 const particlesGeo=new T.BufferGeometry();particlesGeo.setAttribute('position',new T.BufferAttribute(particlePositions,3));particlesGeo.setAttribute('color',new T.BufferAttribute(particleColors,3));geometries.push(particlesGeo);
 const particleMat=new T.PointsMaterial({size:.17,vertexColors:true,transparent:true,opacity:1,depthWrite:false,fog:false,blending:T.AdditiveBlending});materials.push(particleMat);
 const sparks=new T.Points(particlesGeo,particleMat);root.add(sparks);sparks.frustumCulled=false;
 // Charging lives separately so it can surround a muzzle/weapon socket without moving the blast.
 const chargeCoreMat=basic(0xfff3bc,.5),chargeCore=mesh(sphereGeo,chargeCoreMat,charging);
 const chargeRings=[];
 for(let i=0;i<3;i++){const material=basic(i===0?0xffe6a1:0xff7046,.65),m=mesh(torusGeo,material,charging);m.rotation.set(i*.8,.3+i*.7,i*.3);chargeRings.push(m);}
 const smooth=(a,b,x)=>T.MathUtils.smoothstep(x,a,b),clamp=T.MathUtils.clamp;
 function updateCharge(charge,origin,dt){
  const c=clamp(charge,0,1);charging.visible=!active&&c>.42&&!!origin;
  if(!charging.visible)return;charging.position.copy(origin);
  const power=smooth(.42,1,c);chargeCore.scale.setScalar(.025+power*.07);chargeCoreMat.opacity=.1+power*.65;
  for(let i=0;i<3;i++){const m=chargeRings[i],r=.13+power*(.16+i*.055);m.scale.setScalar(r);m.rotation.y+=dt*(i%2===0?1:-1);m.rotation.z=c*4+i;m.material.opacity=(.12+power*.6)*(i===2&&low?0:1);}
 }
 function reset(){active=false;age=duration;root.visible=false;charging.visible=false;}
 function start(center,options={}){low=!!options.low;active=true;age=0;root.position.copy(center);root.position.y=Math.max(.45,center.y);root.visible=true;charging.visible=false;particlesGeo.setDrawRange(0,low?112:particleCount);animate();}
 function animate(){
  const t=age,ignition=smooth(0,.22,t),growth=1-Math.exp(-Math.max(0,t-.04)*4),fade=1-smooth(.55,1.85,t),tail=1-smooth(1.7,duration,t);
  core.visible=t<.72;core.scale.setScalar(.12+growth*10);coreMat.opacity=(1-smooth(.18,.7,t))*.88;
  inner.visible=t<1.2;inner.scale.set(1+growth*13,1+growth*10,1+growth*13);innerMat.opacity=fade*.46;
  fireball.visible=t<2.2;fireball.scale.set(1+growth*17,1+growth*14,1+growth*17);fireball.position.y=growth*3.5;fireMat.uniforms.uTime.value=t;fireMat.uniforms.uOpacity.value=ignition*fade*.66;fireMat.uniforms.uHeat.value=1-smooth(.15,1.5,t);fireball.rotation.y=t*.13;
  for(let i=0;i<rings.length;i++){const delay=i*.08,r=Math.max(0,t-delay)*([63,46,37,70][i]);const m=rings[i];m.visible=t>=delay&&t<1.9&&(!low||i<2);m.scale.setScalar(Math.max(.01,r));m.position.y=.07-root.position.y+i*.09;m.material.opacity=(1-smooth(.25+i*.08,1.5+i*.06,t))*(i===0?.95:.65);m.rotation.z=t*(i%2===0?.4:-.4);}
  const lift=smooth(.12,1.8,t);column.visible=t>.1&&t<2.25;column.position.y=lift*12;column.scale.set(2.3+growth*3,1+lift*30,2.3+growth*3);columnMat.opacity=fade*.36;
  crown.visible=t>.22&&t<2.7;crown.position.y=4+lift*16;crown.scale.set(1+lift*17,1+lift*17,1+lift*4);crownMat.opacity=tail*.5*(1-smooth(.6,2.6,t));
  highCrown.visible=crown.visible&&!low;highCrown.position.y=crown.position.y+2;highCrown.scale.setScalar(1+lift*13);highCrown.rotation.z=t*.3;highCrownMat.opacity=tail*.35;
  sigil.visible=t<3.2;sigil.position.y=.055-root.position.y;sigil.scale.setScalar(4+growth*20);sigil.rotation.y=-t*.25;runeMat.opacity=(1-smooth(.7,3.2,t))*.8;
  for(let i=0;i<shards.length;i++){const m=shards[i],a=i/shards.length*Math.PI*2+t*.14,r=2+t*(8+i%3*2),height=1+Math.sin(Math.min(1,t/2.4)*Math.PI)*(6+i%4*2);m.visible=t<2.7&&(!low||i<5);m.position.set(Math.cos(a)*r,height,Math.sin(a)*r);m.rotation.set(.25+i*.4,t*.7,i*.8);m.scale.set(.5,1.5+Math.sin(t*4+i)*.5,.5);m.material.opacity=tail*.65;}
  const n=low?112:particleCount;
  for(let i=0;i<n;i++){const d=i*3,travel=speeds[i]*(1-Math.exp(-t*1.3));particlePositions[d]=directions[d]*travel;particlePositions[d+1]=directions[d+1]*travel-t*t*1.1;particlePositions[d+2]=directions[d+2]*travel;}
  particlesGeo.attributes.position.needsUpdate=true;particleMat.opacity=tail;particleMat.size=low?.2:.17;
 }
 function update(dt,{charge=0,low:quality=low,origin=null}={}){low=!!quality;particlesGeo.setDrawRange(0,low?112:particleCount);if(active){age=Math.min(duration,age+Math.max(0,Math.min(dt,.15)));animate();if(age>=duration){active=false;root.visible=false;}}updateCharge(charge,origin,Math.max(0,dt));}
 return {start,update,reset,get active(){return active;},get age(){return age;},get duration(){return duration;},get metrics(){return {meshes:26,drawables:28,particles:low?112:particleCount,duration,lights:0};}};
}
