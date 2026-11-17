// Runs the actual game with real Three.js geometry/math and a non-rendering DOM/renderer.
// This verifies gameplay integration, not WebGL rendering or physical-device performance.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {buildSync}=require('esbuild'),THREE=require('three');
global.self=global;global.createImageBitmap??=async()=>({width:16,height:16,close(){}});
const root=path.resolve(__dirname,'..');
let compiled;
module.exports=function loadGame({mobile=false,difficulty='normal',seed}={}){
 compiled??=buildSync({entryPoints:[path.join(root,'src/game.js')],bundle:true,external:['three'],format:'cjs',write:false}).outputFiles[0].text;
 const elements=new Map(),handlers=new Map();
 const context2d=new Proxy({measureText:()=>({width:10}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]??(()=>{}),set:(o,k,v)=>(o[k]=v,true)});
 function element(id){
  if(elements.has(id))return elements.get(id);
  const listeners=new Map(),classes=new Set();
  const e={id,value:'',checked:false,hidden:false,dataset:{},style:{setProperty(k,v){this[k]=v},removeProperty(k){delete this[k]}},textContent:'',innerHTML:'',width:256,height:256,
   children:[],append(...children){this.children.push(...children)},
   classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),toggle:(x,on)=>{if(on??!classes.has(x))classes.add(x);else classes.delete(x)},contains:x=>classes.has(x)},
   addEventListener:(type,fn)=>{let a=listeners.get(type)||[];a.push(fn);listeners.set(type,a)},
   dispatch:(type,values={})=>{const event={type,preventDefault(){},button:0,pointerId:1,clientX:0,clientY:0,...values};for(const f of listeners.get(type)||[])f(event);if(type==='click')e.onclick?.(event)},
   setAttribute(k,v){this[k]=v},getContext:()=>context2d,getBoundingClientRect:()=>({left:0,top:0,width:100,height:100}),
   blur(){},setPointerCapture(){},requestPointerLock(){},querySelector:s=>element(id+' '+s),querySelectorAll:()=>[],
  };
  let html='';Object.defineProperty(e,'innerHTML',{get:()=>html,set:v=>{html=v;if(v==='')e.children.length=0}});
  elements.set(id,e);return e;
 }
 for(const [id,value] of Object.entries({difficulty,quality:'low',loadout:'runner',sensitivity:'1','device-pc':'pc','device-mobile':'mobile'}))element(id).value=value;
 element('assist').checked=true;
 element('stick').firstElementChild=element('stick-thumb');
 const document={getElementById:element,createElement:tag=>element('created-'+tag+'-'+elements.size),
  querySelector:s=>element(s),querySelectorAll:s=>s.includes('name="device"')?[element('device-pc'),element('device-mobile')]:[],
  body:element('body'),activeElement:element('active'),exitPointerLock(){},addEventListener(){},pointerLockElement:null};
 class Renderer{constructor(){this.info={render:{calls:0,triangles:0}}}setClearColor(){}setPixelRatio(){}setSize(){}render(){}}
 let frame,now=0;
 const sandbox={require:id=>id==='three'?{...THREE,WebGLRenderer:Renderer}:require(id),module:{exports:{}},exports:{},console,
  atob,Blob,Response,DecompressionStream,URLSearchParams,document,location:{search:'?test=1'},innerWidth:mobile?844:1280,innerHeight:mobile?390:720,devicePixelRatio:1,
  matchMedia:()=>({matches:mobile}),localStorage:{getItem:()=>null,setItem(){}},
  Date:seed===undefined?Date:class extends Date{static now(){return seed}},
  performance:{now:()=>now},requestAnimationFrame:fn=>{frame=fn},setTimeout:()=>1,clearTimeout(){},
  addEventListener:(type,fn)=>{let a=handlers.get(type)||[];a.push(fn);handlers.set(type,a)},
 };
 sandbox.window=sandbox;
 vm.runInNewContext(compiled,sandbox,{filename:'headless-overdrive.cjs'});
 function step(seconds){for(let n=Math.ceil(seconds/.016);n>0;n--){now+=16;frame(now)}}
 function dispatchWindow(type,event={}){for(const fn of handlers.get(type)||[])fn({preventDefault(){},button:0,...event})}
 function key(code){dispatchWindow('keydown',{code,key:code,repeat:false})}
 return {api:sandbox.overdrive,element,step,key,dispatchWindow,start:()=>element('start').onclick(),document};
};
