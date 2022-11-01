var scene, camera, renderer, mobil;

init();

function init(){
  //const assetPath = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/';

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x3b3737);

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(6, 5, 7);

  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xFFFFFF, 1);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.near = 5;
  light.shadow.far = 100;
  const shadowSize = 5;
  light.shadow.left = -shadowSize;
  light.shadow.right = shadowSize;
  light.shadow.top = shadowSize;
  light.shadow.bottom = -shadowSize;
  light.position.set( -1, 10, 6);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  document.body.appendChild( renderer.domElement );

  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.target.set(0,0,0);
  controls.update();

  //Load meshes here
  const loader = new THREE.GLTFLoader();
  //loader.setPath(assetPath);
  loader.load('LamborghVen.glb', function(object){
    object.scene.traverse(function(child){
        if (child.isMesh){
          child.castShadow = true;
          child.receiveShadow = true;
        }
      }
    );
    scene.add(object.scene.children[1]);
    mobil = new THREE.Object3D();
    scene.add(mobil);
    mobil.add(object.scene.children[0]);
  });

  window.addEventListener( 'resize', resize, false);

  update();
}

function update(){
  requestAnimationFrame( update );
	renderer.render( scene, camera );

}

function resize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
