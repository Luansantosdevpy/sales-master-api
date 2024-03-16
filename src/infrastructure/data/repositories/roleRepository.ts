import { injectable } from 'tsyringe';
import Logger from '../../log/logger';
import RoleRepositoryInterface from '../../../domain/interfaces/repositories/roleRepositoryInterface';
import IRole from '../../../domain/interfaces/modelInterfaces/roleInterface';
import Role from '../../../domain/models/Role';

@injectable()
export default class RoleRepository implements RoleRepositoryInterface {
  public save = async (newRole: Partial<IRole>): Promise<IRole> => {
    Logger.debug(
      `RoleRepository - create - execute [newRole: ${newRole}]`
    );
    const permission = await Role.create({
      ...newRole,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return permission;
  };

  public findByName = async (name: string): Promise<IRole | null> => {
    Logger.debug(`RoleRepository - findByName - name: ${name}`);
    return await Role.findOne({ name });
  };

  public findAll = async (): Promise<IRole[]> => {
    Logger.debug('RoleRepository - findAll - execute');
    return await Role.find().sort({ name: 1 });
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`RoleRepository - delete - execute [id: ${id}]`);
    await Role.deleteOne({ _id: id });
  };

  public update = async (
    id: string,
    updatedRole: Partial<IRole>
  ): Promise<void> => {
    Logger.debug(
      `RoleRepository - update - execute [id: ${id} | updatedRole: ${updatedRole}]`
    );
    await Role.updateOne(
      { _id: id },
      {
        ...updatedRole,
        updatedAt: new Date(),
      }
    );
  };

  public findById = async (id: string): Promise<IRole | null> => {
    Logger.debug(`RoleRepository - findById - execute [id: ${id}]`);
    return await Role.findById({ _id: id }).exec();
  };
}
