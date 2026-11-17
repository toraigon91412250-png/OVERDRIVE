const {test,expect}=require('@playwright/test');
async function start(page){await page.goto('/OVERDRIVE.html?test=1');await page.locator('#sound').uncheck();await page.locator('#start').click();await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().state)).toBe('playing')}
test('desktop movement, jump, weapons, reload, pause and death',async({page})=>{const errors=[];page.on('pageerror',e=>errors.push(e.message));await start(page);let z=(await page.evaluate(()=>overdrive.snapshot())).position.z;await page.keyboard.down('KeyW');await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().position.z),{intervals:[20],timeout:10000}).toBeLessThan(z);await page.keyboard.up('KeyW');await page.keyboard.press('Space');await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().position.y),{intervals:[20],timeout:10000}).toBeGreaterThan(0);await page.keyboard.press('Digit2');expect((await page.evaluate(()=>overdrive.snapshot())).weapon).toBe(1);await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().cool)).toBeLessThanOrEqual(0);await page.evaluate(()=>overdrive.test.shoot());expect((await page.evaluate(()=>overdrive.snapshot())).ammo[1]).toBe(9);await page.keyboard.press('KeyR');await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().ammo[1]),{timeout:10000}).toBe(10);await page.evaluate(()=>{overdrive.test.set({x:0,z:0,y:0,vy:0,ammo:[28,0,4],cool:0});overdrive.test.update(.016);overdrive.test.shoot()});await expect(page.locator('#reloadstatus')).toHaveText('RELOADING');await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().reloadPose.z)).toBeLessThan(-.15);await page.screenshot({path:'artifacts/pad-reload.png'});await page.keyboard.press('Escape');await expect(page.locator('#paneltitle')).toHaveText('一時停止');await page.locator('#resume').click();await page.evaluate(()=>overdrive.test.hurt(999));await expect(page.locator('#paneltitle')).toHaveText('再起動せよ。');expect(errors).toEqual([])});
test('all six waves, upgrades, five-boss victory and persistence',async({page})=>{
 await start(page);
 for(let wave=1;wave<=5;wave++){
  await page.evaluate(()=>overdrive.test.killWave());
  await expect(page.locator('#choices button')).toHaveCount(4);
  for(let guard=0;guard<15;guard++){
   const snapshot=await page.evaluate(()=>overdrive.snapshot());
   if(snapshot.wave===wave+1)break;
   if(snapshot.state==='rebuilding'){
    await page.locator('#rebuild-skip').click();
    await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().state)).toBe('playing');
   }
   else if(snapshot.state==='upgrade')await page.locator('#choices button').first().click();
   else await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().state)).toBe('upgrade');
  }
  expect((await page.evaluate(()=>overdrive.snapshot())).wave).toBe(wave+1);
 }
 await expect(page.locator('#boss')).toBeVisible({timeout:10000});
 let rush=await page.evaluate(()=>overdrive.snapshot().bossRush);
 expect(rush).toMatchObject({active:true,phase:'fight',round:1,wins:0,misses:0});
 for(let round=1;round<=5;round++){
  await page.evaluate(()=>overdrive.test.rushResolve(true));
  await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().bossRush.wins)).toBe(round);
  if(round<5){
   await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().state)).toBe('rebuilding');
   await page.locator('#rebuild-skip').click();
   await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().bossRush.round)).toBe(round+1);
   await expect(page.locator('#boss')).toBeVisible();
  }
 }
 await expect(page.locator('#paneltitle')).toHaveText('限界を、超えた。');
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('overdrive-v1')).wins)).toBe(1);
 await page.locator('#restart').click();
 expect((await page.evaluate(()=>overdrive.snapshot()).then(s=>s.wave))).toBe(1);
});
test('actual ray hits, solid collision, overdrive and dash immunity',async({page})=>{await start(page);await page.evaluate(()=>{overdrive.test.set({x:0,y:0,z:12,cool:0});let e=overdrive.test.spawn('chaser',0,5);overdrive.test.aim(0,1,5);overdrive.test.shoot();window.hitHP=e.hp});expect(await page.evaluate(()=>window.hitHP)).toBeLessThan(65);await page.evaluate(()=>{overdrive.test.set({x:0,y:0,z:0,over:8});overdrive.test.update(.016)});expect((await page.evaluate(()=>overdrive.snapshot())).over).toBeGreaterThan(0);await page.keyboard.press('ShiftLeft');let hp=await page.evaluate(()=>overdrive.snapshot().hp);await page.evaluate(()=>overdrive.test.rawHurt(20));expect((await page.evaluate(()=>overdrive.snapshot())).hp).toBe(hp);await page.evaluate(()=>overdrive.test.set({x:0,y:0,z:-14.9,vy:0}));await page.keyboard.down('KeyW');await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().position.z),{intervals:[20],timeout:10000}).toBeGreaterThan(-15.3);await page.keyboard.up('KeyW')});
test('mobile landscape touch controls, portrait containment and render',async({browser})=>{const context=await browser.newContext({viewport:{width:844,height:390},isMobile:true,hasTouch:true,deviceScaleFactor:2});const page=await context.newPage();await start(page);await expect(page.locator('#fire')).toBeVisible();let x=(await page.evaluate(()=>overdrive.snapshot())).position.x;const cdp=await context.newCDPSession(page),stick=await page.locator('#stick').boundingBox(),stickTouch={x:stick.x+stick.width/2+28,y:stick.y+stick.height/2};await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[stickTouch]});await page.waitForTimeout(250);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});expect((await page.evaluate(()=>overdrive.snapshot())).position.x).toBeGreaterThan(x);const fire=await page.locator('#fire').boundingBox();expect(fire.width/fire.height).toBeGreaterThan(2);const reloadButton=await page.locator('#reload').boundingBox(),jumpButton=await page.locator('#jump').boundingBox();expect(reloadButton.x).toBeCloseTo(fire.x,0);expect(jumpButton.x+jumpButton.width).toBeCloseTo(fire.x+fire.width,0);expect(jumpButton.x-reloadButton.x-reloadButton.width).toBeCloseTo(4,0);expect(jumpButton.y).toBeCloseTo(reloadButton.y,0);expect(jumpButton.height).toBeCloseTo(reloadButton.height,0);expect(fire.y-reloadButton.y-reloadButton.height).toBeCloseTo(4,0);await expect(page.locator('#weaponname')).toHaveText('パルスライフル');expect(fire.y).toBeGreaterThan(390*.65);const actions=await Promise.all(['#dash','#slide'].map(id=>page.locator(id).boundingBox()));expect(Math.max(...actions.map(r=>r.x))-Math.min(...actions.map(r=>r.x))).toBeLessThan(1);expect(actions[0].y).toBeGreaterThan(actions[1].y+actions[1].height);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:fire.x+fire.width/2,y:fire.y+fire.height/2}]});await page.waitForTimeout(300);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});expect((await page.evaluate(()=>overdrive.snapshot())).ammo[0]).toBeLessThan(50);await page.screenshot({path:'test-results/mobile-landscape.png'});await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();const portraitStick=await page.locator('#stick').boundingBox(),portraitFooter=await page.locator('footer').boundingBox();expect(portraitStick.y+portraitStick.height).toBeLessThan(portraitFooter.y);await page.screenshot({path:'test-results/mobile-portrait.png'});await context.close()});
test('boss shockwave hits ground, jump avoids it, ARC LINK connects consecutive targets',async({page})=>{
 await start(page);
 const result=await page.evaluate(()=>{
  const t=overdrive.test;
  t.set({x:4,y:0,z:0,hp:100,inv:0});
  const boss=t.spawn('boss',0,0);boss.phase=2;boss.cd=-1;
  for(let i=0;i<35;i++)t.update(.01);
  const ground=overdrive.snapshot().hp;
  t.set({x:4,y:0,z:0,vy:0,hp:100,inv:0,grounded:true});t.jump();
  boss.phase=2;boss.cd=-1;
  for(let i=0;i<35;i++)t.update(.01);
  const airborne=overdrive.snapshot().hp;
  t.damage(boss,100000);
  t.set({x:0,y:0,z:12,cool:0,up:{chain:1}});t.update(.001);
  const a=t.spawn('chaser',0,5),b=t.spawn('chaser',2,5);
  for(const e of [a,b]){e.tutorialDummy=true;e.mesh.position.y=1.4;}
  t.aim(0,1.4,5);t.shoot();
  const firstHit=a.hp;
  t.update(.2);t.aim(2,1.4,5);t.shoot();
  return{ground,airborne,firstHit,firstAfterArc:a.hp,neighbor:b.hp};
 });
 expect(result.ground).toBeLessThan(100);
 expect(result.airborne).toBe(100);
 expect(result.firstHit).toBeLessThan(65);
 expect(result.firstHit-result.firstAfterArc).toBeCloseTo(15,5);
 expect(result.neighbor).toBeLessThan(65);
});
test('offline standalone file starts and has no remote requests',async({browser})=>{let page=await browser.newPage();let remote=[];page.on('request',r=>{if(/^https?:/.test(r.url()))remote.push(r.url())});await page.goto('file:///workspace/overdrive/dist/OVERDRIVE.html?test=1');await page.locator('#sound').uncheck();await page.click('#start');expect(await page.evaluate(()=>overdrive.snapshot().state)).toBe('playing');expect(remote).toEqual([]);await page.close()});

