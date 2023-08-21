import 'react-toastify/dist/ReactToastify.css';

import { type ToastContainerProps } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const Notification: React.FC<ToastContainerProps> = (properties) => {
  return <ToastContainer {...properties} />;
};

export { Notification };
