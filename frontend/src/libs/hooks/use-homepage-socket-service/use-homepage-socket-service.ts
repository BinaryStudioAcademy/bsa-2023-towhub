import {
  ClientSocketEvent,
  ServerSocketEvent,
  socket as socketService,
} from '~/libs/packages/socket/socket.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';
import { actions } from '~/slices/trucks/trucks.js';

import { useAppDispatch, useCallback } from '../hooks.js';

type ReturnType = {
  connectToHomeRoom: () => void;
  disconnectFromHomeRoom: () => void;
};

const useHomePageSocketService = (): ReturnType => {
  const dispatch = useAppDispatch();

  const connectToHomeRoom = useCallback((): void => {
    socketService.emit({
      event: ClientSocketEvent.JOIN_HOME_ROOM,
    });
    socketService.addListener(
      ServerSocketEvent.TRUCKS_LIST_UPDATE,
      (payload): void => {
        void dispatch(actions.setTrucks(payload as TruckEntity[]));
      },
    );
  }, [dispatch]);

  const disconnectFromHomeRoom = useCallback((): void => {
    socketService.emit({
      event: ClientSocketEvent.LEAVE_HOME_ROOM,
    });
  }, []);

  return { connectToHomeRoom, disconnectFromHomeRoom };
};

export { useHomePageSocketService };
