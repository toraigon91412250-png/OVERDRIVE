// Runs the full bundled ODM game with real Three.js math/geometry and a stub renderer.
// Catches startup/frame errors and exercises PC/touch movement and ODM wire release; does not verify WebGL pixels.
// querySelector returns null for missing elements, matching the browser and catching stale HUD references.
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
let html=fs.readFileSync(process.argv[2]||'src/odm-titan-raid-trial.html','utf8');
if(html.includes('RAID_CORE_PLACEHOLDER'))html=html.replace('<script>RAID_MODELS_PLACEHOLDER</script>','').replace('RAID_CORE_PLACEHOLDER',()=>fs.readFileSync('src/titan/core.js','utf8'));

const script=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).find(s=>s.includes('window.odmLab')).replace('Xl("city");\n})();','window.__testOuterCollider=(course)=>{vn=course;let s=Ku.find(i=>i.mesh.userData.cityOnly&&(Math.abs(i.x)>259||Math.abs(i.z)>259));if(!s)return null;let y=Ui+Math.max(.5,s.h/2);P.pos.set(s.x,y,s.z);P.vel.set(0,0,0);Ex(P.pos.clone());return{x:P.pos.x,z:P.pos.z,origin:[s.x,s.z]}};window.__testOuterAnchor=(course)=>{vn=course;let s=ki.find(i=>i.userData.cityOnly&&(Math.abs(i.position.x)>259||Math.abs(i.position.z)>259));if(!s)return null;P.pos.set(s.position.x,s.position.y,s.position.z+45);P.yaw=0;P.pitch=0;let hit=gd();return{target:hit?.object===s,any:!!hit}};Xl("city");})();');
function load(mobile,options={}){
const elements=new Map(),handlers=new Map();let frame,now=0,renderedScene=null;
function element(id){if(elements.has(id))return elements.get(id);const listeners=new Map(),classes=new Set();const e={id,value:'',checked:false,hidden:false,dataset:{},style:{setProperty(k,v){this[k]=v}},textContent:'',innerHTML:'',children:[],width:256,height:256,
 append(...c){this.children.push(...c)},appendChild(c){this.children.push(c)},prepend(c){this.children.unshift(c)},
 classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x),toggle:(x,on)=>{if(on??!classes.has(x))classes.add(x);else classes.delete(x)}},
 addEventListener(type,fn){let a=listeners.get(type)||[];a.push(fn);listeners.set(type,a)},
 dispatch(type,values={}){const e={type,preventDefault(){},stopPropagation(){},pointerId:1,button:0,clientX:50,clientY:50,...values};for(const fn of listeners.get(type)||[])fn(e)},
 setAttribute(k,v){this[k]=v},getBoundingClientRect:()=>({left:0,top:0,width:100,height:100}),setPointerCapture(){},requestPointerLock(){document.pointerLockElement=this;return Promise.resolve()},
 getContext:()=>new Proxy({measureText:()=>({width:10}),createLinearGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]??(()=>{})})};elements.set(id,e);return e}