test('XP orbs grant levels, queue every reward and freeze combat during cards',async({page})=>{await start(page);await page.evaluate(()=>{let e=overdrive.test.spawn('charger',0,12);overdrive.test.damage(e,10000);overdrive.test.update(.01)});expect((await page.evaluate(()=>overdrive.snapshot())).xp).toBe(18);await page.evaluate(()=>{overdrive.test.gainXP(100);overdrive.test.openReward()});let snap=await page.evaluate(()=>overdrive.snapshot());expect(snap.level).toBe(4);expect(snap.pendingLevels).toBe(2);await expect(page.locator('#choices button')).toHaveCount(4);await page.waitForTimeout(250);expect((await page.evaluate(()=>overdrive.snapshot())).runTime).toBe(snap.runTime);for(let n=0;n<3;n++)await page.locator('#choices button').first().click();expect((await page.evaluate(()=>overdrive.snapshot())).state).toBe('playing');expect((await page.evaluate(()=>overdrive.snapshot())).wave).toBe(1)});
test('level and wave rewards are both offered; capped cards do not reappear',async({page})=>{await start(page);await page.evaluate(()=>{overdrive.test.set({xp:29,inv:999,up:{chain:3}});const e=overdrive.test.spawn('chaser',20,20);overdrive.test.damage(e,9999);overdrive.test.killWave();for(let i=0;i<150&&overdrive.snapshot().state==='playing';i++)overdrive.test.update(.01)});await expect(page.locator('#paneltag')).toContainText('LEVEL');expect(await page.locator('#choices').textContent()).not.toContain('ARC LINK');await page.locator('#choices button').first().click();await expect(page.locator('#paneltag')).toContainText('COMPLETE');await page.screenshot({path:'test-results/upgrade-v2.png'});await page.locator('#choices button').first().click();await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().state)).toBe('rebuilding');await page.locator('#rebuild-skip').click();await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().wave)).toBe(2)});
test('distinct enemy silhouettes and weapon mechanisms render',async({page})=>{const errors=[];page.on('pageerror',e=>errors.push(e.message));await start(page);await page.evaluate(()=>{overdrive.test.set({inv:999,x:0,y:0,z:12});['chaser','shooter','strafer','charger'].forEach((t,i)=>overdrive.test.spawn(t,-5+i*3,2));overdrive.test.aim(0,1.3,2)});for(let i=0;i<3;i++){await page.keyboard.press('Digit'+(i+1));await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().cool)).toBeLessThanOrEqual(0);await page.evaluate(()=>overdrive.test.shoot());await page.screenshot({path:'test-results/weapon-'+i+'.png'})}expect(errors).toEqual([])});
test('device selection stays available while PC retains original WASD and mouse controls',async({page})=>{await page.goto('/OVERDRIVE.html?test=1');await page.locator('#device-mobile').check();await expect(page.locator('#mobile-instructions')).toBeVisible();await page.locator('#device-pc').check();await expect(page.locator('#mobile-instructions')).toBeHidden();await expect(page.locator('#inputhelp')).toContainText('WASD');await page.locator('#sound').uncheck();await page.click('#start');await page.keyboard.down('KeyW');await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().position.z)).toBeLessThan(12);await page.keyboard.up('KeyW');await page.keyboard.press('Space');await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().position.y)).toBeGreaterThan(0);await page.keyboard.press('Digit2');expect((await page.evaluate(()=>overdrive.snapshot())).weapon).toBe(1);expect(await page.locator('input[name="layout"]').count()).toBe(0)});
test('mobile selection enables touch controls and hides PC help',async({page})=>{await page.goto('/OVERDRIVE.html?test=1');await page.locator('#device-mobile').check();await expect(page.locator('#mobile-instructions')).toBeVisible();await expect(page.locator('#inputhelp')).toContainText('左スティック');await page.locator('#sound').uncheck();await page.click('#start');await expect(page.locator('#fire')).toBeVisible();expect((await page.evaluate(()=>overdrive.snapshot())).mobile).toBe(true)});
test('easy difficulty halves enemy health, softens incoming damage and supports auto reload',async({page})=>{await page.goto('/OVERDRIVE.html?test=1');await page.locator('#difficulty').selectOption('easy');await page.locator('#sound').uncheck();await page.click('#start');await expect(page.locator('#tutorial-title')).toHaveText('目印まで前へ進もう！');expect((await page.evaluate(()=>overdrive.snapshot())).queue).toBe(0);await page.locator('#tutorial-skip').click();expect((await page.evaluate(()=>overdrive.snapshot())).queue).toBe(1);let result=await page.evaluate(()=>{const t=overdrive.test;t.set({inv:0});const easy=t.spawn('chaser',0,5);const hp=easy.hp;t.damage(easy,20);const reduced=easy.hp;const initial=overdrive.snapshot().hp;t.damagePlayer(10);const hurt=overdrive.snapshot().hp;t.set({weapon:0,ammo:[0,6,4],reload:0});t.shoot();return{hp,reduced,initial,hurt,reload:overdrive.snapshot().reloading,difficulty:overdrive.snapshot().difficulty,playerMax:overdrive.snapshot().hp}});expect(result.hp).toBe(32.5);expect(result.reduced).toBe(12.5);expect(result.initial-result.hurt).toBe(4);expect(result.reload).toBeGreaterThan(0);expect(result.difficulty).toBe('easy');expect(result.playerMax).toBe(121)});
test('current difficulty keeps original enemy health and player damage',async({page})=>{await page.goto('/OVERDRIVE.html?test=1');await page.locator('#difficulty').selectOption('normal');await page.locator('#sound').uncheck();await page.click('#start');const result=await page.evaluate(()=>{const e=overdrive.test.spawn('chaser',0,5);const hp=e.hp;overdrive.test.damagePlayer(10);return{hp,player:overdrive.snapshot().hp,difficulty:overdrive.snapshot().difficulty}});expect(result.hp).toBe(65);expect(result.player).toBe(90);expect(result.difficulty).toBe('normal')});

