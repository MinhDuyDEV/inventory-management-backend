import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { OrderDetail } from '../entities/order-detail.entity';

export interface OrderDetailsRepositoryInterface
	extends BaseRepositoryInterface<OrderDetail> {}
