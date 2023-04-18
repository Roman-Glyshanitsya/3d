import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as dat from "dat.gui";

gsap.registerPlugin(ScrollTrigger);

const gltfLoader = new GLTFLoader();

let tl = gsap.timeline();

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials

const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color(0xff0000);

gltfLoader.load("police_ford_raptor.glb", (gltf) => {
  gltf.scene.scale.set(0.3, 0.3, 0.3);
  gltf.scene.rotation.set(0, -0.5, 0);
  scene.add(gltf.scene);

  gui.add(gltf.scene.rotation, "x").min(-9).max(9);
  gui.add(gltf.scene.rotation, "y").min(-9).max(9);
  gui.add(gltf.scene.rotation, "z").min(-9).max(9);

  tl.to(gltf.scene.rotation, {
    y: 9,
    duration: 100,
  });
});

// Mesh
// const sphere = new THREE.Mesh(geometry,material)
// scene.add(sphere)

// Lights

const pointLight = new THREE.AmbientLight(0xffffff, 7);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Sets the color of the background
renderer.setClearColor(0x87130b);

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  scene.rotation.y = 0.5 * elapsedTime;
  // Змінив на всю сцену(scene) замість фігури (sphere)

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
