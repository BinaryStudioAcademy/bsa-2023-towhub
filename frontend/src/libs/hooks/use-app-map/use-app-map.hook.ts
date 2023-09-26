import { useAppDispatch, useEffect, useRef } from '~/libs/hooks/hooks.js';
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
} from '~/libs/packages/map/libs/constants/constants.js';
import { type MapService } from '~/libs/packages/map/map.js';
import { MapConnector } from '~/libs/packages/map/map-connector.package.js';
import { actions as orderActions } from '~/slices/orders/order.js';

type Properties = {
  center: google.maps.LatLngLiteral | null;
  zoom?: number;
  destination: google.maps.LatLngLiteral | null;
  className?: string;
  pricePerKm?: number;
  startAddress?: string;
  endAddress?: string;
  onPriceChange?: (price: number) => void;
  mapReference: React.RefObject<HTMLDivElement>;
};

const useAppMap = ({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  destination,
  pricePerKm,
  startAddress,
  endAddress,
  mapReference,
}: Properties): void => {
  const mapService = useRef<MapService | null>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    MapConnector.dropMap();
  }, []);

  useEffect(() => {
    const configMap = async (): Promise<void> => {
      await MapConnector.getInstance();
      mapService.current = new MapConnector().getMapService({
        mapElement: mapReference.current,
        center: center ?? DEFAULT_CENTER,
        zoom,
      });

      if (center && destination) {
        mapService.current.removeMarkers();
        mapService.current.addMarker(destination);

        void mapService.current.calculateRouteAndTime(center, destination);
      }
    };
    void configMap();
  }, [center, destination, mapReference, zoom]);

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
