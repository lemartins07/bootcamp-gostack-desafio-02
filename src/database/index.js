import Sequelize from 'sequelize';

import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // cria conexao com o Sequelize e passa as configuraçoes como parametro
    this.connection = new Sequelize(databaseConfig);

    // Acessa os models da aplicação e passa a conexão como parametro
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
