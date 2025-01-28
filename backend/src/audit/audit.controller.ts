import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

@Controller('audit')
export class AuditController {
  onModuleInit() {
    console.log('Kafka Consumer Initialized')
  }

  @MessagePattern('log_topic')
  receiveLog(@Payload() message: string) {
    console.log('Received log:', message)
  }
}
