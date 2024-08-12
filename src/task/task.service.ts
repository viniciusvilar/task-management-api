import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor (
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ) {}

    async create(task: TaskDto) {
        const TaskToSave: TaskEntity = {
            title: task.title,
            description: task.description,
            expirationDate: task.expirationDate,
            status: TaskStatusEnum.TO_DO
        }

        const createdTask = await this.taskRepository.save(TaskToSave)

        return this.mapEntityToDto(createdTask)
    }

    async find(id: string): Promise<TaskDto> {
        const task = await this.taskRepository.findOne({
            where: {id}
        })

        if (!task) {
            throw new HttpException(`Task with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return this.mapEntityToDto(task);
    }

    async findAll(params: FindAllParameters): Promise<TaskDto[]> {
        const searchParams: FindOptionsWhere<TaskEntity> = {}

        if (params.title) {
            searchParams.title = Like(`%${params.title}}%`);
        }

        if (params.status) {
            searchParams.status = Like(`%${params.status}}%`);
        }

        const taskFound = await this.taskRepository.find({
            where: searchParams
        })

        return taskFound.map(taskEntity => this.mapEntityToDto(taskEntity))
    }

    

    async update(id: string, task: TaskDto) {
        const foundTask = await this.taskRepository.findOne({where: {id}})

        if (!foundTask) {
            throw new HttpException(`Task with ID ${task.id} not found`, HttpStatus.BAD_REQUEST)
        }

        await this.taskRepository.update(id, this.mapDtoToEntity(task))

    }

    async delete(id: string) {
        const result = await this.taskRepository.delete(id)

        if (!result.affected) {
            throw new HttpException(`Task with ID ${id} not found`, HttpStatus.BAD_REQUEST)
        }
    }


    private mapEntityToDto(taskEntity:TaskEntity): TaskDto {
        return {
            id: taskEntity.id,
            title: taskEntity.title,
            description: taskEntity.description,
            expirationDate: taskEntity.expirationDate,
            status: TaskStatusEnum[taskEntity.status]
        }
    }

    private mapDtoToEntity(taskDto: TaskDto): Partial<TaskEntity> {
        return {
            title: taskDto.title,
            description: taskDto.description,
            expirationDate: taskDto.expirationDate,
            status: taskDto.status.toString()
        }
    }
}
