import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { Supplier } from '@modules/suppliers/entities/supplier.entity';
import { SuppliersRepositoryInterface } from '@modules/suppliers/interfaces/supplier.interface';

@Injectable()
export class SuppliersRepository
	extends BaseRepositoryAbstract<Supplier>
	implements SuppliersRepositoryInterface
{
	constructor(
		@InjectModel(Supplier.name)
		private readonly suppliers_repository: Model<Supplier>,
	) {
		super(suppliers_repository);
	}
}
