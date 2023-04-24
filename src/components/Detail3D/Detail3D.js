import { Canvas, useLoader } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from "three";

import './Detail3D.scss'
import { OrbitControls, Stage } from '@react-three/drei';

const threeCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.5,
    800
);
threeCamera.position.set(0, 1, 5);
// threeCamera.zoom = 1;

const Detail3D = (props) => {
    const { product3D } = props;
    // console.log(product3D);
    const gltf = useLoader(GLTFLoader, product3D)
    return (
        <div className='Detail3D'>
            <Canvas
                shadows
                // camera={{ position: [0, 0, 80], fov: 70 }}
                camera={threeCamera}
            // flat linear
            >
                <ambientLight intensity={0.25} />
                <directionalLight position={[0, 0, -5]} intensity={0.25} />
                {/* <directionalLight position={[0, 10, 50]} intensity={0.5} /> */}
                <Suspense fallback={null}>
                    <Stage
                        contactShadow
                        // shadows 
                        adjustCamera
                        intensity={1}
                        environment={null} 
                        // preset="rembrandt" 
                        makeDefault
                        // preset="rembrandt" 
                        // intensity={1} 
                        // environment="city"
                    >
                        <mesh position={[0, -50, 0]}>
                            <primitive object={gltf.scene} />
                        </mesh>
                    </Stage>

                </Suspense>

                <OrbitControls />

            </Canvas>
        </div>
    )
}

export default Detail3D
