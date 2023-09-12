import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../exceptions/validationError';
import User from '../../domain/models/User';
import UserInterfaceRepository from '../../domain/interfaces/repositories/userRepositoryInterface';

@injectable()
class UserService {
  private readonly salt_rounds = 10;
  private readonly secret_key = process.env.SECRET_KEY!;
  constructor(
    @inject('UserRepositoryInterface')
    public readonly userRepository: UserInterfaceRepository
  ) {}

  async register(user: User): Promise<User> {
    Logger.debug('UserService - create - validate email');
    const emailExists = await this.userRepository.exists(user.email);

    if (emailExists) {
      throw new ValidationError(`The email '${user.email}' is already in use.`);
    }

    user.password = await bcrypt.hash(user.password, this.salt_rounds);
    user.confirm_password = await bcrypt.hash(
      user.confirm_password,
      this.salt_rounds
    );

    Logger.debug('UserService - create - call userRepository.create');
    return this.userRepository.create(user);
  }

  async login(login: User): Promise<string> {
    Logger.debug('UserService - create - validate email');
    const user = await this.userRepository.findByEmail(login.email);

    if (!user) {
      throw new ValidationError(`The email '${login.email}' does not exist.`);
    }

    Logger.debug('UserService - create - call userRepository.create');
    const passwordMatch = await bcrypt.compare(login.password, user.password);
    if (!passwordMatch) {
      throw new ValidationError(`The passwords dont match`);
    }

    const token = jwt.sign({ userId: user.id }, this.secret_key);

    return token;
  }
}

export default UserService;
