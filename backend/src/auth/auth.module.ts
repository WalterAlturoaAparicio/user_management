import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PasswordResetToken } from '../database/entities/password-reset.entity'
import { AuthController } from './auth.controller'
import { User } from 'src/database/entities/user.entity'
import { Role } from 'src/database/entities/role.entity'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuditModule } from 'src/audit/audit.module'
import { BusinessType } from 'src/database/entities/business-type.entity'
import { Permission } from 'src/database/entities/permission.entity'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    TypeOrmModule.forFeature([
      PasswordResetToken,
      User,
      Role,
      BusinessType,
      Permission,
    ]),
    AuditModule,
  ],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController],
  exports: [TypeOrmModule],
})
export class AuthModule {}
