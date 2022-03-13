import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateUsertDto {
  @ApiProperty({ description: 'Uniq username'})
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: 'password'})
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: 'e-mail'})
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
