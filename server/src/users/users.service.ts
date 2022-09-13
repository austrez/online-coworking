import { Injectable } from '@nestjs/common';

import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	getUser(dto: GetUserDto) {
		return dto;
	}

	createUser(dto: CreateUserDto) {
		return dto;
	}
}
