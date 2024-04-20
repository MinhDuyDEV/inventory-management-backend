import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from './entities/supplier.entity';
import { SuppliersRepository } from '@repositories/suppliers.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Supplier.name, schema: SupplierSchema },
		]),
	],
	controllers: [SuppliersController],
	providers: [
		SuppliersService,
		{
			provide: 'SuppliersRepositoryInterface',
			useClass: SuppliersRepository,
		},
	],
	exports: [SuppliersService, 'SuppliersRepositoryInterface'],
})
export class SuppliersModule {}
