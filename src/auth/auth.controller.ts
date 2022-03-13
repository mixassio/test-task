import {
  Controller,
  Post,
  HttpStatus,
  Body,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateSessiontDto } from './dto/create-session.dto';
import { CreateUsertDto } from '../users/dto/create-user.dto';
import { UserWasCreatedDto } from '../users/dto/user-was-created.dto';
import { AuthDto } from './dto/auth.dto';

@ApiTags('users')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'User has been successfully created.',
    type: UserWasCreatedDto,
  })
  @ApiForbiddenResponse({ description: 'User already exist.' })
  async createUser(@Body() createUsertDto: CreateUsertDto) {
    const user = await this.usersService.getUserByUsername(
      createUsertDto.username,
    );
    if (user) {
      throw new HttpException('User already exist', HttpStatus.FORBIDDEN);
    }
    return await this.usersService.createUser(createUsertDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: CreateSessiontDto })
  @ApiOperation({ summary: 'Create session' })
  @ApiResponse({
    status: 201,
    description: 'Token has been successfully created.',
    type: AuthDto,
  })
  @ApiResponse({ status: 403, description: 'User not found' })
  async login(@Request() req) {
    return this.authService.createToken(req.user);
  }
}
