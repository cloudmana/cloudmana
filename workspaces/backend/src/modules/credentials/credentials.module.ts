import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CredentialsController } from './credentials.controller'
import { Credentials } from './credentials.entity'
import { CredentialsRepository } from './credentials.repository'
import { CredentialsService } from './credentials.service'

@Module({
  imports: [TypeOrmModule.forFeature([Credentials])],
  providers: [CredentialsService, CredentialsRepository],
  controllers: [CredentialsController],
  exports: [TypeOrmModule],
})
export class CredentialsModule {}
