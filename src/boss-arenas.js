// Boss arenas use the existing 441 floor / 16 cover instance budgets. Model
// dimensions stay independent: wide flight decks are authored in world meters.
export const BOSS_ARENAS=Object.freeze({
 warden:{name:'WARDEN / 鋼鉄兵器庫',kind:'hangar',gimmick:4,launch:23,sx:4.2,sz:4.2,shape:'hangar',rx:9,rz:9,entry:[0,25.2],spawn:[0,-16.8],pads:[[0,16.8],[-21,0],[21,0],[0,-21],[0,0]],colors:[0x263b46,0x456477,0x10232f,0x040c18,0x9adfff,0x68efdc],cover:[[-16,-8,7,4,4.8],[16,-8,7,4,4.8],[-16,12,7,4,4.8],[16,12,7,4,4.8],[-29,0,4,8,6],[29,0,4,8,6]]},
 ram:{name:'RAM / 突進試験路',kind:'runway',gimmick:2,launch:22,sx:4.4,sz:5.5,shape:'runway',rx:8,rz:10,entry:[0,22],spawn:[0,-33],pads:[[0,38.5],[0,-38.5],[-22,0],[22,0],[0,0]],colors:[0x392d30,0x795052,0x25131c,0x090b16,0xff8a83,0xffd1aa],cover:[[-24,-22,5,11,4],[24,-22,5,11,4],[-24,22,5,11,4],[24,22,5,11,4]]},
 siege:{name:'SIEGE / 包囲砲台基地',kind:'fortress',gimmick:4,launch:24,sx:5.4,sz:5.4,shape:'crater',rx:10,rz:10,entry:[0,16.2],spawn:[0,-27],pads:[[0,0],[-27,0],[27,0],[0,-27],[0,27]],colors:[0x3e3c32,0x8d8562,0x2a2518,0x10121c,0xffdc91,0xffb567],cover:[[-27,-16,11,6,5.5],[27,-16,11,6,5.5],[-27,16,11,6,5.5],[27,16,11,6,5.5],[-43,0,5,12,7],[43,0,5,12,7]]},
 mirror:{name:'MIRROR / 光学試験区画',kind:'laboratory',gimmick:5,launch:23,sx:4.3,sz:4.3,shape:'crossdeck',rx:10,rz:9,entry:[0,21.5],spawn:[0,-21.5],pads:[[-21.5,-21.5],[21.5,21.5],[-21.5,21.5],[21.5,-21.5],[0,0]],colors:[0x302e48,0x6d658d,0x171c35,0x080b20,0xe1b5ff,0x8deeff],cover:[[-25.8,-21.5,5,9,4.4],[25.8,21.5,5,9,4.4],[-25.8,21.5,9,5,4.4],[25.8,-21.5,9,5,4.4],[-34.4,0,4,7,6.5],[34.4,0,4,7,6.5]]},
 bulwark:{name:'BULWARK / 古代の石切場',kind:'quarry',gimmick:2,launch:23,sx:5.0,sz:5.0,shape:'spiral',rx:10,rz:10,entry:[0,20],spawn:[0,-20],pads:[[0,35],[0,-35],[-35,0],[35,0],[0,0]],colors:[0x363e33,0x7a8263,0x263227,0x0d1720,0xdbd5a6,0xa6d899],cover:[[-25,-15,8,8,6],[25,-15,8,8,6],[-25,20,8,8,6],[25,20,8,8,6],[-40,0,6,10,9],[40,0,6,10,9]]},
 phoenix:{name:'PHOENIX / 焦熱の環',kind:'crucible',gimmick:3,launch:27,sx:5.2,sz:5.2,shape:'islands',rx:10,rz:10,entry:[0,10.4],spawn:[0,-36.4],pads:[[-36.4,0],[36.4,0],[0,-36.4],[0,36.4],[0,0]],colors:[0x472e29,0x966b4a,0x4c211d,0x110b1d,0xffbc65,0xff7350],cover:[[-36.4,0,5,7,3.2],[36.4,0,5,7,3.2],[0,-31.2,7,5,3.2],[0,31.2,7,5,3.2]]},
 gravity:{name:'GRAVITY / 特異点観測環',kind:'singularity',gimmick:3,launch:25,sx:5.0,sz:5.0,shape:'rings',rx:10,rz:10,entry:[0,35],spawn:[0,0],pads:[[0,-40],[0,40],[-40,0],[40,0],[0,0]],colors:[0x2d304a,0x595b82,0x1f2146,0x07091e,0xb7a4ff,0x86e2ff],cover:[[-35,0,4,8,4],[35,0,4,8,4],[0,-35,8,4,4],[0,35,8,4,4]]},
 tempest:{name:'TEMPEST / 雷雲の王冠',kind:'storm',gimmick:5,launch:27,sx:6.0,sz:6.0,shape:'ridge',rx:10,rz:10,entry:[-18,18],spawn:[18,-18],pads:[[-36,36],[36,-36],[-36,-36],[36,36],[0,0]],colors:[0x2a3549,0x60789b,0x16223f,0x070b21,0xb8e4ff,0xad9bff],cover:[[-30,-18,6,6,5],[30,-18,6,6,5],[-30,24,6,6,5],[30,24,6,6,5]]},
 devourer:{name:'DEVOURER / 黒曜の竜庭',kind:'obsidian',gimmick:2,launch:24,sx:5.7,sz:5.7,shape:'trench',rx:10,rz:10,entry:[0,17.1],spawn:[0,-22.8],pads:[[0,34.2],[-34.2,0],[34.2,0],[0,-34.2],[0,0]],colors:[0x282731,0x57515e,0x21152c,0x080813,0xe8b5dd,0x947adb],cover:[[-28,-16,6,13,6.5],[28,-16,6,13,6.5],[-28,20,13,6,6.5],[28,20,13,6,6.5],[-45,0,5,9,10],[45,0,5,9,10]]},
 leviathan:{name:'LEVIATHAN / 外洋防衛線',kind:'harbor',gimmick:0,launch:22,sx:5.8,sz:5.8,shape:'dock',rx:10,rz:10,entry:[0,0],spawn:[0,-40.6],colors:[0x34535c,0x607e83,0x27566c,0x102a45,0xc4eef1,0x83bac7],cover:[[-11.6,11.6,7,5.8,5.5],[11.6,11.6,7,5.8,5.5],[-34.8,-40.6,6,8,5.5],[34.8,-40.6,6,8,5.5],[-40.6,-17.4,5,10,4.8],[40.6,-17.4,5,10,4.8]]}
});

