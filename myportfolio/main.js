import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//initiating scene
const scene = new THREE.Scene();

//initialting camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//initialting renderer with canvas id
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

//setting pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);
//setting size
renderer.setSize(window.innerWidth, window.innerHeight);

//movinf z axis camera position
camera.position.setZ(30);

//adding scene and camera to renderer
renderer.render(scene, camera);

// initiating a torus geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xfc3d03,
});

//initiating torus with geometry and material
const torus = new THREE.Mesh(geometry, material);

//adding torus to the scene
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

//initiating ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);

  scene.add(star);
}

Array(200).fill().forEach(addStar);

//adding image with three js texture loader
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();

//avatar

const salekinTexture = new THREE.TextureLoader().load("salekin.jpg");

const salekin = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: salekinTexture })
);

scene.add(salekin);
