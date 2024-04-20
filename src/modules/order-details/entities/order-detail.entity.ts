import { Order } from '@modules/orders/entities/order.entity';
import { Product } from '@modules/products/entities/product.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema({
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class OrderDetail {
	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: Order.name,
	})
	order: Order;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: Product.name,
	})
	product: Product;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
