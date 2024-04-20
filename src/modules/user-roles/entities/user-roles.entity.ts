import { BaseEntity } from '@modules/shared/base/base.entity';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserRoleDocument = HydratedDocument<UserRole>;

export enum USER_ROLE {
	ADMIN = 'admin',
	USER = 'user',
	SUPPLIER = 'supplier',
}

export class UserRole extends BaseEntity {
	@Prop({ required: true, unique: true })
	name: string;
}

export const UserRolesSchema = SchemaFactory.createForClass(UserRole);
