import React from 'react';
import ServiceCanvasFactory from '../../three/canvases/ServiceCanvasFactory';

export default function Service3DScene({ sceneType }) {
  return (
    <div className="w-full">
      <ServiceCanvasFactory sceneType={sceneType || 'browser'} />
    </div>
  );
}
