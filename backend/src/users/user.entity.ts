import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { Quote } from '../quotes/quote.entity';
  
@Entity({ name: 'users' })  // 테이블 명을 명시하고 싶다면 이렇게
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;
  
    @Column({ type: 'varchar', length: 255 })
    password: string;  // bcrypt 해시를 저장
  
    @OneToMany(() => Quote, (quote) => quote.user, {
      cascade: true,      // User 삭제 시 연관 Quote도 삭제
    })
    quotes: Quote[];
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
