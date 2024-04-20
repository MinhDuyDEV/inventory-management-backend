import { OmitType, PartialType } from '@nestjs/swagger';
import {
	IsDateString,
	IsEmail,
	IsEnum,
	IsOptional,
	IsPhoneNumber,
	IsString,
	MaxLength,
	ValidateNested,
} from 'class-validator';
import { GENDER } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '@modules/shared/base/create-address.dto';

export class UpdateUserDto extends PartialType(
	OmitType(CreateUserDto, ['email', 'password', 'username']),
) {
	@IsOptional()
	@MaxLength(60)
	@IsString()
	name?: string;

	@IsOptional()
	@MaxLength(60)
	@IsEmail()
	email: string;

	@IsOptional()
	@IsPhoneNumber()
	phone_number?: string;

	@IsOptional()
	@IsDateString()
	date_of_birth?: Date;

	@IsOptional()
	@IsEnum(GENDER)
	gender?: string;

	@IsOptional()
	@IsString()
	avatar?: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => CreateAddressDto)
	address?: CreateAddressDto;
}
