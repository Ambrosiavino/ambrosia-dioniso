import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import { Suspense, useEffect, useState, useRef } from 'react';

useGLTF.preload('/dioniso.glb');

function DionisoModel({ animationName }) {
  const gltf = useGLTF('/dioniso.glb');
  const { actions } = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    if (actions && animationName && actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play();
    }
  }, [actions, animationName]);

  return <primitive object={gltf.scene} scale={1.5} />;
}

export default function Dioniso3D() {
  const [mostraIntro, setMostraIntro] = useState(true);
  const [animazioneCorrente, setAnimazioneCorrente] = useState('Idle');
  const [musicaAttiva, setMusicaAttiva] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(
        'Benvenuto esploratore! Sono Dioniso, ed assieme scopriremo Ambrosia, il nettare degli Dei! Vuoi provare a degustare o vuoi maggiori informazioni su questo vino?'
      );
      utter.lang = 'it-IT';
      utter.pitch = 1.2;
      utter.rate = 0.95;
      synth.speak(utter);

      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.loop = true;
        audioRef.current.play();
      }
    }
  }, []);

  const gestisciDegustazione = () => {
    setAnimazioneCorrente('Wave');
    setMostraIntro(false);
    if (typeof window !== 'undefined') {
      const utter = new SpeechSynthesisUtterance(
        'Iniziamo la degustazione! Annusa, assaggia, e lasciati guidare dal mio sapere.'
      );
      utter.lang = 'it-IT';
      utter.pitch = 1.2;
      utter.rate = 0.95;
      window.speechSynthesis.speak(utter);
    }
  };

  const gestisciInfo = () => {
    setAnimazioneCorrente('Talk');
    setMostraIntro(false);
    if (typeof window !== 'undefined') {
      const utter = new SpeechSynthesisUtterance(
        'Ambrosia è un vino nato dall’armonia tra natura, arte e scienza. Ogni sorso racconta una storia.'
      );
      utter.lang = 'it-IT';
      utter.pitch = 1.2;
      utter.rate = 0.95;
      window.speechSynthesis.speak(utter);
    }
  };

  const tornaAlMenu = () => {
    setAnimazioneCorrente('Idle');
    setMostraIntro(true);
    if (typeof window !== 'undefined') {
      const utter = new SpeechSynthesisUtterance(
        'Bentornato! Vuoi continuare a degustare o sapere di più su Ambrosia?'
      );
      utter.lang = 'it-IT';
      utter.pitch = 1.2;
      utter.rate = 0.95;
      window.speechSynthesis.speak(utter);
    }
  };

  const toggleMusica = () => {
    if (audioRef.current) {
      if (musicaAttiva) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setMusicaAttiva(!musicaAttiva);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <audio ref={audioRef} src="/ambrosia-bg.mp3" />

      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 5]} />
        <Suspense fallback={<span className='text-white'>Caricamento modello...</span>}>
          <DionisoModel animationName={animazioneCorrente} />
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>

      <button
        onClick={toggleMusica}
        className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded shadow"
      >
        {musicaAttiva ? '🔈 Pausa' : '▶️ Musica'}
      </button>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4">
        {mostraIntro ? (
          <>
            <button
              onClick={gestisciDegustazione}
              className="bg-purple-600 text-white px-4 py-2 rounded shadow-md hover:bg-purple-700"
            >
              Inizia la degustazione
            </button>
            <button
              onClick={gestisciInfo}
              className="bg-gray-600 text-white px-4 py-2 rounded shadow-md hover:bg-gray-700"
            >
              Scopri il vino
            </button>
          </>
        ) : (
          <button
            onClick={tornaAlMenu}
            className="bg-yellow-600 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-700"
          >
            Torna al menu
          </button>
        )}
      </div>
    </div>
  );
}