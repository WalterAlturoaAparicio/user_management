import { BadRequestException, Body, Injectable, Post, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { Role } from 'src/role/entities/role.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) { }

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Obtén el rol por defecto
    const defaultRole = await this.roleRepository.findOne({ where: { name: 'user' } });
    if (!defaultRole) throw new Error('Default role "user" not found');

    // Crea el usuario
    const newUser = this.userRepository.create({
      email,
      passwordHash: hashedPassword,
      role: defaultRole,
    });

    return this.userRepository.save(newUser);
  }

  async login(email: string, password: string) {
    // Buscar el usuario por correo
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas.')
    }

    // Validar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas.')
    }

    // Generar el token JWT
    const payload = { sub: user.id }
    const token = this.jwtService.sign(payload)

    return { accessToken: token }
  }

  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string): Promise<void> {
    await this.userRepository.update({ refreshToken }, { refreshToken: null });
  }

}
