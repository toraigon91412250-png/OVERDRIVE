const assert=require('assert/strict'),vm=require('vm'),esbuild=require('esbuild');
const out=esbuild.buildSync({entryPoints:['src/titan/encounter.js'],bundle:true,platform:'node',format:'cjs',write:false});const m={exports:{}};vm.runInThisContext('(function(module,exports){'+out.outputFiles[0].text+'})')(m,m.exports);
for(const type of ['armored','attack','jaw','colossal']){
 let hits=0,warnings=0,impacts=0;const ai=m.exports.createEncounter(type,{hit:()=>hits++,warning:x=>{if(x)warnings++},impact:()=>impacts++});
 const input={alive:true,distance:4,height:2,facing:1};
 for(let t=0;t<3;t+=.05)ai.update(.05,input);assert.equal(hits,0,'No instant initial attack');
 for(let t=0;t<4;t+=.05)ai.update(.05,input);assert.equal(warnings,1);assert.equal(hits,1);assert.equal(impacts,1,'One impact per warning');
 ai.reset();hits=0;for(let t=0;t<7;t+=.05)ai.update(.05,{...input,distance:80});assert.equal(hits,0,'Outside range is safe');
 if(type==='jaw'){ai.reset();for(let t=0;t<7;t+=.05)ai.update(.05,{...input,facing:-1});assert.equal(hits,0,'Bite cannot hit behind the jaw');}
 if(type==='attack'){ai.reset();hits=0;for(let t=0;t<7;t+=.05)ai.update(.05,{...input,height:12});assert.equal(hits,1,'An airborne player is vulnerable to a telegraphed sweep');}
 ai.reset();assert.equal(ai.getState().phase,'idle');assert.equal(ai.getState().number,0);
 console.log('PASS encounter',type,'warning, one impact, range, reset');
}
