import { Inject, Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { OrdersRepository } from '@repositories/orders.repository';

@Injectable()
export class OrdersService extends BaseServiceAbstract<Order> {
	constructor(
		@Inject('OrdersRepositoryInterface')
		private readonly orders_repository: OrdersRepository,
	) {
		super(orders_repository);
	}
}
