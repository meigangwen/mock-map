"use client";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Stats, MapControls, Environment, useHelper } from "@react-three/drei";
import Building from "./Building";
import Floor from "./Floor";
import FloorCustom from "./FloorCustom";
import Sphere from "./Sphere";
import SphereLambert from "./SphereLambert";
import SphereCustomLambert from "./SphereCustomLambert";
import SphereStandard from "./SphereStandard";
import Lights from "./Lights";
import * as THREE from "three";

import vertexShader from "./shaders/standard_vertex.glsl";
import fragmentShader from "./shaders/standard_fragment.glsl";

export default function App() {
  const matRef = useRef();
  const created = ({ gl, scene }) => {
    console.log(scene);
    //scene.background = new THREE.Color("#ff0000");
    //gl.setClearColor("#ff0000", 1);
    if (matRef.current) {
      matRef.current.uniforms.envMap.value = scene.environment;
      console.log(matRef.current);
    }
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 100], zoom: 2, up: [0, 0, 1], far: 1000 }}
      onCreated={created}
    >
      <color args={["black"]} attach="background" />
      <fog attach="fog" args={["white", 50, 500]} />
      <Building />
      <FloorCustom />
      <Sphere />

      <SphereCustomLambert />

      <mesh castShadow position={[-20.0, -60.0, 10.0]}>
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={THREE.FrontSide}
          uniforms={THREE.UniformsUtils.merge([
            THREE.UniformsLib["common"],
            THREE.UniformsLib["lights"], // this is god damn important to have the bracket there, otherwise error
            THREE.UniformsLib["fog"],
            THREE.UniformsLib["lightmap"],
            THREE.UniformsLib["emissivemap"],
            THREE.UniformsLib["envmap"],
            THREE.UniformsLib["aomap"],
            {
              diffuse: { value: new THREE.Color(0xff0000) },
              emissive: { value: new THREE.Color(0x000000) },
              roughness: { value: 1.0 },
              metalness: { value: 0.0 },
              envMapIntensity: { value: 1 },
              //envMap: { value: envMap },
              //reflectivity: { value: 1.0 }, // basic, lambert, phong
              //ior: { value: 1.5 }, // physical
              //refractionRatio: { value: 0.98 }, // basic, lambert, phong
            },
            /*
          THREE.ShaderLib.standard["uniforms"], // this is god damn important to have the bracket there, otherwise error
          {
            diffuse: { value: new THREE.Color(0xff0000) },
            emissive: { value: new THREE.Color(0x000000) },
            roughness: { value: 1 },
            metalness: { value: 0 },
            //envMap:{value: envMap}
            //reflectivity: { value: 0.6 },
          },
          */
            //emissive:{value: new THREE.Color( 0x000000 )},
            //opacity: { value: 1.0 },
            //ambientLightColor: { value: new THREE.Color( 0xffffff ) },
            //receiveShadow: {value: true }
          ])}
          defines={{
            PHYSICAL: true,
            USE_ENVMAP: true,
            //ENVMAP_TYPE_CUBE: true,
          }}
          lights={true}
          fog={true}
        />
        <sphereGeometry args={[5.0]} />
      </mesh>

      <Lights />
      <Environment preset="city" background />

      <MapControls enableRotate={true} />
      <Stats />
    </Canvas>
  );
}
