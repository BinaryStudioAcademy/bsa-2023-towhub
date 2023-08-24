import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';

import { Button, Link } from '../components.js';

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className={`burger-menu ${isOpen ? 'open' : ''}`}>
      <Button
        label="User menu"
        frontIcon={isOpen ? 'xmark' : 'bars'}
        onClick={toggleMenu}
      />
      {isOpen && (
        <div className="menu">
          <ul>
            <Link to={AppRoute.ORDER_HISTORY}>View history</Link>
            <Link to={AppRoute.EDIT_PROFILE}>Edit profile</Link>
            <Link to={AppRoute.SIGN_IN}>Log out</Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export { BurgerMenu };
