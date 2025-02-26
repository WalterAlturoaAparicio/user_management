import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuditLog } from '../database/entities/audit-log.entity'
import { Repository } from 'typeorm'
import { ClientKafka } from '@nestjs/microservices'

@Injectable()
export class AuditService {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  async sendLog(logMessage: string, userId: string) {
    const auditLog = this.auditLogRepository.create({
      userId,
      action: logMessage,
      timestamp: new Date(),
    })

    await this.auditLogRepository.save(auditLog)
    this.kafkaClient.emit('log_topic', logMessage)
  }
}
