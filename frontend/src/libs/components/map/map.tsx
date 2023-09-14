import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useEffect, useRef } from '~/libs/hooks/hooks.js';
import { MapService } from '~/libs/packages/map/map.js';

import styles from './styles.module.scss';

type Properties = {
  center?: google.maps.LatLngLiteral;
  zoom: number;
  origin?: google.maps.LatLngLiteral;
  destination?: google.maps.LatLngLiteral;
  className?: string;
  pricePerKm?: number;
  startAddress?: string;
  endAddress?: string;
  onPriceChange?: (price: number) => void;
};

const Map: React.FC<Properties> = ({
  center = { lat: 1, lng: 1 },
  zoom,
  className,
  destination,
  pricePerKm,
  startAddress,
  endAddress,
  onPriceChange,
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

      if (destination) {
        mapService.current.addMarker(destination);

        void mapService.current.calculateRouteAndTime(center, destination);

        if (onPriceChange && pricePerKm && startAddress && endAddress) {
          void mapService.current
            .calculatePrice({
              startPoint: startAddress,
              endPoint: endAddress,
              pricePerKm,
            })
            .then((result) => {
              onPriceChange(result.price);
            });
        }
      }
    }
  }, [
    center,
    zoom,
    destination,
    onPriceChange,
    pricePerKm,
    startAddress,
    endAddress,
  ]);

  return <div ref={mapReference} id="map" className={mapClasses} />;
};

export { Map };
