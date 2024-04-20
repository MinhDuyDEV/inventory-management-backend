import { Category } from '@modules/categories/entities/category.entity';
import { Inventory } from '@modules/inventories/entities/inventory.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
	toJSON: {
		getters: true,
		virtuals: true, // Thêm vào option này
	},
})
export class Product {
	@Prop({
		required: true,
		minlength: 2,
		maxlength: 80,
		set: (name: string) => {
			return name.trim();
		},
	})
	name: string;

	@Prop({ required: true })
	price: number;

	@Prop({ required: true, default: 0 })
	weight: number;

	@Prop({
		default:
			'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
	})
	image: string;

	@Prop({
		required: false,
		default: 'No description',
		minlength: 1,
		maxlength: 255,
	})
	description: string;

	@Prop({ required: true, enum: [1, 2, 3], default: 1 })
	type: number;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Category.name,
		required: true,
	})
	category: Category;

	@Prop({
		required: true,
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }],
	})
	inventories: Inventory[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export const UserSchemaFactory = () => {
	const product_schema = ProductSchema;

	product_schema.virtual('total_cost').get(function (this: ProductDocument) {
		return this.price * this.weight;
	});
	return product_schema;
};
