import { Injectable } from '@nestjs/common';
import { ChatEntity } from '../entities/chat.entity';

//TODO: Hide password
@Injectable()
export class ChatDataMapper {
  entityToItem(chat: ChatEntity): any {
    const { id, title, isGroup, messages } = chat;

    return {
      id,
      title,
      isGroup,
      messages,
    };
  }
}
