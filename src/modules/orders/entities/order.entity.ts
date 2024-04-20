import { OrderDetail } from '@modules/order-details/entities/order-detail.entity';
import { LocationBaseEntity } from '@modules/shared/base/location-base.entity';
import { Supplier } from '@modules/suppliers/entities/supplier.entity';
import { User } from '@modules/users/entities/user.entity';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class Order extends LocationBaseEntity {
	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: User.name,
	})
	user: User;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: Supplier.name,
	})
	supplier: Supplier;

	@Prop({
		required: true,
		enum: ['IMPORT', 'EXPORT'],
	})
	type: string;

	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderDetail' }],
	})
	order_details: OrderDetail[];

	@Prop({ required: true })
	total_weight: number;

	@Prop({ required: true })
	total_amount: number;

	@Prop({ required: true, enum: ['PENDING', 'COMPLETED', 'CANCELLED'] })
	status: string;
}
