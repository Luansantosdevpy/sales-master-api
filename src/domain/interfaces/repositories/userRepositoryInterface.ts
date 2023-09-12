import User from '../../models/User';

export default interface UserRepositoryInterface {
  exists(email: string): Promise<boolean>;
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
