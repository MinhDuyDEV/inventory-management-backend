import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductsRepository } from '@repositories/products.repository';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
	],
	controllers: [ProductsController],
	providers: [
		ProductsService,
		{
			provide: 'ProductsRepositoryInterface',
			useClass: ProductsRepository,
		},
	],
	exports: [ProductsService, 'ProductsRepositoryInterface'],
})
export class ProductsModule {}
