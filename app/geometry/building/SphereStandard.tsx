import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import vertexShader from "./shaders/standard_vertex.glsl";
import fragmentShader from "./shaders/standard_fragment.glsl";

export default function SphereStandard() {
  const { scene } = useThree();
  const matRef = useRef();

  useEffect(() => {
    if (matRef.current && scene.environment) {
      matRef.current.uniforms.envMap.value = scene.environment;
      //matRef.current.envMap = scene.environment;
      console.log(matRef.current);
    }
    //console.log(matRef.current.uniforms)
  }, [scene.environment]);

  return (
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
            envMapIntensity: { value: 3 },
            reflectivity: { value: 1.0 },
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
          //ENV_WORLDPOS: true,
          //ENVMAP_TYPE_CUBE: true,
          //ENVMAP_MODE_REFLECTION: true,
          //USE_ANISOTROPY: true,
          //ENVMAP_TYPE_CUBE_UV: true,
        }}
        lights={true}
        fog={true}
      />
      <sphereGeometry args={[5.0]} />
    </mesh>
  );
}
