require('dotenv/config');
import { DataSourceOptions } from 'typeorm';

const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } =
  process.env;

export const connectionAttributes: DataSourceOptions = {
  type: DB_TYPE as 'postgres',
  host: DB_HOST,
  port: DB_PORT as unknown as number,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default {
  port: parseInt(process.env.PORT, 10) || 3100,
  database: connectionAttributes,
};
