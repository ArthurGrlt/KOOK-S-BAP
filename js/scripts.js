let scene, camera, render;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xff0000);

  const background = new THREE.TextureLoader();
  background.load('../fond.jpg', function (texture) {
    scene.background = texture;
  });

  camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.position.x = 0; //position droite - gauche
  camera.position.y = 10; //position haut - bas
  camera.position.z = 40; //pronfondeur

  hlight = new THREE.AmbientLight(0x404040, 10);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 10);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);



  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(800, 500);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  document.body.appendChild(renderer.domElement);

  let loader = new THREE.GLTFLoader();
  loader.load("../3d-obj-loader/icecream/ice_cream.gltf", function (gltf) {
    car = gltf.scene.children[0];
    car.scale.set(1, 1, 1);
    scene.add(gltf.scene);
    animate();
    var bb = new THREE.Box3();
    bb.setFromObject(car);
    bb.center(controls.target);
  });
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  // var speed = Date.now() * 0.0005;
  // camera.position.x = Math.cos(speed) * 20;
  // camera.position.y = Math.cos(speed) * 30;

  // if (camera.position.y < 0) {
  //   camera.position.y = -camera.position.y
  // }


  // console.log(camera.position.y)

  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
init();