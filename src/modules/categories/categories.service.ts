import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { Category } from './entities/category.entity';
import { CategoriesRepositoryInterface } from './interfaces/categories.interface';

@Injectable()
export class CategoriesService extends BaseServiceAbstract<Category> {
	constructor(
		@Inject('CategoriesRepositoryInterface')
		private readonly categories_repository: CategoriesRepositoryInterface,
	) {
		super(categories_repository);
	}
}
