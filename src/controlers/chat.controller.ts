import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { CreateChatRequest } from '../dto/chat/requests/create-chat-requests.dto';
import { ChatEntity } from '../entities/chat.entity';
import { GetParticipantsDto } from '../dto/chat/responses/get-particiipant.response.dto';
import { CreateChatResponse } from '../dto/chat/responses/create-chat-response.to';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  async create(
    @Body() data: CreateChatRequest,
    @Request() req: any,
  ): Promise<CreateChatResponse> {
    return await this.chatService.createChatOrGetExisted(data, req.user.id);
  }

  @Get('list')
  async getList(@Request() req: any): Promise<ChatEntity[]> {
    return await this.chatService.getList(req.user.id);
  }

  @Get('item/:id')
  async getChatById(@Param('id') id: string): Promise<ChatEntity> {
    return await this.chatService.getChatById(id);
  }

  @Get('participants')
  async getParticipants(@Request() req: any): Promise<GetParticipantsDto[]> {
    return await this.chatService.getParticipants(req.user.id);
  }
}
