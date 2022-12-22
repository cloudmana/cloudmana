import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Providers } from '../providers/providers.entity'
import { ProvidersRepository } from '../providers/providers.repository'
import { CredentialsController } from './credentials.controller'
import { Credentials } from './credentials.entity'
import { CredentialsRepository } from './credentials.repository'
import { CredentialsService } from './credentials.service'

@Module({
  imports: [TypeOrmModule.forFeature([Credentials]), TypeOrmModule.forFeature([Providers])],
  providers: [CredentialsService, CredentialsRepository, ProvidersRepository],
  controllers: [CredentialsController],
  exports: [TypeOrmModule],
})
export class CredentialsModule {}
