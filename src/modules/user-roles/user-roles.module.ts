import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRoles, UserRolesSchema } from './entities/user-roles.entity';
import { UserRolesRepository } from '@repositories/user-roles.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: UserRoles.name, schema: UserRolesSchema },
		]),
	],
	controllers: [UserRolesController],
	providers: [
		UserRolesService,
		{ provide: 'UserRolesRepositoryInterface', useClass: UserRolesRepository },
	],
	exports: [UserRolesService, 'UserRolesRepositoryInterface'],
})
export class UserRolesModule {}
