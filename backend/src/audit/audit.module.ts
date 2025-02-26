import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuditLog } from '../database/entities/audit-log.entity'
import { AuditService } from './audit.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Partitioners } from 'kafkajs'

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLog]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'test-group',
          },
        },
      },
    ]),
  ],
  providers: [AuditService],
  exports: [TypeOrmModule, AuditService],
})
export class AuditModule {}
