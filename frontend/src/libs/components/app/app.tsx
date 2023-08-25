import 'react-toastify/dist/ReactToastify.css';

import reactLogo from '~/assets/img/react.svg';
import { Link, RouterOutlet } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
  useState,
} from '~/libs/hooks/hooks.js';
import { SocketService } from '~/libs/packages/socket/socket.package.js';
import { actions as userActions } from '~/slices/users/users.js';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [isWebSocketsConnected, setIsWebSocketsConnected] = useState(false);
  const { users, dataStatus } = useAppSelector(({ users }) => ({
    users: users.users,
    dataStatus: users.dataStatus,
  }));

  const isRoot = pathname === AppRoute.ROOT;

  useEffect(() => {
    const socketService = new SocketService();

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
      <img src={reactLogo} className="App-logo" width="30" alt="logo" />

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
