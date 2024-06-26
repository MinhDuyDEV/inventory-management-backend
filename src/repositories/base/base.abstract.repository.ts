import { BaseEntity } from '@modules/shared/base/base.entity';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import {
	CreateResponse,
	DeleteResponse,
	FindAllResponse,
	FindOneResponse,
	UpdateResponse,
} from 'src/types/common.type';
import { BaseRepositoryInterface } from './base.interface.repository';

export abstract class BaseRepositoryAbstract<T extends BaseEntity>
	implements BaseRepositoryInterface<T>
{
	protected constructor(private readonly model: Model<T>) {
		this.model = model;
	}

	async create(dto: T | any): Promise<CreateResponse<T>> {
		return await this.model.create(dto);
	}

	async findOneById(id: string): Promise<FindOneResponse<T>> {
		const item = await this.model.findById(id);
		return item.deleted_at ? null : item;
	}

	async findOneByCondition(condition = {}): Promise<FindOneResponse<T>> {
		return await this.model
			.findOne({
				...condition,
				deleted_at: null,
			})
			.exec();
	}

	async findAll(
		condition: FilterQuery<T>,
		options?: QueryOptions<T>,
	): Promise<FindAllResponse<T>> {
		const [count, items] = await Promise.all([
			this.model.countDocuments({ ...condition, deleted_at: null }),
			this.model.find(
				{ ...condition, deleted_at: null },
				options?.projection,
				options,
			),
		]);
		return {
			count,
			items,
		};
	}

	async update(id: string, dto: Partial<T>): Promise<UpdateResponse<T>> {
		return await this.model.findOneAndUpdate(
			{ _id: id, deleted_at: null },
			dto,
			{ new: true },
		);
	}

	async softDelete(id: string): Promise<DeleteResponse> {
		const delete_item = await this.model.findById(id);
		if (!delete_item) {
			return false;
		}

		return !!(await this.model
			.findByIdAndUpdate<T>(id, { deleted_at: new Date() })
			.exec());
	}

	async permanentlyDelete(id: string): Promise<DeleteResponse> {
		const delete_item = await this.model.findById(id);
		if (!delete_item) {
			return false;
		}
		return !!(await this.model.findByIdAndDelete(id));
	}
}
