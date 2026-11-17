import * as T from 'three';
import {PHASE} from './phase-control.js';
import {traceEnemyRay,enemyAimPoint} from './enemy-hit-shapes.js';

function visible(object){for(let p=object;p;p=p.parent)if(!p.visible)return false;return true;}

export function tracePhaseShot({origin,direction,enemies,obstacles,charged=false,nova=false}){
 const dir=direction.clone().normalize(),ray=new T.Raycaster(origin,dir,0,PHASE.range);
 const wall=ray.intersectObjects(obstacles.filter(visible),false)[0];
 const limit=Math.min(PHASE.range,wall?.distance??PHASE.range),hits=[];
 for(const e of enemies){
  if(e.hp<=0)continue;
  const hit=traceEnemyRay(e,origin,dir,limit,{padding:nova?1.1:charged?.12:0});
  if(hit){
   if(nova){const to=enemyAimPoint(e).sub(origin),sight=new T.Raycaster(origin,to.clone().normalize()),cover=sight.intersectObjects(obstacles.filter(visible),false)[0];if(cover&&cover.distance<to.length()-.15)continue;}
   hits.push(hit);
  }
 }
 hits.sort((a,b)=>a.along-b.along);
 const selected=hits.slice(0,charged?PHASE.pierce:1);
 const length=selected.length&&(!charged||selected.length===PHASE.pierce)?selected[selected.length-1].along:limit;
 return {hits:selected,end:origin.clone().addScaledVector(dir,length),limit};
}

// Cover-aware radial falloff shared by NOVA damage and tests.
export function tracePhaseBlast({center,from,radius,enemies,obstacles,minFactor=.4}={}){
 const origin=center.clone().addScaledVector(from.clone().sub(center).normalize(),.18),ray=new T.Raycaster(),result=[];
 for(const e of enemies){
  if(e.hp<=0)continue;const to=enemyAimPoint(e).sub(origin),distance=to.length();if(distance>radius)continue;
  if(distance>.001){ray.set(origin,to.clone().normalize());const cover=ray.intersectObjects(obstacles.filter(visible),false)[0];if(cover&&cover.distance<distance-.15)continue;}
  result.push({e,factor:1-(1-minFactor)*distance/radius});
 }
 return result;
}
