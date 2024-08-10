import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) {}

    @Get()
    findAll(@Query() params: FindAllParameters): TaskDto[] {
        return this.taskService.findAll(params)
    }

    @Post()
    create(@Body() task: TaskDto) {
        this.taskService.create(task);
        console.log(this.taskService)
    }

    @Get("/:id")
    find(@Param('id') id:string): TaskDto {
        return this.taskService.find(id)
    }

    @Put()
    update(@Body() task: TaskDto) {
        return this.taskService.update(task)
    }

    @Delete('/:id')
    remove(@Param('id') id:string) {
        return this.taskService.delete(id)
    }

}
