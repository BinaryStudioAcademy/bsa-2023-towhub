import 'react-toastify/dist/ReactToastify.css';

import { Header, RouterOutlet } from '~/libs/components/components.js';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <RouterOutlet />
    </>
  );
};

export { App };
