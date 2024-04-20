import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { Inventory, InventorySchema } from './entities/inventory.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoriesRepository } from '@repositories/inventories.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Inventory.name, schema: InventorySchema },
		]),
	],
	controllers: [InventoriesController],
	providers: [
		InventoriesService,
		{
			provide: 'InventoriesRepositoryInterface',
			useClass: InventoriesRepository,
		},
	],
	exports: [InventoriesService, 'InventoriesRepositoryInterface'],
})
export class InventoriesModule {}
