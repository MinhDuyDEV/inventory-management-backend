import { Inject, Injectable } from '@nestjs/common';
import { OrderDetailsRepositoryInterface } from './interfaces/order-details.interface';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailsService extends BaseServiceAbstract<OrderDetail> {
	constructor(
		@Inject('OrderDetailsRepositoryInterface')
		private readonly order_details_repository: OrderDetailsRepositoryInterface,
	) {
		super(order_details_repository);
	}
}
