import { useAppMap, useRef } from '~/libs/hooks/hooks.js';
import { type PlaceLatLng } from '~/libs/packages/map/libs/types/place-lat-lng.type';
import { type Coordinates } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  points: Coordinates[];
  shownRoute?: PlaceLatLng;
};

const MapOrders: React.FC<Properties> = ({
  points,
  shownRoute,
}: Properties) => {
  const mapReference = useRef<HTMLDivElement>(null);

  useAppMap({
    mapReference: mapReference,
    points,
    shownRoute,
    center: null,
    destination: null,
  });

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.map} ref={mapReference} id="map" />
    </div>
  );
};

export { MapOrders };
