import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserRoles } from '@modules/user-roles/entities/user-roles.entity';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { UserRolesRepositoryInterface } from '@modules/user-roles/interfaces/user-roles.interface';

@Injectable()
export class UserRolesRepository
	extends BaseRepositoryAbstract<UserRoles>
	implements UserRolesRepositoryInterface
{
	constructor(
		@InjectModel(UserRoles.name)
		private readonly user_roles_repository: Model<UserRoles>,
	) {
		super(user_roles_repository);
	}
}
