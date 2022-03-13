import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AuthDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly expiresIn: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}
