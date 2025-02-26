import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from '../database/entities/role.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [],
  exports: [TypeOrmModule],
})
export class RoleModule {}
