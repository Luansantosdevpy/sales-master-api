dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_POSTGRES_HOST,
  port: parseInt(process.env.DB_POSTGRES_PORT, 10),
  database: process.env.DB_POSTGRES_NAME,
  username: process.env.DB_POSTGRES_USER,
  password: process.env.DB_POSTGRES_PASSWORD,
  define: {
    timestamps: true,
    underscored: true
  },
  seederStorage: 'sequelize'
};
