import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Models are authored in weapon space: -Z points down the barrel. Static
// components are merged by material; sockets remain independent of animation.
export function createArmory(parent) {
 const metal=(c,rough=.34)=>new T.MeshStandardMaterial({color:c,metalness:.72,roughness:rough});
 const dark=metal(0x152632),steel=metal(0x57717e),edge=metal(0x94a9ad),rubber=metal(0x09131d,.8),brass=metal(0xcc9d51);
 const cyan=new T.MeshStandardMaterial({color:0x81ffe0,emissive:0x48e8c3,emissiveIntensity:1.5,metalness:.35,roughness:.25});
 const amber=new T.MeshStandardMaterial({color:0xffcd83,emissive:0xff9e39,emissiveIntensity:.6,metalness:.4,roughness:.3});
 const blue=new T.MeshStandardMaterial({color:0xb0dcff,emissive:0x598fff,emissiveIntensity:1.4,metalness:.4,roughness:.2});
 const pulseMaterial=cyan.clone(),models=[],actions=[],muzzles=[],ports=[],magazines=[],coils=[];
 const cube=new T.BoxGeometry(1,1,1);
 function mesh(g,geo,m,x=0,y=0,z=0){const o=new T.Mesh(geo,m);o.position.set(x,y,z);g.add(o);return o}
 function block(g,x,y,z,w,h,d,m){const o=mesh(g,cube,m,x,y,z);o.scale.set(w,h,d);return o}
 function armor(g,x,y,z,w,h,d,m,cut=.18){const s=new T.Shape(),a=w/2,b=h/2,k=Math.min(w,h)*cut;s.moveTo(-a+k,-b);s.lineTo(a-k,-b);s.lineTo(a,-b+k);s.lineTo(a,b-k);s.lineTo(a-k,b);s.lineTo(-a+k,b);s.lineTo(-a,b-k);s.lineTo(-a,-b+k);s.closePath();const geo=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.006,bevelThickness:.006});geo.translate(0,0,-d/2);return mesh(g,geo,m,x,y,z)}
 function tube(g,x,y,z,r,len,m,inner=0){const o=mesh(g,new T.CylinderGeometry(r,r,len,12,1,inner>0),m,x,y,z);o.rotation.x=Math.PI/2;if(inner){const ring=mesh(g,new T.RingGeometry(inner,r,12),m,x,y,z-len/2);ring.rotation.y=Math.PI;const bore=mesh(g,new T.CylinderGeometry(inner,inner,len,12,1,true),rubber,x,y,z);bore.rotation.x=Math.PI/2;bore.material=new T.MeshStandardMaterial({color:0x050b10,side:T.DoubleSide,roughness:1})}return o}
 function mark(g,text,x,y,z){const canvas=document.createElement('canvas');canvas.width=256;canvas.height=64;const ctx=canvas.getContext('2d');ctx.fillStyle='#142632';ctx.fillRect(0,0,256,64);ctx.font='bold 32px monospace';ctx.fillStyle='#b6d6db';ctx.fillText(text,12,42);const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;const o=mesh(g,new T.PlaneGeometry(.17,.042),new T.MeshBasicMaterial({map:tex}),x,y,z);o.rotation.x=-Math.PI/2;}
 function batch(g){g.updateMatrixWorld(true);const groups=new Map();for(const o of [...g.children])if(o.isMesh){o.updateMatrix();let a=groups.get(o.material)||[];a.push(o.geometry.clone().applyMatrix4(o.matrix));groups.set(o.material,a);g.remove(o)}for(const [m,gs] of groups){g.add(new T.Mesh(mergeGeometries(gs.map(a=>a.index?a.toNonIndexed():a),false),m));gs.forEach(a=>a.dispose())}}
 for(let i=0;i<3;i++){
  const g=new T.Group(),body=new T.Group(),action=new T.Group(),mag=new T.Group();parent.add(g);g.add(body,action,mag);models.push(g);actions.push(action);magazines.push(mag);const accent=[cyan,amber,blue][i];
  armor(body,0,-.02,.015,.21,.19,.32,dark);armor(body,0,-.015,.18,.18,.16,.11,rubber);
  const grip=armor(body,0,-.17,.075,.095,.22,.10,rubber);grip.rotation.x=-.22;
  for(let j=0;j<4;j++)block(body,0,-.105-j*.037,.126,.10,.008,.012,steel);
  block(body,-.072,-.125,-.052,.018,.025,.16,steel);block(body,.072,-.125,-.052,.018,.025,.16,steel);
  block(body,0,-.19,-.14,.13,.025,.15,steel); // trigger guard
  const socket=new T.Object3D(),port=new T.Object3D();g.add(socket,port);muzzles.push(socket);ports.push(port);port.position.set(.12,.025,-.06);
  if(i===0){
   armor(body,0,.015,-.22,.235,.15,.30,steel);armor(body,0,-.07,-.36,.16,.12,.22,dark);
   tube(body,0,.095,-.19,.044,.22,pulseMaterial); // recessed axial power cell
   for(const z of [-.31,-.22,-.10])tube(body,0,.095,z,.051,.019,dark);
   for(const x of [-.052,.052])block(body,x,.126,-.20,.014,.014,.25,edge);
   block(body,0,.145,-.20,.018,.012,.24,dark);
   for(let j=0;j<5;j++){const z=-.37-j*.036;armor(body,0,.015,z,.16-j*.009,.13,.015,dark);block(body,-.085+j*.004,.024,z,.008,.035,.019,cyan)}
   tube(body,0,.015,-.50,.039,.24,edge);armor(body,0,.015,-.636,.105,.10,.085,dark);tube(body,0,.015,-.678,.039,.018,steel,.026);
   for(const x of [-.054,.054])block(body,x,.016,-.636,.006,.04,.045,cyan);
   armor(mag,0,-.17,-.16,.115,.18,.14,dark);block(mag,0,-.267,-.16,.13,.018,.15,edge);
   for(let j=0;j<3;j++)block(mag,-.06,-.14-j*.035,-.16,.006,.012,.09,cyan);
   block(action,.113,.025,-.06,.018,.05,.12,edge);mark(body,'P-50 / 01',0,.10,.055);socket.position.set(0,.015,-.695);
  }else if(i===1){
   armor(body,0,.025,-.22,.255,.20,.31,steel);tube(body,0,.055,-.47,.073,.45,steel);
   tube(body,0,-.075,-.48,.042,.39,dark);tube(body,0,.055,-.71,.084,.055,dark,.057);
   armor(action,0,-.052,-.46,.235,.12,.24,dark);for(let j=0;j<6;j++)armor(action,0,-.052,-.56+j*.035,.245,.13,.013,steel);
   block(action,0,-.122,-.46,.13,.008,.17,amber);
   for(let j=0;j<3;j++){tube(body,-.137,.02,-.12-j*.062,.024,.052,brass);block(body,-.16,.025,-.12-j*.062,.016,.035,.025,amber)}
   block(body,0,.145,-.36,.018,.018,.38,dark);block(body,0,.16,-.59,.014,.027,.018,amber);
   block(body,.13,.025,-.10,.008,.065,.13,rubber);mark(body,'B-10 / 12GA',0,.135,-.03);socket.position.set(0,.055,-.744);
  }else{
   armor(body,0,-.01,-.12,.25,.22,.28,dark);armor(body,0,-.045,-.31,.205,.15,.21,steel);
   for(const side of [-1,1]){
    armor(body,side*.104,.025,-.52,.075,.135,.60,steel);
    armor(body,side*.104,.025,-.82,.092,.15,.10,dark);
    block(body,side*.063,.03,-.54,.012,.043,.60,blue);
    for(let j=0;j<5;j++){const z=-.31-j*.105;armor(body,side*.113,.025,z,.094,.17,.034,dark);const c=block(body,side*.113,.117,z,.055,.016,.028,blue.clone());coils.push(c)}
    block(body,side*.104,-.07,-.52,.052,.016,.51,rubber);
   }
   tube(action,0,.01,-.30,.035,.27,blue);armor(body,0,.13,-.08,.105,.085,.16,steel);block(body,0,.178,-.08,.074,.008,.11,rubber);block(body,0,.185,-.105,.014,.006,.044,blue);
   armor(mag,0,-.16,-.12,.18,.17,.20,dark);for(let j=0;j<3;j++)block(mag,-.094,-.12-j*.036,-.12,.008,.012,.14,blue);
   mark(body,'R-06 / EM',0,.115,.065);socket.position.set(0,.025,-.88);
  }
  batch(body);batch(action);batch(mag);
 }
 return {models,actions,muzzles,ports,magazines,coils,pulseMaterial};
}
