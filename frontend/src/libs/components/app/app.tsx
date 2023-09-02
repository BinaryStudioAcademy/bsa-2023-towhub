import 'react-toastify/dist/ReactToastify.css';

import { Header, RouterOutlet } from '~/libs/components/components.js';
import { AppRoute, MenuLable } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
  useMemo,
  useNavigate,
  useState,
} from '~/libs/hooks/hooks.js';
import { socket as socketService } from '~/libs/packages/socket/socket.js';
import { actions as userActions } from '~/slices/users/users.js';

import { iconNameToSvg } from '../icon/maps/maps.js';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [isWebSocketsConnected, setIsWebSocketsConnected] = useState(false);
  const navigate = useNavigate();
  const { users, dataStatus } = useAppSelector(({ users }) => ({
    users: users.users,
    dataStatus: users.dataStatus,
  }));

  const isRoot = pathname === AppRoute.ROOT;

  const menuItems = useMemo(
    () => [
      {
        label: MenuLable.HISTORY,
        onClick: () => navigate(AppRoute.ORDER_HISTORY),
        icon: iconNameToSvg['clock rotate left'],
      },
      {
        label: MenuLable.EDIT,
        onClick: () => navigate(AppRoute.EDIT_PROFILE),
        icon: iconNameToSvg['user pen'],
      },
      {
        label: MenuLable.LOG_OUT,
        onClick: () => navigate(AppRoute.SIGN_IN),
        icon: iconNameToSvg['right from bracket'],
      },
    ],
    [navigate],
  );

  useEffect(() => {
    socketService.connect();

    socketService.addListener('CONNECT', () => {
      setIsWebSocketsConnected(true);
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isRoot) {
      void dispatch(userActions.loadAll());
    }
  }, [isRoot, dispatch]);

  return (
    <>
      <Header menuItems={menuItems} isAuth={false} />

      <div>
        <RouterOutlet />
      </div>
      {isRoot && (
        <>
          <h2>Users:</h2>
          <h3>Status: {dataStatus}</h3>
          <h3>
            Socket: {isWebSocketsConnected ? 'connected' : 'disconnected'}
          </h3>
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
