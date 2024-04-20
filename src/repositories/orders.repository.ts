import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { Order } from '@modules/orders/entities/order.entity';
import { OrdersRepositoryInterface } from '@modules/orders/interfaces/orders.interface';

@Injectable()
export class OrdersRepository
	extends BaseRepositoryAbstract<Order>
	implements OrdersRepositoryInterface
{
	constructor(
		@InjectModel(Order.name)
		private readonly orders_repository: Model<Order>,
	) {
		super(orders_repository);
	}
}
