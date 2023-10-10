import * as THREE from "three";
import vertexShader from "./shaders/custom/lambert_vertex.glsl";
import fragmentShader from "./shaders/custom/lambert_fragment.glsl";

export default function SphereCustomLambert() {
  return (
    <mesh castShadow position={[40.0, -40.0, 10.0]}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.FrontSide}
        uniforms={THREE.UniformsUtils.merge([
          THREE.UniformsLib["lights"], // this is god damn important to have the bracket there, otherwise error
          THREE.UniformsLib["fog"],
          {
            diffuse: { value: new THREE.Color(0x00ff00) },
            emissive: { value: new THREE.Color(0x000000) },
          },

          //emissive:{value: new THREE.Color( 0x000000 )},
          //opacity: { value: 1.0 },
          //ambientLightColor: { value: new THREE.Color( 0xffffff ) },
          //receiveShadow: {value: true }
        ])}
        lights={true}
        fog={true}
      />
      <sphereGeometry args={[5.0]} />
    </mesh>
  );
}
