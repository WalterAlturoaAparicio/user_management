import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { UserService } from './user.service'
import { Roles } from 'src/auth/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('superadmin')
  @Get('all-logs')
  getAllLogs() {
    return this.userService.getAllLogs()
  }

  @Roles('admin')
  @Get('managed-logs')
  getManagedLogs(@Request() req: Request) {
    const user = req['user']
    return this.userService.getManagedUserLogs(user.id)
  }
}
