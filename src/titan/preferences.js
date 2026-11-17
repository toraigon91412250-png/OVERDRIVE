export const preferenceKey='odm-titan-preferences-v1';
export function sanitizePreferences(value){
 const v=value&&typeof value==='object'?value:{};
 const choose=(key,allowed,fallback)=>allowed.includes(v[key])?v[key]:fallback;
 return {infinite:typeof v.infinite==='boolean'?v.infinite:false,gravity:choose('gravity',['normal','low','high'],'normal'),range:choose('range',[140,210,300],210),maxSpeed:choose('maxSpeed',[60,80,95],80),quality:choose('quality',['auto','low','high','max'],'auto'),volume:typeof v.volume==='number'&&Number.isFinite(v.volume)?Math.max(0,Math.min(1,v.volume)):.65,battle:choose('battle',['raid','armored','jaw','attack','colossal','warhammer'],'raid'),target:choose('target',['armored','jaw','attack','colossal','warhammer'],'armored'),missiles:choose('missiles',[2,4,6],4)};
}
export function readPreferences(storage){try{return sanitizePreferences(JSON.parse(storage.getItem(preferenceKey)));}catch{return sanitizePreferences(null);}}
export function writePreferences(storage,preferences){try{storage.setItem(preferenceKey,JSON.stringify(sanitizePreferences(preferences)));return true;}catch{return false;}}
