import { Model, DataTypes } from 'sequelize';

export default class journal extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}

export const init = (sequelize) => {
  journal.init(
    {
      date: DataTypes.STRING,
      information: DataTypes.STRING,
      from: DataTypes.STRING,
      warehouse_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'journal',
    },
  );
  return journal;
};