test('casing ejection and enlarged HUD dimensions',async({page})=>{await start(page);const before=await page.evaluate(()=>({radar:document.querySelector('#radar').getBoundingClientRect().width,ammo:getComputedStyle(document.querySelector('#ammo')).fontSize,name:getComputedStyle(document.querySelector('#weaponname')).fontSize}));expect(before.radar).toBe(220);expect(parseFloat(before.ammo)).toBe(55);expect(parseFloat(before.name)).toBe(12.5);await page.evaluate(()=>{overdrive.test.shoot()});expect((await page.evaluate(()=>overdrive.snapshot())).fx).toBeGreaterThan(0);expect(await page.evaluate(()=>document.querySelector('#radar').width)).toBe(256)});

test('easy onboarding follows the marked WASD route, then teaches combat, XP and jump pad',async({page})=>{
 await page.goto('/OVERDRIVE.html?test=1');await page.locator('#difficulty').selectOption('easy');await page.locator('#sound').uncheck();await page.click('#start');
 expect((await page.evaluate(()=>overdrive.snapshot())).tutorialStage).toBe(0);
 await expect(page.locator('#tutorial-title')).toHaveText('目印まで前へ進もう！');
 await page.screenshot({path:'artifacts/easy-tutorial.png'});
 for(const point of [{x:0,z:7},{x:-4,z:7},{x:-4,z:11},{x:0,z:11}])
  await page.evaluate(at=>{overdrive.test.set(at);overdrive.test.update(.016)},point);
 expect((await page.evaluate(()=>overdrive.snapshot())).tutorialStage).toBe(1);
 await expect(page.locator('#tutorial-copy')).toContainText('マウスで敵を狙い');
 await page.evaluate(()=>{const t=overdrive.test;t.damage(t.tutorialTarget(),999);t.update(.016)});
 expect((await page.evaluate(()=>overdrive.snapshot())).tutorialStage).toBe(2);
 await page.evaluate(()=>{overdrive.test.set({x:0,z:2});overdrive.test.update(.016);overdrive.test.update(.016)});
 expect((await page.evaluate(()=>overdrive.snapshot())).tutorialStage).toBe(3);
 await page.evaluate(()=>{overdrive.test.set({x:0,z:0});overdrive.test.update(.016)});
 expect((await page.evaluate(()=>overdrive.snapshot())).tutorialStage).toBe(4);
 await page.evaluate(()=>{const t=overdrive.test;t.damage(t.tutorialTarget(),999);t.update(.016)});
 expect((await page.evaluate(()=>overdrive.snapshot())).weaponTraining.index).toBe(0);
 expect((await page.evaluate(()=>overdrive.snapshot())).queue).toBe(0);
 await page.locator('#tutorial-finish').click();
 expect((await page.evaluate(()=>overdrive.snapshot())).tutorialActive).toBe(false);
 expect((await page.evaluate(()=>overdrive.snapshot())).queue).toBe(1);
 await page.reload();await page.locator('#difficulty').selectOption('normal');await page.locator('#sound').uncheck();await page.click('#start');
 expect(await page.locator('#tutorial').isHidden()).toBe(true);
 expect((await page.evaluate(()=>overdrive.snapshot())).queue).toBe(5);
});

