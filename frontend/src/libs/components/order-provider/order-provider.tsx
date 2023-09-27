import { type FC } from 'react';

import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector, useEffect, useNavigate } from '~/libs/hooks/hooks.js';
import { selectOrder } from '~/slices/orders/selectors.js';

import { RouterOutlet } from '../router/router.js';

const OrderProvider: FC = () => {
  const navigate = useNavigate();

  const currentOrder = useAppSelector(selectOrder);
  useEffect(() => {
    if (currentOrder) {
      const orderId = currentOrder.id;
      navigate(`${AppRoute.ORDER}/${orderId}`);
    }
  }, [currentOrder, navigate]);

  return <RouterOutlet />;
};

export { OrderProvider };
