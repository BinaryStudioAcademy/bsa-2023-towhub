import {
  ClientSocketEvent,
  ServerSocketEvent,
  socket as socketService,
} from '~/libs/packages/socket/socket.js';
import { actions } from '~/slices/trucks/trucks.js';

import { useAppDispatch, useCallback } from '../hooks.js';

type ReturnType = {
  connectToHomeRoom: () => void;
  disconnectFromHomeRoom: () => void;
};

const useHomePageSocketService = (): ReturnType => {
  const dispatch = useAppDispatch();

  const connectToHomeRoom = useCallback((): void => {
    socketService.emit<typeof ClientSocketEvent.JOIN_HOME_ROOM>(
      ClientSocketEvent.JOIN_HOME_ROOM,
      [],
    );
    const socketInstance = socketService.getInstance();

    if (socketInstance) {
      socketInstance.on(
        ServerSocketEvent.TRUCKS_LIST_UPDATE,
        (payload): void => {
          void dispatch(actions.setTrucks(payload));
        },
      );
    }
  }, [dispatch]);

  const disconnectFromHomeRoom = useCallback((): void => {
    socketService.emit<typeof ClientSocketEvent.LEAVE_HOME_ROOM>(
      ClientSocketEvent.LEAVE_HOME_ROOM,
      [],
    );
  }, []);

  return { connectToHomeRoom, disconnectFromHomeRoom };
};

export { useHomePageSocketService };
