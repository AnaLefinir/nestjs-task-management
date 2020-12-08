import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UnsupportedMediaTypeException, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto : CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): void {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(@Param('id', ParseIntPipe) id: number, @Body(TaskStatusValidationPipe) updateTaskDto : UpdateTaskDto): Promise<Task> {
        updateTaskDto.id = id;

        return this.tasksService.updateTaskStatus(updateTaskDto);
    }
}

//creacion y get usuario
//Servicio Slack mandar msj hardcore
// 3. De donde sacar los datos 
// fecha creacion usuario? dockler compose app -d
// terraform para la db?
//meter new relic, datadog, metricas,  