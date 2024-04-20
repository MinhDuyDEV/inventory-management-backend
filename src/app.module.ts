import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { database_config } from './configs/configuration.config';
import * as Joi from 'joi';

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				NODE_ENV: Joi.string()
					.valid('development', 'production', 'test', 'provision', 'staging')
					.default('development'),
				PORT: Joi.number().default(3000),
			}),
			validationOptions: {
				abortEarly: false,
			},
			isGlobal: true,
			envFilePath: '.env',
			load: [database_config],
			cache: true,
			expandVariables: true,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
