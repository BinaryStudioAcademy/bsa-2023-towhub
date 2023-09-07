import 'react-toastify/dist/ReactToastify.css';

import { Header, RouterOutlet } from '~/libs/components/components.js';
import { useEffect } from '~/libs/hooks/hooks.js';
import { socket as socketService } from '~/libs/packages/socket/socket.js';

import { TruckFilter } from '../truck-filter/truck-filter.js';

const App: React.FC = () => {
  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <RouterOutlet />
      <TruckFilter />
    </>
  );
};

export { App };
