import { CreateAddressDto } from '@modules/shared/base/create-address.dto';
import { Type } from 'class-transformer';
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsStrongPassword,
	MaxLength,
	ValidateNested,
} from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	@MaxLength(60)
	name: string;

	@IsNotEmpty()
	@MaxLength(60)
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@MaxLength(50)
	username: string;

	@IsNotEmpty()
	@IsStrongPassword()
	password: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => CreateAddressDto)
	address?: CreateAddressDto;
}
