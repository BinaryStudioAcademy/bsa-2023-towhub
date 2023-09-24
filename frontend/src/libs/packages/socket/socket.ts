import { SocketService } from './socket.package.js';

const socket = new SocketService();

export { socket };
export {
  ClientToServerEvent,
  ServerToClientEvent,
} from './libs/enums/enums.js';
