import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { Supplier } from '@modules/suppliers/entities/supplier.entity';

export interface SuppliersRepositoryInterface
	extends BaseRepositoryInterface<Supplier> {}
