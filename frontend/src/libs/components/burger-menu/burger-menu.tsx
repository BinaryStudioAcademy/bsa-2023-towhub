import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppRoute } from '~/libs/enums/app-route.enum.js';
import {
  useCallback,
  useEffect,
  useLocation,
  useMemo,
  useNavigate,
  useState,
} from '~/libs/hooks/hooks.js';

import { Button } from '../components.js';
import { iconNameToSvg } from '../icon/maps/maps.js';
import styles from './burger-menu.module.scss';

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const menuItems = useMemo(
    () => [
      {
        label: 'View history',
        onClick: () => navigate(AppRoute.ORDER_HISTORY),
      },
      { label: 'Edit profile', onClick: () => navigate(AppRoute.EDIT_PROFILE) },
      { label: 'Log out', onClick: () => navigate(AppRoute.SIGN_IN) },
    ],
    [navigate],
  );

  const isMobile = window.innerWidth <= 768;

  return (
    <div className={`${styles.burgerMenu} ${isOpen ? styles.open : ''}`}>
      {isMobile ? (
        <FontAwesomeIcon
          icon={isOpen ? iconNameToSvg.xmark : iconNameToSvg.bars}
          onClick={toggleMenu}
          className={styles.menuIcon}
        />
      ) : (
        <Button label="User menu" onClick={toggleMenu} />
      )}
      {isOpen && (
        <div className={styles.menu}>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Button label={item.label} onClick={item.onClick} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { BurgerMenu };
