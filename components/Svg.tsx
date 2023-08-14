import Cell from '@/components/Cell'
import { useLoader } from '@react-three/fiber'
import { useRef, useLayoutEffect, useMemo } from 'react'
import { SVGLoader } from 'three-stdlib'
import * as THREE from 'three'

export default function Svg({ url }) {
    const { paths } = useLoader(SVGLoader, url)
    const shapes = useMemo(
      () => paths.flatMap((p) => p.toShapes(true).map((shape) => ({ shape, color: p.color, fillOpacity: p.userData.style.fillOpacity }))),
      [paths]
    )
  
    const ref = useRef()
    useLayoutEffect(() => {
      const sphere = new THREE.Box3().setFromObject(ref.current).getBoundingSphere(new THREE.Sphere())
      ref.current.position.set(-sphere.center.x, -sphere.center.y, 0)
    }, [])
  
    return (
      <group ref={ref}>
        {shapes.map((props, index) => (
          <Cell key={props.shape.uuid} {...props} />
        ))}
      </group>
    )
  }