import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserRole } from '@modules/user-roles/entities/user-roles.entity';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { UserRolesRepositoryInterface } from '@modules/user-roles/interfaces/user-roles.interface';

@Injectable()
export class UserRolesRepository
	extends BaseRepositoryAbstract<UserRole>
	implements UserRolesRepositoryInterface
{
	constructor(
		@InjectModel(UserRole.name)
		private readonly user_roles_repository: Model<UserRole>,
	) {
		super(user_roles_repository);
	}
}
