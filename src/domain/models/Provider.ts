import Sequelize, { Model } from 'sequelize';
import database from '../../infrastructure/data/config/database';

class Provider extends Model {
  public id: string;

  public name: string;

  public cnpj: string;

  public corporate_name: string;

  public fantasy_name: string;

  public phone_number: string;

  public postal_code: string;

  public address: string;

  public complement: string;

  public address_number: string;

  public province: string;

  public city: string;

  public uf: string;

  public active: boolean;

  public createdAt?: Date | string;

  public updatedAt?: Date | string;
}

Provider.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING,
    cnpj: Sequelize.STRING,
    corporate_name: Sequelize.STRING,
    fantasy_name: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    postal_code: Sequelize.STRING,
    address: Sequelize.STRING,
    complement: Sequelize.STRING,
    address_number: Sequelize.STRING,
    province: Sequelize.STRING,
    city: Sequelize.STRING,
    uf: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'providers',
    sequelize: database.connection
  }
);

export default Provider;