for(const m of html.matchAll(/id="([^"]+)"/g))element('#'+m[1]);
element('#missileCount').value='4';element('#titanSelect').value='armored';element('#bossHud .bossHead span');
const document={querySelector:id=>elements.get(id)||null,querySelectorAll:()=>[],body:element('body'),createElement:t=>element('new-'+t+elements.size),addEventListener(t,fn){let a=handlers.get("document:"+t)||[];a.push(fn);handlers.set("document:"+t,a)},exitPointerLock(){},pointerLockElement:null};
class Renderer{constructor(){this.domElement=element('canvas');this.shadowMap={};}setPixelRatio(){}setSize(){}render(scene,camera){renderedScene=scene;scene.updateMatrixWorld();camera.updateMatrixWorld();}}
const sandbox={...options,TestRenderer:Renderer,console,document,innerWidth:mobile?844:1280,innerHeight:mobile?390:720,devicePixelRatio:1,matchMedia:()=>({matches:mobile}),localStorage:{getItem:()=>null,setItem(){}},performance:{now:()=>now},requestAnimationFrame:fn=>frame=fn,setTimeout:()=>1,clearTimeout(){},addEventListener:(t,fn)=>{let a=handlers.get(t)||[];a.push(fn);handlers.set(t,a)}};
sandbox.window=sandbox;sandbox.parent=sandbox;
vm.runInNewContext(script.replace(/new _a\(\{\s*antialias:\s*(?:!0|true),\s*powerPreference:\s*"high-performance"\s*\}\)/,'new TestRenderer()'),sandbox);
function step(seconds){for(let n=Math.ceil(seconds/.016);n>0;n--){now+=16;frame(now)}}
function dispatch(t,values={}){for(const f of handlers.get(t)||[])f({preventDefault(){},...values})}
return {api:sandbox.odmLab,element,step,dispatch,unlock:()=>document.pointerLockElement=null,scene:()=>renderedScene,outerCollision:sandbox.__testOuterCollider,outerAnchor:sandbox.__testOuterAnchor};}
if(require.main===module)for(const mobile of [false,true]){
 const g=load(mobile);g.element('#start').dispatch('click');g.step(.3);const initial=g.api.getState();assert(initial.running);assert(initial.simTime>0);assert(g.scene(),'The mission renders a live scene');
 if(mobile)g.element('#joyBase').dispatch('pointerdown',{clientY:15});else g.dispatch('keydown',{code:'KeyW'});
 g.step(.8);const moving=g.api.getState();assert(Math.hypot(...moving.vel)>1);assert(Math.abs(moving.pos[2]-initial.pos[2])>1);
 if(mobile)g.dispatch('pointerup',{pointerId:1});else g.dispatch('keyup',{code:'KeyW'});
 g.api.reset();g.step(.3);g.element('#jumpTouch').dispatch('pointerdown');g.step(.25);assert(g.api.getState().pos[1]>2.4);
 g.element('#jumpTouch').dispatch('pointerup');g.element('#gasTouch').dispatch('pointerdown');g.step(.25);assert(g.api.getState().gas<100);g.element('#gasTouch').dispatch('pointerup');
 g.api.reset();g.api.setPlayer([0,18,50]);g.api.setAim(0,0);g.step(.02);g.api.fireHook(0);g.step(.4);assert.equal(g.api.getState().hooks[0],'locked');assert(g.element('#hookL').textContent.includes('M'),'Anchor distance stays available');g.api.releaseHook(0);g.step(.05);assert.equal(g.api.getState().hooks[0],'idle');assert(Math.hypot(...g.api.getState().vel)>1);
 g.api.reset();g.step(.3);g.element('#joyBase').setPointerCapture=()=>{throw Error('capture unavailable')};g.element('#joyBase').dispatch('pointerdown',{clientY:15});g.step(.5);assert(Math.hypot(...g.api.getState().vel)>1);g.dispatch('pointerup',{pointerId:1});
 g.api.reset();g.step(.3);g.element('#joyBase').dispatch('touchstart',{changedTouches:[{identifier:7,clientX:50,clientY:15}]});g.step(.5);assert(Math.hypot(...g.api.getState().vel)>1);g.element('#joyBase').dispatch('touchend',{changedTouches:[{identifier:7}]});
 if(!mobile){
  g.api.reset();g.api.setPlayer([0,18,50]);g.api.setAim(0,0);g.step(.02);const beforeAutoWire=g.api.getState().pos[2];
  g.element('canvas').dispatch('mousedown',{button:2});let autoWire=g.api.getState();
  assert.equal(autoWire.hooks[0],'firing','Holding right click starts the left wire');assert.equal(autoWire.hooks[1],'firing','Holding right click starts the right wire');
  g.step(.55);autoWire=g.api.getState();assert.equal(autoWire.hooks[0],'locked');assert.equal(autoWire.hooks[1],'locked');assert(g.element('#hookR').textContent.includes('M'),'Anchor distance stays available without movement narration');
  assert(autoWire.pos[2]<beforeAutoWire-1,'Held right-click auto-wire carries the player toward its anchors');
  g.dispatch('mouseup',{button:2});autoWire=g.api.getState();
  assert.equal(autoWire.hooks[0],'idle','Releasing right click detaches the left wire');assert.equal(autoWire.hooks[1],'idle','Releasing right click detaches the right wire');
  assert(Math.hypot(...autoWire.vel)>1,'Right-click release preserves momentum');
 }
 g.api.reset();g.api.setPlayer([0,18,50]);g.api.setAim(0,0);g.step(.02);g.api.fireHook(0);g.api.fireHook(1);g.step(.45);let nearAnchor=g.api.getState();
 assert.equal(nearAnchor.hooks[0],'locked');assert.equal(nearAnchor.hooks[1],'locked');assert(nearAnchor.hookReleaseRadii.every(radius=>radius===1),'Titan anchors use the tighter one-meter release radius');const anchor=nearAnchor.hookAnchors[0];
 g.api.setPlayer([anchor[0],anchor[1],anchor[2]+.5]);g.step(.02);nearAnchor=g.api.getState();
 assert.equal(nearAnchor.hooks[0],'idle','Titan wires detach automatically within one meter');assert.equal(nearAnchor.hooks[1],'idle','Both close Titan wires detach automatically');assert(!/慣性|巻取|牽引/.test(g.element('#notice').textContent),'Automatic cutoff does not add movement narration');
 g.api.reset();g.api.setPlayer([0,18,50]);g.api.setAim(0,0);g.step(.02);const beforeWire=g.api.getState().pos[2];
 if(mobile){g.element('#leftTouch').dispatch('pointerdown');g.element('#leftTouch').dispatch('pointerup')}else{g.dispatch('keydown',{code:'KeyQ'});g.dispatch('keyup',{code:'KeyQ'})}
 g.step(.5);assert.equal(g.api.getState().hooks[0],'locked');assert(g.api.getState().pos[2]<beforeWire-1,'Wire automatically carries player toward its anchor');assert(Math.abs(g.api.getState().pos[0])<2,'Neutral input guides a straight approach');
 g.api.reset();g.api.setPlayer([0,18,50]);g.api.setAim(0,0);g.step(.02);g.api.toggleHook(0);g.step(.45);g.dispatch('keydown',{code:'KeyD'});g.step(.5);g.dispatch('keyup',{code:'KeyD'});assert(Math.abs(g.api.getState().pos[0])>1,'Steering input bends the wire trajectory');
 g.api.releaseHook(0);g.api.setPlayer([0,18,50]);g.api.setAim(0,0);g.step(.02);
 if(mobile){g.element('#leftTouch').dispatch('pointerdown');g.element('#leftTouch').dispatch('pointerup')}else{g.dispatch('keydown',{code:'KeyQ'});g.dispatch('keyup',{code:'KeyQ'})}
 assert.notEqual(g.api.getState().hooks[0],'idle','Individual wire controls can still fire a tether');g.step(.2);
 if(mobile){g.element('#leftTouch').dispatch('pointerdown');g.element('#leftTouch').dispatch('pointerup')}else{g.dispatch('keydown',{code:'KeyQ'});g.dispatch('keyup',{code:'KeyQ'})}
 assert.equal(g.api.getState().hooks[0],'idle','Individual wire controls can still detach a tether');const carriedSpeed=Math.hypot(...g.api.getState().vel);assert(carriedSpeed>1,'Detaching preserves momentum');
 g.element('#gasTouch').setPointerCapture=()=>{throw Error('capture unavailable')};g.element('#gasTouch').dispatch('touchstart');g.step(.25);assert(g.api.getState().gas<100);g.element('#gasTouch').dispatch('touchend');g.step(16);assert(g.api.getState().simTime>17);
 g.api.setRoute('forest');g.api.setPlayer([220,80,-180]);g.step(.03);const forestTowerSpot=g.api.getState().pos;assert(Math.abs(forestTowerSpot[0]-220)<1&&Math.abs(forestTowerSpot[2]+180)<1,'City-only tower collision is disabled in Forest');
 const outerInCity=g.outerCollision('city');assert(outerInCity&&Math.hypot(outerInCity.x-outerInCity.origin[0],outerInCity.z-outerInCity.origin[1])>1,'Outer City building remains collidable in City');const outerInForest=g.outerCollision('forest');assert(outerInForest&&Math.hypot(outerInForest.x-outerInForest.origin[0],outerInForest.z-outerInForest.origin[1])<.01,'Outer City building has no Forest collision');const outerAnchorCity=g.outerAnchor('city');assert(outerAnchorCity&&outerAnchorCity.target,'Outer City building can be targeted in City');const outerAnchorForest=g.outerAnchor('forest');assert(outerAnchorForest&&!outerAnchorForest.any,'Outer City building cannot be targeted from Forest');
 g.api.setRoute('city');g.api.setPlayer([0,250,0]);g.step(.02);assert(g.api.getState().pos[1]>240&&g.api.getState().pos[1]<=244.01,'City can reach above the tower clock room');g.api.setRoute('forest');g.api.setPlayer([0,250,0]);g.step(.02);assert(g.api.getState().pos[1]>192&&g.api.getState().pos[1]<=196.01,'Forest keeps its original altitude limit');
 if(!mobile){g.api.setRoute('city');g.api.setPlayer([40,18,538]);g.api.setAim(Math.PI,0);g.dispatch('keydown',{code:'KeyW'});g.step(1.2);g.dispatch('keyup',{code:'KeyW'});const expandedEdge=g.api.getState().pos[2];assert(expandedEdge>539&&expandedEdge<=543.58,'The intact south wall flank stops the player at its inner face')}
 console.log('PASS ODM',mobile?'mobile':'desktop','start, movement, jump, gas, tether controls, near-anchor auto-release, capture failure, touch fallback, sustained frames');
}

module.exports={load};
