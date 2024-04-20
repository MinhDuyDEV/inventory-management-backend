import { Prop } from '@nestjs/mongoose';
import { Address, AddressSchema } from './address.entity';

export class LocationBaseEntity {
	_id?: string;

	@Prop({
		type: AddressSchema,
	})
	address: Address;

	@Prop({ default: null })
	deleted_at: Date;
}
