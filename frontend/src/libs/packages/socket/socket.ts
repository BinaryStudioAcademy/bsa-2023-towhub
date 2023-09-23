import { SocketService } from './socket.package.js';

const socket = new SocketService();
socket.connect();

export { socket };
export {
  ClientToServerEvent,
  ServerToClientEvent,
} from './libs/enums/enums.js';
