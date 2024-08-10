import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthResponseDto } from './auth-response.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() user: AuthDto): AuthResponseDto {
        return this.authService.signIn(user)
    }
}
