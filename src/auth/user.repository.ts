import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.password = await UserRepository.hashPassword(password);

    try {
      await user.save();
    } catch (e) {
      if (e.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already taken.');
      }
      throw e;
    }
  }

  async validatePassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private static async hashPassword(
    plainTextPassword: string,
  ): Promise<string> {
    return bcrypt.hash(plainTextPassword, 10);
  }
}
