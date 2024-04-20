import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { Category } from '@modules/categories/entities/category.entity';

export interface CategoriesRepositoryInterface
	extends BaseRepositoryInterface<Category> {}
