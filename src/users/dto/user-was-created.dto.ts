import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserWasCreatedDto {
  @ApiProperty({ description: 'Id new created user'})
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}
