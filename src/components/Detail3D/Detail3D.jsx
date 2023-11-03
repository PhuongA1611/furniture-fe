import { Canvas, useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { OrbitControls, Stage } from '@react-three/drei';
import './Detail3D.scss';

const threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 800);
threeCamera.position.set(0, 1, 5);

const Detail3D = (props) => {
  const { product3D } = props;
  const glb = useLoader(GLTFLoader, product3D);
  return (
    <div className="Detail3D">
      <Canvas shadows camera={threeCamera}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[0, 0, -5]} intensity={0.25} />
        <Suspense fallback={null}>
          <Stage contactShadow adjustCamera intensity={1} environment={null} makeDefault>
            <mesh position={[0, -50, 0]}>
              <primitive object={glb.scene} />
            </mesh>
          </Stage>
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Detail3D;
