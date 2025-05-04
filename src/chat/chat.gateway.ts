import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) // Enable CORS for frontend access
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { sender: string; message: string }) {
    console.log(data);
    console.log('handleMessage');
    this.server.emit('message', `response from server ${new Date()}`); // Broadcast message to all clients
  }
}
