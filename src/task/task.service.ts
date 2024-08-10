import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = []

    create(task: TaskDto) {
        this.tasks.push(task);
    }

    findAll(params: FindAllParameters): TaskDto[] {
        return this.tasks.filter(t => {
            let match = true

            if (params.title != undefined && !t.title.includes(params.title)) {
                match = false
            }
            
            if (params.status != undefined && !t.status.includes(params.status)) {
                match = false
            }

            return match

        })
    }

    find(id: string): TaskDto {
        const task = this.tasks.filter(t => t.id === id)

        if (task.length) {
            return task[0]
        }

        throw new HttpException(`Task with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    update(task: TaskDto): TaskDto {
        let taskIndex = this.tasks.findIndex(t => task.id === t.id)

        if (taskIndex >= 0) {
            this.tasks[taskIndex] = task
            return;
        }

        throw new HttpException(`Task with ID ${task.id} not found`, HttpStatus.BAD_REQUEST)
    }

    delete(id: string) {
        let taskIndex = this.tasks.findIndex(t => id === t.id)

        if (taskIndex >= 0) {
            this.tasks.splice(taskIndex, 1)
            return;
        }

        throw new HttpException(`Task with ID ${id} not found`, HttpStatus.BAD_REQUEST)
    }
}
