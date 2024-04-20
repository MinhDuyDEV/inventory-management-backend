import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database_config } from './configs/configuration.config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@modules/users/users.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { OrdersModule } from '@modules/orders/orders.module';
import { ProductsModule } from '@modules/products/products.module';
import { UserRolesModule } from '@modules/user-roles/user-roles.module';
import { SuppliersModule } from '@modules/suppliers/suppliers.module';
import { InventoriesModule } from '@modules/inventories/inventories.module';

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
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('DATABASE_URI'),
				dbName: configService.get<string>('DATABASE_NAME'),
			}),
			inject: [ConfigService],
		}),
		UsersModule,
		CategoriesModule,
		OrdersModule,
		ProductsModule,
		UserRolesModule,
		SuppliersModule,
		InventoriesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
