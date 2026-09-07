import * as THREE from 'three';

export function boot3D(view, span=8, bg=0x070d1a){
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

  const camera=new THREE.OrthographicCamera(-span,span,span,-span,.1,90);
  camera.position.set(0,24,.001);
  camera.up.set(0,0,-1);
  camera.lookAt(0,0,0);

  scene.add(new THREE.HemisphereLight(0xdbe7ff,0x1a1428,.55));

  const sun=new THREE.DirectionalLight(0xfff1d6,1.55);
  sun.position.set(7,16,9);
  sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);
  sun.shadow.bias=-0.0008;
  sun.shadow.normalBias=0.04;
  sun.shadow.radius=2;
  const s=span+2;
  sun.shadow.camera.left=-s;
  sun.shadow.camera.right=s;
  sun.shadow.camera.top=s;
  sun.shadow.camera.bottom=-s;
  sun.shadow.camera.near=1;
  sun.shadow.camera.far=50;
  scene.add(sun);
  scene.add(sun.target);

  const fill=new THREE.DirectionalLight(0x7dd3fc,.28);
  fill.position.set(-10,8,-6);
  scene.add(fill);

  const ground=new THREE.Mesh(
    new THREE.PlaneGeometry(span*4,span*4),
    new THREE.ShadowMaterial({opacity:.38})
  );
  ground.rotation.x=-Math.PI/2;
  ground.position.y=-.12;
  ground.receiveShadow=true;
  scene.add(ground);

  function tagShadows(){
    scene.traverse(o=>{
      if(!o.isMesh) return;
      if(o.material && o.material.type==='ShadowMaterial'){
        o.receiveShadow=true; o.castShadow=false; return;
      }
      o.castShadow=true;
      o.receiveShadow=true;
    });
  }

  const draw=renderer.render.bind(renderer);
  renderer.render=(sc,cam)=>{ tagShadows(); draw(sc,cam); };

  function fit(){
    const w=view.clientWidth,h=view.clientHeight||1;
    renderer.setSize(w,h);
    const a=w/h;
    camera.left=-span*a; camera.right=span*a; camera.top=span; camera.bottom=-span;
    camera.updateProjectionMatrix();
  }
  addEventListener('resize',fit); fit();
  return {renderer,scene,camera,fit,sun};
}

export function mat(color, extra={}){
  return new THREE.MeshStandardMaterial({color, roughness:.46, metalness:.16, ...extra});
}
