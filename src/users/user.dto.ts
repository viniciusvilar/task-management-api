import { IsEmail } from "class-validator"

export class UserDto {
    id?: string

    username: string
    password: string
}