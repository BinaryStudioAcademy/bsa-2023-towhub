import { IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useEffect,
  useLocation,
  useState,
} from '~/libs/hooks/hooks.js';
import { type BurgerMenuItem } from '~/libs/types/types.js';

import { Button, Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  menuItems?: BurgerMenuItem[];
};

const BurgerMenu: React.FC<Properties> = ({ menuItems }: Properties) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isMobile = window.innerWidth <= 768;

  return (
    <div
      className={getValidClassNames(styles.burgerMenu, isOpen && styles.open)}
    >
      <Icon
        iconName={isOpen ? IconName.XMARK : IconName.BARS}
        onClick={toggleMenu}
        className={styles.burgerIcon}
      />

      {isOpen && (
        <div className={styles.menu}>
          <ul>
            {menuItems?.map((item, index) => (
              <li key={index}>
                {isMobile ? (
                  <Icon
                    iconName={item.icon}
                    onClick={item.onClick}
                    className={styles.menuIcon}
                  />
                ) : (
                  <Button
                    frontIcon={item.icon}
                    isFullWidth={true}
                    label={item.name}
                    onClick={item.onClick}
                    className={styles.btn}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { BurgerMenu };
