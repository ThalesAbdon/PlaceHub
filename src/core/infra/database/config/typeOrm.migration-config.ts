import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });
console.log(join(__dirname, '/../', 'migrations/*{.ts,.js}'));
export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: Number(`${process.env.DATABASE_PORT}`),
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  schema: `${process.env.POSTGRES_SCHEMA}`,
  entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
  migrations: ['src/migration/**/*.{ts, js}'],
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
