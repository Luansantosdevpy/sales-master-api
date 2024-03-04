import Sequelize, { Model } from 'sequelize';
import database from '../../infrastructure/data/config/database';
import Client from './Client';

class Cart extends Model {
  public id: string;

  public clientId?: string;

  public table?: number;

  public items: string[];

  public finished: boolean;

  public createdAt?: Date | string;

  public updatedAt?: Date | string;
}

Cart.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    clientId: Sequelize.STRING,
    table: Sequelize.NUMBER,
    items: Sequelize.STRING,
    finished: Sequelize.BOOLEAN,
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'sale_cart',
    sequelize: database.connection
  }
);

Cart.belongsTo(Client, {
  foreignKey: 'clientId',
  as: 'client'
});

export default Cart;
