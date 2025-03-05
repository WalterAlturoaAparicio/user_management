import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../database/entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { AuditLog } from 'src/database/entities/audit-log.entity'
import { Role } from 'src/database/entities/role.entity'
import { BusinessType } from 'src/database/entities/business-type.entity'
import { Permission } from 'src/database/entities/permission.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AuditLog, Role, BusinessType, Permission]),
  ],
  providers: [UserService],
  exports: [TypeOrmModule],
  controllers: [UserController],
})
export class UserModule {}
