import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetail, OrderDetailSchema } from './entities/order-detail.entity';
import { OrderDetailsRepository } from '@repositories/order-details.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: OrderDetail.name, schema: OrderDetailSchema },
		]),
	],
	controllers: [OrderDetailsController],
	providers: [
		OrderDetailsService,
		{
			provide: 'OrderDetailsRepositoryInterface',
			useClass: OrderDetailsRepository,
		},
	],
	exports: [OrderDetailsService, 'OrderDetailsRepositoryInterface'],
})
export class OrderDetailsModule {}
