import { registerAs } from '@nestjs/config';

export default registerAs('ENV', () => ({
	env: process.env.ENV,
	port: process.env.PORT,
	db_name: process.env.DB_NAME,
	db_host: process.env.DB_HOST,
	db_port: process.env.DB_PORT,
	db_user: process.env.DB_USER,
	db_pass: process.env.DB_PASS,
}));
