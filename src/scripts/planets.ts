import { planets, type Planet } from "@/constants/planets.ts";
import * as THREE from "three";

export const planetMeshes: THREE.Mesh[] = [];
let blackHole: THREE.Mesh;
let accretionDisk: THREE.Mesh;

export function createSun(scene: THREE.Scene) {
  const blackHoleGeometry = new THREE.SphereGeometry(10, 8, 8);
  const blackHoleMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
  });
  blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
  blackHole.position.set(0, 0, 0);
  scene.add(blackHole);

  const blackHoleGlowGeometry = new THREE.SphereGeometry(11, 8, 8);
  const blackHoleGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.015,
  });
  const blackHoleGlow = new THREE.Mesh(
    blackHoleGlowGeometry,
    blackHoleGlowMaterial,
  );
  blackHoleGlow.position.set(0, 0, 0);
  scene.add(blackHoleGlow);

  const accretionDiskGeometry = new THREE.RingGeometry(20, 15, 8, 8);
  const accretionDiskMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
  });
  accretionDisk = new THREE.Mesh(accretionDiskGeometry, accretionDiskMaterial);
  accretionDisk.position.set(0, 0, 0);
  accretionDisk.rotation.x = Math.PI / 2;
  scene.add(accretionDisk);
}

export function animateSun() {
  blackHole.rotation.y += 0.001;
  accretionDisk.rotation.z += 0.001;
}

export function createPlanets(scene: THREE.Scene) {
  planets.forEach((planet) => {
    const geometry = new THREE.SphereGeometry(planet.radius, 8, 8);
    const material = new THREE.MeshPhongMaterial({
      color: planet.color,
      shininess: 100,
      flatShading: true,
    });
    const planetMesh = new THREE.Mesh(geometry, material);

    const angle = planet.offset;
    planetMesh.position.set(
      Math.cos(angle) * planet.distance,
      0,
      Math.sin(angle) * planet.distance,
    );
    planetMesh.userData = { planet };
    scene.add(planetMesh);
    planetMeshes.push(planetMesh);

    const orbitGeometry = new THREE.RingGeometry(
      planet.distance - 0.1,
      planet.distance + 0.1,
      32,
    );
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.1,
    });
    const orbitLine = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbitLine.rotation.x = Math.PI / 2;
    orbitLine.position.set(0, 0, 0);
    scene.add(orbitLine);
  });
}

export function animatePlanets() {
  planetMeshes.forEach((mesh) => {
    const planet = mesh.userData.planet as Planet;
    mesh.rotation.y += planet.rotationSpeed;
    const angle = planet.offset + Date.now() * planet.orbitSpeed;

    mesh.position.set(
      Math.cos(angle) * planet.distance,
      0,
      Math.sin(angle) * planet.distance,
    );
  });
}
