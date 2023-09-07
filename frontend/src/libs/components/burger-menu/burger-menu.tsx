import { AppRoute, Breakpoints, IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useEffect,
  useLocation,
  useNavigate,
  useState,
} from '~/libs/hooks/hooks.js';
import { type BurgerMenuItem } from '~/libs/types/types.js';

import { Button, Icon } from '../components.js';
import { BURGER_MENU_ITEMS } from './burger-menu-items.js';
import styles from './styles.module.scss';

let currentMenuItems: BurgerMenuItem[] | null;

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleNavigate = useCallback(
    (navigateTo: string) => () => navigate(navigateTo),
    [navigate],
  );

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isMobile = window.innerWidth <= Breakpoints.MOBILE;

  switch (location.pathname) {
    case AppRoute.DASHBOARD: {
      currentMenuItems = BURGER_MENU_ITEMS.BusinessMenu;
      break;
    }
    case AppRoute.ROOT: {
      currentMenuItems = BURGER_MENU_ITEMS.CustomerMenu;
      break;
    }
    default: {
      break;
    }
  }

  if (!currentMenuItems) {
    return null;
  }

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
            {currentMenuItems.map((item, index) => (
              <li key={index}>
                {isMobile ? (
                  <Icon
                    iconName={item.icon}
                    onClick={handleNavigate(item.navigateTo)}
                    className={styles.menuIcon}
                  />
                ) : (
                  <Button
                    frontIcon={item.icon}
                    isFullWidth
                    label={item.name}
                    onClick={handleNavigate(item.navigateTo)}
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
