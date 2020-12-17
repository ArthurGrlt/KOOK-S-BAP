let scene, camera, render;

function init() {
  scene = new THREE.Scene();
  const background = new THREE.TextureLoader();
  background.load("3d-obj-loader/assets/decor.png", function (texture) {
    scene.background = texture;
  });

  camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 80;
  camera.position.y = 10;
  camera.position.z = 40;

  hlight = new THREE.AmbientLight(0x404040, 8);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  let canvas3d = document.getElementById('firstCanvas')

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas3d
  });
  renderer.setSize(800, 600);

  let canvasContainer = document.getElementById('canvasContainer')
  
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  canvasContainer.appendChild(renderer.domElement);

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
  var speed = Date.now() * 0.0005;
  camera.position.x = Math.cos(speed) * 20;
  camera.position.y = Math.cos(speed) * 30;

  if (camera.position.y < 0) {
    camera.position.y = -camera.position.y
  }

  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
init();
