import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(t => t.id === id);

        if(!found){
            throw new NotFoundException();
        }

        return found;
    }

    createTask(createTaskDto : CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): Task {
        const taskToDelete = this.getTaskById(id);
        this.tasks = this.tasks.filter(t => t.id !== taskToDelete.id);

        return taskToDelete;
    }

    updateTaskStatus(updateTaskDto: UpdateTaskDto): Task {
        let taskToUpdate = this.getTaskById(updateTaskDto.id);
        taskToUpdate.status = updateTaskDto.status;

        return taskToUpdate;
    }
}
