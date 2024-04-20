import { Inject, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { ProductsRepositoryInterface } from './interfaces/products.interface';

@Injectable()
export class ProductsService extends BaseServiceAbstract<Product> {
	constructor(
		@Inject('ProductsRepositoryInterface')
		private readonly products_repository: ProductsRepositoryInterface,
	) {
		super(products_repository);
	}
}
