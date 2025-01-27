import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { AuditLog } from 'src/audit/entities/audit-log.entity'
import { UUID } from 'crypto'
import { Role } from 'src/role/entities/role.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(AuditLog)
        private readonly auditLogRepository: Repository<AuditLog>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }


    async getManagedUserLogs(adminId: UUID): Promise<AuditLog[]> {
        const admin = await this.userRepository.findOne({
            where: { id: adminId },
            relations: ['managedUsers'],
        });

        if (!admin || admin.role.name !== 'admin') {
            throw new BadRequestException('Only admins can view managed users logs');
        }

        const userIds = admin.managedUsers.map((user) => user.id);
        return this.auditLogRepository.find({
            where: { user: { id: In(userIds) } },
        });
    }

    async getAllLogs(): Promise<AuditLog[]> {
        return this.auditLogRepository.find({ relations: ['user'] });
    }

    async assignRole(userId: string, roleName: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) throw new BadRequestException('User not found');

        // Si el rol es "superadmin", verifica que no exista otro
        if (roleName === 'superadmin') {
            const existingSuperAdmin = await this.userRepository.findOne({
                where: { role: { name: 'superadmin' } },
            });
            if (existingSuperAdmin) {
                throw new BadRequestException('Only one superadmin is allowed');
            }
        }

        // Asignar el rol
        const role = await this.roleRepository.findOne({ where: { name: roleName } });
        if (!role) throw new BadRequestException('Role not found');

        user.role = role;
        return this.userRepository.save(user);
    }
}
