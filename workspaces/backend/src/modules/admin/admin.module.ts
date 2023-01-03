import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { UserModule } from './user/user.module'

@Module({
  imports: [UserModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
