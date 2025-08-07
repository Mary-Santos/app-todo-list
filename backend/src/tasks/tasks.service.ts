import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../tasks/dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // GET /tasks
  async getAll(): Promise<Task[]> {
    return this.prisma.task.findMany({ where: { deleted: false } });
  }

  // GET /tasks/:id
  async getById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  // POST /tasks
  async create(data: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  // PUT /tasks/:id
  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  // DELETE /tasks/:id (soft delete)
  async delete(id: string): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { deleted: true },
    });
  }

  // SYNC endpoint
  async sync(tasks: Task[]): Promise<Task[]> {
    const updatedTasks: Task[] = [];

    for (const task of tasks) {
      const existing = await this.prisma.task.findUnique({
        where: { id: task.id },
      });

      if (!existing) {
        const created = await this.prisma.task.create({ data: task });
        updatedTasks.push(created);
      } else if (new Date(task.updatedAt) > existing.updatedAt) {
        const updated = await this.prisma.task.update({
          where: { id: task.id },
          data: task,
        });
        updatedTasks.push(updated);
      }
    }

    return this.prisma.task.findMany();
  }
}
