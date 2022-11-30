/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { DataSource, DatabaseType, DataSourceOptions } from 'typeorm'
import config from './'

const dbConfig = config.database

const AppDataSource = new DataSource({
  type: dbConfig.client as DatabaseType,
  database: dbConfig.database,
  url: dbConfig.uri,
} as DataSourceOptions)

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })

export default AppDataSource
