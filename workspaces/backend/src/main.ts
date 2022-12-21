// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { IoAdapter } from '@nestjs/platform-socket.io'
import bodyParser from 'body-parser'
import express from 'express'
import httpContext from 'express-http-context'
import { createLightship } from 'lightship'
import { Logger } from 'nestjs-pino'
import responseTime from 'response-time'
import { v4 as uuidV4 } from 'uuid'
import { CORS_EXPOSED_HEADERS } from './common/constants'
import { AppModule } from './modules/app/app.module'
import { initializeSwagger } from './helpers/swagger.helper'
import config from 'src/common/config'

async function bootstrap() {
  process.env.TZ = 'UTC'

  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  })

  // logging
  const logger = app.get(Logger)
  app.useLogger(logger)

  // initialize
  await initializeApp(app)
  await initializeSwagger(app)

  // register socket adapter
  app.useWebSocketAdapter(new IoAdapter(app) as any)

  const lightship = await initializeLightship(app)
  await app.listen(config.port, () => {
    const { swagger } = config
    logger.log(`Using env env:${process.env.NODE_ENV} config:${config.nodeEnv}`)
    logger.log(`Server running on http://${config.host}:${config.port}${config.baseUrl}`)
    logger.log(`Access swagger at ${swagger.schema}://${swagger.hostname}${swagger.baseUrl}`)
  })
  lightship.signalReady()
}

async function initializeApp(app: INestApplication) {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use((req: express.Request, res: express.Response, next: () => void) => {
    res.setHeader('x-api-version', config.apiVersion)
    res.setHeader('x-app-version', config.apiVersion)
    next()
  })
  app.enableCors({
    exposedHeaders: CORS_EXPOSED_HEADERS,
  })
  app.use(responseTime({ header: 'x-response-time' }))
  app.use((req: express.Request, _res: express.Response, next: () => void) => {
    const correlationId = uuidV4()
    httpContext.set('timestamp', Date.now())
    httpContext.set('correlationId', correlationId)
    // req.id = correlationId
    next()
  })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  )
  app.setGlobalPrefix(config.baseUrl)
}

async function initializeLightship(app: INestApplication) {
  const lightship = createLightship()

  ;(await lightship).registerShutdownHandler(async () => {
    await app.close()
  })

  return lightship
}

bootstrap()
