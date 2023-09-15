import { Model, DataTypes } from 'sequelize';
import database from '../../infrastructure/data/config/database';
import Product from './Product';
import Sale from './Sales';

class SaleProducts extends Model {
  public id: string;
  public saleId: string;
  public productId: string;
  public quantity: number;
  public createdAt?: Date | string;
  public updatedAt?: Date | string;
}

SaleProducts.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    saleId: {
        type: DataTypes.UUID,
    },
    productId: {
      type: DataTypes.UUID,
    },
    quantity: DataTypes.DECIMAL(10, 2),
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'saleProducts',
    sequelize: database.connection,
  }
);

SaleProducts.belongsTo(Sale, {
    foreignKey: 'saleId',
});

SaleProducts.belongsTo(Product, {
    foreignKey: 'productId',
});

export default SaleProducts;