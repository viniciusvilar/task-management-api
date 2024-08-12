import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}



    async list() {
        return await this.userRepository.find()
    }

    async create(newUser: UserDto) {
        const userAlreadyRegistred = await this.findByUsername(newUser.username)

        if (userAlreadyRegistred) {
            throw new ConflictException(`User "${newUser.username}" already registred`)
        }

        const dbUser = new UserEntity()
        dbUser.username = newUser.username
        dbUser.passwordHash = hashSync(newUser.password, 10)

        const {id, username} = await this.userRepository.save(dbUser)

        return {id, username}
    }

    async findByUsername(username: string): Promise<UserDto | null> {
        const userFound = await this.userRepository.findOne({
            where: {username}
        })

        if (!userFound) {
            return null
        }

        return {
            id: userFound.id,
            username: userFound.username,
            password: userFound.passwordHash
        };
    }
}
