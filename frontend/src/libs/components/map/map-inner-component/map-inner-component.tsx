import { useEffect, useRef } from 'react';

type Properties = {
    center: google.maps.LatLngLiteral,
    zoom: number,
  };
  
  const MapInnerComponent: React.FC<Properties> = ({ center, zoom }: Properties ) => {
    const reference_ = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (reference_.current) {
        new window.google.maps.Map(reference_.current, {
          center,
          zoom,
        });
      }
    }, [center, zoom]);
    
    return <div ref={reference_} id="map" style={{ width: '100%', height: '100%' }} />;
  };

export  { MapInnerComponent };
