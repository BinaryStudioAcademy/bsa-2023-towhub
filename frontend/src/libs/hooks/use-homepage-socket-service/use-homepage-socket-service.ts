import {
  ClientToServerEvent,
  ServerToClientEvent,
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
    socketService.emit({
      event: ClientToServerEvent.JOIN_HOME_ROOM,
    });
    socketService.addListener(
      ServerToClientEvent.TRUCKS_LIST_UPDATE,
      (payload): void => {
        if (!payload) {
          return;
        }

        void dispatch(actions.setTrucks(payload));
      },
    );
  }, [dispatch]);

  const disconnectFromHomeRoom = useCallback((): void => {
    socketService.emit({
      event: ClientToServerEvent.LEAVE_HOME_ROOM,
    });
  }, []);

  return { connectToHomeRoom, disconnectFromHomeRoom };
};

export { useHomePageSocketService };
