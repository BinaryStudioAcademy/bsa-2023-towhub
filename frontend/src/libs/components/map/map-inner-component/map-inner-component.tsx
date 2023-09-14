import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useEffect, useRef } from '~/libs/hooks/hooks.js';
import { MapService } from '~/libs/packages/map/map.js';

import styles from './styles.module.scss';

type Properties = {
  center: google.maps.LatLngLiteral;
  zoom: number;
  origin?: google.maps.LatLngLiteral;
  destination?: google.maps.LatLngLiteral;
  className?: string;
  markers?: google.maps.LatLngLiteral[];
};

const MapInnerComponent: React.FC<Properties> = ({
  center,
  zoom,
  className,
  markers = [],
}: Properties) => {
  const mapReference = useRef<HTMLDivElement>(null);
  const mapService = useRef<MapService | null>(null);
  const mapClasses = getValidClassNames(styles.map, className);

  useEffect(() => {
    if (mapReference.current) {
      mapService.current = new MapService({
        mapElement: mapReference.current,
        center,
        zoom,
      });

      mapService.current.addMarker(center);

      for (const marker of markers) {
        mapService.current.addMarker(marker);
      }
    }
  }, [center, zoom, markers]);

  return <div ref={mapReference} id="map" className={mapClasses} />;
};

export { MapInnerComponent };
