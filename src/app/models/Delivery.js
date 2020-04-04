import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // define o relacionamento com o model File
  static associate(models) {
    this.belongsTo(models.Recipients, {
      foreignKey: 'recipient_id',
    });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
    });
  }
}

export default Delivery;
