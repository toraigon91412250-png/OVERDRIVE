import {omegaEncounterBrief} from './omega-encounters.js';

export const CELL=4;
export const RING_SHIFT_LAYOUT_IDS=Object.freeze([9,10,11,12,13,14,15,16]);

const stages=[
 {name:'起動',rule:'光るジャンプ台を踏んで高く跳び、空中から敵を狙おう。',rx:7,rz:7,entry:[0,24],launch:19.6,spawn:18,view:52,backdrop:{radius:48,jitter:4,base:12,span:18,width:1,tilt:.02,gate:36,gateHeight:5,gateWidth:1}},
 {name:'蒼の回廊',rule:'光る加速盤へ進み、踏むときの移動方向へ一気に加速しよう。',rx:9,rz:7,entry:[0,24],launch:20.5,spawn:20,view:62,backdrop:{radius:72,jitter:2,base:24,span:9,width:.85,tilt:.01,gate:58,gateHeight:13,gateWidth:1.05}},
 {name:'空中庭園',rule:'ジャンプ中にジャンプを長押しすると、短時間だけ低重力で浮遊できる。',rx:8,rz:8,entry:[0,20],launch:24,spawn:20,view:64,backdrop:{radius:78,jitter:9,base:15,span:25,width:.78,tilt:.13,gate:64,gateHeight:8,gateWidth:.82}},
 {name:'段丘要塞',rule:'油圧リフトは一定の周期で昇降する。低い位置で乗り、上昇して射線を取ろう。',rx:8,rz:8,entry:[0,24],launch:19.6,spawn:18,view:62,backdrop:{radius:74,jitter:5,base:22,span:10,width:1.8,tilt:.015,gate:60,gateHeight:20,gateWidth:1.25}},
 {name:'断層交差路',rule:'遠くのリレーコアを撃つと、近くの敵が短時間露出する。長い射線を活かそう。',rx:10,rz:10,entry:[24,24],launch:26,spawn:25,view:70,backdrop:{radius:84,jitter:11,base:25,span:24,width:.58,tilt:.24,gate:68,gateHeight:12,gateWidth:.72}},
 {name:'終端の王冠',rule:'外周リングの発光アンカーを撃つと、WARDENのコアが追加で露出する。',rx:9,rz:9,entry:[0,24],launch:22,spawn:18,view:66,backdrop:{radius:82,jitter:4,base:36,span:19,width:.74,tilt:.08,gate:69,gateHeight:25,gateWidth:1.18}},
 {name:'空洞王環',rule:'巨大な空洞を囲む高架外環。放射橋を渡り、高低差を使って射線を変えろ。',rx:10,rz:10,entry:[0,-40],launch:24,spawn:18,view:92,backdrop:{radius:86,jitter:7,base:48,span:25,width:1.6,tilt:.5,gate:88,gateHeight:40,gateWidth:2}},
 {name:'天断回廊',rule:'高度22mの蛇行回廊。後退だけでは道が切れる。曲がり角と展望枝を使え。',rx:10,rz:10,entry:[-12,-40],launch:24,spawn:18,view:104,backdrop:{radius:98,jitter:4,base:60,span:30,width:2,tilt:.7,gate:100,gateHeight:55,gateWidth:2.5}},

];

