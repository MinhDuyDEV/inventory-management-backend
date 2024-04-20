import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { UserRoles } from '../entities/user-roles.entity';

export interface UserRolesRepositoryInterface
	extends BaseRepositoryInterface<UserRoles> {}
