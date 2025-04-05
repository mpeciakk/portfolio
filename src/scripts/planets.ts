import { planets, type Planet } from "@/constants/planets.ts";
import * as THREE from "three";

export const planetMeshes: THREE.Mesh[] = [];
let sun: THREE.Mesh;

export function createSun(scene: THREE.Scene) {
  const sunGeometry = new THREE.SphereGeometry(10, 8, 8);
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 0.8,
  });
  sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.set(0, 0, 0);
  scene.add(sun);

  const sunGlow = new THREE.Mesh(
    new THREE.SphereGeometry(12, 8, 8),
    new THREE.MeshBasicMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.2,
    }),
  );
  scene.add(sunGlow);
}

export function animateSun() {
  sun.rotation.y += 0.0001;
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
