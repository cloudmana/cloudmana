/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import fs from 'fs'
import apiSpecConverter from 'api-spec-converter'
import { DiscoveryService } from '@golevelup/nestjs-discovery'
import { Reflector } from '@nestjs/core'
import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger'
import config from 'config'
import { DECORATORS } from '@nestjs/swagger/dist/constants'
import basicAuth from 'express-basic-auth'
import configCommon from 'src/common/config'

interface SwaggerEndpointOperation {
  description: string
}

export async function initializeSwagger(app: INestApplication) {
  if (configCommon.swagger.auth.enable) {
    app.use(
      configCommon.swagger.baseUrl,
      basicAuth({
        challenge: true,
        users: {
          [configCommon.swagger.auth.username]: configCommon.swagger.auth.password,
        },
      }),
    )
  }

  const server = app.getHttpAdapter()
  const serviceName = config.get<string>('server.swagger.name')
  const serviceDescription = config.get<string>('server.swagger.description')
  const apiVersion = configCommon.apiVersion

  await injectEndpointPolicyToSwaggerMetadata(app)
  const options = new DocumentBuilder()
    .setTitle(`${serviceName} API spec`)
    .setDescription(
      `${serviceDescription} | [swagger.json](swagger.json) | [swagger-2.0.json](swagger-2.0.json)`,
    )
    .setVersion(apiVersion)
    .addServer(`${config.get('server.swagger.schema')}://${config.get('server.swagger.hostname')}`)
    .addBearerAuth()
    .build()

  const [swagger2, oas3] = await generateSwaggerSpecs(app, options)
  writeSwaggerJson(`${process.cwd()}`, swagger2, oas3)

  server.get(`${config.get('server.swagger.baseUrl')}/swagger.json`, (req, res) => {
    res.json(oas3)
  })
  server.get(`${config.get('server.swagger.baseUrl')}/swagger-2.0.json`, (req, res) => {
    res.json(swagger2)
  })

  SwaggerModule.setup(config.get('server.swagger.baseUrl'), app, oas3, {
    swaggerOptions: {
      displayOperationId: true,
    },
  })
}

async function generateSwaggerSpecs(
  app: INestApplication,
  config: Omit<OpenAPIObject, 'paths'>,
): Promise<[any, OpenAPIObject]> {
  const oas3: OpenAPIObject = SwaggerModule.createDocument(app, config)
  const swagger2 = await apiSpecConverter
    .convert({
      from: 'openapi_3',
      to: 'swagger_2',
      source: oas3,
    })
    .then((converted) => {
      return converted.spec
    })
  return [swagger2, oas3]
}

function writeSwaggerJson(path: string, swagger2: any, oas3: OpenAPIObject) {
  const swaggerFile = `${path}/swagger.json`
  const swaggerFile2 = `${path}/swagger-2.0.json`
  fs.writeFileSync(swaggerFile, JSON.stringify(oas3, null, 2), {
    encoding: 'utf8',
  })
  fs.writeFileSync(swaggerFile2, JSON.stringify(swagger2, null, 2), {
    encoding: 'utf8',
  })
}

export const injectEndpointPolicyToSwaggerMetadata = async (app: INestApplication) => {
  const discoveryService = app.get(DiscoveryService)
  const reflector = app.get(Reflector)
  const decoratedMethods = await discoveryService.methodsAndControllerMethodsWithMetaAtKey<any>(
    'auth',
  )

  decoratedMethods.forEach((decoratedMethod) => {
    const endpointOperation: SwaggerEndpointOperation = reflector.get(
      DECORATORS.API_OPERATION,
      decoratedMethod.discoveredMethod?.handler,
    )
    const policy = convertPolicyToText(decoratedMethod.meta[0])
    Reflect.defineMetadata(
      DECORATORS.API_OPERATION,
      {
        ...endpointOperation,
        description: `${endpointOperation.description || ''}<hr/>\n\n\n${policy}`,
      },
      decoratedMethod.discoveredMethod?.handler,
    )
  })
}

const convertPolicyToText = (policies: { namespace: string; permissions: string[] }[]): string => {
  let res = '**Endpoint policy**\n\n'

  policies.forEach((policy) => {
    res += `**${policy.namespace}:** ${policy.permissions.join(', ')}<br/>`
  })

  return res
}
