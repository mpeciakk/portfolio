export interface Planet {
  name: string;
  radius: number;
  distance: number;
  color: string;
  description: string;
  rotationSpeed: number;
  orbitSpeed: number;
  offset: number;
  icon: string;
  techStack: string[];
}

export const planets: Planet[] = [
  {
    name: "Webworld",
    radius: 1.5,
    distance: 30,
    color: "#3498db",
    description:
      "Full Stack Engineering - Building scalable web applications and APIs",
    rotationSpeed: 0.0025,
    orbitSpeed: 0.00005,
    offset: 0,
    icon: "🌐",
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
  },
  {
    name: "Mobile Core",
    radius: 1.2,
    distance: 40,
    color: "#2ecc71",
    description: "Native and Cross-Platform Mobile Development",
    rotationSpeed: 0.002,
    orbitSpeed: 0.00004,
    offset: Math.PI / 6,
    icon: "📱",
    techStack: ["Flutter", "Swift", "Kotlin", "React Native"],
  },
  {
    name: "Kernel Abyss",
    radius: 1,
    distance: 50,
    color: "#e74c3c",
    description: "OS Development & Low-Level Programming",
    rotationSpeed: 0.0015,
    orbitSpeed: 0.00003,
    offset: Math.PI / 7,
    icon: "🧠",
    techStack: ["C", "Assembly", "Rust", "Linux Kernel"],
  },
  {
    name: "GameGrid",
    radius: 1.3,
    distance: 60,
    color: "#f1c40f",
    description: "Game Engine Development & Game Programming",
    rotationSpeed: 0.00225,
    orbitSpeed: 0.00002,
    offset: Math.PI / 8,
    icon: "🎮",
    techStack: ["C++", "OpenGL", "Unity", "Unreal Engine"],
  },
];
