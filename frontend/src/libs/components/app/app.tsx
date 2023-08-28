import 'react-toastify/dist/ReactToastify.css';

import { Header, Link, RouterOutlet } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
  useMemo,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import { actions as userActions } from '~/slices/users/users.js';

import { iconNameToSvg } from '../icon/maps/maps.js';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, dataStatus } = useAppSelector(({ users }) => ({
    users: users.users,
    dataStatus: users.dataStatus,
  }));

  const isRoot = pathname === AppRoute.ROOT;

  const menuItems = useMemo(
    () => [
      {
        label: 'View history',
        onClick: () => navigate(AppRoute.ORDER_HISTORY),
        icon: iconNameToSvg['clock rotate left'],
      },
      {
        label: 'Edit profile',
        onClick: () => navigate(AppRoute.EDIT_PROFILE),
        icon: iconNameToSvg['user pen'],
      },
      {
        label: 'Log out',
        onClick: () => navigate(AppRoute.SIGN_IN),
        icon: iconNameToSvg['right from bracket'],
      },
    ],
    [navigate],
  );

  useEffect(() => {
    if (isRoot) {
      void dispatch(userActions.loadAll());
    }
  }, [isRoot, dispatch]);

  return (
    <>
      <Header menuItems={menuItems} isAuth={true} />

      <ul className="App-navigation-list">
        <li>
          <Link to={AppRoute.ROOT}>Root</Link>
        </li>
        <li>
          <Link to={AppRoute.SIGN_IN}>Sign in</Link>
        </li>
        <li>
          <Link to={AppRoute.SIGN_UP}>Sign up</Link>
        </li>
      </ul>
      <p>Current path: {pathname}</p>
      <div>
        <RouterOutlet />
      </div>
      {isRoot && (
        <>
          <h2>Users:</h2>
          <h3>Status: {dataStatus}</h3>
          <ul>
            {users.map((it) => (
              <li key={it.id}>{it.phone}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export { App };
