import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useRef } from '~/libs/hooks/hooks.js';
import { MapService } from '~/libs/packages/map/map.js';

import styles from './styles.module.scss';

type Properties = {
  center: google.maps.LatLngLiteral;
  zoom: number;
  origin?: google.maps.LatLngLiteral;
  destination?: google.maps.LatLngLiteral;
  className?: string;
  markers?: google.maps.LatLngLiteral[];
  shownRoute?: {
    startPoint: google.maps.LatLngLiteral;
    endPoint: google.maps.LatLngLiteral;
  };
};

const MapInnerComponent: React.FC<Properties> = ({
  center,
  zoom,
  className,
  markers = [],
  shownRoute,
}: Properties) => {
  const mapReference = useRef<HTMLDivElement>(null);
  const mapService = useRef<MapService | null>(null);
  const mapClasses = getValidClassNames(styles.map, className);

  const showRoute = useCallback(async (): Promise<void> => {
    if (!shownRoute) {
      return;
    }
    mapService.current && (await mapService.current.addRoute(shownRoute));
  }, [shownRoute]);

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

      void showRoute();
    }
  }, [center, zoom, markers, shownRoute, showRoute]);

  return <div ref={mapReference} id="map" className={mapClasses} />;
};

export { MapInnerComponent };
