import { IconName } from '~/libs/enums/icon-name.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type TruckEntity } from '~/libs/types/types.js';

import { Badge } from '../badge/badge.js';
import { Button } from '../button/button.js';
import { Icon } from '../icon/icon.js';
import { StarRating } from '../star-rating/star-rating.jsx';
import { getTowTruckImage } from './lib/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  truck: TruckEntity;
  rating: {
    averageRating: number;
    reviewCount: number;
  };
  distance: number;
  hasFooter?: boolean;
};

const TowTruckCard: React.FC<Properties> = ({
  truck,
  rating,
  distance,
  hasFooter = true,
}: Properties) => {
  const { manufacturer, capacity, pricePerKm, towType } = truck;
  const img = getTowTruckImage(towType);

  return (
    <div
      className={
        hasFooter
          ? styles.container
          : getValidClassNames(styles.container, styles.noFooter)
      }
    >
      <div className={styles.body}>
        <div className={styles.description}>
          <div className={styles.name}>{manufacturer}</div>
          <div className={styles.rating}>
            <StarRating rating={rating.averageRating} />
            <div className={styles.reviews}>
              <span className={styles.bold}>{rating.averageRating}</span> (
              {rating.reviewCount} Reviews)
            </div>
          </div>
          <div className={styles.capacity}>
            <Icon iconName={IconName.GEAR} />
            {capacity} ton
          </div>
        </div>
        <div className={styles.aside}>
          <img src={img} alt={manufacturer} className={styles.img} />
          <Badge className={styles.badge}>free</Badge>
        </div>
      </div>
      {hasFooter && (
        <div className={styles.footer}>
          <div className={styles.info}>
            <div className={styles.price}>
              ${pricePerKm}/ <span className={styles.gray}>km</span>
            </div>
            <Badge color="grey">
              <Icon iconName={IconName.LOCATION_DOT} />
              <span className={styles.km}>{distance} km</span>
            </Badge>
          </div>
          <Button label="order now" />
        </div>
      )}
    </div>
  );
};

export { TowTruckCard };
