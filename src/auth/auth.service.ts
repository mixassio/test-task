import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { CreateSessiontDto } from './dto/create-session.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    createSessiontDto: CreateSessiontDto,
  ): Promise<Omit<User, 'passwordHash'>> {
    const { username, password } = createSessiontDto;
    const user: User = await this.usersService.getUserByUsernameWithPassword(
      username,
    );
    if (
      user &&
      (await this.usersService.compareHash(password, user.passwordHash))
    ) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  createToken({
    id,
    username,
  }: {
    id: number;
    username: string;
  }): { expiresIn: number; token: string } {
    const expiresIn = 60 * 60;
    const secretOrKey = 'SECRET_KEY';
    const user = { username, sub: id };
    const token = jwt.sign(user, secretOrKey, { expiresIn });

    return { expiresIn, token };
  }
}
