import { Injectable } from '@nestjs/common'
import { Kafka } from 'kafkajs'

@Injectable()
export class AuditService {
  private kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  })
  private producer = this.kafka.producer()

  async sendLog(userId: number, action: string) {
    await this.producer.connect()
    await this.producer.send({
      topic: 'audit-logs',
      messages: [
        { value: JSON.stringify({ userId, action, timestamp: new Date() }) },
      ],
    })
    await this.producer.disconnect()
  }
}
