import { Controller, Get, Query } from '@nestjs/common'
import { BusinessService } from './business.service'

@Controller()
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('business-types')
  allBusinesstypes(@Query('language') language: string) {
    return this.businessService.allBusinessTypes(language)
  }

  @Get('roles')
  allRoles(
    @Query('language') language: string,
    @Query('businessTypeKey') businessTypeKey: string,
  ) {
    return this.businessService.rolesByBusinessType(language, businessTypeKey)
  }
}
