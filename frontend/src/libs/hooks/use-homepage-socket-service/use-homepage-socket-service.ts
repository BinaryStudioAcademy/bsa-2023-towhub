import { ClientSocketEvent, ServerSocketEvent } from 'shared/build/index.js';

import { socket as socketService } from '~/libs/packages/socket/socket.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';
import { actions } from '~/slices/trucks/trucks.js';

import { useAppDispatch, useCallback, useEffect } from '../hooks.js';

type ReturnType = {
  connectToHomeRoom: () => void;
};

const useHomePageSocketService = (): ReturnType => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  const connectToHomeRoom = useCallback((): void => {
    socketService.addListener(
      ClientSocketEvent.GET_TRUCKS_LIST_REQUEST,
      (payload): void => {
        void dispatch(actions.setTrucks(payload as TruckEntity[]));
      },
    );
    socketService.emit({
      event: ServerSocketEvent.TRUCKS_LIST_UPDATE,
    });
  }, [dispatch]);

  return { connectToHomeRoom };
};

export { useHomePageSocketService };