const ringStages=[
 {name:'RIFT / 二界峡谷',rule:'中央の裂け目を越える横断路は3本だけ。射線を切らさず、橋を渡るタイミングを選べ。',entry:[-16,0],launch:21,spawn:16,view:96,backdrop:{radius:92,jitter:12,base:35,span:30,width:1.4,tilt:.35,gate:82,gateHeight:27,gateWidth:1.8}},
 {name:'RIFT / 重力盆地',rule:'低い中央盆地を高い外縁が囲む。外縁から降りて狙うか、窪地を横切って包囲を抜けろ。',entry:[0,0],launch:20,spawn:18,view:90,backdrop:{radius:84,jitter:8,base:30,span:24,width:1.1,tilt:.18,gate:76,gateHeight:30,gateWidth:1.4}},
 {name:'RIFT / 破片の庭',rule:'四つの広場は1セル幅の桟橋で中央へつながる。広場を移り、桟橋で射線を切れ。',entry:[0,-36],launch:23,spawn:17,view:94,backdrop:{radius:90,jitter:16,base:33,span:28,width:.8,tilt:.42,gate:84,gateHeight:34,gateWidth:1.1}},
 {name:'RIFT / 交差格子',rule:'長い射線が格子状に交差する。縦横の連絡路を使い、狙撃線からすばやく外れろ。',entry:[-36,-28],launch:20,spawn:17,view:96,backdrop:{radius:91,jitter:6,base:38,span:20,width:1.7,tilt:.12,gate:86,gateHeight:36,gateWidth:1.2}},
 {name:'RIFT / 三叉砲列',rule:'太い着地広場から細い砲列が三方向へ伸びる。敵の位置に合わせ、次の枝へ素早く移れ。',entry:[-36,0],launch:22,spawn:18,view:100,backdrop:{radius:94,jitter:14,base:40,span:24,width:.7,tilt:.58,gate:89,gateHeight:42,gateWidth:.9}},
 {name:'RIFT / 折返し階段',rule:'一本道が何度も折り返しながら上昇する。追われたら次の踊り場まで走って射線を変えろ。',entry:[24,20],yaw:Math.PI/2,launch:22,spawn:16,view:100,backdrop:{radius:96,jitter:11,base:44,span:25,width:1.2,tilt:.46,gate:90,gateHeight:44,gateWidth:1.5}},
 {name:'RIFT / 斜光断面',rule:'菱形の舞台を斜めに走る稜線が射線を切る。尾根を越えて高低差を作り、敵の照準を外せ。',entry:[-16,-16],yaw:-Math.PI*.75,launch:23,spawn:18,view:104,backdrop:{radius:98,jitter:9,base:47,span:27,width:1.3,tilt:.28,gate:92,gateHeight:48,gateWidth:1.7}},
 {name:'RIFT / 三段断層',rule:'三つの高台は左右交互の細い階段で結ばれる。高さを奪い、次の接続路を先回りしろ。',entry:[32,20],yaw:0,launch:20,spawn:17,view:98,backdrop:{radius:94,jitter:7,base:42,span:26,width:1.5,tilt:.3,gate:88,gateHeight:38,gateWidth:1.3}},
];

