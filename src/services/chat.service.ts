import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from '../entities/chat.entity';
import { SuccessResponse } from '../core/interfaces/common/success.responsse';
import { AuthService } from './auth.service';
import { CreateChatRequest } from '../dto/chat/requests/create-chat-requests.dto';
import { GetParticipantsDto } from '../dto/chat/responses/get-particiipant.response.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    private userService: AuthService,
  ) {}

  async createChat(data: CreateChatRequest): Promise<SuccessResponse> {
    const { title, isGroup, usersId } = data;
    const participants = await this.userService.getUsers(usersId);

    await this.chatRepository.save(
      this.chatRepository.create({
        title,
        isGroup,
        participants,
      }),
    );

    return {
      isSuccess: true,
    };
  }

  async getList(userId: string): Promise<any[]> {
    return await this.chatRepository.find({
      where: { participants: { id: userId } },
    });
  }

  async getChatById(id: string): Promise<ChatEntity> {
    return await this.chatRepository.findOne({
      where: { id },
      relations: ['messages'],
    });
  }

  async getParticipants(userId: string): Promise<GetParticipantsDto[]> {
    return await this.userService.getParticipants(userId);
  }
}
