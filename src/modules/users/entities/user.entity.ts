import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserRole } from '@modules/user-roles/entities/user-roles.entity';
import { BaseEntity } from '@modules/shared/base/base.entity';
import { Address, AddressSchema } from '@modules/shared/base/address.entity';
import { Exclude, Transform, Type } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

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
export class User extends BaseEntity {
	@Prop({
		required: true,
		minlength: 2,
		maxlength: 60,
		set: (name: string) => {
			return name.trim();
		},
	})
	name: string;

	@Prop({
		required: true,
		unique: true,
		match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
	})
	email: string;

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
		required: true,
		unique: true,
	})
	username: string;

	@Prop({
		required: true,
		select: true,
	})
	password: string;

	@Prop({
		default:
			'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
	})
	avatar: string;

	@Prop({
		required: true,
		default: new Date(),
	})
	date_of_birth: Date;

	@Prop({
		enum: GENDER,
	})
	gender: string;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: UserRole.name,
	})
	@Type(() => UserRole)
	@Transform((value) => value.obj.role?.name, { toClassOnly: true })
	role: UserRole;

	@Prop()
	@Exclude()
	current_refresh_token: string;

	@Prop({
		type: AddressSchema,
	})
	address: Address;

	default_address?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
