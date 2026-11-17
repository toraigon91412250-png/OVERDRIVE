// Real Chromium/WebGL smoke check. Optional Linux font workaround affects this browser only.
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'artifacts/browser-qa');
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const launchOptions=require('../playwright.config.cjs').use.launchOptions;
 const env={...process.env};
 if(process.env.OVERDRIVE_QA_CJK_FONTS==='1')env.FONTCONFIG_FILE=path.join(__dirname,'fixtures/linux-cjk-fonts.conf');
 const browser=await chromium.launch({...launchOptions,headless:true,env});
 try{for(const [name,mobile,easy]of [['desktop',false,false],['mobile',true,false],['easy',false,true]]){
  const page=await browser.newPage({viewport:mobile?{width:844,height:390}:{width:1280,height:720},hasTouch:mobile,isMobile:mobile});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('crash',()=>errors.push('PAGE_CRASH'));
  await page.goto(pathToFileURL(path.join(root,'dist/OVERDRIVE.html')).href+'?test=1');
  for(const value of ['easy','normal','easy','normal'])await page.locator('#difficulty').selectOption(value);
  await page.locator('#device-'+(mobile?'mobile':'pc')).check();
  await page.locator('#difficulty').selectOption(easy?'easy':'normal');await page.locator('#sound').uncheck();await page.locator('#start').click();
  if(easy)await page.locator('#tutorial-skip').click();
  await page.evaluate(()=>{overdrive.test.clearEnemies();overdrive.test.holdSpawns();const e=overdrive.test.spawn('chaser',26,26);e.tutorialDummy=true;e.hp=e.max=1000000});
  assert.equal(await page.evaluate(()=>overdrive.snapshot().state),'playing');
  await page.screenshot({path:path.join(out,name+'-game.png')});
  assert((await page.evaluate(()=>overdrive.snapshot().triangles))>0,'real WebGL must render triangles');
  await page.evaluate(()=>overdrive.test.choose('level',1));
  assert.equal(await page.locator('#choices>button').count(),4);assert.equal(await page.locator('.evolution-focus').count(),0);assert(await page.locator('#pulse-progress').isHidden());
  await page.screenshot({path:path.join(out,name+'-cards.png')});
  await page.locator('#choices>button').first().click();assert.equal(await page.evaluate(()=>overdrive.snapshot().state),'playing');assert.equal(await page.locator('.evolution-focus').count(),0);
  assert(await page.locator('#panel').isHidden());
  await page.evaluate(()=>{overdrive.test.gainXP(200);overdrive.test.openReward()});
  await page.locator('#choices>button').first().click();assert.equal(await page.evaluate(()=>overdrive.snapshot().state),'upgrade');assert.equal(await page.locator('.evolution-focus').count(),0);assert(await page.locator('#pulse-progress').isHidden());
  assert.deepEqual(errors,[]);console.log('PASS',name,'WebGL, card render, dismissal and queued rewards');await page.close();
 }}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
