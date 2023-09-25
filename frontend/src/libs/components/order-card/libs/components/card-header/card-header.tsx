import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { getFullName } from '../../helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  profileURL: string | null;
  firstName: string;
  lastName: string;
  licensePlate: string;
};
const CardHeader: React.FC<Properties> = ({
  profileURL,
  firstName,
  lastName,
  licensePlate,
}: Properties): JSX.Element => (
  <div className={styles.header}>
    <div className={styles.headerImageContainer}>
      {profileURL ? (
        <img className={styles.profileImage} src={profileURL} alt="header" />
      ) : (
        <div className={styles.noAvatar}></div>
      )}
    </div>
    <div className={styles.headerInfoContainer}>
      <div className={styles.headerTitleContainer}>
        <span className="textMd">{getFullName(firstName, lastName)}</span>
      </div>
      <div className={styles.headerSubtitleContainer}>
        <span className={getValidClassNames(styles.subtitle, 'textSm')}>
          {licensePlate}
        </span>
      </div>
    </div>
  </div>
);

export { CardHeader };