function createRingShiftLayout(wave){
 const spec=ringStages[wave-RING_SHIFT_LAYOUT_IDS[0]],variant=wave-RING_SHIFT_LAYOUT_IDS[0];
 const cells=[],walls=[];
 for(let iz=-10;iz<=10;iz++)for(let ix=-10;ix<=10;ix++){
  const x=Math.abs(ix),z=Math.abs(iz);let present=false,h=0;
  if(variant===0){present=(x>=3&&x<=10&&z<=9)||(x<=2&&[-8,0,8].includes(iz));h=ix>2?1.6:ix< -2?0:(ix+2)*.32;}
  if(variant===1){const radius=Math.hypot(ix,iz);present=radius<=10;h=Math.max(0,Math.min(5,(radius-2)*.45));}
  if(variant===2){const hub=x<=2&&z<=2,satellites=(x<=2&&z>=7&&z<=9)||(z<=2&&x>=7&&x<=9),bridges=(ix===0&&z<=8)||(iz===0&&x<=8);present=hub||satellites||bridges;h=Math.min(3.2,(x+z)*.16);}
  if(variant===3){const rows=[-8,-3,2,7].some(row=>Math.abs(iz-row)<=1),cols=[-7,-1,5].some(col=>Math.abs(ix-col)<=1);present=(rows||cols)&&x<=10&&z<=9;h=(ix+10)*.2;}
  if(variant===4){const hub=ix>=-10&&ix<=-3&&z<=8,spine=ix>=-3&&ix<=5&&z<=1,forks=[-7,0,7].some(row=>iz===row&&ix>=-3&&ix<=7),pads=[-7,0,7].some(row=>ix>=7&&ix<=10&&Math.abs(iz-row)<=2);present=hub||spine||forks||pads;h=Math.min(3.6,Math.max(0,(ix+10)*.18)+z*.035);}
  if(variant===5){const band=Math.min(3,Math.floor((iz+10)/5)),center=band%2===0?-6:6,turn=[-5,0,5].includes(iz);present=Math.abs(ix-center)<=1||(turn&&x<=6);h=(iz+10)*.3;}
  if(variant===6){present=x+z<=18;h=Math.max(0,4.55-Math.abs(ix+iz)*.65);}
  if(variant===7){const north=iz<=-5,south=iz>=5,middle=Math.abs(iz)<=1,upperStairs=ix===-8&&iz>=-4&&iz<=-2,lowerStairs=ix===8&&iz>=2&&iz<=4;present=(x<=9&&(north||middle||south))||upperStairs||lowerStairs;h=north?0:middle?2:south?4:upperStairs?(iz+5)*.65:lowerStairs?2+(iz-1)*.65:0;}
  if(present)cells.push({ix,iz,x:ix*CELL,z:iz*CELL,h});
 }
 const wall=(x,z,w,d,h)=>walls.push({x,z,w,d,h});
 if(variant===0){for(const z of [-20,20]){wall(-24,z,5,3,5);wall(24,z,5,3,5);}}
 if(variant===1){for(const [x,z] of [[-24,0],[24,0],[0,-24],[0,24]])wall(x,z,4,4,5);}
 if(variant===3){for(const x of [-4,20])for(const z of [-28,28])wall(x,z,3,5,5);wall(-28,28,3,5,5);}
 // Keep the entry sightline to the diagonal ridge clear; the opposite corner
 // pylons still frame the arena without hiding its defining landform.
 if(variant===6){for(const [x,z] of [[24,-24],[-24,24],[24,24]])wall(x,z,4,4,5);}
 const byKey=new Map(cells.map(c=>[`${c.ix},${c.iz}`,c]));
 const cellAt=(x,z)=>byKey.get(`${Math.round(x/CELL)},${Math.round(z/CELL)}`);
 for(const w of walls)w.base=cellAt(w.x,w.z)?.h||0;
 const blocked=(x,z,r=.7)=>walls.some(w=>Math.abs(x-w.x)<w.w/2+r&&Math.abs(z-w.z)<w.d/2+r);
 const walkable=c=>!!c&&!blocked(c.x,c.z),nodes=cells.filter(walkable);
 function nearest(x,z,r=.7){let best=null,d=Infinity;for(const c of nodes){if(blocked(c.x,c.z,r))continue;const dd=(c.x-x)**2+(c.z-z)**2;if(dd<d){d=dd;best=c;}}return best;}
 function path(x,z,tx,tz){
  const start=nearest(x,z),goal=nearest(tx,tz);if(!start||!goal)return[];
  const queue=[start],prev=new Map([[start,null]]);let found=start;
  for(let i=0;i<queue.length;i++){const c=queue[i];if((c.x-tx)**2+(c.z-tz)**2<(found.x-tx)**2+(found.z-tz)**2)found=c;if(c===goal){found=c;break;}for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const n=byKey.get(`${c.ix+dx},${c.iz+dz}`);if(walkable(n)&&!prev.has(n)&&Math.abs(n.h-c.h)<=.66){prev.set(n,c);queue.push(n);}}}
  const route=[];for(let c=found;c&&c!==start;c=prev.get(c))route.push({x:c.x,z:c.z});return route.reverse();
 }
 const padHints=[[0,-28],[0,28],[-28,0],[28,0],[0,0]],pads=padHints.map(([x,z])=>{const c=nearest(x,z);return{x:c?.x||0,z:c?.z||0,y:(c?.h||0)+.08};});
 const spawn=nearest(...spec.entry),maxX=Math.max(...cells.map(c=>Math.abs(c.x))),maxZ=Math.max(...cells.map(c=>Math.abs(c.z)));
 const reachableNodes=spawn?[spawn]:[],seen=new Set(reachableNodes);for(let i=0;i<reachableNodes.length;i++){const c=reachableNodes[i];for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const n=byKey.get(`${c.ix+dx},${c.iz+dz}`);if(walkable(n)&&!seen.has(n)&&Math.abs(n.h-c.h)<=.66){seen.add(n);reachableNodes.push(n);}}}
 const towardCenter=path(spawn.x,spawn.z,0,0)[0];
 return {wave,name:spec.name,rule:spec.rule,cells,walls,nodes,reachableNodes,pads,launch:spec.launch,entry:{x:spawn?.x||0,z:spawn?.z||0,y:spawn?.h||0,yaw:Number.isFinite(spec.yaw)?spec.yaw:towardCenter?Math.atan2(spawn.x-towardCenter.x,spawn.z-towardCenter.z):Math.atan2(spawn.x,spawn.z)},cellAt,blocked,nearest,path,bounds:{x:maxX+1.6,z:maxZ+1.6},spawnDistance:spec.spawn,viewRadius:spec.view,backdrop:spec.backdrop,gridCells:441};
}

