import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UsersListDto } from './dto/users-list.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Show all users', description: 'access only jwt' })
  @ApiResponse({
    status: 201,
    description: 'All users',
    type: UsersListDto,
    isArray: true,
  })
  findAll(): Promise<User[]> {
    return this.usersService.getUsers();
  }
}
