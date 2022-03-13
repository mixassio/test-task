import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUsertDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }

  async getUserByUsernameWithPassword(username: string): Promise<User> {
    const [user, _] = await this.userRepository.find({
      select: ['id', 'username', 'passwordHash', 'email'],
      where: { username },
    });

    return user;
  }

  async createUser(createUsertDto: CreateUsertDto): Promise<number> {
    const user = this.userRepository.create();
    user.username = createUsertDto.username;
    user.email = createUsertDto.email;
    user.passwordHash = await this.getHash(createUsertDto.password);
    const { id } = await this.userRepository.save(user);
    return id;
  }

  async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
