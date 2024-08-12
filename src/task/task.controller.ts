import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskRouteParameters } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) {}

    @Post()
    async create(@Body() task:TaskDto): Promise<TaskDto> {
        return await this.taskService.create(task);
    }

    @Get("/:id")
    async find(@Param('id') id:string): Promise<TaskDto> {
        return await this.taskService.find(id)
    }

    @Get()
    async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
        return await this.taskService.findAll(params)
    }

    @Put(":id")
    async update(@Param() params: TaskRouteParameters, @Body() task: TaskDto) {
        return await this.taskService.update(params.id, task)
    }

    @Delete('/:id')
    remove(@Param('id') id:string) {
        return this.taskService.delete(id)
    }

}
