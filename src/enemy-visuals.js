import * as T from 'three';

// Shared, single-pass materials: lift the silhouette without lights, bloom or extra meshes.
const palettes = {
  chaser: { armor: 0x8799a6, trim: 0x536b7c },
  shooter: { armor: 0xa69a7c, trim: 0x706650 },
  strafer: { armor: 0x9891b3, trim: 0x62617e },
  charger: { armor: 0xa47f91, trim: 0x685c72 },
  boss: { armor: 0xad8e7e, trim: 0x74665c },
};
const armorColors = new Set([0x344657, 0x343d4b, 0x393456, 0x3f3546]);
const materials = new Map();

export function applyEnemyReadability(root, type, core) {
  const palette = palettes[type];
  if (!palette) return;
  root.traverse(mesh => {
    if (!mesh.isMesh) return;
    const source = mesh.material;
    const role = mesh === core ? 'core' : source.emissiveIntensity > 0 ? 'accent' : armorColors.has(source.color.getHex()) ? 'armor' : 'trim';
    const key = `${type}:${role}:${source.uuid}`;
    let material = materials.get(key);
    if (!material) {
      // Clone rather than modifying the arena's shared material cache.
      material = source.clone();
      material.name = `enemy-${type}-${role}`;
      material.metalness = 0.12;
      material.roughness = 0.8;
      if (role === 'armor' || role === 'trim') {
        material.color.setHex(palette[role]);
        material.emissive.copy(material.color);
        material.emissiveIntensity = role === 'armor' ? 0.16 : 0.1;
      } else if (role === 'core') {
        material.color.lerp(new T.Color(0xffffff), 0.12);
        material.emissiveIntensity = 1.35;
      } else {
        material.emissiveIntensity = Math.max(source.emissiveIntensity, 0.45);
      }
      // Keep normal fog and depth occlusion, including behind arena cover.
      materials.set(key, material);
    }
    mesh.material = material;
  });
}
