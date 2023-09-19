import { useAppDispatch, useEffect, useRef } from '~/libs/hooks/hooks.js';
import { type MapService } from '~/libs/packages/map/map.js';
import { mapServiceFactory } from '~/libs/packages/map/map-service-factory.js';
import { actions as orderActions } from '~/slices/orders/order.js';

const DEFAULT_ZOOM = 16;

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
  center,
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
    const configMap = async (): Promise<void> => {
      mapService.current = await mapServiceFactory({
        mapElement: mapReference.current,
        center: center ?? { lat: 0, lng: 0 },
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
