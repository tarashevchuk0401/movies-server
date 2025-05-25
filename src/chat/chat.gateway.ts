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
import { AuthService } from '../services/auth.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
  ) {}

  @SubscribeMessage('join')
  handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(roomId);
  }

  @SubscribeMessage('private-message')
  async handlePrivateMessage(
    @MessageBody() data: { roomId: string; text: string; sender: string },
  ) {
    const message = await this.messageService.saveMessage(
      data.roomId,
      data.sender,
      data.text,
    );

    console.log(data);

    const senderUser = await this.authService.getUser(data.sender);
    console.log(senderUser);

    this.server.to(data.roomId).emit('private-message', {
      id: message.id,
      createdAt: message.createdAt,
      sender: senderUser,
      text: data.text,
    });
  }
}
