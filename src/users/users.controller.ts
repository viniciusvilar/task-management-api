import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    list() {
        return this.userService.list()
    }

    @Post()
    create(@Body() user: UserDto) {
        this.userService.create(user)
    }
}
