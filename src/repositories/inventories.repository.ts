import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { Inventory } from '@modules/inventories/entities/inventory.entity';
import { InventoriesRepositoryInterface } from '@modules/inventories/interfaces/inventories.interface';

@Injectable()
export class InventoriesRepository
	extends BaseRepositoryAbstract<Inventory>
	implements InventoriesRepositoryInterface
{
	constructor(
		@InjectModel(Inventory.name)
		private readonly Inventories_repository: Model<Inventory>,
	) {
		super(Inventories_repository);
	}
}
