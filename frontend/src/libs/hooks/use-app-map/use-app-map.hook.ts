import { useAppDispatch, useEffect, useRef } from '~/libs/hooks/hooks.js';
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  ZOOM_WITHOUT_USER_LOCATION,
} from '~/libs/packages/map/libs/constants/constants.js';
import { type MapService } from '~/libs/packages/map/map.js';
import { MapConnector } from '~/libs/packages/map/map-connector.package.js';
import { actions as orderActions } from '~/slices/orders/order.js';

type Properties = {
  center: google.maps.LatLngLiteral | null;
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
};

const useAppMap = ({
  center,
  zoom = ZOOM_WITHOUT_USER_LOCATION,
  userLocation,
  destination,
  markers = [],
  pricePerKm,
  startAddress,
  endAddress,
  mapReference,
}: Properties): void => {
  const mapService = useRef<MapService | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const configMap = async (): Promise<void> => {
      await MapConnector.getInstance();

      mapService.current = new MapConnector().getMapService({
        mapElement: mapReference.current,
        center: center ?? DEFAULT_CENTER,
        zoom,
      });

      if (userLocation) {
        mapService.current.addMarker(userLocation);
        mapService.current.setZoom(DEFAULT_ZOOM);
      }

      if (center && destination) {
        mapService.current.removeMarkers();
        mapService.current.addMarker(destination);

        void mapService.current.calculateRouteAndTime(center, destination);
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
  }, [center, destination, mapReference, markers, userLocation, zoom]);

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
