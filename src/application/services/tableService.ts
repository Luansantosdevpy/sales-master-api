import { inject, injectable } from 'tsyringe';
import Logger from '../../infrastructure/log/logger';
import ITable from '../../domain/interfaces/modelInterfaces/tableInterface';
import TableRepositoryInterface from '../../domain/interfaces/repositories/tableRepositoryInterface';

@injectable()
class TableService {
  constructor(
    @inject('TableRepositoryInterface')
    public readonly tableRepository: TableRepositoryInterface
  ) {}

  async create(table: ITable): Promise<ITable> {
    Logger.debug('TableService - create - call ProviderRepository.save');
    return this.tableRepository.save(table);
  }

  public findAll = async (): Promise<ITable[] | null> => {
    Logger.debug('TableService - findAll - call tableRepository.findAll');
    return this.tableRepository.findAll();
  };

  public update = async (
    id: string,
    updatedProvider: Partial<ITable>
  ): Promise<void> => {
    Logger.debug('TableService - update - call TableService.find');
    await this.findById(id);

    Logger.debug('TableService - update - call tableRepository.update');
    return this.tableRepository.update(id, updatedProvider);
  };

  public findById = async (id: string): Promise<ITable | null> => {
    Logger.debug(
      'TableService - findById - call tableRepository.findById'
    );
    return this.tableRepository.findById(id);
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug('TableService - delete - call tableRepository.findById');
    await this.findById(id);

    Logger.debug('TableService - delete - call tableRepository.delete');
    return this.tableRepository.delete(id);
  };
}

export default TableService;
