import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthResponseDto } from './auth-response.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    async signIn(@Body() user: AuthDto): Promise<AuthResponseDto> {
        return  await this.authService.signIn(user)
    }
}
