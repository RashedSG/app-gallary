import * as THREE from 'three';

export function boot3D(view, span=8, bg=0x070d1a){
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.12;
  view.appendChild(renderer.domElement);
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(bg);
  const camera=new THREE.OrthographicCamera(-span,span,span,-span,.1,80);
  camera.position.set(0,22,.001);
  camera.up.set(0,0,-1);
  camera.lookAt(0,0,0);
  scene.add(new THREE.HemisphereLight(0xc9ddff,0x14101f,.85));
  const sun=new THREE.DirectionalLight(0xfff4e5,1.25);
  sun.position.set(8,20,6); scene.add(sun);
  const rim=new THREE.DirectionalLight(0x60a5fa,.35);
  rim.position.set(-8,10,-6); scene.add(rim);
  function fit(){
    const w=view.clientWidth,h=view.clientHeight||1;
    renderer.setSize(w,h);
    const a=w/h;
    camera.left=-span*a; camera.right=span*a; camera.top=span; camera.bottom=-span;
    camera.updateProjectionMatrix();
  }
  addEventListener('resize',fit); fit();
  return {renderer,scene,camera,fit};
}

export function mat(color, extra={}){
  return new THREE.MeshStandardMaterial({color, roughness:.42, metalness:.18, ...extra});
}
