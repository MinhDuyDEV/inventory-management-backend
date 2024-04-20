import { BaseEntity } from '@modules/shared/base/base.entity';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export enum USER_ROLE {
	ADMIN = 'admin',
	USER = 'user',
	SUPPLIER = 'supplier',
}

export class UserRoles extends BaseEntity {
	@Prop({ required: true, unique: true })
	name: string;
}

export const UserRolesSchema = SchemaFactory.createForClass(UserRoles);
