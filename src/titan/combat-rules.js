// facing = enemy forward dot horizontal direction from enemy to attacker.
// Damage is resolved only after an actual visible fist sweep makes contact.
// The caller applies breakArmor explicitly; an ordinary punch never removes a plate.
export function resolveTitanPunch({kind='attack',armor=false,facing=1,phase='idle',counter=false,hardened=false,hp=100}={}){
 const health=Number.isFinite(hp)?Math.max(0,hp):0;
 const front=Number.isFinite(facing)?facing>.35:true;
 const exposed=phase==='recovery';
 let armorHit=kind==='armored'&&!!armor;
 let damage=60,stagger=true,breakArmor=false,label='拳が命中',source=counter?'punch-counter':'punch';
 if(kind==='colossal'){
  damage=hardened?(counter?24:18):counter?18:12;
  // Even the final health point remains a human-form nape objective.
  damage=Math.min(damage,Math.max(0,health-1));stagger=false;
  label='超大型には拳が通りにくい / 人に戻ってうなじへ';
 }else if(armorHit){
  if(hardened){damage=counter?92:exposed?78:58;breakArmor=true;source='punch-hardened';label='硬質化 / 装甲破砕';}
  else if(counter){damage=70;breakArmor=true;label='カウンター / 装甲を崩した';}
  else if(front&&!exposed){damage=8;stagger=false;source='punch-guarded';label='正面装甲に弾かれた / 側面か反撃を狙え';}
  else {damage=exposed?52:36;label=exposed?'重打撃の隙に命中':'装甲の側面に命中';}
 }else if(kind==='warhammer'){
  armorHit=front&&!exposed&&!counter;
  if(counter){damage=hardened?112:94;label='戦鎚の隙に反撃';}
  else if(exposed){damage=hardened?100:76;label='振り下ろし後に命中';}
  else if(front){damage=hardened?28:12;stagger=false;source='punch-guarded';label='硬質の正面 / 側面へ回れ';}
  else {damage=hardened?78:52;label='戦鎚の側面に命中';}
 }else if(kind==='jaw'){
  damage=counter?96:exposed?80:hardened?64:40;
  label=counter?'カウンター / 顎を打ち崩した':exposed?'飛び込み後の隙に命中':'顎の巨人に命中';
 }else if(counter){damage=hardened?110:90;label='カウンター / 拳が命中';}
 else if(hardened){damage=82;source='punch-hardened';label='硬質化 / 拳が命中';}
 damage=Math.min(damage,health);
 if(health<=0){stagger=false;breakArmor=false;}
 return {damage,stagger,label,armorHit,breakArmor,source};
}
