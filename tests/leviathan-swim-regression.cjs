// No external dependencies: checks the real movement function and the cutscene input gate.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../src/game.js'), 'utf8');
const from = source.indexOf('function blocked(');
const to = source.indexOf('\nfunction beam(', from);
assert(from >= 0 && to > from, 'Movement functions present');
const movement = source.slice(from, to);
function testMove({swimming, bossArena, floor, solids = []}) {
 const p = {x:0, y:-3, z:0, grounded:false, swimming};
 const world = {radar:() => ({bossArena}), heightAt:() => floor, bounds:() => ({x:50,z:50}), canStep:() => false};
 const context = {p, world, solids, difficulty:'normal', terrainStage:()=>6, clamp:(x,a,b)=>Math.max(a,Math.min(b,x))};
 vm.runInNewContext(movement + '\nmove(p,4,2);', context);
 return p;
}
let p = testMove({swimming:true,bossArena:'leviathan',floor:.5,solids:[{enabled:true,x:2,z:0,w:5,d:5,top:5}]});
assert.equal(p.x,4,'Underwater X movement is not blocked by the overhead dock or cover');
assert.equal(p.z,2,'Underwater Z movement is not blocked by the overhead dock or cover');
p = testMove({swimming:false,bossArena:'leviathan',floor:.5});
assert.equal(p.x,0,'Normal ground movement still observes terrain height');
p = testMove({swimming:true,bossArena:'warden',floor:.5});
assert.equal(p.x,0,'The swimming exception applies only to Leviathan');
const gate = source.match(/if\(scriptedDive\)\{input\.fire=input\.firePressed=false;\}/)?.[0];
assert(gate,'Cinematic suppression gate exists');
const input = {keys:{KeyW:true},x:.8,y:-.5,jump:true,dive:true,fire:true,firePressed:true};
vm.runInNewContext(gate,{scriptedDive:true,input});
assert.equal(input.fire,false,'Cinematic suppresses attack');
assert.equal(input.keys.KeyW,true,'Cinematic retains held keyboard movement');
assert.equal(input.x,.8,'Cinematic retains held touch-stick X');
assert.equal(input.y,-.5,'Cinematic retains held touch-stick Y');
assert.equal(input.jump,true,'Cinematic retains held rise button');
console.log('PASS Leviathan underwater movement + preserved held input through dive cinematic');
