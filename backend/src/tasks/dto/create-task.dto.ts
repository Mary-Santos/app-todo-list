import { IsUUID, IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  completed: boolean;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
