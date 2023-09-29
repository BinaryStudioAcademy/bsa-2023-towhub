import { useAppMap, useRef } from '~/libs/hooks/hooks.js';
import { DEFAULT_CENTER } from '~/libs/packages/map/libs/constants/constants.js';
import { type Coordinates } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  userLocation?: Coordinates;
  markers?: Coordinates[];
};

const Map = ({ userLocation, markers }: Properties): JSX.Element => {
  const mapReference = useRef<HTMLDivElement>(null);
  useAppMap({
    className: styles.mapComponent,
    mapReference: mapReference,
    center: userLocation ?? DEFAULT_CENTER,
    userLocation,
    destination: null,
    markers,
  });

  return <div ref={mapReference} id="map" className={styles.mapComponent} />;
};

export { Map };
