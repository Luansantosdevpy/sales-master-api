import { injectable } from 'tsyringe';
import Logger from '../../log/logger';
import PermissionRepositoryInterface from '../../../domain/interfaces/repositories/permissionRepositoryInterface';
import Permission from '../../../domain/models/Permission';
import IPermission from '../../../domain/interfaces/modelInterfaces/permissionInteface';

@injectable()
export default class PermissionRepository implements PermissionRepositoryInterface {
  public save = async (newPermission: Partial<IPermission>): Promise<IPermission> => {
    Logger.debug(
      `PermissionRepository - create - execute [newPermission: ${newPermission}]`
    );
    const permission = await Permission.create({
      ...newPermission,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return permission;
  };

  public findByName = async (name: string): Promise<IPermission | null> => {
    Logger.debug(`PermissionRepository - findByName - name: ${name}`);
    return await Permission.findOne({ name });
  };

  public findAll = async (): Promise<IPermission[]> => {
    Logger.debug('PermissionRepository - findAll - execute');
    return await Permission.find().sort({ name: 1 });
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`PermissionRepository - delete - execute [id: ${id}]`);
    await Permission.deleteOne({ _id: id });
  };

  public update = async (
    id: string,
    updatedPermission: Partial<IPermission>
  ): Promise<void> => {
    Logger.debug(
      `PermissionRepository - update - execute [id: ${id} | updatedPermission: ${updatedPermission}]`
    );
    await Permission.updateOne(
      { _id: id },
      {
        ...updatedPermission,
        updatedAt: new Date(),
      }
    );
  };

  public findById = async (id: string): Promise<IPermission | null> => {
    Logger.debug(`PermissionRepository - findById - execute [id: ${id}]`);
    return await Permission.findById({ _id: id }).exec();
  };
}
