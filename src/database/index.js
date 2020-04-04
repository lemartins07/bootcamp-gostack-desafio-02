import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, Recipients, Deliveryman, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // cria conexao com o Sequelize e passa as configuraçoes como parametro
    this.connection = new Sequelize(databaseConfig);

    // Acessa os models da aplicação e passa a conexão como parametro
    models
      .map(model => model.init(this.connection))
      // Faz a associassão dos relacionamentos dos models
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
