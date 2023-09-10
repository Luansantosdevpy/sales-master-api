import { injectable } from 'tsyringe';
import Sequelize, { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Logger from '../../log/logger';
import User from '../../../domain/models/User';
import UserRepositoryInterface from '../../../domain/interfaces/repositories/userRepositoryInterface';

@injectable()
export default class UserRepository implements UserRepositoryInterface {

  public exists = async (email: string, id?: string): Promise<boolean> => {
    Logger.debug(`UserRepository - exists - execute [email: ${email}]`);
    const where: any = {
      email: {
        [Sequelize.Op.iLike]: email
      }
    };

    if (id) {
      where.id = {
        [Sequelize.Op.not]: id
      };
    }

    const result = await User.findOne({
      where
    });

    return !!result;
  };

  public create = async (newUser: Partial<User>): Promise<User> => {
    Logger.debug(`UserRepository - create - execute [newUser: ${newUser}]`);
    const user = User.create({
      id: uuidv4(),
      name: newUser.name,
      email: newUser.email,
      cpf: newUser.cpf,
      password: newUser.password,
      confirm_password: newUser.confirm_password,
    });
    return user;
  };

  public findByEmail = async (email: string): Promise<User | null> => {
    Logger.debug(`UserRepository - findByEmail - Email: ${email}`);
    return User.findOne({
      where: {
        email
      }
    });
  };
}
