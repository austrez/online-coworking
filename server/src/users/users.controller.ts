import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async getUser(@Query() dto: GetUserDto) {
		const user = await this.usersService.getUser(dto);
		return user;
	}

	@Post()
	createUser(@Body() dto: CreateUserDto) {
		const user = this.usersService.createUser(dto);
		return user;
	}
}
