import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { Product } from '../entities/product.entity';

export interface ProductsRepositoryInterface
	extends BaseRepositoryInterface<Product> {}
