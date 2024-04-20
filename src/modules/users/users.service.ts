import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRolesService } from '@modules/user-roles/user-roles.service';
import { USER_ROLE } from '@modules/user-roles/entities/user-roles.entity';
import { BaseServiceAbstract } from '@modules/user-roles/services/base/base.abstract.service';
import { UsersRepositoryInterface } from './interfaces/users.interface';

@Injectable()
export class UsersService extends BaseServiceAbstract<User> {
	constructor(
		@Inject('UsersRepositoryInterface')
		private readonly users_repository: UsersRepositoryInterface,
		private readonly user_roles_service: UserRolesService,
	) {
		super(users_repository);
	}

	async findOneByCondition(condition: any): Promise<User> {
		return await this.users_repository.findOneByCondition(condition);
	}

	async getUserByEmail(email: string): Promise<User> {
		return await this.users_repository.findOneByCondition({ email });
	}

	async create(create_dto: CreateUserDto): Promise<User> {
		let user_role = await this.user_roles_service.findOneByCondition({
			name: USER_ROLE.USER,
		});
		if (!user_role) {
			user_role = await this.user_roles_service.create({
				name: USER_ROLE.USER,
			});
		}
		const user = await this.users_repository.create({
			...create_dto,
			role: user_role,
		});
		return user;
	}
}
