import 'react-toastify/dist/ReactToastify.css';

import { Header, RouterOutlet } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
  useState,
} from '~/libs/hooks/hooks.js';
import { socket as socketService } from '~/libs/packages/socket/socket.js';
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
      <Header />

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
