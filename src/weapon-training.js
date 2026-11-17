// Easy-only lessons teach the shared weapon mechanics with easy assists.
// Targets use the real distance damage, knockback and projectile code.
export const WEAPON_LESSONS = Object.freeze([
 {title:'連射ライフル',role:'中距離が得意な連射銃。近すぎ・遠すぎでは威力が落ちる。',
  pc:'左クリック長押しで連射。Rでリロード。',mobile:'FIRE長押しで連射。リロードで弾を装填。',
  goal:'コアが緑なら得意な距離。前後に動いて色と威力を比べよう。',targets:[['chaser',0,2,48]]},
 {title:'近距離ショットガン',role:'近づくほど強い散弾。敵を押し戻して安全な距離を作る。',
  pc:'敵へ近づいて左クリック。Rでリロード。',mobile:'敵へ近づいてFIRE。リロードで弾を装填。',
  goal:'近くで撃って押し戻しを確認。敵が離れたら近づいて撃とう。',targets:[['chaser',-1.1,8,50],['chaser',1.1,8,50]]},
 {title:'貫通ライフル',role:'遠距離ほど強い貫通弾。並んだ敵をまとめて狙う。',
  pc:'奥の敵へ照準を重ねて左クリック。Rで装填。',mobile:'奥の敵へ照準を重ねてFIRE。リロードで装填。',
  goal:'一直線に並んだ3体への貫通を試そう。',targets:[['chaser',0,2,70],['chaser',0,-3,70],['chaser',0,-8,70]]},
 {title:'チャージ砲',role:'移動で弾を得るチャージ砲。ためる弾数で攻撃が変わる。',
  pc:'左クリック短押しで光弾。長押し→離す／Rで自動チャージ。',mobile:'短押しは光弾。FIRE長押し→離す／チャージで自動発射。',
  goal:'本番はゲージ満タンで弾＋12。練習は弾切れで24発補充。',targets:[['chaser',-1.8,1,160],['chaser',0,-1,160],['chaser',1.8,1,160]]},
 {title:'スナイパーライフル',role:'遠くを狙う、1発装填の狙撃銃。光るコアが弱点。',
  pc:'右クリック長押しで照準。ホイールで倍率。射撃後はRで装填。',mobile:'右画面タップで3×→6×→解除。FIREで射撃、リロードで装填。',
  goal:'スコープで遠い敵を狙い、1発ごとの装填を試そう。',targets:[['chaser',0,-11,90]]},
 {title:'追尾ミサイル',role:'敵を少し狙うとロック。最大3体へミサイルを振り分ける。',
  pc:'照準を合わせて枠が金色になったら左クリック。Rで装填。',mobile:'照準を合わせて枠が金色になったらFIRE。リロードで装填。',
  goal:'照準を振って複数ロック。動く3体への追尾を試そう。',targets:[['strafer',-2,-3,70],['strafer',0,-4,70],['strafer',2,-3,70]]},
]);

export class WeaponTraining {
 constructor(){this.reset();}
 reset(){this.active=false;this.index=-1;this.eliminations=0;this.respawn=0;}
 start(difficulty){if(difficulty!=='easy')return false;this.reset();this.active=true;this.select(0);return true;}
 select(index){this.index=index;this.eliminations=0;this.respawn=.85;}
 next(){if(!this.active)return false;if(this.index===WEAPON_LESSONS.length-1){this.reset();return false;}this.select(this.index+1);return true;}
 get lesson(){return WEAPON_LESSONS[this.index];}
 update(dt,alive){
  if(!this.active)return false;
  if(alive){this.respawn=.85;return false;}
  this.respawn-=dt;if(this.respawn>0)return false;this.respawn=.85;return true;
 }
}
