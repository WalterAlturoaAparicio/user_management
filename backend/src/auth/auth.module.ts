import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PasswordResetToken } from './entities/password-reset.entity'
import { AuthController } from './auth.controller'
import { User } from 'src/user/entities/user.entity'
import { Role } from 'src/role/entities/role.entity'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'

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
    TypeOrmModule.forFeature([PasswordResetToken, User, Role]),
  ],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController],
  exports: [TypeOrmModule],
})
export class AuthModule { }
