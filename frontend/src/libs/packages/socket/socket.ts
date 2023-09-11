import { SocketService } from './socket.package.js';

const socket = new SocketService();

export { socket };
export { ClientSocketEvent, ServerSocketEvent } from './libs/enums/enums.js';
