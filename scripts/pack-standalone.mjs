import {gzipSync} from 'node:zlib';

// Keep the offline game in one HTML file while fitting the hosting file limit.
// The unpacked document keeps the original page URL, storage and input context.
export function packStandalone(html){
 const payload=gzipSync(Buffer.from(html),{level:9}).toString('base64');
 return '<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>OVERDRIVE</title><style>body{margin:0;background:#08101a;color:#dcecef;font:16px system-ui;display:grid;place-items:center;min-height:100vh}</style><p id="package-status">OVERDRIVEを準備中…</p><script id="overdrive-package" type="application/octet-stream">'+payload+'</script><script>(async()=>{const data=document.getElementById("overdrive-package").textContent.trim();const bytes=Uint8Array.from(atob(data),c=>c.charCodeAt(0));const html=await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"))).text();document.open();document.write(html);document.close();})().catch(error=>{document.getElementById("package-status").textContent="起動できませんでした。最新のChromeまたはEdgeで開き直してください。";console.error(error);});</script></html>';
}
