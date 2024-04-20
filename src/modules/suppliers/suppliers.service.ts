import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { Supplier } from './entities/supplier.entity';
import { SuppliersRepositoryInterface } from './interfaces/supplier.interface';

@Injectable()
export class SuppliersService extends BaseServiceAbstract<Supplier> {
	constructor(
		@Inject('SuppliersRepositoryInterface')
		private readonly suppliers_repository: SuppliersRepositoryInterface,
	) {
		super(suppliers_repository);
	}
}
