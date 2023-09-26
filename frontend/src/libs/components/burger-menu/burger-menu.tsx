import { BurgerMenuItemsName, IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useCallback,
  useEffect,
  useLocation,
  useNavigate,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';
import { type BurgerMenuItem } from '~/libs/types/types.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { Button, Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  burgerItems: BurgerMenuItem[];
};

const BurgerMenu: React.FC<Properties> = ({ burgerItems }: Properties) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const menuReference = useRef<HTMLDivElement | null>(null);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleNavigate = useCallback(
    (navigateTo: string) => () => {
      navigate(navigateTo);
    },
    [navigate],
  );

  const handleLogOutClick = useCallback(
    () => dispatch(authActions.logOut()),
    [dispatch],
  );

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent): void => {
      if (
        menuReference.current &&
        !menuReference.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div
      ref={menuReference}
      className={getValidClassNames(styles.burgerMenu, isOpen && styles.open)}
    >
      <Icon
        iconName={IconName.BARS}
        onClick={toggleMenu}
        className={styles.burgerIcon}
      />
      {isOpen && (
        <div className={styles.menu}>
          <ul>
            {burgerItems.map((item, index) => {
              const clickHandler =
                item.name === BurgerMenuItemsName.LOG_OUT
                  ? handleLogOutClick
                  : handleNavigate(item.navigateTo);

              return (
                <li key={index}>
                  <Button
                    frontIcon={item.icon}
                    onClick={clickHandler}
                    className={styles.menuIcon}
                  />
                  <Button
                    frontIcon={item.icon}
                    label={item.name}
                    onClick={clickHandler}
                    className={styles.btn}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export { BurgerMenu };
