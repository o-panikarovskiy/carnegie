import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

export type Message = {
  message: string;
  payload: any;
};

@Injectable()
export class SocketService {
  private socket?: Socket;

  readonly message$: Observable<Message>;

  constructor() {
    this.message$ = new Observable<Message>((observer) => {
      this.socket = io('', { transports: ['websocket'] });
      this.socket.on('message', (msg: Message) => observer.next(msg));

      return () => this.socket?.close();
    });
  }

  send(msg: Message) {
    this.socket?.emit('message', msg);
  }
}