test('mobile easy tutorial is legible, skippable and contained',async({browser})=>{const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const page=await context.newPage();await page.goto('/OVERDRIVE.html?test=1');await page.locator('#difficulty').selectOption('easy');await page.locator('#sound').uncheck();await page.click('#start');await expect(page.locator('#tutorial-title')).toHaveText('まずは移動');await expect(page.locator('#tutorial-copy')).toContainText('左スティック');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();expect(parseFloat(await page.locator('#tutorial-title').evaluate(e=>getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(38);await page.locator('#tutorial-skip').click();expect((await page.evaluate(()=>overdrive.snapshot())).queue).toBe(1);await context.close()});

test('tutorial starts large then docks below minimap without blocking play',async({page})=>{await page.goto('/OVERDRIVE.html?test=1');await page.locator('#difficulty').selectOption('easy');await page.locator('#sound').uncheck();await page.click('#start');const full=await page.locator('#tutorial').boundingBox();expect(full.width).toBeGreaterThan(900);await expect(page.locator('#tutorial')).toHaveClass(/compact/,{timeout:5000});await page.waitForTimeout(1100);const compact=await page.locator('#tutorial').boundingBox(),radar=await page.locator('#radar').boundingBox();expect(compact.y).toBeGreaterThanOrEqual(radar.y+radar.height);expect(compact.width).toBeLessThan(400);await page.keyboard.down('KeyW');await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().position.z),{intervals:[20],timeout:5000}).toBeLessThan(12);await page.keyboard.up('KeyW')});

test('both difficulties use the reconstruction reactor',async({page})=>{await page.goto('/OVERDRIVE.html?test=1');await page.locator('#difficulty').selectOption('normal');await page.locator('#sound').uncheck();await page.click('#start');const normal=await page.evaluate(()=>overdrive.snapshot());expect(normal.spectacle).toBe(true);await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().spectacleRotation),{intervals:[50],timeout:3000}).not.toBe(normal.spectacleRotation);await page.reload();await page.locator('#difficulty').selectOption('easy');await page.locator('#sound').uncheck();await page.click('#start');await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().spectacle)).toBe(true)});