const OMEGA_SHAPES=['分断環路','十字廣場','蛇行脊線','四象限橋','蜂巢交差','折返し迷路','段丘裂谷','三重回廊'];
const OMEGA_FORMS=[
 {id:'BREACH',name:'密閉ブリーチ',x:3.1,z:3.1,rule:'戦場が狭い。散弾とノックバックで敵の塊を割れ。'},
 {id:'SNIPER',name:'狙撃回廊',x:5.9,z:3.1,rule:'横に広い射線が続く。遠距離から敵を減らし、橋を渡って陣地を変えろ。'},
 {id:'CROSSING',name:'長距離横断',x:3.2,z:6.1,rule:'前後に長い。射程を活かし、側路で敵の接近をずらせ。'},
 {id:'COLOSSUS',name:'巨人の床',x:5.7,z:5.7,rule:'広大な足場。走り続けて外周を取り、敵の包囲を解体しろ。'},
 {id:'VERTIGO',name:'垂直断層',x:4.2,z:4.2,rule:'高低差が激しい。坂を登り降りして射線と追跡経路を切り替えろ。'}
];
const OMEGA_GIMMICK_RULES={2:'加速盤の向きへ飛び込み、敵の射線を置き去りにしろ。',3:'ジャンプ中に長押しで浮遊。高所から狙い、落下で包囲を抜けろ。',4:'昇降リフトで射線を立体化。高台に居続けると狙われる。',5:'遠方のリレーを撃て。露出した敵を一気に仕留めろ。',6:'冠状アンカーを撃て。WARDENのコア露出が延びる。'};
const OMEGA_PALETTES=[
 [0x202b3a,0x51627a,0x07101e,0x82e8ff,0xb1f7ff],[0x33283d,0x86537d,0x130e24,0xff9acb,0xffc5df],
 [0x293a35,0x62806c,0x0a171a,0x9bffbd,0xd1ffd9],[0x39332a,0x907653,0x171219,0xffce70,0xffe4a6],
 [0x2c3044,0x6975a4,0x0c1027,0xb5adff,0xe2ddff],[0x263b47,0x4d8290,0x081921,0x72e8d4,0xc1fff3],
 [0x432d30,0x9c5555,0x190d1d,0xff936f,0xffd08a],[0x303943,0x73808e,0x0c121b,0xe3f1ff,0xffffff]
];

