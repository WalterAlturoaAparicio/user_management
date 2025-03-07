import { User } from 'src/database/entities/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: string

  @Column()
  action: string

  @ManyToOne(() => User, (user) => user.auditLogs, { onDelete: 'SET NULL' })
  user: User

  @Column()
  timestamp: Date
}