export function createBossArenaLayout(id,wave=6){
 const spec=BOSS_ARENAS[id];if(!spec)throw new Error('Unknown boss arena '+id);
 const cells=[],walls=[];const sx=spec.sx,sz=spec.sz;
 for(let iz=-spec.rz;iz<=spec.rz;iz++)for(let ix=-spec.rx;ix<=spec.rx;ix++){
  const ax=Math.abs(ix),az=Math.abs(iz),r=Math.hypot(ix,iz);let present=true;
  if(spec.shape==='hangar')present=ax<=9&&az<=9&&(ax>=4||az>=4||ax<=2&&az<=2||ax===0||az===0);
  if(spec.shape==='runway')present=ax<=2||(ax<=7&&az>=2&&az<=5)||(ax<=5&&az>=7);
  if(spec.shape==='crater')present=ax+az<=17;
  // Four narrow cross-bridges at |z|=7 reconnect the corner observation decks.
  // Heights are equal along each bridge, so the same <=.66 step/nav rules apply.
  if(spec.shape==='crossdeck')present=(ax<=2&&az<=9)||(az<=2&&ax<=10)||(ax>=5&&ax<=9&&az>=4&&az<=8)||(az===7&&ax>=3&&ax<=4);
  if(spec.shape==='spiral')present=r<=10.45&&(r>=3.2||ax<=1||az<=1);
  if(spec.shape==='islands')present=r<=3.3||(ax<=1&&az<=9)||(az<=1&&ax<=9)||(r>=6.5&&r<=10.2&&(ax<=3||az<=3));
  if(spec.shape==='rings')present=r<=10.45&&(r>=6.6||r<=4.2||ax<=1||az<=1);
  if(spec.shape==='ridge')present=ax+az<=17&&(ax<=4||az<=4||Math.abs(ix-iz)<=5);
  if(spec.shape==='trench')present=ax+az<=16;
  if(spec.shape==='dock')present=(iz>=0&&iz<=8&&ax<=8)||(iz>=-9&&iz<=-6&&ax<=8)||(iz>=-5&&iz<0&&(ax<=2||ax>=6&&ax<=8));
  if(!present)continue;
  let h=0;
  if(id==='warden')h=Math.max(0,Math.min(2.6,(Math.max(ax,az)-3)*.48));
  if(id==='ram')h=ax>=5?1.8:ax===4?1.2:ax===3?.6:0;
  if(id==='siege')h=Math.max(0,Math.min(3.4,(r-3.5)*.55));
  if(id==='mirror')h=Math.max(0,Math.min(2.4,(Math.max(ax,az)-2)*.45));
  if(id==='bulwark')h=Math.max(0,Math.min(3.6,(Math.atan2(iz,ix)+Math.PI)/(Math.PI*2)*3.2));
  if(id==='phoenix')h=r<=3.3?0:Math.max(0,Math.min(2.8,(r-4.5)*.55));
  if(id==='gravity')h=r<=4.2?0:Math.max(0,Math.min(3.0,(r-4.2)*.52));
  if(id==='tempest')h=Math.max(0,Math.min(4.2,((ix-iz)+10)*.22));
  if(id==='devourer')h=ax<=2?0:Math.min(2.8,(ax-2)*.52);
  if(id==='leviathan')h=.5;
  cells.push({ix,iz,x:ix*sx,z:iz*sz,h:Math.round(h*100)/100});
 }
 const byKey=new Map(cells.map(c=>[c.ix+','+c.iz,c]));
 const cellAt=(x,z)=>byKey.get(Math.round(x/sx)+','+Math.round(z/sz));
 for(const [x,z,w,d,h] of spec.cover){const floor=cellAt(x,z);if(floor)walls.push({x,z,w,d,h,base:floor.h});}
 const blocked=(x,z,r=.7)=>walls.some(w=>Math.abs(x-w.x)<w.w/2+r&&Math.abs(z-w.z)<w.d/2+r);
 const nodes=cells.filter(c=>!blocked(c.x,c.z));
 function nearest(x,z,r=.7){let best=null,d=Infinity;for(const c of nodes){if(blocked(c.x,c.z,r))continue;const n=(x-c.x)**2+(z-c.z)**2;if(n<d){d=n;best=c;}}return best;}
 const adjacent=c=>[[1,0],[-1,0],[0,1],[0,-1]].map(([x,z])=>byKey.get((c.ix+x)+','+(c.iz+z))).filter(n=>n&&!blocked(n.x,n.z)&&Math.abs(c.h-n.h)<=.66);
 const entryNode=nearest(...spec.entry),reachableNodes=[entryNode],reachable=new Set(reachableNodes);
 for(let i=0;i<reachableNodes.length;i++)for(const n of adjacent(reachableNodes[i]))if(!reachable.has(n)){reachable.add(n);reachableNodes.push(n);}
 const spawnNode=nearest(...spec.spawn,id==='siege'?9:id==='bulwark'?7:5);
 const bossSpawn={x:spawnNode.x,z:spawnNode.z,y:spawnNode.h};
 const halfX=Math.max(...cells.map(c=>Math.abs(c.x)))+sx*.49,halfZ=Math.max(...cells.map(c=>Math.abs(c.z)))+sz*.49;
 const radius=Math.hypot(halfX,halfZ),height=spec.kind==='quarry'?29:spec.kind==='storm'?60:spec.kind==='harbor'?37:45;
 const backdrop={radius:radius+12,jitter:5,base:height,span:18,width:spec.kind==='quarry'?2.2:1.3,tilt:spec.kind==='obsidian'?.28:.05,gate:radius+4,gateHeight:height*.65,gateWidth:1.2};
 if(id==='leviathan')Object.assign(backdrop,{radius:850,jitter:3,base:1.2,span:2.2,width:1.2,tilt:0,gate:850,gateHeight:.75,gateWidth:.5});
 const rule={hangar:'ピットと外周キャットウォークをリフトで往来し、コアの露出を狙え。',runway:'中央の滑走路で突進を誘い、加速盤で左右の退避帯へかわして反撃。',fortress:'すり鉢の底からリフトで防壁へ登り、砲撃地点から離れて撃ち下ろせ。',laboratory:'クロス橋と高台、リレーコアを使って高速機の照準を外せ。',quarry:'螺旋の石切場を加速盤で駆け上がり、岩腕の背後を取れ。',crucible:'5つの浮島を低重力とパッドで飛び移り、空のPHOENIXを追え。',singularity:'外環の高台と中央島をつなぐ橋で、低重力を活かして重力波をかわす。',storm:'斜めにそびえる嵐の尾根を駆け上がり、リレーコアと高跳びで竜を撃て。',obsidian:'中央の塹壕と両翼の黒曜段丘を加速盤で行き来し、ブレスを遮れ。',harbor:'海上の甲板を走り、防波壁で熱線を遮れ。太い連絡桟橋を渡って距離を変える。'}[spec.kind];
 const padHints=spec.pads||[[0,-.55*halfZ],[0,.55*halfZ],[-.55*halfX,0],[.55*halfX,0],[0,0]];
 const pads=padHints.map(([x,z])=>{const p=nearest(x,z);return{x:p.x,z:p.z,y:p.h+.08};});
 return{wave,bossArena:id,bossSpawn,name:spec.name,rule,kind:spec.kind,cellSizeX:sx,cellSizeZ:sz,cells,walls,nodes,reachableNodes,pads,launch:spec.launch||22,entry:{x:entryNode.x,y:entryNode.h,z:entryNode.z,yaw:Math.atan2(entryNode.x-bossSpawn.x,entryNode.z-bossSpawn.z)},bounds:{x:halfX,z:halfZ},cellAt,blocked,nearest,path:(x,z,tx,tz)=>{const start=nearest(x,z),goal=nearest(tx,tz);if(!start||!goal)return[];const queue=[start],parents=new Map([[start,null]]);let end=start;for(let i=0;i<queue.length;i++){const c=queue[i];if((c.x-tx)**2+(c.z-tz)**2<(end.x-tx)**2+(end.z-tz)**2)end=c;if(c===goal){end=c;break;}for(const n of adjacent(c))if(!parents.has(n)){parents.set(n,c);queue.push(n);}}const route=[];for(let c=end;c&&c!==start;c=parents.get(c))route.push({x:c.x,z:c.z});return route.reverse();},spawnDistance:24,viewRadius:Math.max(105,radius+36),backdrop,gridCells:441,colors:[spec.name,spec.colors[0],spec.colors[2],spec.colors[3],spec.colors[4],spec.colors[5]],wallColor:spec.colors[1],seaLevel:id==='leviathan'?.12:null,gimmick:spec.gimmick||0,skyline:null};
}
