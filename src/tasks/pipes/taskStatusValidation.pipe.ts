import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../taskStatus.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
  ];

  transform(value: any): any {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not a valid status.`);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
