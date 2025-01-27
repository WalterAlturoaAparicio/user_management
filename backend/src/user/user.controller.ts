import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/role/role.guard';
import { UserService } from './user.service';
import { Roles } from 'src/role/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Roles('superadmin')
    @Get('all-logs')
    getAllLogs() {
        return this.userService.getAllLogs();
    }

    @Roles('admin')
    @Get('managed-logs')
    getManagedLogs(@Request() req: Request) {
        const user = req['user']
        return this.userService.getManagedUserLogs(user.id);
    }
}
