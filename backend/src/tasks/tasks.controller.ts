import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { SyncTasksDto } from './dto/sync-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const task = await this.tasksService.getById(id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<Task> {
    return this.tasksService.delete(id);
  }

  @Post('sync')
  async sync(@Body() syncTasksDto: SyncTasksDto): Promise<Task[]> {
    return this.tasksService.sync(syncTasksDto.tasks);
  }
}
