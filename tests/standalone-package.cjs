const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),zlib=require('node:zlib');
(async()=>{
 const wrapper=fs.readFileSync('dist/OVERDRIVE.html','utf8'),match=wrapper.match(/id="overdrive-package"[^>]*>([^<]+)<\/script>/);
 assert(match,'Standalone contains its compressed complete game');
 const expected=zlib.gunzipSync(Buffer.from(match[1],'base64')).toString('utf8');
 assert(expected.includes('data-srcdoc=')&&expected.includes('BOSS_MODEL_'),'Decompression retains both the offline raid and actual boss game');
 assert(!expected.includes('src="game.bundle.js'),'Offline edition has no external game bundle');
 const scripts=[...wrapper.matchAll(/<script(?![^>]*type=)[^>]*>([\s\S]*?)<\/script>/g)];assert.equal(scripts.length,1);
 let opened=false,closed=false,written='',errors=[];const status={textContent:''};
 const document={getElementById:id=>id==='overdrive-package'?{textContent:match[1]}:status,open(){opened=true},write(html){written=html},close(){closed=true}};
 await vm.runInNewContext(scripts[0][1],{document,Uint8Array,atob,Blob,Response,DecompressionStream,console:{error:error=>errors.push(error)}});
 assert.equal(errors.length,0);assert(opened&&closed,'Loader replaces the document after unpacking');assert.equal(written,expected,'Unpacker writes every original byte of the game document');
 for(const file of fs.readdirSync('dist')){const stat=fs.statSync('dist/'+file);if(stat.isFile())assert(stat.size<=25*1024*1024,'Hosting file limit: '+file);}
 const hosted=fs.readFileSync('dist/index.html','utf8');assert(/src="game.bundle.js\?v=[a-f0-9]{12}"/.test(hosted),'Hosted menu keeps the direct game route');
 console.log('PASS standalone gzip integrity, actual unpacker execution, offline game retention, hosted bundle and all files below 25 MiB');
})().catch(error=>{console.error(error);process.exitCode=1});
