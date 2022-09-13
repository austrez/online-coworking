import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getUser(@Query() dto: GetUserDto) {
		return this.usersService.getUser(dto);
	}

	@Post()
	createUser(@Body() dto: CreateUserDto) {
		return this.usersService.createUser(dto);
	}
}
