import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { RedisService } from './services/redis.service'
import { CacheService } from './services/cache.service'
import { TelegramService } from './services/telegram.service'
import { JwtAuthGuard } from '../modules/auth/jwt-auth.guard'

const providers = [RedisService, CacheService, JwtAuthGuard, TelegramService]

@Global()
@Module({
  imports: [HttpModule],
  providers,
  exports: [...providers],
})
export class SharedModule {}