test('weapon roles and magazines match in easy with retained damage assist',async({page})=>{await page.goto('/OVERDRIVE.html?test=1');await page.locator('#difficulty').selectOption('normal');await page.locator('#sound').uncheck();await page.click('#start');let normal=await page.evaluate(()=>({mags:overdrive.snapshot().weaponMags,close:overdrive.test.pulseDamageAt(2),mid:overdrive.test.pulseDamageAt(12),far:overdrive.test.pulseDamageAt(40)}));expect(normal.mags).toEqual([50,10,6,24,1,6]);expect(normal.close).toBe(2);expect(normal.mid).toBe(7);expect(normal.far).toBe(0);await page.reload();await page.locator('#difficulty').selectOption('easy');await page.locator('#sound').uncheck();await page.click('#start');let easy=await page.evaluate(()=>({mags:overdrive.snapshot().weaponMags,pulse:overdrive.test.pulseDamageAt(40)}));expect(easy.mags).toEqual([50,10,6,24,1,6]);expect(easy.pulse).toBe(0)});
test('shotgun pushes back and rail kill forks to nearby enemies',async({page})=>{await page.goto('/OVERDRIVE.html?test=1');await page.locator('#difficulty').selectOption('normal');await page.locator('#sound').uncheck();await page.click('#start');let shotgun=await page.evaluate(()=>{const t=overdrive.test;t.set({x:0,y:0,z:12,weapon:1,ammo:[50,10,6],cool:0});const e=t.spawn('charger',0,6);t.update(.016);t.shoot();return{z:e.mesh.position.z,hp:e.hp,ammo:overdrive.snapshot().ammo[1]}});expect(shotgun.z).toBeLessThan(6);expect(shotgun.hp).toBeLessThan(140);expect(shotgun.ammo).toBe(9);let rail=await page.evaluate(()=>{const t=overdrive.test;t.set({x:0,y:0,z:12,weapon:2,ammo:[50,10,6],cool:0,up:{fork:1}});const a=t.spawn('chaser',0,5),b=t.spawn('chaser',3,5);t.update(.016);t.shoot();return{a:a.hp,b:b.hp}});expect(rail.a).toBeLessThanOrEqual(0);expect(rail.b).toBeLessThan(65)});

