import { Inject, Injectable } from '@nestjs/common';
import { UserRole } from './entities/user-roles.entity';
import { UserRolesRepositoryInterface } from './interfaces/user-roles.interface';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';

@Injectable()
export class UserRolesService extends BaseServiceAbstract<UserRole> {
	constructor(
		@Inject('UserRolesRepositoryInterface')
		private readonly user_roles_repository: UserRolesRepositoryInterface,
	) {
		super(user_roles_repository);
	}

	async findOneByCondition(condition: any): Promise<UserRole> {
		return await this.user_roles_repository.findOneByCondition(condition);
	}
}
