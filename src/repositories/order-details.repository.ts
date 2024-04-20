import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { Order } from '@modules/orders/entities/order.entity';
import { OrderDetailsRepositoryInterface } from '@modules/order-details/interfaces/order-details.interface';
import { OrderDetail } from '@modules/order-details/entities/order-detail.entity';

@Injectable()
export class OrderDetailsRepository
	extends BaseRepositoryAbstract<OrderDetail>
	implements OrderDetailsRepositoryInterface
{
	constructor(
		@InjectModel(Order.name)
		private readonly order_details_repository: Model<OrderDetail>,
	) {
		super(order_details_repository);
	}
}
