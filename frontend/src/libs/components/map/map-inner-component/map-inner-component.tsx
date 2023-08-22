import { useEffect, useRef } from '~/libs/hooks/hooks.js';
import { MapService } from '~/libs/packages/map/map.package';

type Properties = {
  center: google.maps.LatLngLiteral;
  zoom: number;
  origin?: google.maps.LatLngLiteral;
  destination?: google.maps.LatLngLiteral;
};

const MapInnerComponent: React.FC<Properties> = ({
  center,
  zoom,
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
    <div
      ref={mapReference}
      id="map"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export { MapInnerComponent };
