// Fake Web Audio lifecycle validation; does not claim an audible browser/device test.
const assert=require('node:assert/strict'),path=require('node:path'),Module=require('node:module');
const T=require('three'),{buildSync}=require('esbuild');
const file=path.resolve(__dirname,'../src/explosion-director.js'),m=new Module(file,module);m.paths=module.paths;
m._compile(buildSync({entryPoints:[file],bundle:true,external:['three'],format:'cjs',write:false}).outputFiles[0].text,file);
const elements=new Map(),oldDocument=global.document;
global.document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{setProperty(name,value){this[name]=value;}},hidden:true,textContent:'',className:''});return elements.get(id);}};
const nodes=[],buffers=[];
const parameter=()=>({value:0,setValueAtTime(value,time){assert(Number.isFinite(value)&&Number.isFinite(time));this.value=value;},exponentialRampToValueAtTime(value,time){assert(value>0&&Number.isFinite(value)&&Number.isFinite(time));this.value=value;},setTargetAtTime(value,time,constant){assert(Number.isFinite(value)&&Number.isFinite(time)&&constant>0);this.value=value;}});
function node(kind){
 const n={kind,connections:[],disconnects:0,connect(other){this.connections.push(other);return other;},disconnect(){this.disconnects++;this.connections=[];}};
 if(kind==='oscillator'||kind==='bufferSource')Object.assign(n,{starts:0,stops:0,start(time=0){assert(Number.isFinite(time));this.starts++;},stop(time=0){assert(Number.isFinite(time));this.stops++;}});
 if(kind==='oscillator'||kind==='filter')n.frequency=parameter();
 if(kind==='gain')n.gain=parameter();nodes.push(n);return n;
}
const ctx={currentTime:0,sampleRate:8000,destination:{kind:'destination'},
 createOscillator:()=>node('oscillator'),createGain:()=>node('gain'),createBiquadFilter:()=>node('filter'),createBufferSource:()=>node('bufferSource'),
 createBuffer(channels,length,rate){assert.equal(channels,1);assert(length<=rate*2,'Noise buffer stays bounded');const data=new Float32Array(length);buffers.push(data);return {getChannelData:()=>data};}};
let enabled=true;
try{
 const director=m.exports.createExplosionDirector(new T.Scene(),{getAudio:()=>ctx,soundEnabled:()=>enabled});
 const disconnected=group=>{for(const n of group){assert(n.disconnects>0,`${n.kind} must be disconnected`);if(n.start)assert(n.stops>0,`${n.kind} source must be stopped`);}};
 for(let cast=0;cast<4;cast++){
  const before=nodes.length;director.update(.016,{charge:.8,origin:new T.Vector3(0,1,-1)});
  const chargeNodes=nodes.slice(before);assert.equal(chargeNodes.length,2,'Charge creates one source+gain');
  // Repeated charge updates reuse the same oscillator and gain.
  for(let frame=0;frame<20;frame++){ctx.currentTime+=.016;director.update(.016,{charge:1,origin:new T.Vector3(0,1,-1)});}
  assert.equal(nodes.length,before+2);
  director.start(new T.Vector3(0,1,-16),{eliminated:3});disconnected(chargeNodes);
  const blastNodes=nodes.slice(before+2);assert(blastNodes.length<=10,'Detonation graph remains bounded');
  assert(blastNodes.some(n=>n.kind==='filter')&&blastNodes.some(n=>n.kind==='bufferSource'));
  director.pause();disconnected(blastNodes);
  const pausedCount=nodes.length,age=director.age;
  for(let frame=0;frame<50;frame++)director.update(.016,{playing:false,charge:1,origin:new T.Vector3()});
  assert.equal(nodes.length,pausedCount,'Pause never starts late audio nodes');assert.equal(director.age,age);
  director.reset();disconnected(nodes.slice(before));assert.equal(nodes.length,pausedCount);
 }
 // Toggling sound off stops a live charging voice and starts no blast graph.
 director.update(.016,{charge:1,origin:new T.Vector3()});enabled=false;
 const mutedCount=nodes.length;director.start(new T.Vector3(),{eliminated:1});assert.equal(nodes.length,mutedCount);disconnected(nodes);
 director.reset();assert(buffers.length<=4);assert(buffers.every(b=>Array.from(b).every(Number.isFinite)));
 console.log('PASS: EXPLOSION bounded fake-audio charge/detonation graphs, downstream disconnect, pause/reset cancellation, no late audio, sound-off handling.');
}finally{if(oldDocument===undefined)delete global.document;else global.document=oldDocument;}
