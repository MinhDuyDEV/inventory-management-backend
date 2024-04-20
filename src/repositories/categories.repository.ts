import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { CategoriesRepositoryInterface } from '@modules/categories/interfaces/categories.interface';
import { Category } from '@modules/categories/entities/category.entity';

@Injectable()
export class CategoriesRepository
	extends BaseRepositoryAbstract<Category>
	implements CategoriesRepositoryInterface
{
	constructor(
		@InjectModel(Category.name)
		private readonly categories_repository: Model<Category>,
	) {
		super(categories_repository);
	}
}
