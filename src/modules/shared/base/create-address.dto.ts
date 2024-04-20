import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateAddressDto {
	@IsOptional()
	@MinLength(2)
	@MaxLength(120)
	street?: string;

	@IsNotEmpty()
	@MinLength(2)
	@MaxLength(50)
	district: string;

	@IsNotEmpty()
	@MinLength(2)
	@MaxLength(50)
	city: string;

	@IsNotEmpty()
	@MinLength(2)
	@MaxLength(50)
	country: string;
}
