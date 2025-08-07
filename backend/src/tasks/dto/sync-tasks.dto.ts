import { IsUUID, IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class SyncTaskDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string | null = null;

  @IsString()
  status: string;

  @Type(() => Date)
  @IsDateString()
  createdAt: Date;

  @Type(() => Date)
  @IsDateString()
  updatedAt: Date;

  @IsBoolean()
  deleted: boolean;
}

export class SyncTasksDto {
  tasks: SyncTaskDto[];
}