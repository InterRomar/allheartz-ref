import { ConnectionOptions } from 'typeorm';

import config from 'config/index';
import CustomNamingStrategy from './CustomNamingStrategy';

const ormConfig: ConnectionOptions = {
  type: config.db.main.dialect as 'postgres',
  host: config.db.main.host,
  port: config.db.main.port,
  username: config.db.main.user,
  password: config.db.main.password,
  database: config.db.main.database,
  synchronize: false,
  logging: false,
  entities: ['src/db/entities/**/*.ts'],
  migrations: ['src/db/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  namingStrategy: new CustomNamingStrategy(),
};

export = ormConfig;
