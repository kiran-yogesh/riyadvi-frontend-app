import React from 'react';
import HeroCanvas from '../../three/canvases/HeroCanvas';

export default function Hero3DPlaceholder() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
      <HeroCanvas />
    </div>
  );
}
