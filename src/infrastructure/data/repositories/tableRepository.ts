import { injectable } from 'tsyringe';
import Logger from '../../log/logger';
import Provider from '../../../domain/models/Provider';
import TableRepositoryInterface from '../../../domain/interfaces/repositories/tableRepositoryInterface';
import ITable from '../../../domain/interfaces/modelInterfaces/tableInterface';
import Table from '../../../domain/models/Table';

@injectable()
export default class TableRepository implements TableRepositoryInterface {
  public save = async (newTable: Partial<ITable>): Promise<ITable> => {
    Logger.debug(
      `TableRepository - create - execute [newTable: ${newTable}]`
    );
    const table = await Table.create({
      ...newTable,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return table;
  };

  public findByName = async (name: string): Promise<ITable | null> => {
    Logger.debug(`TableRepository - findByName - name: ${name}`);
    return await Table.findOne({ name });
  };

  public findAll = async (): Promise<ITable[]> => {
    Logger.debug('TableRepository - findAll - execute');
    return await Table.find().sort({ name: 1 });
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`TableRepository - delete - execute [id: ${id}]`);
    await Table.deleteOne({ _id: id });
  };

  public update = async (
    id: string,
    updatedTable: Partial<ITable>
  ): Promise<void> => {
    Logger.debug(
      `TableRepository - update - execute [id: ${id} | updatedTable: ${updatedTable}]`
    );
    await Table.updateOne(
      { _id: id },
      {
        ...updatedTable,
        updatedAt: new Date(),
      }
    );
  };

  public findById = async (id: string): Promise<ITable | null> => {
    Logger.debug(`TableRepository - findById - execute [id: ${id}]`);
    return await Table.findById(id);
  };
}
