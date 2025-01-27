import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuditLog } from 'src/audit/entities/audit-log.entity';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, AuditLog, Role])],
  providers: [UserService],
  exports: [TypeOrmModule],
  controllers: [UserController],
})
export class UserModule { }
