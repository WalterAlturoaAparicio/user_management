import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResponseInterceptor } from './utils/response.interceptor'
import { AllExceptionsFilter } from './utils/all-exception.filter'
import morgan from 'morgan'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.enableCors({
    origin: 'http://localhost:3001', 
    credentials: true,
  })
  app.setGlobalPrefix('api')
  app.use(morgan('combined'))
  await app.listen(3000)
}
bootstrap()
