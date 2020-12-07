import { Body, Controller, Delete, Get, Param, Patch, Post, UnsupportedMediaTypeException, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto : CreateTaskDto): Task{
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Task {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(@Param('id') id: string, @Body(TaskStatusValidationPipe) updateTaskDto : UpdateTaskDto): Task {
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