
import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

let scene, camera, renderer, bottle;

function init() {
  const container = document.getElementById("hero-canvas-container");

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
  dirLight.position.set(5, 10, 7.5);
  scene.add(dirLight);

  // Bottle (simple cylinder body + sphere cap)
  const bottleBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 2, 32),
    new THREE.MeshStandardMaterial({ color: 0x3ec6ff })
  );
  bottleBody.position.y = 1;

  const bottleCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x3ec6ff })
  );
  bottleCap.position.y = 2;

  bottle = new THREE.Group();
  bottle.add(bottleBody);
  bottle.add(bottleCap);
  scene.add(bottle);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (bottle) {
    bottle.rotation.y += 0.01;
    bottle.position.x = Math.sin(Date.now() * 0.001) * 1.5;
  }
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
