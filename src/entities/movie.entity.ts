import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  year: number;

  @Column()
  category: string;

  @Column()
  rating: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  actors?: string;
}
