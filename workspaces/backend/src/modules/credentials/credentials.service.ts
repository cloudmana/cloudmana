import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { TypeOrmModuleHelper } from 'src/modules/_shared/databases/typeorm.helper'
import { BaseService } from '../base/base.service'
import { ProvidersRepository } from '../providers/providers.repository'
import { User } from '../user/user.entity'
import { Credentials } from './credentials.entity'
import { CredentialsRepository } from './credentials.repository'
import {
  CredentialsDeleteDto,
  CredentialsImportDto,
  CredentialsUpdateDto,
} from './dto/credentials.dto'

@Injectable()
export class CredentialsService extends BaseService<Credentials, CredentialsRepository> {
  constructor(
    repository: CredentialsRepository,
    private readonly providersRepository: ProvidersRepository,
    @InjectPinoLogger(CredentialsService.name)
    private readonly logger: PinoLogger,
  ) {
    super(repository)
  }

  async getAllCredentials(user: User, params): Promise<any> {
    const { page, limit } = params
    return await this.repository.paginate(
      { userId: TypeOrmModuleHelper.transformCollectionId(user._id) },
      { page, limit },
    )
  }

  async importCredentials(user: User, credentials: CredentialsImportDto): Promise<Credentials> {
    const creds = await this.repository.findOne({
      where: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        providerId: TypeOrmModuleHelper.transformCollectionId(credentials.providerId),
        userId: TypeOrmModuleHelper.transformCollectionId(user._id),
      },
    })

    if (creds) {
      throw new BadRequestException('accessKeyId or secretAccessKey already existed')
    }

    const data = {
      name: credentials.name,
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      providerId: credentials.providerId,
      userId: user._id,
    }
    return await this.store(data)
  }

  async updateCredentials(user: User, credentials: CredentialsUpdateDto): Promise<Credentials> {
    const creds = await this.repository.findOne({
      where: {
        _id: TypeOrmModuleHelper.transformCollectionId(credentials._id),
        userId: TypeOrmModuleHelper.transformCollectionId(user._id),
      },
    })
    if (!creds) {
      throw new BadRequestException('Credentials not found')
    }

    const provider = await this.providersRepository.findOne({
      where: {
        _id: TypeOrmModuleHelper.transformCollectionId(credentials.providerId),
      },
    })
    if (!provider) {
      throw new BadRequestException('Provider not found')
    }

    const data: any = {
      _id: credentials._id,
      name: credentials.name,
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      providerId: credentials.providerId,
    }
    return await this.store(data)
  }

  async deleteCredentials(user: User, credentials: CredentialsDeleteDto): Promise<boolean> {
    const _ids = await this.findByIds(credentials._ids)
    const ids = _ids.filter((creds) => creds.userId.toString() === user._id.toString())
    await this.deleteMany(ids)
    return true
  }
}
