import Sequelize, { Model } from 'sequelize';
import database from '../../infrastructure/data/config/database';

class Client extends Model {
  public id: string;

  public name: string;

  public email: string;

  public phone_number: string;

  public cpf: string;

  public address: string;

  public postal_code: string;

  public address_number: number;

  public complement: string;

  public province: string;

  public city: string;

  public uf: string;

  public createdAt?: Date | string;

  public updatedAt?: Date | string;
}

Client.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    cpf: Sequelize.STRING,
    address: Sequelize.STRING,
    postal_code: Sequelize.STRING,
    address_number: Sequelize.NUMBER,
    complement: Sequelize.STRING,
    province: Sequelize.STRING,
    city: Sequelize.STRING,
    uf: Sequelize.STRING,
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'clients',
    sequelize: database.connection
  }
);

export default Client;
