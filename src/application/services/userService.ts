import { inject, injectable } from "tsyringe";
import bcrypt from 'bcrypt';
import Logger from "../../infrastructure/log/logger";
import ValidationError from "../exceptions/validationError";
import User from "../../domain/models/User";
import UserInterfaceRepository from "../../domain/interfaces/repositories/userRepositoryInterface";
const salt_rounds = 10;

@injectable()
class UserService {
    constructor(
        @inject('UserRepositoryInterface')
        public readonly userRepository: UserInterfaceRepository
    ) {}

    async register(user: User): Promise<User> {
        Logger.debug('UserService - create - validate email');
        const emailExists = await this.userRepository.exists(user.email);

        if (emailExists) {
        throw new ValidationError(
          `The email '${user.email}' is already in use.`
        );
        }

        user.password = await bcrypt.hash(user.password, salt_rounds)
        user.confirm_password = await bcrypt.hash(user.confirm_password, salt_rounds)

        Logger.debug('UserService - create - call userRepository.create');
        return this.userRepository.create(user);
    }
}

export default UserService;