import * as THREE from "three";

export const scene = new THREE.Scene();
export const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});

export function createScene() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  const container = document.getElementById("solar-system");
  if (container) {
    container.appendChild(renderer.domElement);
  }
}

export function createLight(scene: THREE.Scene) {
  const ambientLight = new THREE.AmbientLight(0x404040, 5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1000);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  return { ambientLight, pointLight };
}
