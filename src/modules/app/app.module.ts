import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ConfigValidationSchema } from '../../config/env/config-schema-vars';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../../config/database/data-source';
import ENV from '../../config/env/env';
import { BookModule } from '../book/book.module';
import { AuthorModule } from '../author/authors.module';
import { PublisherModule } from '../publisher/publisher.module';

@Module({
  imports: [
    ConfigModule.forRoot({
		validationSchema: ConfigValidationSchema,
		validate: (config) => ConfigValidationSchema.parse(config),
		isGlobal: true,
		load: [ENV],
	}),
    TypeOrmModule.forRootAsync({
		useFactory: async () => ({
			...AppDataSource.options,
			autoLoadEntities: true,
		}),
	}),
	BookModule,
	AuthorModule,
	PublisherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
	static port: number;
	constructor(
		@Inject(ENV.KEY) private readonly configService: ConfigType<typeof ENV>,
	) {
		AppModule.port = Number(this.configService.port);
	}
}