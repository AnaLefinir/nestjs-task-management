import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDto {
    id: number;
    status: TaskStatus;
}