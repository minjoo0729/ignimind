import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
import { User } from '../users/user.entity';
  
@Entity({ name: 'quotes' })
export class Quote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    content: string;      // 힘이 되는 글귀 본문

    @Column({ type: 'varchar', length: 100, nullable: true })
    author: string | null;  // 가사나 대사 출처(선택)

    @ManyToOne(() => User, (user) => user.quotes, {
        onDelete: 'CASCADE',  // 유저 삭제 시 해당 글귀도 함께 삭제
        eager: false,
    })
    user: User;            // 업로더

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
