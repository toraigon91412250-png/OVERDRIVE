import {Line3,Vector3} from 'three';
export function createContactTest(){
 const line=new Line3(),sample=new Vector3(),nearest=new Vector3();
 return (previous,current,player,radius,height=1.4,bodyRadius=.42)=>{
  line.set(previous,current);
  for(let offset=0;offset<=height+.001;offset+=.7){sample.copy(player);sample.y-=offset;line.closestPointToPoint(sample,true,nearest);if(nearest.distanceToSquared(sample)<(radius+bodyRadius)**2)return true;}
  return false;
 };
}
