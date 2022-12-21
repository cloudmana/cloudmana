import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProvidersController } from './providers.controller'
import { Providers } from './providers.entity'
import { ProvidersRepository } from './providers.repository'
import { ProvidersService } from './providers.service'

@Module({
  imports: [TypeOrmModule.forFeature([Providers])],
  providers: [ProvidersService, ProvidersRepository],
  controllers: [ProvidersController],
  exports: [TypeOrmModule],
})
export class ProvidersModule {}
