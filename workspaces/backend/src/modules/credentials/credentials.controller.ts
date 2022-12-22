import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CredentialsService } from './credentials.service'
import { Auth } from 'src/common/decorators'
import { CredentialsDeleteDto, CredentialsImportDto, CredentialsUpdateDto } from './dto/credentials.dto'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { User } from '../user/user.entity'
import { Credentials } from './credentials.entity'
import { Pagination } from 'nestjs-typeorm-paginate'
import { PaginationDto } from 'src/common/dto/pagination.dto'

@Controller('credentials')
@ApiTags('credentials')
export class CredentialsController {
  constructor(private readonly service: CredentialsService) {}

  @Get()
  @Auth()
  async getAllCredentials(
    @CurrentUser() user: User,
    @Query() params: PaginationDto,
  ): Promise<Pagination<Credentials>> {
    return await this.service.getAllCredentials(user, params)
  }

  @Post()
  @Auth()
  async importCredentials(
    @CurrentUser() user: User,
    @Body() credentials: CredentialsImportDto,
  ): Promise<Credentials> {
    return await this.service.importCredentials(user, credentials)
  }

  @Put()
  @Auth()
  async updateCredentials(
    @CurrentUser() user: User,
    @Body() credentials: CredentialsUpdateDto,
  ): Promise<Credentials> {
    return await this.service.updateCredentials(user, credentials)
  }

  @Delete()
  @Auth()
  async deleteCredentials(
    @CurrentUser() user: User,
    @Body() credentials: CredentialsDeleteDto,
  ): Promise<boolean> {
    return await this.service.deleteCredentials(user, credentials)
  }
}
