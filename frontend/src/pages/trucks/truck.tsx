import { useLocation } from 'react-router-dom';

import { AddTruckForm } from './components/add-truck-form/add-truck-form.js';

const Truck: React.FC = () => {
  const location = useLocation();

  const isTrucksPath = location.pathname === '/trucks';

  return <div>{isTrucksPath && <AddTruckForm />}</div>;
};

export { Truck };
