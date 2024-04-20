import { BaseEntity } from '@modules/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class Category extends BaseEntity {
	@Prop({ required: true, minlength: 2, maxlength: 60 })
	name: string;

	@Prop({ required: false })
	description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
