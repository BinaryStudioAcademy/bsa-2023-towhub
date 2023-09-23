import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppDispatch, useEffect, useRef } from '~/libs/hooks/hooks.js';
import { MapService } from '~/libs/packages/map/map.js';
import { actions as orderActions } from '~/slices/orders/order.js';

import { DEFAULT_CENTER, DEFAULT_ZOOM } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  destination?: google.maps.LatLngLiteral;
  className?: string;
  markers?: google.maps.LatLngLiteral[];
  pricePerKm?: number;
  startAddress?: string;
  endAddress?: string;
  onPriceChange?: (price: number) => void;
};

const Map: React.FC<Properties> = ({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  className,
  markers = [],
  destination,
  pricePerKm,
  startAddress,
  endAddress,
}: Properties) => {
  const mapReference = useRef<HTMLDivElement>(null);
  const mapService = useRef<MapService | null>(null);
  const mapClasses = getValidClassNames(styles.map, className);

  const dispatch = useAppDispatch();

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
      }

      if (markers.length > 0) {
        for (const marker of markers) {
          mapService.current.addMarker(marker, true);
        }
      }
    }
  }, [center, zoom, destination, markers]);

  useEffect(() => {
    if (pricePerKm && startAddress && endAddress) {
      void dispatch(
        orderActions.calculateOrderPrice({
          startAddress,
          endAddress,
          pricePerKm,
        }),
      );
    }
  }, [dispatch, endAddress, startAddress, pricePerKm]);

  return <div ref={mapReference} id="map" className={mapClasses} />;
};

export { Map };
