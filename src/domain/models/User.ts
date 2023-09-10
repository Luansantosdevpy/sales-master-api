import Sequelize, { Model } from 'sequelize';
import database from '../../infrastructure/data/config/database';

class User extends Model {
  public id: string;

  public name: string;

  public email: string;
    
  public cpf: string;
    
  public password: string;
    
  public confirm_password: string;

  public createdAt?: Date | string;

  public updatedAt?: Date | string;
}

User.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    cpf: Sequelize.STRING,
    password: Sequelize.STRING,
    confirm_password: Sequelize.STRING,
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    }
  },
  {
    tableName: 'users',
    sequelize: database.connection
  }
);

export default User;
