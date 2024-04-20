import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { UserRole } from '@modules/user-roles/entities/user-roles.entity';

export interface UserRolesRepositoryInterface
	extends BaseRepositoryInterface<UserRole> {}