test('Ω raid opening, objective HUD, automatic shifts and redeal on desktop and mobile',async({browser})=>{
 for(const mobile of [false,true]){
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1280,height:720},isMobile:mobile,hasTouch:mobile});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/OVERDRIVE.html?test=1');await page.locator('#difficulty').selectOption('omega');await page.locator('#sound').uncheck();await page.click('#start');
  await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().state)).toBe('upgrade');
  const opening=page.locator('#choices .omega-weapon-card');await expect(opening).toHaveCount(3);const options=await opening.evaluateAll(nodes=>nodes.map(n=>Number(n.dataset.weapon)));expect(options.every(i=>i>=0&&i<6)).toBeTruthy();await opening.first().click();await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().state)).toBe('playing');
  await expect(page.locator('#raid-mission')).toBeVisible();await expect(page.locator('#raid-title')).not.toHaveText('');const before=await page.evaluate(()=>overdrive.snapshot());expect(before.omega.raid.active).toBeTruthy();
  await page.evaluate(()=>overdrive.test.omegaShift());await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().omega.raid.round),{timeout:8000}).toBeGreaterThan(before.omega.raid.round);await expect.poll(()=>page.evaluate(()=>overdrive.snapshot().state)).toBe('playing');
  const after=await page.evaluate(()=>overdrive.snapshot());expect(after.weapon).not.toBe(before.weapon);expect(after.world.layoutSeed).not.toBe(before.world.layoutSeed);await expect(page.locator('#panel')).toBeHidden();await expect(page.locator('#choices .omega-weapon-card')).toHaveCount(0);await expect(page.locator('#raid-reroll')).toBeEnabled();
  if(mobile)await page.locator('#raid-reroll').click();else await page.keyboard.press('q');
  const rerolled=await page.evaluate(()=>overdrive.snapshot());expect(rerolled.weapon).not.toBe(after.weapon);expect(rerolled.omega.raid.rerollAvailable).toBeFalsy();await expect(page.locator('#raid-reroll')).toBeDisabled();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();if(!mobile)await page.screenshot({path:'artifacts/browser-qa/omega-rift-raid.png'});expect(errors).toEqual([]);await context.close();
 }
});
