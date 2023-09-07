import { IconName } from '~/libs/enums/icon-name.enum.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  rating: number;
};

const StarRating: React.FC<Properties> = ({ rating }: Properties) => {
  const fullFieldStars = Math.floor(rating);
  const allStarts = Math.ceil(rating);

  const createStarItem = (width: number, key: number): JSX.Element => {
    return (
      <div className={styles.star} key={key}>
        <div className={styles.placeholder}>
          <Icon iconName={IconName.STAR}></Icon>
        </div>
        <div className={styles.inner} style={{ width: `${width}%` }}>
          <Icon iconName={IconName.STAR}></Icon>
        </div>
      </div>
    );
  };

  const createStars = (): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    for (let index = 1; index <= 5; index++) {
      if (fullFieldStars >= index) {
        stars.push(createStarItem(100, index));
      } else if (allStarts >= index) {
        stars.push(createStarItem((rating - fullFieldStars) * 100, index));
      } else {
        stars.push(createStarItem(0, index));
      }
    }

    return stars;
  };

  return <div className={styles.container}>{createStars()}</div>;
};

export { StarRating };
