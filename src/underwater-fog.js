// Surface haze belongs to world-rebuild; only the swimmer camera may override it.
// Called every playing frame, so resurfacing also restores the exact stage fog.
export function applyUnderwaterFog(fog,surface,underwater,crimson){
 if(!underwater){
  fog.color.setHex(surface.color);fog.near=surface.near;fog.far=surface.far;
  return 'surface';
 }
 fog.color.setHex(crimson?0x3b0611:0x15516b);
 fog.near=crimson?1:1.5;
 fog.far=crimson?23:52;
 return crimson?'crimson':'underwater';
}
