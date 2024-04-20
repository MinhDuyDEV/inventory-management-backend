import { BaseEntity } from '@modules/shared/base/base.entity';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserRoleDocument = HydratedDocument<UserRole>;

export enum USER_ROLE {
	ADMIN = 'admin',
	USER = 'user',
	SUPPLIER = 'supplier',
}

@Exclude()
export class UserRole extends BaseEntity {
	@Prop({
		unique: true,
		default: USER_ROLE.USER,
		enum: USER_ROLE,
		required: true,
	})
	@Expose()
	name: USER_ROLE;
}

export const UserRolesSchema = SchemaFactory.createForClass(UserRole);
