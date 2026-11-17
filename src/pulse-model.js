import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Purpose-built first-person assemblies. Keep the sightline open and the real
// muzzle/ejection sockets in weapon space. Static detail is batched by material.
export function createPulseEvolutionModel(root,{muzzle,port}) {
 const legacy=[...root.children].filter(c=>c.isGroup);
 const steel=new T.MeshStandardMaterial({color:0x637c8c,metalness:.83,roughness:.27});
 const shell=new T.MeshStandardMaterial({color:0x132532,metalness:.7,roughness:.32});
 const black=new T.MeshStandardMaterial({color:0x07111a,metalness:.3,roughness:.63});
 const silver=new T.MeshStandardMaterial({color:0xb7d1d4,metalness:.86,roughness:.23});
 const ceramic=new T.MeshStandardMaterial({color:0xb6cfdb,metalness:.58,roughness:.25});
 const copper=new T.MeshStandardMaterial({color:0xa77546,metalness:.82,roughness:.29});
 const glow=(color)=>new T.MeshStandardMaterial({color,emissive:color,emissiveIntensity:1.5,metalness:.4,roughness:.2});
 const coreMaterial=glow(0x77ffe0),arcMaterial=glow(0x63e8f0),lanceMaterial=glow(0xffba78),violet=glow(0xb4a1ff);
 const box=new T.BoxGeometry(1,1,1),forms=new Map();let selected=null,buildKey='',transform=0;
 function add(g,geo,material,x=0,y=0,z=0){const m=new T.Mesh(geo,material);m.position.set(x,y,z);g.add(m);return m;}
 function block(g,x,y,z,w,h,d,m){const o=add(g,box,m,x,y,z);o.scale.set(w,h,d);return o;}
 function panel(g,x,y,z,w,h,d,m){
  const a=w/2,b=h/2,k=Math.min(w,h)*.22,s=new T.Shape();
  s.moveTo(-a+k,-b);s.lineTo(a-k,-b);s.lineTo(a,-b+k);s.lineTo(a,b-k);s.lineTo(a-k,b);s.lineTo(-a+k,b);s.lineTo(-a,b-k);s.lineTo(-a,-b+k);s.closePath();
  const geo=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSize:.004,bevelThickness:.004,bevelSegments:1,steps:1});geo.translate(0,0,-d/2);return add(g,geo,m,x,y,z);
 }
 function tube(g,x,y,z,r,length,m,open=false){const o=add(g,new T.CylinderGeometry(r,r,length,12,1,open),m,x,y,z);o.rotation.x=Math.PI/2;return o;}
 function ring(g,x,y,z,r,thick,m){return add(g,new T.TorusGeometry(r,thick,5,20),m,x,y,z);}
 function batch(g){const bins=new Map();for(const o of [...g.children]){if(!o.isMesh)continue;o.updateMatrix();let list=bins.get(o.material)||[];const geo=o.geometry.clone().applyMatrix4(o.matrix);list.push(geo.index?geo.toNonIndexed():geo);bins.set(o.material,list);g.remove(o);}
  for(const [material,geos] of bins){g.add(new T.Mesh(mergeGeometries(geos,false),material));geos.forEach(o=>o.dispose());}
 }
 function label(g,text){const canvas=document.createElement('canvas');canvas.width=256;canvas.height=64;const ctx=canvas.getContext('2d');ctx.fillStyle='#142735';ctx.fillRect(0,0,256,64);ctx.font='bold 27px monospace';ctx.fillStyle='#d0e5e9';ctx.fillText(text,8,43);const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;const m=add(g,new T.PlaneGeometry(.19,.048),new T.MeshBasicMaterial({map:tex}),0,.113,.035);m.rotation.x=-Math.PI/2;}
 function create(tier,path){
  const final=tier===3,arc=path==='arc',lance=path==='lance',accent=lance?lanceMaterial:arc?arcMaterial:coreMaterial;
  const g=new T.Group(),body=new T.Group(),magazine=new T.Group(),bolt=new T.Group(),rotor=new T.Group(),fins=[];g.add(body,magazine,bolt,rotor);g.visible=false;root.add(g);
  // Faceted receiver, seams, trigger guard, wrapped grip and stock connection.
  panel(body,0,0,.005,final&&arc?.27:.242,.215,.35,final&&arc?ceramic:shell);panel(body,0,.01,.155,.175,.15,.12,final&&lance?copper:steel);
  const grip=panel(body,0,-.19,.09,.105,.29,.115,black);grip.rotation.x=-.24;
  for(let j=0;j<6;j++)block(body,0,-.11-j*.035,.158,.108,.009,.008,steel);
  panel(body,0,-.34,.14,.135,.04,.15,shell);block(body,0,-.174,-.07,.14,.018,.18,silver);
  for(const side of [-1,1]){
   panel(body,side*.127,-.012,-.065,.026,.114,.23,steel);
   block(body,side*.145,.016,-.08,.007,.023,.15,accent);
   for(let j=0;j<3;j++){
    const screw=add(body,new T.CylinderGeometry(.011,.011,.006,6),black,side*.145,-.043,-.14+j*.066);screw.rotation.z=Math.PI/2;
    block(body,side*.135,.071,-.15+j*.064,.018,.009,.032,silver);
   }
  }
  // Magazine is separate so both explicit and empty-trigger reloads animate it.
  panel(magazine,0,-.188,-.16,.145,.24,.17,black);panel(magazine,0,-.31,-.16,.17,.03,.19,steel);
  for(const side of [-1,1])for(let i=0;i<4;i++)block(magazine,side*.078,-.11-i*.046,-.16,.009,.016,.105,accent);
  panel(bolt,.132,.031,-.062,.015,.06,.125,silver);block(bolt,.148,.032,-.02,.025,.018,.025,copper);
  // The apex replaces the entire exposed powertrain, not just its paint.
  // A separate range-sensitive cell remains readable in every form.
  if(final&&arc){
   for(const side of [-1,1]){
    panel(body,side*.105,.126,-.205,.06,.093,.31,shell);
    for(let j=0;j<3;j++){
     const z=-.10-j*.10;panel(body,side*.105,.15,z,.044,.056,.065,accent);
     panel(body,side*.105,.188,z,.058,.015,.034,ceramic);
    }
    const rail=panel(body,side*.16,.083,-.06,.03,.10,.25,ceramic);rail.rotation.z=side*.16;
    block(body,side*.15,.115,-.04,.012,.02,.19,violet);
   }
   tube(body,0,.128,-.225,.038,.29,coreMaterial);
   for(const z of [-.37,-.08])ring(body,0,.128,z,.045,.009,shell);
   block(body,0,.172,-.225,.012,.009,.25,silver);
   for(const side of [-1,1])panel(body,side*.096,.059,.07,.059,.038,.16,shell);
   block(body,0,.112,.025,.04,.007,.15,accent);
  }else if(final&&lance){
   panel(body,0,.13,-.225,.12,.105,.33,black);
   for(let j=0;j<5;j++){
    const z=-.08-j*.07;panel(body,0,.13,z,.15,.118,.018,copper);
    block(body,0,.194,z,.075,.008,.024,accent);
   }
   tube(body,0,.139,-.23,.035,.32,coreMaterial);
   for(const side of [-1,1]){
    panel(body,side*.116,.05,-.045,.025,.09,.24,copper);
    for(let j=0;j<4;j++)block(body,side*.13,.088,.05-j*.057,.019,.018,.026,accent);
   }
   panel(body,0,.112,.03,.13,.025,.12,copper);block(body,0,.129,.03,.035,.008,.08,accent);
  }else{
   tube(body,0,.119,-.245,.046,.27,coreMaterial);
   for(const z of [-.377,-.245,-.11])ring(body,0,.119,z,.049,.008,shell);
   for(const side of [-1,1])block(body,side*.052,.151,-.245,.012,.018,.27,silver);
   block(body,0,.17,-.245,.016,.008,.27,shell);
  }
  // Low-profile rear sight, with a genuine aperture.
  for(const side of [-1,1])block(body,side*.038,.14,.11,.014,.068,.033,shell);
  block(body,0,.108,.11,.09,.014,.033,steel);block(body,0,.141,.122,.008,.007,.005,accent);
  const length=lance?(final?1.11:.94):arc?(final?.91:.81):.73;
  panel(body,0,-.029,-.36,.18,.15,.30,steel);tube(body,0,.018,-(length+.35)/2,.037,length-.35,black,true);
  tube(body,0,.018,-length,.055,.05,silver,true);ring(body,0,.018,-length-.027,.035,.008,accent);
  if(!path){
   for(let j=0;j<5;j++){const z=-.42-j*.056;panel(body,0,.015,z,.19-j*.008,.15,.024,shell);for(const side of [-1,1])block(body,side*.092,.017,z,.008,.05,.014,accent);}
   for(const side of [-1,1])panel(body,side*.058,.017,-.73,.03,.09,.07,steel);
  }else if(arc){
   // Paired live conductors lead into an iris. Apex adds a third articulated crown.
   for(const side of [-1,1]){
    const fin=new T.Group();fin.position.set(side*(final?.155:.12),final?.035:.014,-.37);g.add(fin);fins.push(fin);
    const blade=panel(fin,0,0,-.17,.065,.12,final?.57:.43,final?ceramic:shell);blade.rotation.y=-side*.10;
    block(fin,-side*.022,.025,-.20,.012,.025,final?.52:.39,accent);
    for(let j=0;j<(final?6:4);j++){const z=-.03-j*.075;panel(fin,side*.01,0,z,.075,.14,.022,steel);block(fin,0,.077,z,.032,.009,.024,violet);}
    panel(fin,-side*.035,.015,final?-.48:-.37,.08,.10,.10,silver);batch(fin);
   }
   if(final){
    panel(body,0,-.095,-.62,.10,.064,.57,shell);block(body,0,-.128,-.63,.039,.012,.53,accent);
    for(let j=0;j<3;j++)ring(rotor,0,.018,0,.081+j*.013,.007,j===1?violet:steel);rotor.position.z=-.85;
    for(const side of [-1,1]){const strip=block(body,side*.102,.109,-.41,.016,.018,.19,violet);strip.rotation.y=side*.2;}
   }else ring(body,0,.018,-.76,.082,.01,steel);
  }else{
   // Deep, vented accelerator; gold field strips run inside the graphite rails.
   const count=final?7:5;
   for(const side of [-1,1]){
    const fin=new T.Group();fin.position.set(side*.087,.018,-.40);g.add(fin);fins.push(fin);
    panel(fin,0,0,-(length-.4)/2,.07,.112,length-.35,shell);
    block(fin,-side*.036,.006,-(length-.4)/2,.01,.035,length-.38,accent);
    for(let j=0;j<count;j++){const z=-j*(length-.4)/(count-1);panel(fin,0,0,z,.094,.145,.025,steel);block(fin,0,.08,z,.038,.01,.022,copper);}
    batch(fin);
   }
   if(final){
    for(const side of [-1,1]){panel(body,side*.11,.058,-.24,.055,.07,.22,copper);block(body,side*.11,.099,-.24,.029,.009,.16,accent);}
    for(let i=0;i<4;i++)ring(rotor,0,0,-i*.026,.075-i*.005,.006,i%2?accent:silver);rotor.position.set(0,.018,-1.015);
   }
  }
  let chargeCells=null,cellCount=0;
  if(lance){
   cellCount=final?7:5;
   chargeCells=new T.InstancedMesh(new T.BoxGeometry(.023,.009,.025),new T.MeshBasicMaterial({color:0xffffff}),cellCount*2);
   const pose=new T.Object3D(),color=new T.Color(0x46271b);
   for(let i=0;i<cellCount*2;i++){const n=i%cellCount;pose.position.set(i<cellCount?-.088:.088,.104,-.42-n*(length-.47)/(cellCount-1));pose.updateMatrix();chargeCells.setMatrixAt(i,pose.matrix);chargeCells.setColorAt(i,color);}
   g.add(chargeCells);
  }
  label(body,final?(arc?'P-100 / TEMPEST':'P-100 / HELIX'):path?(arc?'P-80 / ARC':'P-80 / LANCE'):'P-64 / AMP');
  batch(body);batch(magazine);batch(bolt);batch(rotor);
  const form={g,body,magazine,bolt,rotor,fins,length,accent,tier,path,chargeCells,cellCount,rotorHome:rotor.position.z};forms.set(tier+':'+path,form);return form;
 }
 create(1,null);for(const path of ['arc','lance'])for(const tier of [2,3])create(tier,path);
 function configure(build){
  const key=build.tier+':'+build.path;if(key===buildKey)return false;buildKey=key;transform=build.tier?1:0;
  legacy.forEach(o=>o.visible=!build.tier);for(const f of forms.values())f.g.visible=false;
  selected=build.tier?forms.get(key):null;if(selected)selected.g.visible=true;
  muzzle.position.set(0,selected ? .018 : .015,selected?-selected.length-.034:-.695);port.position.set(selected ? .139 : .12,.025,-.06);
  return true;
 }
 function update(dt,{build,charge=0,flash=0,time=0,reload=0,kick=0,active=false,reduced=false}){
  configure(build);transform=Math.max(0,transform-dt*1.5);if(!selected)return;
  selected.magazine.position.y=-reload*.24;selected.magazine.rotation.x=reload*.3;
  selected.bolt.position.z=kick*.8+reload*.08;
  selected.g.position.y=-transform*.12;selected.g.rotation.z=reduced?0:transform*-.12;
  selected.rotor.rotation.z=reduced?0:time*(selected.path==='arc'?.5:1.2)+charge*2;
  const discharge=Math.min(1,flash);selected.rotor.position.z=selected.rotorHome-(selected.path==='lance'?(charge*.025+discharge*.045):0);
  for(let i=0;i<selected.fins.length;i++){const fin=selected.fins[i],side=i%2?-1:1;fin.rotation.y=side*(charge*(selected.path==='lance'?.16:.08)+discharge*.12+(reduced?0:transform*.18));}
  selected.accent.emissiveIntensity=1.2+charge*1.2+flash*4+(active&&!reduced?Math.sin(time*3)*.12:0);
  if(selected.chargeCells){
   const count=selected.cellCount,c=new T.Color();
   for(let i=0;i<count*2;i++){const filled=charge*count>i%count+.2;selected.chargeCells.setColorAt(i,c.setHex(discharge>.6?0xffffff:charge>=1?0xfff1c3:filled?0xffbd6c:0x46271b));}
   selected.chargeCells.instanceColor.needsUpdate=true;
   lanceMaterial.color.setHex(charge>=1?0xffe6ad:0xffba78);lanceMaterial.emissive.setHex(charge>=1?0xffd99a:0xffba78);
  }
  coreMaterial.emissiveIntensity=1.4+charge+flash*3;
 }
 function stats(){let meshes=0,triangles=0;const f=selected;if(f)f.g.traverse(o=>{if(o.isMesh){meshes++;triangles+=(o.geometry.index?.count??o.geometry.attributes.position.count)/3;}});return {form:buildKey,meshes,triangles,muzzle:muzzle.position.toArray(),transform};}
 return {configure,update,stats,coreMaterial,forms};
}
