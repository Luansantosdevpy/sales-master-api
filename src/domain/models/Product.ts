import Sequelize, { Model } from 'sequelize';
import database from '../../infrastructure/data/config/database';
import Category from './Category';

class Product extends Model {
  public id: string;

  public name: string;

  public description: string;

  public price: number;

  public productStock: number;

  public sku: string;

  public categoryId: string;

  public provider: number;

  public active: boolean;

  public image: string;

  public attributes: string;

  public createdAt?: Date | string;

  public updatedAt?: Date | string;
}

Product.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.NUMBER,
    productStock: Sequelize.NUMBER,
    sku: Sequelize.STRING,
    categoryId: {
      type: Sequelize.UUID
    },
    provider: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    image: Sequelize.STRING,
    attributes: Sequelize.STRING,
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'products',
    sequelize: database.connection
  }
);

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});

export default Product;
