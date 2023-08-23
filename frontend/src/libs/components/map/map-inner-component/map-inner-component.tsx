import clsx from 'clsx';

import { useEffect, useRef } from '~/libs/hooks/hooks.js';
import { MapService } from '~/libs/packages/map/map.package';

import styles from './map.module.scss';

type Properties = {
  center: google.maps.LatLngAltitude;
  zoom: number;
  className?: string;
};

const MapInnerComponent: React.FC<Properties> = ({
  center,
  zoom,
  className,
}: Properties) => {
  const mapReference = useRef<HTMLDivElement>(null);
  const mapService = useRef<MapService | null>(null);
  const mapClasses = clsx(styles.map, className);

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

  return <div ref={mapReference} id="map" className={mapClasses} />;
};

export { MapInnerComponent };
