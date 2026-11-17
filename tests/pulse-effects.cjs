const assert=require('node:assert/strict'),T=require('three'),Module=require('module'),path=require('path'),{buildSync}=require('esbuild');
const file=path.resolve(__dirname,'../src/pulse-effects.js'),m=new Module(file,module);m.paths=module.paths;m._compile(buildSync({entryPoints:[file],bundle:true,external:['three'],format:'cjs',write:false}).outputFiles[0].text,file);
const make=()=>{const scene=new T.Scene();return {scene,fx:m.exports.createPulseEffects(scene)}};
// Sky leader, delayed return stroke, debounce, and paused visual clocks.
{
 const {fx}=make(),at=new T.Vector3(2,5,-3);assert(fx.thunder(at,{apex:true,ground:3}));assert(!fx.thunder(at));assert.equal(fx.stats().strikes,0);
 fx.update(.04,true);assert.equal(fx.stats().strikes,0);const before=JSON.stringify(fx.diagnostics());fx.update(1,false);assert.equal(JSON.stringify(fx.diagnostics()),before);assert.equal(fx.stats().strikes,0);
 fx.update(.03,true);assert.equal(fx.stats().strikes,1);assert.equal(fx.stats().pending,0);assert(fx.stats().active>15);
 fx.reset();assert.equal(fx.stats().active,0);assert.equal(fx.stats().pending,0);fx.update(1,true);assert.equal(fx.stats().strikes,0);
}
// Full and reduced shots retain their identity while low/reduced use fewer parts.
{
 const counts=[];for(const options of [{},{low:true},{reduced:true}]){const {fx}=make();fx.discharge(new T.Vector3(),new T.Vector3(0,1,-20),{path:'lance',apex:true,charged:true,...options});counts.push(fx.stats().active);assert.equal(fx.stats().cannonShots,1);}
 assert(counts[0]>counts[1]&&counts[0]>counts[2]);
}
// Repeated multi-kills and cannon fire cannot grow the fixed pools or leave NaNs.
{
 const {fx,scene}=make();for(let i=0;i<500;i++){const a=new T.Vector3(i%3,2,-3),b=new T.Vector3(2,2,-15);fx.thunder(a,{apex:true,low:i%2===0});for(let j=0;j<5;j++)fx.arc(a,b,{apex:true,kill:true,delay:.08+j*.018});fx.discharge(a,b,{charged:true,apex:true,path:'lance'});fx.update(.016,true);assert(fx.stats().pending<=33);assert(fx.stats().active<=fx.stats().capacity);}
 assert.equal(fx.stats().drawObjects,4);assert.equal(scene.children[0].children.length,4);for(const effect of fx.diagnostics())for(const value of effect.matrix)assert(Number.isFinite(value));fx.update(2,true);assert.equal(fx.stats().pending,0);assert.equal(fx.stats().active,0);
}
console.log('PULSE EFFECTS: sky strike timing/debounce, pause/reset, cannon visuals, low/reduced variants, fixed instanced pools and finite transforms passed');