// Ω arenas are generated from connected route grammars and stay inside the
// existing 21x21 tile and 16-wall instancing budgets on desktop and mobile.
export function createOmegaLayout(seed=1,sector=1){
 let state=(Number(seed)>>>0)||1;
 const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
 const pick=n=>Math.floor(random()*n),outer=7+pick(4),shape=pick(8),form=OMEGA_FORMS[pick(OMEGA_FORMS.length)],rotation=pick(4),mirrorX=pick(2)?-1:1,mirrorZ=pick(2)?-1:1,elevation=pick(6),worldWave=9+pick(8),gimmick=sector>=6?6:2+pick(4),stepX=form.x,stepZ=form.z,minStep=Math.min(stepX,stepZ);
 const raw=new Set(),cells=[],walls=[];
 const put=(x,z)=>{if(Math.abs(x)<=outer&&Math.abs(z)<=outer)raw.add(x+','+z);};
 const rect=(x0,x1,z0,z1)=>{for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++)put(x,z);};
 const line=(x0,z0,x1,z1)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(z1-z0));for(let i=0;i<=n;i++){const t=n?i/n:0;put(Math.round(x0+(x1-x0)*t),Math.round(z0+(z1-z0)*t));}};
 if(shape===0){for(let z=-outer;z<=outer;z++)for(let x=-outer;x<=outer;x++)if(Math.max(Math.abs(x),Math.abs(z))>=outer-1)put(x,z);rect(-1,1,-outer+1,outer-1);rect(-outer+1,outer-1,-1,1);rect(-2,2,-2,2);const gap=2+pick(4);for(let i=-1;i<=1;i++){raw.delete(outer+','+(gap+i));raw.delete((-outer)+','+(-gap+i));}}
 if(shape===1){rect(-1,1,-outer,outer);rect(-outer,outer,-1,1);for(const x of [-5,5])for(const z of [-5,5])rect(x-2,x+2,z-2,z+2);}
 if(shape===2){const step=3+pick(3);for(let z=-outer;z<=outer;z++){const band=Math.floor((z+outer)/step),x=band%2===0?-outer+1:outer-1;rect(x-1,x+1,z,z);if(z<outer&&Math.floor((z+1+outer)/step)!==band){const nextX=(band+1)%2===0?-outer+1:outer-1;line(x,z,nextX,z);}}for(let i=0,n=2+pick(3);i<n;i++){const z=-outer+2+pick(outer*2-3),x=Math.floor((z+outer)/step)%2===0?-outer+1:outer-1,side=random()<.5?-1:1;line(x,z,Math.max(-outer,Math.min(outer,x+side*(2+pick(4)))),z);}}
 if(shape===3){rect(-2,2,-2,2);for(const sx of [-1,1])for(const sz of [-1,1]){const x=sx*(4+pick(2)),z=sz*(4+pick(2));rect(x-2,x+2,z-2,z+2);line(0,0,x,0);line(x,0,x,z);}}
 if(shape===4){const stride=4+pick(2);for(let x=-outer;x<=outer;x+=stride)rect(x,x,-outer,outer);for(let z=-outer;z<=outer;z+=stride)rect(-outer,outer,z,z);rect(-1,1,-outer,outer);rect(-outer,outer,-1,1);}
 if(shape===5){let row=-outer,dir=1;while(row<outer){rect(-outer+1,outer-1,row-1,row+1);const next=Math.min(outer,row+3+pick(2)),endX=dir>0?outer-1:-outer+1;line(endX,row,endX,next);rect(endX-2,endX+2,next-1,next+1);row=next;dir*=-1;}rect(-2,2,-2,2);}
 if(shape===6){rect(-outer,outer,-outer,outer);for(let i=0,n=2+pick(3);i<n;i++){const x=-outer+2+pick(outer*2-3);if(Math.abs(x)>2)for(let z=-outer+2;z<outer-1;z++)if(Math.abs(z)>2&&random()<.55)raw.delete(x+','+z);}rect(-1,1,-outer,outer);rect(-outer,outer,-1,1);for(const x of [-outer+3,outer-3])for(const z of [-outer+3,outer-3])rect(x-1,x+1,z-1,z+1);}
 if(shape===7){const radii=[3,5+pick(2),outer-1].sort((a,b)=>a-b);for(const r of radii)for(let z=-outer;z<=outer;z++)for(let x=-outer;x<=outer;x++)if(Math.max(Math.abs(x),Math.abs(z))===r)put(x,z);rect(-1,1,-outer,outer);rect(-outer,outer,-1,1);rect(-2,2,-2,2);}
 if(!raw.size)rect(-2,2,-2,2);
 for(let i=0,n=1+pick(4);i<n;i++){const c=[...raw][pick(raw.size)].split(',').map(Number),side=pick(4),dx=[1,-1,0,0][side],dz=[0,0,1,-1][side],len=2+pick(4);for(let j=1;j<=len;j++)put(c[0]+dx*j,c[1]+dz*j);}
 const tr=(x,z)=>{x*=mirrorX;z*=mirrorZ;return rotation===0?[x,z]:rotation===1?[-z,x]:rotation===2?[-x,-z]:[z,-x];};
 for(const key of raw){const [x,z]=key.split(',').map(Number),[ix,iz]=tr(x,z);let h=0;if(elevation===0)h=(ix+outer)*.42;else if(elevation===1)h=Math.max(0,(outer-Math.hypot(ix,iz))*.48);else if(elevation===2)h=(Math.floor((ix+outer)/4)+Math.floor((iz+outer)/4))*.42;else if(elevation===3)h=1.1+Math.sin(ix*.38)*.27+Math.cos(iz*.31)*.24;else if(elevation===4)h=Math.max(0,(outer-Math.abs(ix-iz)*.5)*.45);else h=Math.max(0,(outer-Math.hypot(ix,iz))*.56);cells.push({ix,iz,x:ix*stepX,z:iz*stepZ,h:Math.round(h*100)/100});}
 const byKey=new Map(cells.map(c=>[c.ix+','+c.iz,c])),cellAt=(x,z)=>byKey.get(Math.round(x/stepX)+','+Math.round(z/stepZ));
 const blocked=(x,z,r=.7)=>walls.some(w=>!w.destroyed&&Math.abs(x-w.x)<w.w/2+r&&Math.abs(z-w.z)<w.d/2+r),walkable=c=>!!c&&!blocked(c.x,c.z,.7);
 function component(start){if(!start)return[];const seen=new Set([start]),out=[start];for(let i=0;i<out.length;i++){const c=out[i];for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const n=byKey.get((c.ix+dx)+','+(c.iz+dz));if(walkable(n)&&Math.abs(n.h-c.h)<=.66&&!seen.has(n)){seen.add(n);out.push(n);}}}return out;}
 const seedCell=()=>byKey.get('0,0')||cells.reduce((a,b)=>Math.hypot(b.ix,b.iz)<Math.hypot(a.ix,a.iz)?b:a,cells[0]);
 let nodes=cells;
 for(let attempt=0;attempt<48;attempt++){const c=cells[pick(cells.length)],degree=[[1,0],[-1,0],[0,1],[0,-1]].filter(([dx,dz])=>byKey.has((c.ix+dx)+','+(c.iz+dz))).length;if(degree<3||Math.hypot(c.ix,c.iz)<3||Math.hypot(c.ix,c.iz)>outer*.92)continue;if(walls.some(w=>Math.hypot(w.x-c.x,w.z-c.z)<minStep*2.2))continue;walls.push({x:c.x,z:c.z,w:stepX*(.42+random()*.13),d:stepZ*(.42+random()*.13),h:3+random()*3});for(const w of walls)w.base=cellAt(w.x,w.z)?.h||0;nodes=cells.filter(walkable);if(component(seedCell()).length!==nodes.length)walls.pop();if(walls.length>=8)break;}
 for(const w of walls)w.base=cellAt(w.x,w.z)?.h||0;nodes=cells.filter(walkable);nodes=component(seedCell());
 function nearest(x,z,r=.7){let best=null,d=Infinity;for(const c of nodes){if(blocked(c.x,c.z,r))continue;const dd=(c.x-x)**2+(c.z-z)**2;if(dd<d){d=dd;best=c;}}return best;}
 function path(x,z,tx,tz){const start=nearest(x,z),goal=nearest(tx,tz);if(!start||!goal)return[];const queue=[start],prev=new Map([[start,null]]);let found=start;for(let i=0;i<queue.length;i++){const c=queue[i];if((c.x-tx)**2+(c.z-tz)**2<(found.x-tx)**2+(found.z-tz)**2)found=c;if(c===goal){found=c;break;}for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const n=byKey.get((c.ix+dx)+','+(c.iz+dz));if(walkable(n)&&Math.abs(n.h-c.h)<=.66&&!prev.has(n)){prev.set(n,c);queue.push(n);}}}const route=[];for(let c=found;c&&c!==start;c=prev.get(c))route.push({x:c.x,z:c.z});return route.reverse();}
 const spawnPool=nodes.filter(c=>Math.hypot(c.ix,c.iz)>outer*.58),spawn=(spawnPool.length?spawnPool:nodes)[pick((spawnPool.length?spawnPool:nodes).length)],toward=path(spawn.x,spawn.z,0,0)[0],padHints=[[0,-outer*stepZ*.82],[0,outer*stepZ*.82],[-outer*stepX*.82,0],[outer*stepX*.82,0],[0,0]],pads=padHints.map(([x,z])=>{const c=nearest(x,z);return{x:c?.x||0,z:c?.z||0,y:(c?.h||0)+.08};});
 const reachableNodes=component(spawn),maxX=Math.max(...cells.map(c=>Math.abs(c.x))),maxZ=Math.max(...cells.map(c=>Math.abs(c.z))),radius=Math.hypot(maxX,maxZ),theme=OMEGA_PALETTES[pick(OMEGA_PALETTES.length)],backdropScale=Math.max(.85,radius/58),backdrop={radius:(84+pick(24))*backdropScale,jitter:(4+pick(14))*backdropScale,base:22+pick(34),span:12+pick(36),width:.65+random()*1.5,tilt:random()*.65,gate:(76+pick(28))*backdropScale,gateHeight:16+pick(42),gateWidth:.65+random()*1.8};
 const skyline=Array.from({length:24},(_,i)=>{const a=i*Math.PI/12+(pick(9)-4)*.055,r=(72+pick(45))*backdropScale,height=15+pick(58),lean=(random()-.5)*.8;return{x:Math.sin(a)*r,y:height*.5,z:Math.cos(a)*r,w:4+random()*10,h:height,d:3+random()*10,rotation:a+lean,tilt:(random()-.5)*.7};});
 const angle=pick(8)*Math.PI/4,name='RIFT / '+form.name+' · '+OMEGA_SHAPES[shape]+'-'+String((Number(seed)>>>0)%97).padStart(2,'0'),rule=form.rule+' '+omegaEncounterBrief(form.id)+' '+OMEGA_GIMMICK_RULES[gimmick],viewRadius=Math.max(70,radius*1.18),spawnDistance=Math.max(10,Math.min(28,Math.min(maxX,maxZ)*.38));
 function refreshNavigation(){const available=component(seedCell());nodes.splice(0,nodes.length,...available);const reachable=component(spawn);reachableNodes.splice(0,reachableNodes.length,...reachable);return nodes.length;}
 return {refreshNavigation,wave:worldWave,omega:true,gimmick,topology:shape,arenaForm:form.id,cellSizeX:stepX,cellSizeZ:stepZ,name,rule,cells,walls,nodes,reachableNodes,pads,launch:19+random()*7,entry:{x:spawn?.x||0,z:spawn?.z||0,y:spawn?.h||0,yaw:toward?Math.atan2(spawn.x-toward.x,spawn.z-toward.z):angle},cellAt,blocked,nearest,path,bounds:{x:maxX+stepX*.45,z:maxZ+stepZ*.45},spawnDistance,viewRadius,backdrop,gridCells:441,seed:Number(seed)>>>0,colors:['Ω / '+name,...theme],skyline};
}

