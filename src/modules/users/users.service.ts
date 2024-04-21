import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRolesService } from '@modules/user-roles/user-roles.service';
import { USER_ROLE } from '@modules/user-roles/entities/user-roles.entity';
import { UsersRepositoryInterface } from './interfaces/users.interface';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { FindAllResponse } from 'src/types/common.type';

@Injectable()
export class UsersService extends BaseServiceAbstract<User> {
	constructor(
		@Inject('UsersRepositoryInterface')
		private readonly users_repository: UsersRepositoryInterface,
		private readonly user_roles_service: UserRolesService,
	) {
		super(users_repository);
	}

	async findAll(
		filter?: object,
		options?: object,
	): Promise<FindAllResponse<User>> {
		return await this.users_repository.findAllWithSubFields(filter, {
			...options,
			populate: 'role',
		});
	}

	async findOneByCondition(condition: any): Promise<User> {
		return await this.users_repository.findOneByCondition(condition);
	}

	async getUserByUsername(username: string): Promise<User> {
		return await this.users_repository.findOneByCondition({ username });
	}

	async getUserWithRole(user_id: string): Promise<User> {
		try {
			return await this.users_repository.getUserWithRole(user_id);
		} catch (error) {
			throw error;
		}
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

	async setCurrentRefreshToken(
		id: string,
		hashed_token: string,
	): Promise<void> {
		try {
			await this.users_repository.update(id, {
				current_refresh_token: hashed_token,
			});
		} catch (error) {
			throw error;
		}
	}
}
