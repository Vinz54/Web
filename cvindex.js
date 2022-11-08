var scene, camera, renderer, ground;

init();

function init(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xccf2ff);

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(3, 3, 5);

  const ambient = new THREE.HemisphereLight(0xFFFFFF, 0x080820, 0.3);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xFFFFFF, 1);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.near = 1;
  light.shadow.far = 200;
  const shadowSize = 5;
  light.shadow.left = -shadowSize;
  light.shadow.right = shadowSize;
  light.shadow.top = shadowSize;
  light.shadow.bottom = -shadowSize;
  light.position.set( 1, 5, 12);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  document.body.appendChild( renderer.domElement );

  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.target.set(-2,0,0);
  controls.update();

  document.getElementById('myName').onclick = function() {
    document.getElementById('SideAction').style.visibility="hidden";
    document.getElementById("transformName").className = "afterName";
    camera.position.set(-0.5,0.9,-0.2);
    controls.target.set(-2,0.9,-0.2);
    controls.update();
  }
  document.getElementById('returnBtnName').onclick = function(){
    document.getElementById('SideAction').style.visibility="visible";
    document.getElementById("transformName").className = "beforeName";
    camera.position.set(3, 3, 5);
    controls.target.set(-2,0,0);
    controls.update();
  }

  document.getElementById('myExp').onclick = function() {
    document.getElementById('SideAction').style.visibility="hidden";
    document.getElementById("transformExp").className = "afterExp";
    camera.position.set(-1,1,-0.7);
    controls.target.set(-1.5,1,-5);
    controls.update();
  }

  document.getElementById('returnBtnExp').onclick = function(){
    document.getElementById('SideAction').style.visibility="visible";
    document.getElementById("transformExp").className = "beforeExp";
    camera.position.set(3, 3, 5);
    controls.target.set(-2,0,0);
    controls.update();
  }

  document.getElementById('myThought').onclick = function() {
    document.getElementById('SideAction').style.visibility="hidden";
    document.getElementById("transformThought").className = "afterThought";
    camera.position.set(0.85,1.5,-0.5);
    controls.target.set(1,1,-5);
    controls.update();
  }

  document.getElementById('returnBtnThought').onclick = function(){
    document.getElementById('SideAction').style.visibility="visible";
    document.getElementById("transformThought").className = "beforeThought";
    camera.position.set(3, 3, 5);
    controls.target.set(-2,0,0);
    controls.update();
  }


  document.getElementById('myUniversity').onclick = function() {
    document.getElementById('SideAction').style.visibility="hidden";
    document.getElementById("transformUniv").className = "afterUniv";
    camera.position.set(-1.4,1,1.15);
    controls.target.set(-3,0,5);
    controls.update();
  }
  document.getElementById('returnBtnUniv').onclick = function(){
    document.getElementById('SideAction').style.visibility="visible";
    document.getElementById("transformUniv").className = "beforeUniv";
    camera.position.set(3, 3, 5);
    controls.target.set(-2,0,0);
    controls.update();
  }


  //Load meshes here
  const loader = new THREE.GLTFLoader();
  //loader.setPath(assetPath);
  loader.load('cv3Dmodel.glb', function(object){
    ground = new THREE.Object3D();
    scene.add(ground);
    ground.add(object.scene.children[0]);
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
