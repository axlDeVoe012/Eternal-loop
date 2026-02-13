import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Text,
  Environment,
  ContactShadows,
  MeshTransmissionMaterial,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

/* =====================================================
   DEVICE DETECTION
===================================================== */
const useIsMobile = () => {
  const { size } = useThree();
  return size.width < 768;
};

/* =====================================================
   PRINCESS CUT – GEOMETRY
===================================================== */
const createPrincessCutStone = () => {
  const g = new THREE.BufferGeometry();

  const size = 0.082;
  const half = size / 2;
  const table = size * 0.68;
  const crown = size * 0.16;
  const pavilion = size * 0.68;
  const chamfer = size * 0.12;

  const t = table / 2;
  const r = t * 0.96;
  const mix = 0.2;
  const blend = (round, square) => round * (1 - mix) + square * mix;

  const tableVerts = [
    0, blend(r, t), crown,
    blend(r * 0.707, t), blend(r * 0.707, t), crown,
    blend(r, t), 0, crown,
    blend(r * 0.707, t), blend(-r * 0.707, -t), crown,
    0, blend(-r, -t), crown,
    blend(-r * 0.707, -t), blend(-r * 0.707, -t), crown,
    blend(-r, -t), 0, crown,
    blend(-r * 0.707, -t), blend(r * 0.707, t), crown,
  ];

  const v = new Float32Array([
    ...tableVerts,
    -half + chamfer, -half, 0,
     half - chamfer, -half, 0,
     half, -half + chamfer, 0,
     half,  half - chamfer, 0,
     half - chamfer,  half, 0,
    -half + chamfer,  half, 0,
    -half,  half - chamfer, 0,
    -half, -half + chamfer, 0,
     0, 0, -pavilion,
  ]);

  const i = [
    0,1,9, 0,9,8, 1,2,10, 1,10,9,
    2,3,11, 2,11,10, 3,4,12, 3,12,11,
    4,5,13, 4,13,12, 5,6,14, 5,14,13,
    6,7,15, 6,15,14, 7,0,8, 7,8,15,
    0,1,2, 0,2,3, 0,3,4, 0,4,5, 0,5,6, 0,6,7,
    8,9,16, 9,10,16, 10,11,16, 11,12,16,
    12,13,16, 13,14,16, 14,15,16, 15,8,16,
  ];

  g.setAttribute("position", new THREE.BufferAttribute(v, 3));
  g.setIndex(i);
  g.computeVertexNormals();
  return g;
};

/* =====================================================
   PRONG
===================================================== */
const createProngGeometry = () =>
  new THREE.CylinderGeometry(0.0055, 0.0105, 0.058, 14);

export default function Ring() {
  const sweepLight = useRef();
  const textRef = useRef();
  const isMobile = useIsMobile();

  const stoneCount = 28;
  const arc = Math.PI; // half-band by design
  const bandRadius = 1.0;
  const bandThickness = 0.07;

  const stoneGeo = useMemo(createPrincessCutStone, []);
  const prongGeo = useMemo(createProngGeometry, []);

  const stones = useMemo(() => {
    return Array.from({ length: stoneCount }, (_, i) => {
      const angle = -arc / 2 + (i / (stoneCount - 1)) * arc;
      const r = bandRadius + bandThickness + 0.0175;
      return {
        angle,
        position: [Math.cos(angle) * r, Math.sin(angle) * r, 0],
      };
    });
  }, []);

  const prongs = useMemo(() => {
    const out = [];
    for (let i = 0; i < stones.length - 1; i++) {
      const a = new THREE.Vector3(...stones[i].position);
      const b = new THREE.Vector3(...stones[i + 1].position);
      const m = a.clone().add(b).multiplyScalar(0.5);
      const ang = Math.atan2(m.y, m.x);
      out.push({
        position: [m.x, m.y, 0.021],
        rotation: [Math.PI / 2, 0, ang],
      });
    }
    return out;
  }, [stones]);

  useFrame((state) => {
    if (sweepLight.current) {
      sweepLight.current.position.x =
        Math.sin(state.clock.elapsedTime * 0.4) * 3;
    }

    if (textRef.current) {
      textRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.9) * 0.08;
      textRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
    }
  });

  return (
    <>
      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={0.7}
        enablePan={false}
        enableZoom={!isMobile}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI / 1.45}
      />

      <Environment preset="studio" resolution={isMobile ? 1024 : 2048} />

      <directionalLight position={[6, 7, 6]} intensity={2.2} castShadow />
      <directionalLight color="#800020" position={[-3, 4, 2]} intensity={0.6} />
      <directionalLight ref={sweepLight} position={[3, 3, 3]} intensity={1.6} />
      <ambientLight intensity={0.32} />

      <Float speed={0.6} rotationIntensity={0.04} floatIntensity={0.06}>
        {/* BAND */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[bandRadius, bandThickness, 120, 320]} />
          <meshPhysicalMaterial
            color="#D4AF37"
            metalness={1}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.07}
            envMapIntensity={2}
          />
        </mesh>

        {/* STONES — FIXED */}
        {stones.map((s, i) => (
          <mesh
            key={i}
            geometry={stoneGeo}
            position={s.position}
            rotation={[0, 0, s.angle + Math.PI / 4]}
            castShadow
            frustumCulled={false}
          >
            <MeshTransmissionMaterial
              transmission={1}
              thickness={0.42}
              roughness={0}
              ior={2.417}
              chromaticAberration={0.02}
              anisotropy={0.02}
              clearcoat={1}
              backside
              depthWrite={false}
              samples={isMobile ? 6 : 12}
              resolution={isMobile ? 512 : 768}
            />
          </mesh>
        ))}

        {/* PRONGS */}
        {prongs.map((p, i) => (
          <mesh key={i} position={p.position} rotation={p.rotation}>
            <primitive object={prongGeo} />
            <meshPhysicalMaterial
              color="#D4AF37"
              metalness={1}
              roughness={0.23}
              clearcoat={1}
            />
          </mesh>
        ))}

        {/* FLOATING INITIALS */}
        <group ref={textRef}>
          <Text
            fontSize={isMobile ? 0.24 : 0.3}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.05}
          >
            KSM & GWK
            <meshPhysicalMaterial
              color="#800020"
              metalness={0.8}
              roughness={0.25}
              clearcoat={1}
            />
          </Text>
        </group>
      </Float>

      <ContactShadows
        position={[0, -1.15, 0]}
        opacity={0.4}
        scale={4.5}
        blur={2}
        far={3}
        resolution={isMobile ? 256 : 512}
      />
    </>
  );
}
