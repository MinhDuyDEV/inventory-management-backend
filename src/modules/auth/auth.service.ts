import { UsersService } from '@modules/users/users.service';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '@modules/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/token.interface';
import { JwtService } from '@nestjs/jwt';
import {
	access_token_private_key,
	refresh_token_private_key,
} from 'src/constraints/jwt.constraint';

@Injectable()
export class AuthService {
	private SALT_ROUND = 11;
	constructor(
		private readonly usersService: UsersService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	async signUp(sign_up_dto: SignUpDto) {
		try {
			const existed_user = await this.usersService.findOneByCondition({
				email: sign_up_dto.email,
			});
			if (existed_user) {
				throw new ConflictException('Email already existed!!');
			}
			const hashed_password = await bcrypt.hash(
				sign_up_dto.password,
				this.SALT_ROUND,
			);
			const user = await this.usersService.create({
				...sign_up_dto,
				password: hashed_password,
			});
			const refresh_token = this.generateRefreshToken({
				user_id: user.id.toString(),
			});
			await this.storeRefreshToken(user.id.toString(), refresh_token);
			return {
				access_token: this.generateAccessToken({
					user_id: user.id.toString(),
				}),
				refresh_token,
			};
		} catch (error) {
			throw error;
		}
	}

	async signIn(user_id: string) {
		try {
			const access_token = this.generateAccessToken({
				user_id,
			});
			const refresh_token = this.generateRefreshToken({
				user_id,
			});
			await this.storeRefreshToken(user_id, refresh_token);
			return {
				access_token,
				refresh_token,
			};
		} catch (error) {
			throw error;
		}
	}

	async getAuthenticatedUser(
		username: string,
		password: string,
	): Promise<User> {
		try {
			const user = await this.usersService.getUserByUsername(username);
			await this.verifyPlainContentWithHashedContent(password, user.password);
			return user;
		} catch (error) {
			throw new BadRequestException('Wrong credentials!!');
		}
	}

	private async verifyPlainContentWithHashedContent(
		plain_text: string,
		hashed_text: string,
	) {
		const is_matching = await bcrypt.compare(plain_text, hashed_text);
		if (!is_matching) {
			throw new BadRequestException();
		}
	}

	generateAccessToken(payload: TokenPayload) {
		return this.jwtService.sign(payload, {
			algorithm: 'RS256',
			privateKey: access_token_private_key,
			expiresIn: `${this.configService.get<string>(
				'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
			)}s`,
		});
	}

	generateRefreshToken(payload: TokenPayload) {
		return this.jwtService.sign(payload, {
			algorithm: 'RS256',
			privateKey: refresh_token_private_key,
			expiresIn: `${this.configService.get<string>(
				'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
			)}s`,
		});
	}

	async storeRefreshToken(user_id: string, token: string): Promise<void> {
		try {
			const hashed_token = await bcrypt.hash(token, this.SALT_ROUND);
			await this.usersService.setCurrentRefreshToken(user_id, hashed_token);
		} catch (error) {
			throw error;
		}
	}

	async getUserIfRefreshTokenMatched(
		user_id: string,
		refresh_token: string,
	): Promise<User> {
		try {
			const user = await this.usersService.findOneByCondition({
				_id: user_id,
			});
			if (!user) {
				throw new UnauthorizedException();
			}
			await this.verifyPlainContentWithHashedContent(
				refresh_token,
				user.current_refresh_token,
			);
			return user;
		} catch (error) {
			throw error;
		}
	}
}
