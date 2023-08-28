import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useEffect,
  useLocation,
  useState,
} from '~/libs/hooks/hooks.js';

import { Button } from '../components.js';
import { iconNameToSvg } from '../icon/maps/maps.js';
import styles from './burger-menu.module.scss';

type MenuItem = {
  label: string;
  onClick: () => void;
  icon: IconProp;
};

type Properties = {
  menuItems: MenuItem[];
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
      <FontAwesomeIcon
        icon={isOpen ? iconNameToSvg.xmark : iconNameToSvg.bars}
        onClick={toggleMenu}
        className={styles.menuIcon}
      />

      {isOpen && (
        <div className={styles.menu}>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                {isMobile ? (
                  <FontAwesomeIcon
                    icon={item.icon}
                    onClick={item.onClick}
                    className={styles.menuIcon}
                  />
                ) : (
                  <Button
                    isFullWidth={true}
                    label={item.label}
                    onClick={item.onClick}
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
