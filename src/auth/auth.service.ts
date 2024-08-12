import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './auth.dto';
import { AuthResponseDto } from './auth-response.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtExpirationTimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME')
    }

    async signIn(user: AuthDto): Promise<AuthResponseDto> {
        const foundUser = await this.userService.findByUsername(user.username)

        if (!foundUser || !compareSync(user.password, foundUser.password)) {
            throw new HttpException("Username or Password incorrect", HttpStatus.UNAUTHORIZED)
        }

        const payload = { sub: foundUser.id, username: foundUser.username}

        const token = this.jwtService.sign(payload)

        return {token, expiresIn: this.jwtExpirationTimeInSeconds}
    }
}
