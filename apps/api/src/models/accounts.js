import { Model, DataTypes } from 'sequelize';

export default class accounts extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(accounts) {
    // define association here
  }
}

export const init = (sequelize) => {
  accounts.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: "user"
      },
      profile_picture: DataTypes.STRING,
      address_id: DataTypes.INTEGER,
      warehouse_id: DataTypes.INTEGER,
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'accounts',
    },
  );
  return accounts;
};
