import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { Product } from '@modules/products/entities/product.entity';
import { ProductsRepositoryInterface } from '@modules/products/interfaces/products.interface';

@Injectable()
export class ProductsRepository
	extends BaseRepositoryAbstract<Product>
	implements ProductsRepositoryInterface
{
	constructor(
		@InjectModel(Product.name)
		private readonly products_repository: Model<Product>,
	) {
		super(products_repository);
	}
}
