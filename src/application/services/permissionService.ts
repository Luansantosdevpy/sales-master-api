import { inject, injectable } from 'tsyringe';
import Logger from '../../infrastructure/log/logger';
import IPermission from '../../domain/interfaces/modelInterfaces/permissionInteface';
import PermissionRepositoryInterface from '../../domain/interfaces/repositories/permissionRepositoryInterface';

@injectable()
class PermissionService {
  constructor(
    @inject('PermissionRepositoryInterface')
    public readonly permissionRepository: PermissionRepositoryInterface
  ) {}

  async create(permission: IPermission): Promise<IPermission> {
    Logger.debug('PermissionService - create - call permissionRepository.save');
    return this.permissionRepository.save(permission);
  }

  public findAll = async (): Promise<IPermission[] | null> => {
    Logger.debug('PermissionService - findAll - call permissionRepository.findAll');
    return this.permissionRepository.findAll();
  };

  public update = async (
    id: string,
    updatedPermission: Partial<IPermission>
  ): Promise<void> => {
    Logger.debug('PermissionService - update - call PermissionService.find');
    await this.findById(id);

    Logger.debug('PermissionService - update - call permissionRepository.update');
    return this.permissionRepository.update(id, updatedPermission);
  };

  public findById = async (id: string): Promise<IPermission | null> => {
    Logger.debug('PermissionService - findById - call permissionRepository.findById');
    return this.permissionRepository.findById(id);
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug('PermissionService - delete - call permissionRepository.findById');
    await this.findById(id);

    Logger.debug('PermissionService - delete - call permissionRepository.delete');
    return this.permissionRepository.delete(id);
  };
}

export default PermissionService;
