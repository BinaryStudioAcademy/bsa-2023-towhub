import { useAppDispatch, useEffect, useRef } from '~/libs/hooks/hooks.js';
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  ZOOM_WITHOUT_USER_LOCATION,
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
  userLocation?: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral | null;
  markers?: google.maps.LatLngLiteral[];
  className?: string;
  pricePerKm?: number;
  startAddress?: string;
  endAddress?: string;
  onPriceChange?: (price: number) => void;
  mapReference: React.RefObject<HTMLDivElement>;
  shownRoute?: PlaceLatLng;
  onMapLoad?: () => void;
};

const useAppMap = ({
  points,
  center = DEFAULT_CENTER,
  zoom = ZOOM_WITHOUT_USER_LOCATION,
  userLocation,
  destination,
  markers = [],
  pricePerKm,
  startAddress,
  endAddress,
  mapReference,
  shownRoute,
  onMapLoad,
}: Properties): void => {
  const mapService = useRef<MapService | null>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    MapConnector.dropMap();
  }, []);

  useEffect(() => {
    const configMap = async (): Promise<void> => {
      await MapConnector.getInstance();

      setMapService({ points, center, mapReference, mapService, zoom });

      if (!mapService.current) {
        return;
      }

      if (center && destination) {
        mapService.current.removeMarkers();
        mapService.current.addMarker(destination);

        void mapService.current.calculateRouteAndTime(center, destination);
      }

      if (userLocation) {
        mapService.current.addMarker(userLocation);
        mapService.current.setZoom(DEFAULT_ZOOM);
      }

      if (markers.length > 0) {
        mapService.current.removeMarkers();

        if (userLocation) {
          mapService.current.addMarker(userLocation);
        }

        for (const marker of markers) {
          mapService.current.addMarker(marker, true);
        }
      }
    };
    void configMap();
  }, [
    center,
    destination,
    mapReference,
    onMapLoad,
    markers,
    points,
    userLocation,
    zoom,
  ]);

  useEffect(() => {
    if (mapService.current && points && points.length > 0) {
      const bounds = getBounds(points);
      mapService.current.fitMap(bounds);

      for (const point of points) {
        mapService.current.addMarker(point, false);
      }

      if (shownRoute) {
        void mapService.current.addRoute(shownRoute);
      }
    }
  }, [points, shownRoute]);

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
