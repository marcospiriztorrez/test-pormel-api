import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { AuthorMigrations } from './migrations/author';
import { PublisherMigrations } from './migrations/publisher';
config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: configService.get<string>('DB_HOST'),
	port: configService.get<number>('DB_PORT'),
	username: configService.get<string>('DB_USER'),
	password: configService.get<string>('DB_PASS'),
	database: configService.get<string>('DB_NAME'),
	migrations: [
		...AuthorMigrations,
		...PublisherMigrations,
	],
	migrationsTableName: 'migrations',
	synchronize: true,
});
