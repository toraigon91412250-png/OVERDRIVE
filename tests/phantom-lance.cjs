const assert=require('node:assert/strict');
const loadGame=require('./headless-runtime.cjs');

function start(mobile=false){
 const game=loadGame({mobile});
 game.start();
 game.step(.03);
 game.api.test.holdSpawns();
 return game;
}
function enemy(game,z=5,y=1){
 const target=game.api.test.spawn('chaser',0,z);
 target.mesh.position.y=y;
 target.hp=target.max=1000;
 return target;
}

// The normal desktop digit key and the mobile GUN control both reach slot five.
{
 const g=start();g.key('Digit5');assert.equal(g.api.snapshot().weapon,4);
}
{
 const g=start(true);for(let n=0;n<4;n++)g.element('swap').dispatch('pointerdown');
 assert.equal(g.api.snapshot().weapon,4);
}

// Fifth slot, one-round chamber, zero spread in scope, and no accidental casing.
{
 const g=start(),t=g.api.test;
 assert.deepEqual(Array.from(g.api.snapshot().weaponMags.slice(0,5)),[50,10,6,24,1]);
 t.weapon(4);g.step(.02);
 assert.equal(g.api.snapshot().weapon,4);
 assert.equal(g.api.snapshot().ammo[4],1);
 const target=enemy(g);
 t.sniperScope(true);g.step(.08);t.aim(0,1,5);t.set({cool:0});t.shoot();
 assert.equal(target.hp,880,'body hit deals exactly 120');
 assert.equal(g.api.snapshot().ammo[4],0);
 assert.equal(g.api.snapshot().casingCount,0,'energy sniper ejects no shell');
 assert.equal(g.api.snapshot().sniperAim,true);
}

// Core multiplier and single-target behavior.
{
 const g=start(),t=g.api.test;t.weapon(4);g.step(.02);
 const target=enemy(g,5,1);
 t.aim(0,1.4,5);t.set({cool:0});t.shoot();
 assert.equal(target.hp,736,'core hit deals exactly 264');
}
{
 const g=start(),t=g.api.test;t.weapon(4);g.step(.02);
 const front=enemy(g,9),back=enemy(g,5);
 t.aim(0,1,9);t.set({cool:0});t.shoot();
 assert.equal(front.hp,880);
 assert.equal(back.hp,1000,'sniper shot does not pierce');
}

// Empty-fire starts the bolt reload; it restores one chambered round after 2.4s.
{
 const g=start(),t=g.api.test;t.weapon(4);g.step(.02);
 t.set({ammo:[50,10,6,12,0],reload:0,cool:0});
 t.shoot();
 assert(Math.abs(g.api.snapshot().reloading-2.4)<1e-9);
 g.step(2.5);
 assert.equal(g.api.snapshot().ammo[4],1);
}

// PC holds right mouse to scope and wheel selects 6x; mobile taps cycle 3x, 6x, off.
{
 const g=start(),t=g.api.test;t.weapon(4);g.step(.02);
 g.element('game').dispatch('mousedown',{button:2});
 assert.equal(g.api.snapshot().sniperAim,true);
 g.dispatchWindow('wheel',{deltaY:-100});
 assert.equal(g.api.snapshot().sniperZoom,6);
 g.dispatchWindow('mouseup',{button:2});
 assert.equal(g.api.snapshot().sniperAim,false);
}
{
 const g=start(true),t=g.api.test;t.weapon(4);g.step(.02);
 const tap=()=>{g.element('lookzone').dispatch('pointerdown',{pointerId:7,clientX:700,clientY:180});g.element('lookzone').dispatch('pointerup',{pointerId:7,clientX:700,clientY:180})};
 tap();assert.equal(g.api.snapshot().sniperAim,true);assert.equal(g.api.snapshot().sniperZoom,3);
 tap();assert.equal(g.api.snapshot().sniperAim,true);assert.equal(g.api.snapshot().sniperZoom,6);
 tap();assert.equal(g.api.snapshot().sniperAim,false);
}

console.log('PHANTOM LANCE: weapon, damage, chamber reload, scope controls, and no-pierce checks passed');
