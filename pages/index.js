import dynamic from 'next/dynamic';

const Dioniso3D = dynamic(() => import('@/components/Dioniso3D'), { ssr: false });

export default function Home() {
  return (
    <div style={{ height: '100vh' }}>
      <Dioniso3D />
    </div>
  );
}
