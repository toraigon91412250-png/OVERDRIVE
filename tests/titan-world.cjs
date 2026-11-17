const assert=require('assert/strict');const {load}=require('./odm-runtime.cjs');
const g=load(false);g.api.beginMission();g.step(.016);
for(const axis of [0,2])for(const sign of [-1,1]){
 const pos=[0,20,0],vel=[0,0,0];pos[axis]=sign*539;vel[axis]=sign*95;if(axis===2&&sign===1)pos[0]=40;g.api.setPlayer(pos);g.api.setVelocity(vel);g.step(.18);const end=g.api.getState().pos[axis]*sign;assert(end>539&&end<543.59,'Each intact city wall flank stops the player at its inner face: '+end);
}
g.api.setPlayer([40,90,550]);g.api.setVelocity([0,-20,0]);g.step(.7);assert(g.api.getState().grounded);assert(Math.abs(g.api.getState().pos[1]-83.78)<.1,'The intact wall flanks keep a solid walkable top');
g.api.setPlayer([0,112,539]);g.api.setVelocity([0,0,95]);g.step(.24);assert(g.api.getState().pos[2]>556,'Above the wall, flight is free');
g.api.setPlayer([0,18,538]);g.api.setVelocity([0,0,65]);g.step(.5);assert(g.api.getState().pos[2]>556,'The 30m breach is passable below the wall');
g.api.setPlayer([559,20,580]);g.api.setVelocity([80,0,0]);g.step(.18);assert(g.api.getState().pos[0]<=560.01,'The south apron does not let the player bypass the city side boundary');g.api.setPlayer([0,20,619]);g.api.setVelocity([0,0,95]);g.step(.18);assert(g.api.getState().pos[2]<=620.01,'The exterior flight apron keeps a finite southern limit');
g.api.setPlayer([529,50,529]);g.api.setVelocity([65,0,65]);g.step(.18);let p=g.api.getState().pos;assert(Math.hypot(p[0]-540,p[2]-540)>10.35,'Corner tower has cylindrical collision');
const city=g.api.worldColliders();assert.equal(city.filter(x=>x.name==='raid-city-wall').length,83);assert(!city.some(x=>x.legacy),'Hidden old walls have no active collision');assert(!city.some(x=>x.name==='raid-city-wall'&&Math.abs(x.x)<1&&Math.abs(x.z-550)<1),'The south wall centre panel is physically removed');
g.api.setRoute('forest');g.api.setPlayer([0,20,259]);g.api.setVelocity([0,0,95]);g.step(.18);assert(g.api.getState().pos[2]<263.59,'Forest wall is solid');assert(g.api.worldColliders().some(x=>x.legacy));assert(!g.api.worldColliders().some(x=>x.name==='raid-city-wall'),'City walls are hidden outside city');
g.api.setRoute('city');const trees=g.api.worldColliders().filter(x=>x.name==='raid-tree-trunks');assert.equal(trees.length,125);const tree=trees[0];g.api.setPlayer([tree.x-tree.radius-2,8,tree.z]);g.api.setVelocity([80,0,0]);g.step(.1);p=g.api.getState().pos;assert(Math.hypot(p[0]-tree.x,p[2]-tree.z)>tree.radius*.75,'Tree trunks stop the player');
g.api.setPlayer([-33,20,23]);g.api.setVelocity([0,-10,0]);g.step(.6);assert(g.api.getState().grounded);assert(Math.abs(g.api.getState().pos[1]-16.58)<.1,'Visible bridge has a solid landing surface');
g.api.setPlayer([233,133,-180]);g.api.setVelocity([0,26,0]);g.step(.35);assert(g.api.getState().pos[1]<=138.76,'The clock room underside is a solid ceiling');
console.log('PASS city/forest walls, wall-top landing, free flight above walls, corner towers, route filtering, trunks and bridges');
