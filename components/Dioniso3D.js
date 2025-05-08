
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

function DionisoModelFallback() {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial color="purple" />
    </mesh>
  );
}

export default function Dioniso3D() {
  return (
    <div className="relative w-full h-screen bg-black text-white flex items-center justify-center">
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 5]} />
        <Suspense fallback={<DionisoModelFallback />}>
          <DionisoModelFallback />
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>
      <div className="absolute bottom-10 text-center space-y-4">
        <p className="text-xl font-semibold">Benvenuto esploratore!</p>
        <p className="text-sm">La versione completa di Dioniso 3D è in arrivo.</p>
      </div>
    </div>
  );
}
