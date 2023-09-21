import { SocketService } from './socket.package.js';

const socket = new SocketService();
socket.connect();

export { socket };
export { ClientSocketEvent, ServerSocketEvent } from './libs/enums/enums.js';
