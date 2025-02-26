import { AuditLog } from 'src/database/entities/audit-log.entity'
import { PasswordResetToken } from 'src/database/entities/password-reset.entity'
import { Role } from 'src/database/entities/role.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  passwordHash: string

  @Column({ nullable: true })
  refreshToken: string

  @Column({ nullable: true })
  userName: string

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role

  @OneToMany(() => PasswordResetToken, (token) => token.user)
  resetTokens: PasswordResetToken[]

  @OneToMany(() => AuditLog, (log) => log.user)
  auditLogs: AuditLog[]

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => User, (admin) => admin.managedUsers, { nullable: true })
  admin: User

  @OneToMany(() => User, (user) => user.admin)
  managedUsers: User[]
}
