import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BusinessType } from 'src/database/entities/business-type.entity'
import { Role } from 'src/database/entities/role.entity';
import { Repository } from 'typeorm'

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(BusinessType)
    private readonly businessTypeRepository: Repository<BusinessType>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async allBusinessTypes(language: string) {
    const validLanguages = ['es', 'en']; 
    const lang = validLanguages.includes(language) ? language : 'es'; 

    const businessTypes = await this.businessTypeRepository
      .createQueryBuilder('businessType')
      .select([
        'businessType.id',
        'businessType.key',
        `businessType.name_${lang} AS name`,
        `businessType.description_${lang} AS description`,
      ])
      .getRawMany(); 

    return businessTypes;
  }

  async rolesByBusinessType(language: string, businessTypeKey: string) {
    const validLanguages = ['es', 'en']; 
    const lang = validLanguages.includes(language) ? language : 'es'; 

    const roles = await this.roleRepository
      .createQueryBuilder('role')
      .innerJoin('role.businessType', 'businessType')
      .select([
        'role.id',
        'role.key',
        `role.name_${lang} AS name`,
        `role.description_${lang} AS description`,
      ])
      .where('businessType.key = :businessTypeKey', { businessTypeKey })
      .getRawMany(); 

    return roles;
  }
}
