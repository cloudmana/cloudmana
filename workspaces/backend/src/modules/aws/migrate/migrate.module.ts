import { Module } from '@nestjs/common'
import { MigrateController } from './migrate.controller'
import { MigrateService } from './migrate.service'

@Module({
  imports: [],
  controllers: [MigrateController],
  providers: [MigrateService],
})
export class MigrateModule {}
