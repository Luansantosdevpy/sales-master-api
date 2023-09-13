import Sequelize, { Model } from 'sequelize';
import database from '../../infrastructure/data/config/database';

class Category extends Model {
  public id: string;

  public category_name: string;

  public description: string;

  public category_image: string;

  public category_icon: string;

  public createdAt?: Date | string;

  public updatedAt?: Date | string;
}

Category.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    category_name: Sequelize.STRING,
    description: Sequelize.STRING,
    category_image: Sequelize.STRING,
    category_icon: Sequelize.STRING,
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'categories',
    sequelize: database.connection
  }
);

export default Category;