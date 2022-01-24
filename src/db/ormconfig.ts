import config from 'config/index';
import CustomNamingStrategy from './CustomNamingStrategy';

const ormConfig = {
  type: config.db.main.dialect as 'postgres',
  host: config.db.main.host,
  port: config.db.main.port,
  username: config.db.main.user,
  password: config.db.main.password,
  database: config.db.main.database,
  synchronize: false,
  logging: false,
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  entities: [`${__dirname}/entities/**/*{.ts,.js}`],
  cli: {
    migrationsDir: `${__dirname}/migrations`,
  },
  namingStrategy: new CustomNamingStrategy(),
};

export = ormConfig;
