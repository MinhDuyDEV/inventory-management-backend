import { LocationBaseEntity } from '@modules/shared/base/location-base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SupplierDocument = HydratedDocument<Supplier>;

export enum GENDER {
	Male = 'MALE',
	Female = 'FEMALE',
	Other = 'OTHER',
}
@Schema({
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
	toJSON: {
		getters: true,
	},
})
export class Supplier extends LocationBaseEntity {
	@Prop({ required: true, minlength: 2, maxlength: 60 })
	supplier_name: string;

	@Prop({
		match: /^([+]\d{2})?\d{10}$/,
		get: (phone_number: string) => {
			if (!phone_number) {
				return;
			}
			const last_three_digits = phone_number.slice(phone_number.length - 4);
			return `****-***-${last_three_digits}`;
		},
	})
	phone_number: string;

	@Prop({
		required: false,
		unique: true,
		match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
		default: null,
	})
	email: string;

	@Prop({
		required: false,
	})
	date_of_birth: Date;

	@Prop({
		enum: GENDER,
	})
	gender: string;

	@Prop({
		required: true,
		unique: true,
	})
	identify_id: number;

	@Prop({
		required: false,
		default: [],
	})
	identify_image_urls: string[];
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
