import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppDispatch, useEffect, useRef } from '~/libs/hooks/hooks.js';
import { MapService } from '~/libs/packages/map/map.js';
import { actions as orderActions } from '~/slices/orders/order.js';

import styles from './styles.module.scss';

const DEFAULT_ZOOM = 16;

type Properties = {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  destination?: google.maps.LatLngLiteral;
  className?: string;
  markers?: google.maps.LatLngLiteral[];
  shownRoute?: {
    startPoint: google.maps.LatLngLiteral;
    endPoint: google.maps.LatLngLiteral;
  };
  pricePerKm?: number;
  startAddress?: string;
  endAddress?: string;
  onPriceChange?: (price: number) => void;
};

const Map: React.FC<Properties> = ({
  center,
  zoom = DEFAULT_ZOOM,
  className,
  destination,
  pricePerKm,
  startAddress,
  endAddress,
  markers,
  shownRoute,
}: Properties) => {
  const mapReference = useRef<HTMLDivElement>(null);
  const mapService = useRef<MapService | null>(null);
  const mapClasses = getValidClassNames(styles.map, className);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!mapReference.current) {
      return;
    }

    if (!center && markers) {
      const bounds = new google.maps.LatLngBounds();

      for (const marker of markers) {
        bounds.extend(marker);
      }

      mapService.current = new MapService({
        mapElement: mapReference.current,
        zoom,
        bounds,
      });

      return;
    }

    mapService.current = new MapService({
      mapElement: mapReference.current,
      center,
      zoom,
    });

    if (center && destination) {
      mapService.current.addMarker(destination);

      void mapService.current.calculateRouteAndTime(center, destination);
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

  useEffect(() => {
    if (markers && markers.length > 0) {
      for (const marker of markers) {
        mapService.current?.addMarker(marker, false);
      }
    }
  }, [markers]);

  useEffect(() => {
    if (markers && markers.length > 0) {
      for (const marker of markers) {
        mapService.current?.addMarker(marker, false);
      }

      if (shownRoute) {
        void mapService.current?.addRoute(shownRoute);
      }
    }
  }, [markers, shownRoute]);

  return <div ref={mapReference} id="map" className={mapClasses} />;
};

export { Map };
