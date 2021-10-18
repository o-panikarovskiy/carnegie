import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { SESSION_REQUIRED } from '../components/auth/errors.js';
import { verifyToken } from '../components/auth/utils/verify-token.js';
import { appConfig } from '../config/index.js';
import { AppError } from '../errors/app-error.js';
import { APP_UNAUTHORIZED_REQUEST } from '../errors/common-errors.js';
import { parseCookies } from '../utils/parse-cookies.js';

export { createSocketServer, sendToSocketByKey, Message };

type SocketNext = (err?: ExtendedError) => void;
type Message = { message: string; payload?: any };
type SocketMiddleware = (socket: Socket, next: SocketNext) => void;

const sockets = new Map<string, Socket>();

const createSocketServer = (httpServer: http.Server): void => {
  const io = new Server(httpServer, { transports: ['websocket'] });

  io.use(checkApiSessionMiddleware).on('connection', (socket: Socket): void => {
    const key = socket.data.user.email;
    sockets.set(key, socket);
    socket.on('disconnect', () => sockets.delete(key));
  });
};

const sendToSocketByKey = (key: string, msg: Message): void => {
  const socket = sockets.get(key);
  if (!socket) return;

  socket.emit('message', msg);
};

const checkApiSessionMiddleware: SocketMiddleware = async (socket: Socket, next: SocketNext): Promise<void> => {
  const cookies = parseCookies(socket.request?.headers?.cookie || '');
  const token = cookies[appConfig.auth.cookieName];

  if (!token) {
    return next(new AppError(SESSION_REQUIRED));
  }

  try {
    const user = await verifyToken(token);
    socket.data = { user };
    return next();
  } catch (error) {
    return next(new AppError(APP_UNAUTHORIZED_REQUEST));
  }
};
