import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { allowRequest, checkSession } from './check-session.js';

export { createSocketServer, sendToSocket, Message };

type Message<T = any> = { event: string; payload?: T };
const sockets = new Map<string, Socket>();

const createSocketServer = (httpServer: http.Server): void => {
  const io = new Server(httpServer, { transports: ['websocket'], allowRequest });

  io.use(checkSession).on('connection', (socket: Socket): void => {
    const key = socket.data?.user?.email;
    if (!key) return;

    sockets.set(key, socket);
    socket.on('disconnect', () => sockets.delete(key));
  });
};

const sendToSocket = <T>(key: string, msg: Message<T>): void => {
  sockets.get(key)?.emit('message', msg);
};