export function createLayout(wave){
 if(RING_SHIFT_LAYOUT_IDS.includes(wave))return createRingShiftLayout(wave);
 const spec=stages[Math.max(1,Math.min(stages.length,wave))-1];
 const cells=[],walls=[];let entry=[...spec.entry],launch=spec.launch;
 for(let iz=-spec.rz;iz<=spec.rz;iz++)for(let ix=-spec.rx;ix<=spec.rx;ix++){
  const x=Math.abs(ix),z=Math.abs(iz);let present=true,h=0;
  if(wave===2){present=x<=9&&z<=7;}
  if(wave===3){
   const center=(x<=1&&z<=1),axis=(x<=8&&iz===0)||(z<=8&&ix===0);
   const gardenArms=(x===5&&z<=5)||(z===5&&x<=5);
   present=center||axis||gardenArms;
   h=1.2;
  }
  if(wave===4){present=x<=8&&z<=8;h=(8-x)*.45;}
  if(wave===5){
   const crossing=Math.abs(ix-iz)<=1||Math.abs(ix+iz)<=1;
   const cornerDeck=x>=6&&z>=6;
   present=(crossing&&x<=9&&z<=9)||cornerDeck;
   h=(ix+10)*.27;
  }
  if(wave===7){present=Math.max(x,z)>=8||x<=1||z<=1||(x<=2&&z<=2);h=10+iz*.6;}
  if(wave===8){const spine=Math.round(6*Math.sin(iz*.26));const branch=[-6,0,6].some(row=>Math.abs(iz-row)<=1&&ix>=Math.min(spine,row===0?-9:spine)&&ix<=Math.max(spine,row===0?spine:9));present=Math.abs(ix-spine)<=1||branch||(iz<=-8&&ix>=-5&&ix<=-1);h=10+(iz+10)*.6;}
  if(wave===6){const r=Math.hypot(ix,iz);present=(r>=3.5&&r<=9)||((x<=1||z<=1)&&r<=8)||(r<=1.8);h=.6*Math.max(0,5-Math.floor(r));}
  if(present)cells.push({ix,iz,x:ix*CELL,z:iz*CELL,h});
 }
 // Walls are full-height combat cover; the lanes around them stay connected.
 const wall=(x,z,w,d,h)=>walls.push({x,z,w,d,h});
 if(wave===2){wall(-18,0,4,34,5.5);wall(18,0,4,34,5.5);wall(0,-16,12,4,3);wall(0,16,12,4,3);}
 if(wave===3){for(const x of [-20,20])for(const z of [-20,20])wall(x,z,3,3,3);entry=[0,20];}
 if(wave===4){wall(0,-8,16,3,4);wall(0,8,16,3,4);wall(-28,0,3,16,4);wall(28,0,3,16,4);}
 if(wave===5){wall(-32,-32,3,9,4);wall(32,32,3,9,4);wall(-32,32,9,3,4);wall(32,-32,9,3,4);}
 if(wave===6){for(const x of [-24,24])for(const z of [-8,8])wall(x,z,3,5,5);entry=[0,24];}

 const byKey=new Map(cells.map(c=>[`${c.ix},${c.iz}`,c]));
 const cellAt=(x,z)=>byKey.get(`${Math.round(x/CELL)},${Math.round(z/CELL)}`);
 for(const w of walls)w.base=cellAt(w.x,w.z)?.h||0;
 const blocked=(x,z,r=.7)=>walls.some(w=>Math.abs(x-w.x)<w.w/2+r&&Math.abs(z-w.z)<w.d/2+r);
 const walkable=c=>!!c&&!blocked(c.x,c.z);
 const nodes=cells.filter(walkable);
 function nearest(x,z,r=.7){let best=null,d=Infinity;for(const c of nodes){if(blocked(c.x,c.z,r))continue;const dd=(c.x-x)**2+(c.z-z)**2;if(dd<d){d=dd;best=c;}}return best;}
 function path(x,z,tx,tz){
  const start=nearest(x,z),goal=nearest(tx,tz);if(!start||!goal)return[];
  const queue=[start],prev=new Map([[start,null]]);let found=start;
  for(let i=0;i<queue.length;i++){
   const c=queue[i];if((c.x-tx)**2+(c.z-tz)**2<(found.x-tx)**2+(found.z-tz)**2)found=c;
   if(c===goal){found=c;break;}
   for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const n=byKey.get(`${c.ix+dx},${c.iz+dz}`);if(walkable(n)&&!prev.has(n)&&Math.abs(n.h-c.h)<=.66){prev.set(n,c);queue.push(n);}}
  }
  const route=[];for(let c=found;c&&c!==start;c=prev.get(c))route.push({x:c.x,z:c.z});return route.reverse();
 }
 const padHints=wave===1?[[-21,-16],[21,16],[0,0],[-18,13],[18,-13]]:wave===2?[[-28,0],[28,0],[0,0],[-4,-24],[4,24]]:wave===3?[[-20,-20],[20,20],[-20,20],[20,-20],[0,0]]:wave===4?[[-24,-16],[24,16],[-4,0],[4,-20],[0,20]]:wave===5?[[-32,-32],[32,32],[-32,32],[32,-32],[0,0]]:[[0,-28],[0,28],[-28,0],[28,0],[0,0]];
 const pads=padHints.map(([x,z])=>{const c=nearest(x,z);return{x:c?.x||0,z:c?.z||0,y:(c?.h||0)+.08};});
 const spawn=nearest(...entry),maxX=Math.max(...cells.map(c=>Math.abs(c.x))),maxZ=Math.max(...cells.map(c=>Math.abs(c.z)));
 // Cached entry component: spawning never needs one BFS per candidate cell.
 const reachableNodes=spawn?[spawn]:[],seen=new Set(reachableNodes);for(let i=0;i<reachableNodes.length;i++){const c=reachableNodes[i];for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const n=byKey.get(`${c.ix+dx},${c.iz+dz}`);if(walkable(n)&&!seen.has(n)&&Math.abs(n.h-c.h)<=.66){seen.add(n);reachableNodes.push(n);}}}
 const towardCenter=path(spawn.x,spawn.z,0,0)[0];
 const entryYaw=wave===8?Math.PI:towardCenter?Math.atan2(spawn.x-towardCenter.x,spawn.z-towardCenter.z):Math.atan2(spawn.x,spawn.z);
 const bounds={x:wave===1?30.8:maxX+1.6,z:wave===1?30.8:maxZ+1.6};
 return {wave,name:spec.name,rule:spec.rule,cells,walls,nodes,reachableNodes,pads,launch,entry:{x:spawn?.x||0,z:spawn?.z||24,y:spawn?.h||0,yaw:entryYaw},cellAt,blocked,nearest,path,bounds,spawnDistance:spec.spawn,viewRadius:spec.view,backdrop:spec.backdrop,gridCells:(spec.rx*2+1)*(spec.rz*2+1)};
}

export {BOSS_ARENAS,createBossArenaLayout} from './boss-arenas.js';
