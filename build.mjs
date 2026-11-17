import {build} from 'esbuild';
import {packStandalone} from './scripts/pack-standalone.mjs';
import fs from 'node:fs';
import {createHash} from 'node:crypto';

await build({entryPoints:['src/game.js'],bundle:true,format:'iife',minify:true,outfile:'dist/game.bundle.js',legalComments:'inline'});

// Bundle all supplied models, equipment into the standalone raid.
const models=await build({entryPoints:['src/titan/index.js'],bundle:true,format:'iife',globalName:'RaidModels',minify:true,write:false});
const core=await build({entryPoints:['src/titan/core.js'],bundle:true,format:'iife',minifyWhitespace:true,minifySyntax:true,minifyIdentifiers:false,write:false});
const titanHtml=fs.readFileSync('src/odm-titan-raid-trial.html','utf8')
 .replace('RAID_MODELS_PLACEHOLDER',()=>models.outputFiles[0].text)
 .replace('RAID_CORE_PLACEHOLDER',()=>core.outputFiles[0].text.replaceAll('</script','<'+String.fromCharCode(92)+'/script'));
fs.writeFileSync('dist/ODM_TITAN_RAID.html',titanHtml);
fs.writeFileSync('dist/download-ODM_TITAN_RAID.html',titanHtml);
fs.writeFileSync('dist/OVERDRIVE_TITAN.html',titanHtml);
const titanSrcdoc=titanHtml.replaceAll('&','&amp;').replaceAll('"','&quot;');
const gameScript=fs.readFileSync('dist/game.bundle.js','utf8').replaceAll('</script','<'+String.fromCharCode(92)+'/script');
const html=fs.readFileSync('src/shell.html','utf8')
  .replace('CSS_PLACEHOLDER',()=>fs.readFileSync('src/style.css','utf8')+'\n'+fs.readFileSync('src/x-style.css','utf8')+'\n'+fs.readFileSync('src/omega-style.css','utf8'))
  .replace('X_UI_PLACEHOLDER',()=>fs.readFileSync('src/x-ui.html','utf8'))
  .replace('OMEGA_UI_PLACEHOLDER',()=>fs.readFileSync('src/omega-ui.html','utf8'))
  .replace('JS_PLACEHOLDER',()=>gameScript)
  .replace('TITAN_SRCDOC_PLACEHOLDER',()=>titanSrcdoc);
fs.writeFileSync('dist/OVERDRIVE.html',packStandalone(html));
// Hosted menu loads the raid only when opened; downloadable OVERDRIVE stays self-contained.
const raidFingerprint=createHash('sha256').update(titanHtml).digest('hex').slice(0,12);
const gameFingerprint=createHash('sha256').update(gameScript).digest('hex').slice(0,12);
const hostedHtml=html.replace('data-srcdoc="'+titanSrcdoc+'"','data-src="OVERDRIVE_TITAN.html?v='+raidFingerprint+'"').replace('<script>'+gameScript+'</script>','<script src="game.bundle.js?v='+gameFingerprint+'"></script>').replace('<button id="start" class="primary">出撃する <span>→</span>','<button id="start" class="primary" disabled>準備中…');
fs.writeFileSync('dist/index.html',hostedHtml);
