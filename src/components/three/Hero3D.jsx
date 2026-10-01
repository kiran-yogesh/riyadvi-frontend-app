import React from 'react';
import HeroCanvas from '../../three/canvases/HeroCanvas';

export default function Hero3D() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <HeroCanvas />
    </div>
  );
}
