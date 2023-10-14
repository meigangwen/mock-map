import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import vertexShader from "./shaders/standard_vertex.glsl";
import fragmentShader from "./shaders/standard_fragment.glsl";
import * as THREE from "three";

const MeshEdgeMaterial = shaderMaterial(
  { diffuse: new THREE.Color(1.0, 0.0, 0.0) },
  vertexShader,
  fragmentShader
);

extend({ MeshEdgeMaterial });
