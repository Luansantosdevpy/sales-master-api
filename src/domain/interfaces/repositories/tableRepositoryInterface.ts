import ITable from '../modelInterfaces/tableInterface';

export default interface TableRepositoryInterface {
  save(user: ITable): Promise<ITable>;
  findByName(name: string): Promise<ITable | null>;
  findAll(): Promise<ITable[] | null>;
  findById(id: string): Promise<ITable | null>;
  delete(id: string): Promise<void>;
  update(id: string, ITable: Partial<ITable>): Promise<void>;
}
