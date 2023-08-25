const THREE = require('three');

// Step 1: Define the path of the road
let points = [
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(0, 0, 10),
    new THREE.Vector3(10, 0, 0)
];
let curve = new THREE.CatmullRomCurve3(points);

let roadWidth = 2;

// Step 2: Compute the width of the road
let segments = 50;
let pathPoints = curve.getPoints(segments);
let roadShape = new THREE.Shape();

for (let i = 0; i < pathPoints.length - 1; i++) {
    let start = pathPoints[i];
    let end = pathPoints[i + 1];

    let direction = new THREE.Vector3().subVectors(end, start).normalize();
    let perpendicular = new THREE.Vector3(direction.z, 0, -direction.x).multiplyScalar(roadWidth * 0.5);

    if (i === 0) {
        roadShape.moveTo(start.x + perpendicular.x, start.z + perpendicular.z);
    }

    roadShape.lineTo(end.x + perpendicular.x, end.z + perpendicular.z);
}

for (let i = pathPoints.length - 2; i >= 0; i--) {
    let start = pathPoints[i + 1];
    let end = pathPoints[i];

    let direction = new THREE.Vector3().subVectors(end, start).normalize();
    let perpendicular = new THREE.Vector3(-direction.z, 0, direction.x).multiplyScalar(roadWidth * 0.5);

    roadShape.lineTo(end.x + perpendicular.x, end.z + perpendicular.z);
}

// Step 3: Generate the ShapeGeometry
let roadGeometry = new THREE.ShapeBufferGeometry(roadShape);
let roadMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
let roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);

// Adding roadMesh to the scene
scene.add(roadMesh);