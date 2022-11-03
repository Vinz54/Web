var scene, camera, renderer, mobil;

init();

function init(){
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
  light.position.set( 0, 3, 5);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  document.body.appendChild( renderer.domElement );

  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.target.set(0,0,0);
  controls.update();

//Button Left on click function
  document.getElementById('btnL').onclick = function() {
     document.getElementById('btnL').style.visibility="hidden";
     document.getElementById('btnM').style.visibility="hidden";
     document.getElementById('btnR').style.visibility="hidden";
     document.getElementById("transformParts").className = "afterParts";
     camera.position.set(-5,3,6);
     controls.target.set(-2,0,0);
     controls.update();
  }
  document.getElementById('returnBtnParts').onclick = function() {
    document.getElementById('btnL').style.visibility="visible";
    document.getElementById('btnM').style.visibility="visible";
    document.getElementById('btnR').style.visibility="visible";
    document.getElementById("transformParts").className = "informationParts";
    camera.position.set(6, 5, 7);
    controls.target.set(0,0,0);
    controls.update();
  }

  //Button Middle on click function
    document.getElementById('btnM').onclick = function() {
       document.getElementById('btnL').style.visibility="hidden";
       document.getElementById('btnM').style.visibility="hidden";
       document.getElementById('btnR').style.visibility="hidden";
       document.getElementById("transformName").className = "afterName";
       camera.position.set(-2,4,-6);
       controls.target.set(-2,0,0);
       controls.update();
    }
    document.getElementById('returnBtnName').onclick = function() {
      document.getElementById('btnL').style.visibility="visible";
      document.getElementById('btnM').style.visibility="visible";
      document.getElementById('btnR').style.visibility="visible";
      document.getElementById("transformName").className = "informationName";
      camera.position.set(6, 5, 7);
      controls.target.set(0,0,0);
      controls.update();
    }


//Btn Right on click Function
  document.getElementById('btnR').onclick = function() {
     document.getElementById('btnL').style.visibility="hidden";
     document.getElementById('btnM').style.visibility="hidden";
     document.getElementById('btnR').style.visibility="hidden";
     document.getElementById("transformHistory").className = "afterHistory";
     camera.position.set(1,2,6);
     controls.target.set(1,0,0);
     controls.update();
  }
  document.getElementById('returnBtnHistory').onclick = function() {
    document.getElementById('btnL').style.visibility="visible";
    document.getElementById('btnM').style.visibility="visible";
    document.getElementById('btnR').style.visibility="visible";
    document.getElementById("transformHistory").className = "informationHistory";
    camera.position.set(6, 5, 7);
    controls.target.set(0,0,0);
    controls.update();
  }


  //Load meshes here
  const loader = new THREE.GLTFLoader();
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
