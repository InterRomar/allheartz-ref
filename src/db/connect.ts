import { createConnection, ConnectionOptions, EntitySchema } from 'typeorm';
import requireDirectory from 'require-directory';

import CustomNamingStrategy from './CustomNamingStrategy';
import config from '../config';

type EntityFileType = { default: EntitySchema; }

type DirType = EntityFileType | {
  [key: string]: EntityFileType;
}

// @ts-ignore-next-line
requireDirectory.defaults.extensions = [__filename.match(/[a-z]+$/)[0]];

const entities = requireDirectory<unknown, DirType>(module, `${__dirname}/entities`);
const entitiesList: EntitySchema[] = [];
Object.values(entities).forEach((i) => {
  if (i.default) {
    return entitiesList.push(i.default as EntitySchema);
  }

  entitiesList.push(...Object.values(i).map((j) => j.default));
});

const dbOptions: ConnectionOptions = {
  name: 'main',
  type: config.db.main.dialect as 'postgres',
  host: config.db.main.host,
  port: config.db.main.port,
  username: config.db.main.user,
  password: config.db.main.password,
  database: config.db.main.database,
  namingStrategy: new CustomNamingStrategy(),
  entities: entitiesList,
};

const connect = async (): Promise<void> => {
  const connection = await createConnection({
    ...dbOptions,
  }).catch((err) => {
    console.error('DB connection error: ', err.message);
  });

  if (!connection) { return; }

  console.log(`DB connected. Port: ${config.db.main.port}`);

  process.on('SIGINT', () => {
    connection.close().then(() => {
      console.info('DB connection is disconnected due to application termination');
      process.exit(0);
    });
  });
};

export default connect;
