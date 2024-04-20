import { Inject, Injectable } from '@nestjs/common';
import { Inventory } from './entities/inventory.entity';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { InventoriesRepositoryInterface } from './interfaces/inventories.interface';

@Injectable()
export class InventoriesService extends BaseServiceAbstract<Inventory> {
	constructor(
		@Inject('InventoriesRepositoryInterface')
		private readonly inventories_repository: InventoriesRepositoryInterface,
	) {
		super(inventories_repository);
	}
}
