import { TaskStatus } from '../taskStatus.enum';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
