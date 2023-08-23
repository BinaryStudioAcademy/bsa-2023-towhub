import { type ToastContainerProps, ToastContainer } from 'react-toastify';

const Notification: React.FC<ToastContainerProps> = (properties) => {
  return <ToastContainer {...properties} />;
};

export { Notification };
