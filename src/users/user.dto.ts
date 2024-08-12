import { IsEmail } from "class-validator"

export class UserDto {
    id?: string

    @IsEmail()
    username: string
    password: string
}