import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ChatEntity } from '../entities/chat.entity';
import { AuthService } from './auth.service';
import { CreateChatRequest } from '../dto/chat/requests/create-chat-requests.dto';
import { GetParticipantsDto } from '../dto/chat/responses/get-particiipant.response.dto';
import { CreateChatResponse } from '../dto/chat/responses/create-chat-response.to';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    private userService: AuthService,
  ) {}

  async createChatOrGetExisted(
    data: CreateChatRequest,
    creatorId: string,
  ): Promise<CreateChatResponse> {
    const { title, isGroup, usersId } = data;

    if (!isGroup && usersId.length === 1) {
      const existedChatId = await this.getExistedChatId(creatorId, usersId[0]);

      if (existedChatId) return { id: existedChatId };
    }

    const participants = await this.userService.getUsers([
      ...usersId,
      creatorId,
    ]);

    const newChat = await this.chatRepository.save(
      this.chatRepository.create({
        title,
        isGroup,
        participants,
      }),
    );

    return {
      id: newChat.id,
    };
  }

  async getList(userId: string): Promise<ChatEntity[]> {
    const userChats = await this.chatRepository.find({
      where: { participants: { id: userId } },
    });

    const userChatsId = userChats.map((chat) => chat.id);

    return await this.chatRepository.find({
      where: { id: In(userChatsId) },
    });
  }

  async getChatById(id: string): Promise<ChatEntity> {
    return await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.messages', 'message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('chat.participants', 'participant')
      .where('chat.id = :id', { id })
      .orderBy('message.createdAt', 'ASC')
      .getOne();
  }

  async getParticipants(userId: string): Promise<GetParticipantsDto[]> {
    return await this.userService.getParticipants(userId);
  }

  private async getExistedChatId(
    creatorId: string,
    participantId: string,
  ): Promise<string | null> {
    const creatorChats = await this.chatRepository.find({
      where: { participants: { id: creatorId } },
    });
    const creatorChatsId = creatorChats.map((chat) => chat.id);

    const existedChat = await this.chatRepository.findOne({
      where: { id: In(creatorChatsId), participants: { id: participantId } },
    });

    return existedChat?.id ?? null;
  }
}
