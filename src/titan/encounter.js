// Animation supplies actual contact; timing alone never deals damage in the game.
export function createEncounter(type,events){
 const settings={warhammer:{reach:14,warning:1.4,recovery:1.8,cooldown:3.2},armored:{reach:9,warning:1.25,recovery:2.2,cooldown:3.8},attack:{reach:9,warning:1.15,recovery:2.1,cooldown:3.4},jaw:{reach:4.8,warning:1.0,recovery:1.5,cooldown:3.2},colossal:{reach:30,warning:2.4,recovery:4,cooldown:6}}[type];
 const giantSettings={warhammer:{reach:14,warning:1.4,recovery:1.8,cooldown:1.2},armored:{reach:11,warning:1.2,recovery:1.4,cooldown:1.0},attack:{reach:10,warning:.9,recovery:1.0,cooldown:.7},jaw:{reach:9,warning:.72,recovery:1.8,cooldown:.8},colossal:settings}[type];
 let phase='idle',timer=0,cooldown=3.5,attack=null,hit=false,count=0,duration=1,giant=false,cycle=settings;
 function reset(){phase='idle';timer=0;cooldown=3.5;attack=null;hit=false;count=0;duration=1;giant=false;cycle=settings;events.warning?.(null);}
 // A punch interruption enters a finite recovery, not a fresh 3.5s startup.
 function interrupt(seconds=.25){phase='recovery';timer=duration=seconds;attack=null;hit=true;events.warning?.(null);}
 function resolveContact(contact){if(phase!=='active'||hit||!contact)return false;hit=true;events.hit?.(attack);return true;}
 function getState(){return {phase,attack,remaining:timer,number:count,giant,progress:phase==='idle'?0:Math.max(0,Math.min(1,1-timer/duration))};}
 function update(dt,input){
  if(!input.alive){events.warning?.(null);return {phase:'dead',attack:null,progress:1};}
  if(phase==='idle'){
   cooldown-=dt;cycle=input.giant?giantSettings:settings;const candidate=cycle;
   const inFront=type==='colossal'||input.facing>.15;
   const inHeight=input.giant?input.height<(type==='colossal'?66:typesHeight(type)+15):type==='colossal'?input.height<66:type==='jaw'?input.height<6.5:input.height<17;
   if(cooldown<=0&&input.distance<candidate.reach&&inFront&&inHeight){
    giant=!!input.giant;cycle=candidate;
    attack=type==='warhammer'?'hammer':type==='colossal'?'steam':type==='jaw'?(giant?'lunge':'bite'):giant?'punch':input.height>4.4?'sweep':'stomp';
    phase='warning';timer=duration=cycle.warning;hit=false;count++;
    events.warning?.({attack,radius:attack==='steam'?18:attack==='stomp'?3.4:0,duration:timer,giant});
   }
  }else{
   timer-=dt;
   if(phase==='warning'&&timer<=0){phase='active';timer=duration=attack==='hammer'?.60:attack==='steam'?1.1:attack==='lunge'?.7:attack==='punch'?(type==='armored'?.65:.5):.55;events.warning?.(null);}
   if(phase==='active'&&!events.manualContact){
    const front=input.facing>.15;
    const contact=attack==='steam'?input.distance<18&&input.height<66:attack==='punch'?input.distance<8.5&&front:attack==='lunge'?input.distance<7&&front:attack==='bite'?input.distance<4.5&&input.height<6&&input.facing>.35:attack==='sweep'?input.distance<7&&input.height>4&&input.height<16&&front:input.distance<4.5&&input.height<3.7;
    resolveContact(contact);
   }
   if(phase==='active'&&timer<=0){events.impact?.(attack,hit);phase='recovery';timer=duration=cycle.recovery;}
   else if(phase==='recovery'&&timer<=0){phase='idle';cooldown=cycle.cooldown;attack=null;}
  }
  return getState();
 }
 return {update,reset,getState,resolveContact,interrupt};
}
function typesHeight(type){return type==='jaw'?5:15;}
