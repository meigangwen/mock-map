import { useState, useEffect } from 'react'
import * as THREE from 'three'

export default function Scatter() {
   
    let polygonVertices = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(5, 0),
        new THREE.Vector2(5, 5),
        new THREE.Vector2(0, 5)
    ]

    // Get the bounding box of the polygon
    let boundingBox = new THREE.Box2().setFromPoints(polygonVertices);

    // Step 2 & 3: Generate random points and check if they fall inside the polygon
    function isPointInPolygon(point, polygonVertices) {
        let x = point.x, y = point.y;

        let inside = false;
        for (let i = 0, j = polygonVertices.length - 1; i < polygonVertices.length; j = i++) {
            let xi = polygonVertices[i].x, yi = polygonVertices[i].y;
            let xj = polygonVertices[j].x, yj = polygonVertices[j].y;

            let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    }

    let points = [];
    for (let i = 0; i < 1000; i++) {
        let x = Math.random() * (boundingBox.max.x - boundingBox.min.x) + boundingBox.min.x;
        let y = Math.random() * (boundingBox.max.y - boundingBox.min.y) + boundingBox.min.y;

        let point = new THREE.Vector2(x, y);

        if (isPointInPolygon(point, polygonVertices)) {
            points.push(new THREE.Vector3(x, y, 0)); // Step 4: Create THREE.Vector3 objects for points inside the polygon
        }
    }

    // Step 5: Add the points to the Three.js scene
    let geometry = new THREE.BufferGeometry().setFromPoints(points);
    let material = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.1 });
    let pointCloud = new THREE.Points(geometry, material);

    

    return (
        <mesh>
            <boxGeometry />
        </mesh>
    )
}