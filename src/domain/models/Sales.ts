import Sequelize, { Model } from 'sequelize';
import database from '../../infrastructure/data/config/database';
import Client from './Client';

class Sale extends Model {
  public id: string;

  public date: Date;

  public clientId: string;

  public total: number;

  public itensSale: string[];

  public createdAt?: Date | string;

  public updatedAt?: Date | string;
}

Sale.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    date: Sequelize.DATE,
    clientId: {
      type: Sequelize.UUID
    },
    total: Sequelize.DECIMAL(10, 2),
    itensSale: {
      type: Sequelize.JSONB,
      defaultValue: []
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'sales',
    sequelize: database.connection
  }
);

Sale.belongsTo(Client, {
  foreignKey: 'clientId',
  as: 'client'
});

export default Sale;
