import IPermission from '../modelInterfaces/permissionInteface';

export default interface PermissionRepositoryInterface {
  save(permission: IPermission): Promise<IPermission>;
  findByName(name: string): Promise<IPermission | null>;
  findAll(): Promise<IPermission[] | null>;
  findById(id: string): Promise<IPermission | null>;
  delete(id: string): Promise<void>;
  update(id: string, client: Partial<IPermission>): Promise<void>;
}
