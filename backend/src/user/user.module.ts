import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../database/entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { AuditLog } from 'src/database/entities/audit-log.entity'
import { Role } from 'src/database/entities/role.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, AuditLog, Role])],
  providers: [UserService],
  exports: [TypeOrmModule],
  controllers: [UserController],
})
export class UserModule {}
