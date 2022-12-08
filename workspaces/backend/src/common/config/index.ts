/**
 * @since 2022/11/15
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { isNil } from 'lodash'
import config from 'config'
import redisStore from 'cache-manager-redis-store'

export class Config {
  public get(path: string) {
    return this.getString(path)
  }

  get host() {
    return this.getString('server.host')
  }

  get port() {
    return this.getNumber('server.port')
  }

  get apiVersion() {
    return this.getString('server.api.version')
  }

  get baseUrl() {
    return this.getString('server.api.baseUrl')
  }

  get swagger() {
    return {
      version: this.getString('server.api.version'),
      schema: this.getString('server.swagger.schema'),
      hostname: this.getString('server.swagger.hostname'),
      baseUrl: this.getString('server.swagger.baseUrl'),
      auth: {
        enable: this.getBoolean('auth.swagger.enable'),
        username: this.getString('auth.swagger.username'),
        password: this.getString('auth.swagger.password'),
      },
    }
  }

  get database() {
    const client = this.getString('database.default')
    // Ref: https://typeorm.io/data-source-options
    // Using database as uri: sqlite, better-sqlite3, capacitor, cordova, react-native, nativescript, sql.js, expo
    const hasUri = ['mysql', 'mariadb', 'postgres', 'mongodb', 'cockroachdb', 'mssql'].includes(
      client,
    )
    return {
      client,
      hasUri,
      uri: hasUri ? this.getString(`database.${client}.uri`) : undefined,
      database: !hasUri ? this.getString(`database.${client}.database`) : undefined,
    }
  }

  get nodeEnv(): string {
    return this.getString('node_env')
  }

  get logger() {
    return {
      level: this.getString('logger.level'),
      autoLogging: this.getBoolean('logger.autoLogging'),
    }
  }

  get cronjob() {
    return {
      enable: this.getBoolean('services.cronjob.enable'),
    }
  }

  get redisConfig(): any {
    return {
      isGlobal: true,
      store: redisStore,
      url: this.getString('redis.uri'),
      prefix: `${this.getString('redis.prefix')}_${this.nodeEnv}_`,
    }
  }

  public getString(key: string): string {
    const value = config.get<string>(key)
    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set')
    }

    return value.toString().replace(/\\n/g, '\n')
  }

  public getNumber(key: string): number {
    const value = this.getString(key)

    try {
      return Number(value)
    } catch {
      throw new Error(key + ' environment variable is not a number')
    }
  }

  public getBoolean(key: string): boolean {
    const value = this.getString(key)

    try {
      return Boolean(JSON.parse(value))
    } catch {
      throw new Error(key + ' env var is not a boolean')
    }
  }
}

export default new Config()
