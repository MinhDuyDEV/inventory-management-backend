import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { Inventory } from '@modules/inventories/entities/inventory.entity';

export interface InventoriesRepositoryInterface
	extends BaseRepositoryInterface<Inventory> {}
