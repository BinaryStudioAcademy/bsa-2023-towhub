import { useEffect, useRef } from '~/libs/hooks/hooks.js';
import { MapService } from '~/libs/packages/map/map.js';
import  { type MapType } from '~/libs/types/types.js';

import styles from './map.module.scss';

type Properties = MapType & {
  className?: string;
};

const MapInnerComponent: React.FC<Properties> = ({
  center,
  zoom, 
  className,
}: Properties) => {
  const mapReference = useRef<HTMLDivElement>(null);
  const mapService = useRef<MapService | null>(null);

  useEffect(() => {
    if (mapReference.current) {
      mapService.current = new MapService({
        mapElement: mapReference.current,
        center,
        zoom,
      });
      mapService.current.addMarker(center);
    }
  }, [center, zoom]);

  return (
    <div ref={mapReference} id="map" className={className ?? styles.map} />
  );
};

export { MapInnerComponent };
