import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';
import { ChatEntity } from '../entities/chat.entity';
import { UserEntity } from '../entities/user.entiity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,
    @InjectRepository(ChatEntity)
    private chatRepo: Repository<ChatEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async saveMessage(chatId: string, userId: string, text: string) {
    const chat = await this.chatRepo.findOne({ where: { id: chatId } });
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!chat || !user) throw new NotFoundException('Chat or user not found');

    const message = this.messageRepo.create({
      chat,
      sender: user,
      text,
    });

    return await this.messageRepo.save(message);
  }
}
