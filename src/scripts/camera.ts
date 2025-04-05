import type { Planet } from "@/constants/planets.ts";
import { planetMeshes } from "./planets.ts";
import * as THREE from "three";

export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

export const mouse = new THREE.Vector2();
export const raycaster = new THREE.Raycaster();

let cameraAnimation: number | null = null;
let currentPlanet: Planet | null = null;
let currentPlanetMesh: THREE.Mesh | null = null;
const originalCameraPosition = new THREE.Vector3(20, 10, 50);
const originalCameraRotation = new THREE.Euler(-0.3, 0, -0.2);

export function createCamera() {
  camera.position.copy(originalCameraPosition);
  camera.rotation.copy(originalCameraRotation);
}

export function zoomIn(planet: Planet) {
  if (currentPlanet === planet) {
    return;
  }

  const planetMesh = planetMeshes.find(
    (mesh) => mesh.userData.planet === planet,
  );

  if (!planetMesh) return;

  currentPlanet = planet;
  currentPlanetMesh = planetMesh;

  const startTime = Date.now();
  const duration = 2000;
  const startPosition = camera.position.clone();
  const startRotation = camera.rotation.clone();

  function animation() {
    if (!planetMesh) return;

    const targetPosition = new THREE.Vector3();
    targetPosition.copy(planetMesh.position);
    targetPosition.y += planet.radius * 2;
    targetPosition.z += planet.radius * 3;

    const targetQuaternion = new THREE.Quaternion();
    targetQuaternion.setFromRotationMatrix(
      new THREE.Matrix4().lookAt(
        targetPosition,
        planetMesh.position,
        new THREE.Vector3(0, 1, 0),
      ),
    );
    const targetRotation = new THREE.Euler().setFromQuaternion(
      targetQuaternion,
    );

    if (
      animationStep(
        startTime,
        duration,
        startPosition,
        targetPosition,
        startRotation,
        targetRotation,
      )
    ) {
      cameraAnimation = requestAnimationFrame(animation);
    } else {
      cameraAnimation = null;
    }
  }

  animation();
}

export function zoomOut() {
  if (cameraAnimation && !currentPlanet) {
    return;
  }

  const startTime = Date.now();
  const duration = 2000;
  const startPosition = camera.position.clone();
  const startRotation = camera.rotation.clone();

  function animation() {
    if (
      animationStep(
        startTime,
        duration,
        startPosition,
        originalCameraPosition,
        startRotation,
        originalCameraRotation,
      )
    ) {
      cameraAnimation = requestAnimationFrame(animation);
    } else {
      cameraAnimation = null;
    }
  }

  animation();

  currentPlanet = null;
  currentPlanetMesh = null;
}

function animationStep(
  startTime: number,
  duration: number,
  startPosition: THREE.Vector3,
  targetPosition: THREE.Vector3,
  startRotation: THREE.Euler,
  targetRotation: THREE.Euler,
) {
  const elapsed = Date.now() - startTime;
  const progress = Math.min(elapsed / duration, 1);

  const easeProgress =
    progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

  if (progress < 1) {
    camera.position.lerpVectors(startPosition, targetPosition, easeProgress);

    camera.rotation.x = THREE.MathUtils.lerp(
      startRotation.x,
      targetRotation.x,
      easeProgress,
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      startRotation.y,
      targetRotation.y,
      easeProgress,
    );
    camera.rotation.z = THREE.MathUtils.lerp(
      startRotation.z,
      targetRotation.z,
      easeProgress,
    );
  }

  return progress < 1;
}

export function updateCamera() {
  if (currentPlanet && currentPlanetMesh && !cameraAnimation) {
    const cameraOffset = new THREE.Vector3(
      0,
      currentPlanet.radius * 2,
      currentPlanet.radius * 3,
    );
    camera.position.copy(currentPlanetMesh.position).add(cameraOffset);
    camera.lookAt(currentPlanetMesh.position);
  }
}

function onPlanetClick(event: MouseEvent) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planetMeshes);

  if (intersects.length > 0 && intersects[0]?.object.userData.planet) {
    const planet = intersects[0].object.userData.planet as Planet;
    zoomIn(planet);
  } else {
    zoomOut();
  }
}

window.addEventListener("click", onPlanetClick);
