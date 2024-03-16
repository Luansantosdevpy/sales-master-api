import { inject, injectable } from 'tsyringe';
import Logger from '../../infrastructure/log/logger';
import IRole from '../../domain/interfaces/modelInterfaces/roleInterface';
import RoleRepositoryInterface from '../../domain/interfaces/repositories/roleRepositoryInterface';

@injectable()
class RoleService {
  constructor(
    @inject('RoleRepositoryInterface')
    public readonly roleRepository: RoleRepositoryInterface
  ) {}

  async create(role: IRole): Promise<IRole> {
    Logger.debug('RoleService - create - call roleRepository.save');
    return this.roleRepository.save(role);
  }

  public findAll = async (): Promise<IRole[] | null> => {
    Logger.debug('RoleService - findAll - call roleRepository.findAll');
    return this.roleRepository.findAll();
  };

  public update = async (
    id: string,
    updatedRole: Partial<IRole>
  ): Promise<void> => {
    Logger.debug('RoleService - update - call RoleService.find');
    await this.findById(id);

    Logger.debug('RoleService - update - call roleRepository.update');
    return this.roleRepository.update(id, updatedRole);
  };

  public findById = async (id: string): Promise<IRole | null> => {
    Logger.debug('RoleService - findById - call roleRepository.findById');
    return this.roleRepository.findById(id);
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug('RoleService - delete - call roleRepository.findById');
    await this.findById(id);

    Logger.debug('RoleService - delete - call roleRepository.delete');
    return this.roleRepository.delete(id);
  };
}

export default RoleService;
