import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useCallback,
  useEffect,
  useRef,
} from '~/libs/hooks/hooks.js';
import { DEFAULT_ZOOM } from '~/libs/packages/map/libs/constants/constants.js';
import { type MapService } from '~/libs/packages/map/map.js';
import { MapConnector } from '~/libs/packages/map/map-connector.package';
import { actions as orderActions } from '~/slices/orders/order.js';

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
  center,
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

  const getMap = useCallback(async () => {
    if (mapReference.current) {
      await MapConnector.getInstance();

      mapService.current = new MapConnector().getMapService({
        mapElement: mapReference.current,
        center,
        zoom,
      });

      if (center && destination) {
        mapService.current.removeMarkers();
        mapService.current.addMarker(destination);

        void mapService.current.calculateRouteAndTime(center, destination);
      }

      if (markers.length > 0) {
        for (const marker of markers) {
          mapService.current.addMarker(marker, true);
        }
      }
    }
  }, [center, destination, markers, zoom]);

  useEffect(() => {
    void getMap();
  }, [getMap]);

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
