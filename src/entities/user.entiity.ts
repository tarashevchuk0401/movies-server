import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatEntity } from './chat.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => ChatEntity, (chat) => chat.participants)
  chats: ChatEntity[];
}
