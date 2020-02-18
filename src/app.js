import express from 'express';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // habilita o uso de json
    this.server.use(express.json());
  }

  routes() {
    // importa as rotas
    this.server.use(routes);
  }
}
// Exporta o sevidor
export default new App().server;
