import * as THREE from 'three';

export function prepareAttackFace(root){
 const head=root.getObjectByName('Head_149');if(!head)return;
 const flesh=new Set(['skin','Mat_B4775C','Mat_743B32','Mat_754A43']),materials=new Map();
 head.traverse(node=>{if(!node.isMesh)return;
  if(node.name==='Mesh_150'&&node.geometry.attributes.color){
   // The main face is a separate vertex-coloured surface with no authored
   // normals/material. Give it smooth normals and an explicit skin material.
   if(!node.geometry.attributes.normal){node.geometry=node.geometry.clone();node.geometry.computeVertexNormals();}
   node.material=new THREE.MeshStandardMaterial({name:'raid-face-skin',vertexColors:true,color:0xffffff,roughness:.88,metalness:0,side:THREE.DoubleSide,emissive:0xba805e,emissiveIntensity:.13});
   return;
  }
  const improve=material=>{
  if(!flesh.has(material.name))return material;
  if(!materials.has(material)){
   const face=material.clone();
   // The brown texture was multiplied by another brown tint. Keep the texture
   // and use a neutral multiplier on the face, with a small indirect light floor.
   if(face.map)face.color.setRGB(1,.94,.88);else face.color.multiplyScalar(1.12);
   face.emissive=new THREE.Color(0xba805e);face.emissiveIntensity=.13;face.roughness=Math.min(face.roughness,.88);face.needsUpdate=true;
   materials.set(material,face);
  }return materials.get(material);
 };node.material=Array.isArray(node.material)?node.material.map(improve):improve(node.material);});
}
