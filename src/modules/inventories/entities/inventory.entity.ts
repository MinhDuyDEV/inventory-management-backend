import { Address, AddressSchema } from '@modules/shared/base/address.entity';
import { BaseEntity } from '@modules/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class Inventory extends BaseEntity {
	@Prop({ required: true, minlength: 2, maxlength: 60 })
	name: string;

	@Prop({
		type: AddressSchema,
	})
	address: Address;

	default_address?: string;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
