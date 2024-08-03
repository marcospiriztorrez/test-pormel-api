import { z } from 'zod';

export const ConfigValidationSchema = z.object({
	ENV: z.string(),
	PORT: z.string(),
	DB_NAME: z.string(),
	DB_HOST: z.string(),
	DB_PORT: z.string(),
	DB_USER: z.string(),
	DB_PASS: z.string(),
});
