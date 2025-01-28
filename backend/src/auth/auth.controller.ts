import { Controller, Post, Body, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) registerDto: RegisterDto) {
    const { email, password } = registerDto
    return this.authService.register(email, password)
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    const { email, password } = loginDto
    return this.authService.login(email, password)
  }

  @Post('refresh-token')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<{ accessToken: string }> {
    return this.authService.refreshToken(refreshToken)
  }
}
