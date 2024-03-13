import { injectable } from 'tsyringe';
import Logger from '../../log/logger';
import User from '../../../domain/models/User';
import IUser from '../../../domain/interfaces/modelInterfaces/userInterface';
import UserRepositoryInterface from '../../../domain/interfaces/repositories/userRepositoryInterface';

@injectable()
export default class UserRepository implements UserRepositoryInterface {
  public exists = async (email: string, id?: string): Promise<boolean> => {
    Logger.debug(`UserRepository - exists - execute [email: ${email}]`);
    const where: any = {
      email: { $regex: new RegExp(email, 'i') }
    };

    if (id) {
      where._id = { $ne: id };
    }

    const result = await User.findOne(where);

    return !!result;
  };

  public create = async (newUser: Partial<IUser>): Promise<IUser> => {
    Logger.debug(`UserRepository - create - execute [newUser: ${newUser}]`);
    const user = await User.create({
      ...newUser,
    });
    return user;
  };

  public findByEmail = async (email: string): Promise<IUser | null> => {
    Logger.debug(`UserRepository - findByEmail - Email: ${email}`);
    return await User.findOne({ email });
  };
}
