import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Box } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface Props {
  colors: string[];
}

function AnimatedSphere({ colors }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.x += 0.005;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.8, 64, 64);

    const groups = geo.groups;
    groups.length = 0;

    const totalIndices = geo.index?.count || 0;
    const quarter = Math.floor(totalIndices / 4);

    geo.addGroup(0, quarter, 0);
    geo.addGroup(quarter, quarter, 1);
    geo.addGroup(quarter * 2, quarter, 2);
    geo.addGroup(
      quarter * 3,
      totalIndices - quarter * 3,
      3
    );

    return geo;
  }, []);

  const materials = [
    new THREE.MeshStandardMaterial({
      color: colors[0],
      roughness: 0.2,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: colors[1],
      roughness: 0.2,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: colors[2],
      roughness: 0.2,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: colors[3],
      roughness: 0.2,
      metalness: 0.5,
    }),
  ];

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={materials}
      position={[-2.5, 0, 0]}
    />
  );
}

function ColorChangingCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  const randomColor = () =>
    new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    );

  const [faceColors, setFaceColors] =
    useState<THREE.Color[]>(
      Array.from({ length: 6 }, () =>
        randomColor()
      )
    );

  useEffect(() => {
    const interval = setInterval(() => {
      setFaceColors(
        Array.from({ length: 6 }, () =>
          randomColor()
        )
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <Box
      ref={meshRef}
      args={[2, 2, 2]}
      position={[2.5, 0, 0]}
    >
      {faceColors.map((color, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.5}
        />
      ))}
    </Box>
  );
}

function ColorSphere3D({ colors }: Props) {
  const palette = colors.slice(0, 4);

  return (
    <div className="sphere-container">
      <h2>Visualización 3D de Armonización</h2>

      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 50,
        }}
      >
        <ambientLight intensity={1.5} />

        <pointLight
          position={[5, 5, 5]}
          intensity={40}
          color={palette[2]}
        />

        <pointLight
          position={[-5, -5, -5]}
          intensity={30}
          color={palette[3]}
        />

        <AnimatedSphere colors={palette} />

        <ColorChangingCube />
      </Canvas>
    </div>
  );
}

export default ColorSphere3D;