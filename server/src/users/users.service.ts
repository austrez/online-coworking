import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private userRepository: typeof User) {}

	async getUser(dto: GetUserDto) {
		const user = await this.userRepository.findOne({
			where: {
				password: dto.password,
				login: dto.login,
			},
		});

		return user;
	}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto);
		return user;
	}
}
