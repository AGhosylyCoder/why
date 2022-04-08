import './style.css';

import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

// const monkeyUrl = new URL('./donut.glb', import.meta.url);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

const donutTexture = new THREE.TextureLoader().load('donutTexture.png')

const Geometry = new THREE.TorusGeometry( 9, 5, 32, 50 );
const Material = new THREE.MeshStandardMaterial( { map: donutTexture, wireframe: false } );
const donut = new THREE.Mesh( Geometry, Material );
donut.position.set(9, 7, -50)

scene.add(donut);

// const assetLoader = new GLTFLoader();
// let mixer;
// assetLoader.load(monkeyUrl.href, function(gltf) {
//   const model = gltf.scene;
//   // model.position(0, 0, 0)
//   // console.log(`donut pos: ${model.position}`)
//   scene.add(model)
// });


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(69, 69, 69)

const saturnPointLight = new THREE.PointLight(0xffffff)
saturnPointLight.position.z = -40;
saturnPointLight.position.y = 80;
saturnPointLight.position.setX(-60);


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, saturnPointLight)
// scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50)
// scene.add(lightHelper)
// // scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() 
{
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff } )
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 469 ) );

  star.position.set(x, y, z);
  scene.add(star)
}

// const meTexture = new THREE.TextureLoader().load('me.jpg');

// const me = new THREE.Mesh(
//   new THREE.SphereGeometry(0.9,24,24),
//   new THREE.MeshBasicMaterial( { map: meTexture } )
// );

// scene.add(me);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32), 
  new THREE.MeshStandardMaterial( { map: moonTexture, normalMap: normalTexture } )
)

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

Array(694).fill().forEach(addStar)

// const satTexture = new THREE.TextureLoader().load('saturn.jpg');
// const satNorm = new THREE.TextureLoader().load('satNorm.jpg');

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32), 
  new THREE.MeshStandardMaterial( { color: 0xd1ab54 } )
)

scene.add(saturn);

saturn.position.z = 50;
saturn.position.setX(-20);

const saturnBelt = new THREE.Mesh(
  new THREE.CylinderGeometry(8, 5.5, 1, 32), 
  new THREE.MeshStandardMaterial( { color: 0xd9d075 } )
)

scene.add(saturnBelt);

saturnBelt.position.z = 50;
saturnBelt.position.y -= 1;
saturnBelt.position.setX(-20);

const saturnBelt2 = new THREE.Mesh(
  new THREE.CylinderGeometry(5.5, 8, 1, 32), 
  new THREE.MeshStandardMaterial( { color: 0xd9d075 } )
)

scene.add(saturnBelt2);

saturnBelt2.position.z = 50;
saturnBelt2.position.y += 1;
saturnBelt2.position.setX(-20);


const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  saturn.rotation.x += 0.05;
  saturn.rotation.y += 0.075;
  saturn.rotation.z += 0.05;

  saturnBelt.rotation.x += 0.05;
  saturnBelt.rotation.y += 0.075;
  saturnBelt.rotation.z += 0.05;

  saturnBelt2.rotation.x += 0.05;
  saturnBelt2.rotation.y += 0.075;
  saturnBelt2.rotation.z += 0.05;

  // me.rotation.y += 0.01;
  // me.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() 
{
  requestAnimationFrame( animate );
  renderer.render ( scene, camera );

  donut.rotation.x += 0.01;
  donut.rotation.y += 0.005;
  donut.rotation.z += 0.01;

  // controls.update();
}

animate()
