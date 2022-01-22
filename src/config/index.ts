import dotenv from 'dotenv';
import path from 'path';
import _ from 'lodash';

process.env.TZ = 'UTC';

type ParsedEnvType = { [key: string]: string; };

const parsedEnvFile = dotenv.config({ path: path.normalize(`${__dirname}/../../.env`) }).parsed;

const localConfig: ParsedEnvType = parsedEnvFile || {};
const defaultConfig = dotenv.config({ path: path.normalize(`${__dirname}/../../.env.example`) }).parsed as ParsedEnvType;

const logWarn = (...args: any[]) => {
  console.warn('\x1b[33m%s\x1b[0m', '   WARN: ', ...args);
};

if (!parsedEnvFile) {
  logWarn('You don\'t have a .env file.');
} else if (Object.keys(localConfig).length < Object.keys(defaultConfig).length) {
  const localConfigFieldsCont = Object.keys(localConfig).length;
  const defaultConfigFieldsCont = Object.keys(defaultConfig).length;
  const missedFields = defaultConfigFieldsCont - localConfigFieldsCont;

  logWarn(`You have ${missedFields} missed fields in the .env file.`);
}

const joinedConfig: ParsedEnvType = _.defaultsDeep(localConfig, defaultConfig);

export const envTypes = {
  dev: 'development',
  test: 'test',
  stage: 'staging',
  prod: 'production',
};

const config = {
  port: +joinedConfig.PORT,
  envType: process.env.NODE_ENV || joinedConfig.NODE_ENV || envTypes.dev,
  timezone: joinedConfig.TIMEZONE,
  urls: {
    current: joinedConfig.CURRENT_URL,
    webPortalUrl: joinedConfig.ADMIN_PANEL_URL,
  },
  db: {
    main: {
      host: joinedConfig.DB_HOST,
      port: +joinedConfig.DB_PORT,
      user: joinedConfig.DB_USER,
      password: joinedConfig.DB_PASSWORD,
      database: joinedConfig.DB_NAME,
      dialect: joinedConfig.DB_DIALECT,
    },
  },
  token: {
    secret: joinedConfig.TOKEN_SECRET,
    authExpiration: joinedConfig.TOKEN_AUTH_EXPIRATION,
  },
};

export const isDev = config.envType === envTypes.dev;
export const isTest = config.envType === envTypes.test;

export default config;
