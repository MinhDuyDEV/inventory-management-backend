import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { Order } from '@modules/orders/entities/order.entity';

export interface OrdersRepositoryInterface
	extends BaseRepositoryInterface<Order> {}
