import { User } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class PasswordResetToken {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  token: string

  @ManyToOne(() => User, (user) => user.resetTokens, { onDelete: 'CASCADE' })
  user: User

  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date
}
