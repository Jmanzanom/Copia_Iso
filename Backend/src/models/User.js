import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: Sequelize.DataTypes.STRING,
    apellido: Sequelize.DataTypes.STRING,
    rut: Sequelize.DataTypes.STRING,
    email: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    monto: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    tasa: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    plazo: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    estado: {
      type: Sequelize.DataTypes.STRING, // Tipo de datos para el estado
      defaultValue: 'pendiente', // Valor predeterminado 'pendiente'
    },
    createdAt: Sequelize.DataTypes.DATE,
    updatedAt: Sequelize.DataTypes.DATE,
  },
  {
    sequelize,
    timestamps: true,
  }
);

export default User;

