import * as THREE from "three";

export function createBackground() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 5000;
  const starPositions = new Float32Array(starCount * 3);
  const starSizes = new Float32Array(starCount);
  const starColors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const radius = 100 + Math.random() * 900;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    starPositions[i * 3] = x;
    starPositions[i * 3 + 1] = y;
    starPositions[i * 3 + 2] = z;

    starSizes[i] = 0.1 + Math.random() * 0.4;

    const brightness = 0.5 + Math.random() * 0.5;
    starColors[i * 3] = brightness;
    starColors[i * 3 + 1] = brightness;
    starColors[i * 3 + 2] = brightness;
  }

  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(starPositions, 3),
  );
  starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));
  starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

  const starMaterial = new THREE.PointsMaterial({
    size: 1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });

  const stars = new THREE.Points(starGeometry, starMaterial);

  return stars;
}

export function createGradientBackground() {
  const vertexShader = `
    uniform vec3 u_worldCenter;

    varying vec2 vCenterUV;
    varying vec2 vUv;

    void main() {
      vUv = uv;

      vec4 clipCenter = projectionMatrix * modelViewMatrix * vec4(u_worldCenter, 1.0);
      
      vec2 ndc = clipCenter.xy / clipCenter.w;

      vCenterUV = ndc * 0.5 + 0.5;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float u_radius;
    uniform vec3 fromColor;
    uniform vec3 toColor;

    varying vec2 vUv;
    varying vec2 vCenterUV;

    void main() {
      float dist = distance(vUv, vCenterUV);
      float t = clamp(dist / u_radius, 0.0, 1.0);

      vec3 color = mix(toColor, fromColor, t);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const geometry = new THREE.PlaneGeometry(5000, 5000);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      u_resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      u_worldCenter: { value: new THREE.Vector3(0, 0, 0) },
      u_radius: { value: 0.2 },
      fromColor: { value: new THREE.Color("#000000") },
      toColor: { value: new THREE.Color("#2a2a85") },
    },
    depthWrite: false,
    depthTest: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.renderOrder = -1;
  mesh.position.z -= 100;
  return mesh;
}
