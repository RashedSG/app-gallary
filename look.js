import * as THREE from 'three';

export function boot3D(view, span=8, bg=0x070d1a, mode='top'){
  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.08;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  view.appendChild(renderer.domElement);
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(bg);
  const camera=new THREE.OrthographicCamera(-span,span,span,-span,.1,120);
  applyView(camera, mode);
  scene.add(new THREE.HemisphereLight(0xdbe7ff,0x1a1428,.55));
  const sun=new THREE.DirectionalLight(0xfff1d6,1.45);
  sun.position.set(mode==='side'?4:7, 16, mode==='side'?10:9);
  sun.castShadow=true; sun.shadow.mapSize.set(2048,2048);
  sun.shadow.bias=-0.0008; sun.shadow.normalBias=0.04;
  const s=span+3;
  sun.shadow.camera.left=-s; sun.shadow.camera.right=s; sun.shadow.camera.top=s; sun.shadow.camera.bottom=-s;
  sun.shadow.camera.near=1; sun.shadow.camera.far=60;
  scene.add(sun, sun.target);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(span*5,span*5), new THREE.ShadowMaterial({opacity:.34}));
  ground.rotation.x=-Math.PI/2; ground.position.y=-.14; ground.receiveShadow=true; scene.add(ground);
  function tagShadows(){scene.traverse(o=>{if(!o.isMesh) return; if(o.material && o.material.type==='ShadowMaterial'){o.receiveShadow=true; o.castShadow=false; return;} o.castShadow=true; o.receiveShadow=true;});}
  const draw=renderer.render.bind(renderer);
  renderer.render=(sc,cam)=>{tagShadows(); draw(sc,cam)};
  function fit(){const w=view.clientWidth,h=view.clientHeight||1; renderer.setSize(w,h); const a=w/Math.max(h,1); camera.left=-span*a; camera.right=span*a; camera.top=span; camera.bottom=-span; camera.updateProjectionMatrix();}
  addEventListener('resize',fit); fit();
  return {renderer,scene,camera,fit,sun,mode};
}
function applyView(camera, mode){
  if(mode==='side'){ camera.up.set(0,1,0); camera.position.set(0,2.4,16); camera.lookAt(0,2.4,0); }
  else { camera.up.set(0,0,-1); camera.position.set(0,28,.001); camera.lookAt(0,0,0); }
}
export function bootSide(view, span=5.4, bg=0x071824){ return boot3D(view, span, bg, 'side'); }
export function followSide(camera, x, y, slack=1.8){
  camera.up.set(0,1,0);
  camera.position.x=x; camera.position.y=Math.max(2.2, y+slack); camera.position.z=16;
  camera.lookAt(x, Math.max(1.6, y+.35), 0);
}
export function mat(color, extra={}){
  return new THREE.MeshStandardMaterial({color, roughness:.46, metalness:.16, ...extra});
}
