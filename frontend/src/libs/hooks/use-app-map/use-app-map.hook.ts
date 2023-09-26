import { useAppDispatch, useEffect, useRef } from '~/libs/hooks/hooks.js';
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
} from '~/libs/packages/map/libs/constants/constants.js';
import { type PlaceLatLng } from '~/libs/packages/map/libs/types/types.js';
import { type MapService } from '~/libs/packages/map/map.js';
import { MapConnector } from '~/libs/packages/map/map-connector.package.js';
import { actions as orderActions } from '~/slices/orders/order.js';

import { getBounds, setMapService } from './libs/helpers/helpers.js';

type Properties = {
  center: google.maps.LatLngLiteral | null;
  points?: google.maps.LatLngLiteral[];
  zoom?: number;
  destination: google.maps.LatLngLiteral | null;
  className?: string;
  pricePerKm?: number;
  startAddress?: string;
  endAddress?: string;
  onPriceChange?: (price: number) => void;
  mapReference: React.RefObject<HTMLDivElement>;
  shownRoute?: PlaceLatLng;
};

const useAppMap = ({
  points,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  destination,
  pricePerKm,
  startAddress,
  endAddress,
  mapReference,
  shownRoute,
}: Properties): void => {
  const mapService = useRef<MapService | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const configMap = async (): Promise<void> => {
      await MapConnector.getInstance();

      !mapService.current &&
        setMapService({ points, center, mapReference, mapService, zoom });

      if (mapService.current && center && destination) {
        mapService.current.removeMarkers();
        mapService.current.addMarker(destination);

        void mapService.current.calculateRouteAndTime(center, destination);
      }
    };
    void configMap();
  }, [center, destination, mapReference, points, zoom]);

  useEffect(() => {
    if (mapService.current && points && points.length > 0) {
      const bounds = getBounds(points);
      mapService.current.fitMap(bounds);

      for (const point of points) {
        mapService.current.addMarker(point, false);
      }
    }
  }, [points]);

  useEffect(() => {
    if (mapService.current && shownRoute) {
      void mapService.current.addRoute(shownRoute);
    }
  }, [shownRoute]);

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
};

export { useAppMap };
