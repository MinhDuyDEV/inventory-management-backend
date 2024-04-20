import { LocationBaseEntity } from '@modules/shared/base/location-base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class Inventory extends LocationBaseEntity {
	@Prop({ required: true, minlength: 2, maxlength: 60 })
	name: string;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
