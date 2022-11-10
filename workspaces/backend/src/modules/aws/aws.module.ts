import { Module } from '@nestjs/common'
import { AwsController } from './aws.controller'
import { AwsService } from './aws.service'
import { MigrateModule } from './migrate/migrate.module'

@Module({
  imports: [MigrateModule],
  controllers: [AwsController],
  providers: [AwsService],
})
export class AwsModule {}
