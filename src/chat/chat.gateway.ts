import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { MessageService } from '../services/message.service';

@WebSocketGateway({ cors: false })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private messageService: MessageService) {}

  @SubscribeMessage('join')
  handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(roomId);
  }

  @SubscribeMessage('private-message')
  async handlePrivateMessage(
    @MessageBody() data: { roomId: string; text: string; sender: string },
  ) {
    await this.messageService.saveMessage(data.roomId, data.sender, data.text);

    this.server.to(data.roomId).emit('message', {
      sender: data.sender,
      text: data.text,
    });
  }
}
