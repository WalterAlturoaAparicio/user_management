import { Module } from '@nestjs/common'
import { BusinessController } from './business.controller'
import { BusinessService } from './business.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BusinessType } from 'src/database/entities/business-type.entity'
import { Role } from 'src/database/entities/role.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BusinessType, Role])],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
